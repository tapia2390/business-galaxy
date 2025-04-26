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

    public Task updateTask(Long id, Task newTask) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setTitle(newTask.getTitle());
                    existing.setIsDone(newTask.getIsDone());
                    return repository.save(existing);
                })
                .orElse(null);
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
        task.setIsDone(!task.getIsDone());
        return repository.save(task);
    }
}
