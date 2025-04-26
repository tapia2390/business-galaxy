package com.galaxy.Galaxy.service;



import com.galaxy.Galaxy.model.Task;
import com.galaxy.Galaxy.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task createTask(Task task) {
        return repository.save(task);
    }

    public Task updateTask(Long id, Task task) {
        if (!repository.existsById(id)) return null;
        task.setId(id);
        return repository.save(task);
    }

    public boolean deleteTask(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }

    public Task toggleTask(Long id) {
        Optional<Task> optionalTask = repository.findById(id);
        if (optionalTask.isEmpty()) return null;

        Task task = optionalTask.get();
        task.setDone(!task.getDone());
        return repository.save(task);
    }
}
