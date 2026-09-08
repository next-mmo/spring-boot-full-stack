package com.peopleinfo.todo.application;

import java.util.Objects;
import java.util.UUID;

import com.peopleinfo.todo.domain.Todo;

/**
 * Orchestrates the Create Todo use case.
 */
public final class CreateTodoUseCase {

    private final TodoRepository todoRepository;

    public CreateTodoUseCase(TodoRepository todoRepository) {
        this.todoRepository = Objects.requireNonNull(todoRepository, "todoRepository must not be null");
    }

    public Todo execute(CreateTodoCommand command) {
        Objects.requireNonNull(command, "command must not be null");

        Todo todo = Todo.create(UUID.randomUUID(), command.title());
        return todoRepository.save(todo);
    }
}
