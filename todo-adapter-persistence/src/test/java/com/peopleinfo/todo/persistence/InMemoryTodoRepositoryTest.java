package com.peopleinfo.todo.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.UUID;

import org.junit.jupiter.api.Test;

import com.peopleinfo.todo.domain.Todo;

class InMemoryTodoRepositoryTest {

    private static final UUID TODO_ID = UUID.fromString("22222222-2222-2222-2222-222222222222");

    @Test
    void savesAndFindsATodoByItsStableIdentifier() {
        InMemoryTodoRepository repository = new InMemoryTodoRepository();
        Todo todo = Todo.create(TODO_ID, "Buy milk");

        assertSame(todo, repository.save(todo));
        assertTrue(repository.findById(TODO_ID).isPresent());
        assertEquals("Buy milk", repository.findById(TODO_ID).orElseThrow().title());
        assertFalse(repository.findById(UUID.randomUUID()).isPresent());
    }

    @Test
    void rejectsNullTodos() {
        InMemoryTodoRepository repository = new InMemoryTodoRepository();

        assertThrows(NullPointerException.class, () -> repository.save(null));
    }
}
