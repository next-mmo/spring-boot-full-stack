package com.peopleinfo.todo.web;

import java.util.UUID;

import com.peopleinfo.todo.domain.Todo;

/** JSON response body for a created Todo. */
public record CreateTodoResponse(UUID id, String title, boolean completed) {

    public static CreateTodoResponse from(Todo todo) {
        return new CreateTodoResponse(todo.id(), todo.title(), todo.completed());
    }
}
