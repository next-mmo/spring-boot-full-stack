package com.peopleinfo.todo.persistence;

import java.util.Objects;

import com.peopleinfo.todo.application.TodoRepository;
import com.peopleinfo.todo.domain.Todo;

/** Inserts new Todos; duplicate identifiers fail instead of overwriting a row. */
public final class PostgresTodoRepository implements TodoRepository {

    private final TodoMapper mapper;

    public PostgresTodoRepository(TodoMapper mapper) {
        this.mapper = Objects.requireNonNull(mapper, "mapper must not be null");
    }

    @Override
    public Todo save(Todo todo) {
        Objects.requireNonNull(todo, "todo must not be null");
        TodoRow row = new TodoRow();
        row.setId(todo.id());
        row.setTitle(todo.title());
        row.setCompleted(todo.completed());

        if (mapper.insert(row) != 1) {
            throw new IllegalStateException("Expected one Todo to be inserted");
        }
        return todo;
    }
}
