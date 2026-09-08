package com.peopleinfo.todo.boot;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.peopleinfo.todo.application.CreateTodoUseCase;
import com.peopleinfo.todo.application.TodoRepository;
import com.peopleinfo.todo.persistence.PostgresTodoRepository;
import com.peopleinfo.todo.persistence.TodoMapper;

@Configuration(proxyBeanMethods = false)
@MapperScan(basePackageClasses = TodoMapper.class, annotationClass = Mapper.class)
public class TodoConfiguration {

    @Bean
    TodoRepository todoRepository(TodoMapper mapper) {
        return new PostgresTodoRepository(mapper);
    }

    @Bean
    CreateTodoUseCase createTodoUseCase(TodoRepository repository) {
        return new CreateTodoUseCase(repository);
    }

    @Bean
    WebMvcConfigurer webMvcConfigurer(
            @Value("${todo.frontend-origin:http://localhost:5173}") String frontendOrigin) {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(frontendOrigin)
                        .allowedMethods("GET", "POST", "OPTIONS")
                        .allowedHeaders("Content-Type");
            }
        };
    }
}
