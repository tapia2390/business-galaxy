package com.galaxy.Galaxy.controller;

import com.galaxy.Galaxy.model.Task;
import com.galaxy.Galaxy.service.TaskService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@Tag(name = "Tareas", description = "API para gestionar tareas")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> getAll() {
        return service.getAllTasks();
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return service.createTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task task) {
        Task updated = service.updateTask(id, task);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.deleteTask(id)) return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggle(@PathVariable Long id) {
        Task task = service.toggleTask(id);
        if (task == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(task);
    }
}