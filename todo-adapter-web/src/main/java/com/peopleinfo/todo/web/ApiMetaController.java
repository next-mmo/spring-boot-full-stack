package com.peopleinfo.todo.web;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiMetaController {

    @GetMapping
    public Map<String, String> getApiMeta() {
        return Map.of(
                "name", "todo-api",
                "status", "ready"
        );
    }
}
