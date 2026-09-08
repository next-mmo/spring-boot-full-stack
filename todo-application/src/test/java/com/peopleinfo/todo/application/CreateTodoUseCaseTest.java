package com.peopleinfo.todo.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.peopleinfo.todo.domain.InvalidTodoTitleException;
import com.peopleinfo.todo.domain.Todo;
import org.junit.jupiter.api.Test;

class CreateTodoUseCaseTest {

    @Test
    void createsAndSavesATodoThroughTheRepositoryPort() {
        InMemoryTodoRepository repository = new InMemoryTodoRepository();
        CreateTodoUseCase useCase = new CreateTodoUseCase(repository);

        Todo result = useCase.execute(new CreateTodoCommand("  Buy milk  "));

        assertNotNull(result.id());
        assertEquals("Buy milk", result.title());
        assertFalse(result.completed());
        assertEquals(1, repository.saveCalls);
        assertSame(result, repository.savedTodo);
    }

    @Test
    void rejectsAnInvalidTitleBeforeCallingTheRepository() {
        InMemoryTodoRepository repository = new InMemoryTodoRepository();
        CreateTodoUseCase useCase = new CreateTodoUseCase(repository);

        assertThrows(
                InvalidTodoTitleException.class,
                () -> useCase.execute(new CreateTodoCommand("   "))
        );

        assertEquals(0, repository.saveCalls);
    }

    private static final class InMemoryTodoRepository implements TodoRepository {

        private int saveCalls;
        private Todo savedTodo;

        @Override
        public Todo save(Todo todo) {
            saveCalls++;
            savedTodo = todo;
            return todo;
        }
    }
}
