package com.peopleinfo.todo.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.peopleinfo.todo.application.CreateTodoCommand;
import com.peopleinfo.todo.application.CreateTodoUseCase;

@RestController
@RequestMapping("/api/todos")
public final class CreateTodoController {

    private final CreateTodoUseCase useCase;

    public CreateTodoController(CreateTodoUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<CreateTodoResponse> create(@RequestBody CreateTodoRequest request) {
        var todo = useCase.execute(new CreateTodoCommand(request.title()));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CreateTodoResponse.from(todo));
    }
}
