package com.peopleinfo.todo.domain;

/**
 * Raised when a Todo title does not satisfy the domain invariant.
 */
public final class InvalidTodoTitleException extends IllegalArgumentException {

    public InvalidTodoTitleException() {
        super("Todo title must not be blank");
    }
}
