package com.peopleinfo.todo.web;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.peopleinfo.todo.domain.InvalidTodoTitleException;

@RestControllerAdvice
public final class ApiExceptionHandler {

    @ExceptionHandler(InvalidTodoTitleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleInvalidTodoTitle(InvalidTodoTitleException exception) {
        return new ApiError("INVALID_TODO_TITLE", exception.getMessage());
    }
}
