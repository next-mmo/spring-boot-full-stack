package com.peopleinfo.todo.boot;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

import com.peopleinfo.todo.application.CreateTodoCommand;
import com.peopleinfo.todo.application.CreateTodoUseCase;
import com.peopleinfo.todo.application.TodoRepository;
import com.peopleinfo.todo.domain.InvalidTodoTitleException;
import com.peopleinfo.todo.domain.Todo;
import com.peopleinfo.todo.persistence.PostgresTodoRepository;
import com.peopleinfo.todo.persistence.TodoMapper;

@Testcontainers
class PostgresTodoRepositoryTest {

    @Container
    private static final PostgreSQLContainer POSTGRES =
            new PostgreSQLContainer(DockerImageName.parse("postgres:17-alpine"));

    @Test
    void createsATodoThatSurvivesApplicationContextRestart() {
        Todo created;
        try (var context = startApplication()) {
            assertInstanceOf(PostgresTodoRepository.class, context.getBean(TodoRepository.class));
            created = context.getBean(CreateTodoUseCase.class)
                    .execute(new CreateTodoCommand("  Buy milk  "));
        }

        // The second application has a new connection pool and MyBatis session factory.
        try (var restarted = startApplication()) {
            var row = restarted.getBean(TodoMapper.class).selectById(created.id());
            assertEquals(created.id(), row.getId());
            assertEquals("Buy milk", row.getTitle());
            assertFalse(row.isCompleted());
            assertEquals(1, jdbc(restarted).queryForObject(
                    "SELECT count(*) FROM todos WHERE id = ?", Integer.class, created.id()));
        }
    }

    @Test
    void invalidTitlesNeverCreateARow() {
        try (var context = startApplication()) {
            var database = jdbc(context);
            long before = database.queryForObject("SELECT count(*) FROM todos", Long.class);
            var useCase = context.getBean(CreateTodoUseCase.class);

            assertThrows(InvalidTodoTitleException.class,
                    () -> useCase.execute(new CreateTodoCommand(" \t\n ")));
            assertThrows(InvalidTodoTitleException.class,
                    () -> useCase.execute(new CreateTodoCommand(null)));

            assertEquals(before, database.queryForObject("SELECT count(*) FROM todos", Long.class));
        }
    }

    @Test
    void duplicateIdentifierFailsWithoutOverwritingTheExistingRow() {
        try (var context = startApplication()) {
            var repository = context.getBean(TodoRepository.class);
            UUID id = UUID.randomUUID();
            repository.save(Todo.create(id, "Original title"));

            assertThrows(DataIntegrityViolationException.class,
                    () -> repository.save(Todo.create(id, "Replacement title")));

            assertEquals("Original title", jdbc(context).queryForObject(
                    "SELECT title FROM todos WHERE id = ?", String.class, id));
        }
    }

    @Test
    void databaseConstraintsRejectMalformedRowsFromDirectSql() {
        try (var context = startApplication()) {
            var database = jdbc(context);
            for (String title : new String[] {null, "", " \t\n "}) {
                UUID id = UUID.randomUUID();
                assertThrows(DataIntegrityViolationException.class, () -> database.update(
                        "INSERT INTO todos (id, title, completed) VALUES (?, ?, false)", id, title));
                assertEquals(0, database.queryForObject(
                        "SELECT count(*) FROM todos WHERE id = ?", Integer.class, id));
            }
            assertThrows(DataIntegrityViolationException.class, () -> database.update(
                    "INSERT INTO todos (id, title, completed) VALUES (?, 'Valid title', NULL)",
                    UUID.randomUUID()));
        }
    }

    private static ConfigurableApplicationContext startApplication() {
        return new SpringApplicationBuilder(TodoApplication.class)
                .web(WebApplicationType.NONE)
                .run("--spring.datasource.url=" + POSTGRES.getJdbcUrl(),
                        "--spring.datasource.username=" + POSTGRES.getUsername(),
                        "--spring.datasource.password=" + POSTGRES.getPassword(),
                        "--spring.main.banner-mode=off",
                        "--logging.level.root=WARN");
    }

    private static JdbcTemplate jdbc(ConfigurableApplicationContext context) {
        return new JdbcTemplate(context.getBean(DataSource.class));
    }
}
