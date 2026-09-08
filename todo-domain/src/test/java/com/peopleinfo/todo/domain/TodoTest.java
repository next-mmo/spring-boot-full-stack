package com.peopleinfo.todo.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.Test;

class TodoTest {

    private static final UUID TODO_ID = UUID.fromString("11111111-1111-1111-1111-111111111111");

    @Test
    void createsAnIncompleteTodoAndRetainsItsIdentifier() {
        Todo todo = Todo.create(TODO_ID, "Buy milk");

        assertEquals(TODO_ID, todo.id());
        assertEquals("Buy milk", todo.title());
        assertFalse(todo.completed());
    }

    @Test
    void stripsSurroundingWhitespaceFromTheTitle() {
        Todo todo = Todo.create(TODO_ID, "  Buy milk  ");

        assertEquals("Buy milk", todo.title());
    }

    @Test
    void rejectsNullAndWhitespaceOnlyTitles() {
        assertThrows(InvalidTodoTitleException.class, () -> Todo.create(TODO_ID, null));
        assertThrows(InvalidTodoTitleException.class, () -> Todo.create(TODO_ID, "   \t\n"));
    }

    @Test
    void rejectsNullIdentifiers() {
        assertThrows(NullPointerException.class, () -> Todo.create(null, "Buy milk"));
    }
}
