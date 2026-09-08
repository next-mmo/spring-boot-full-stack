package com.peopleinfo.todo.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;

import com.peopleinfo.todo.application.CreateTodoUseCase;

@WebMvcTest(CreateTodoController.class)
@ContextConfiguration(classes = {
        CreateTodoController.class,
        ApiExceptionHandler.class,
        CreateTodoControllerTest.TestBeans.class
})
class CreateTodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createsTodoAndReturnsThePublicResponseShape() throws Exception {
        mockMvc.perform(post("/api/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"  Buy milk  \"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isString())
                .andExpect(jsonPath("$.title").value("Buy milk"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void returnsAStableErrorForAnInvalidTitle() throws Exception {
        mockMvc.perform(post("/api/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\" \\t\\n \"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_TODO_TITLE"))
                .andExpect(jsonPath("$.message").value("Todo title must not be blank"));
    }

    @TestConfiguration(proxyBeanMethods = false)
    static class TestBeans {

        @Bean
        CreateTodoUseCase createTodoUseCase() {
            return new CreateTodoUseCase(todo -> todo);
        }
    }
}
