package com.peopleinfo.todo.application;

import com.peopleinfo.todo.domain.Todo;

/**
 * Output port for storing Todos.
 *
 * <p>The application owns this contract. Persistence adapters implement it.</p>
 */
public interface TodoRepository {

    Todo save(Todo todo);
}
