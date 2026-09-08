package com.peopleinfo.todo.persistence;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import com.peopleinfo.todo.application.TodoRepository;
import com.peopleinfo.todo.domain.Todo;

/**
 * Temporary persistence adapter used to demonstrate the repository boundary.
 *
 * <p>The application depends on {@link TodoRepository}; it does not know that
 * this implementation stores data in memory. The PostgreSQL/MyBatis adapter
 * can later replace this class without changing the application use case.</p>
 */
public final class InMemoryTodoRepository implements TodoRepository {

    private final Map<UUID, Todo> todos = new ConcurrentHashMap<>();

    @Override
    public Todo save(Todo todo) {
        Objects.requireNonNull(todo, "todo must not be null");
        todos.put(todo.id(), todo);
        return todo;
    }

    /**
     * Adapter-specific lookup used by the focused boundary test.
     */
    public Optional<Todo> findById(UUID id) {
        return Optional.ofNullable(todos.get(id));
    }
}
