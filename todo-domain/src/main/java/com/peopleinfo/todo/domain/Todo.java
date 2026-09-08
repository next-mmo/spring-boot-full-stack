package com.peopleinfo.todo.domain;

import java.util.Objects;
import java.util.UUID;

/**
 * A Todo and the business rules that apply when it is created.
 */
public final class Todo {

    private final UUID id;
    private final String title;
    private final boolean completed;

    private Todo(UUID id, String title) {
        this.id = Objects.requireNonNull(id, "id must not be null");
        this.title = normalizeTitle(title);
        this.completed = false;
    }

    public static Todo create(UUID id, String title) {
        return new Todo(id, title);
    }

    public UUID id() {
        return id;
    }

    public String title() {
        return title;
    }

    public boolean completed() {
        return completed;
    }

    private static String normalizeTitle(String rawTitle) {
        if (rawTitle == null) {
            throw new InvalidTodoTitleException();
        }

        String normalizedTitle = rawTitle.strip();
        if (normalizedTitle.isEmpty()) {
            throw new InvalidTodoTitleException();
        }

        return normalizedTitle;
    }
}
