package com.peopleinfo.todo.web;

/** Stable error shape exposed by the public API. */
public record ApiError(String code, String message) {
}
