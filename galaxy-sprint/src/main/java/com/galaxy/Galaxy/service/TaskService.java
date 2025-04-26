package com.galaxy.Galaxy.service;

import com.galaxy.Galaxy.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong();

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task createTask(Task task) {
        task.setId(idGenerator.incrementAndGet());
        tasks.add(task);
        return task;
    }

    public Task updateTask(Long id, Task updatedTask) {
        Optional<Task> existingTaskOpt = tasks.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst();

        if (existingTaskOpt.isPresent()) {
            Task existingTask = existingTaskOpt.get();
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setIsDone(updatedTask.getIsDone());
            return existingTask;
        }
        return null;
    }

    public boolean deleteTask(Long id) {
        return tasks.removeIf(task -> task.getId().equals(id));
    }

    public Task toggleTask(Long id) {
        Optional<Task> taskOpt = tasks.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst();

        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            task.setIsDone(!task.getIsDone());
            return task;
        }
        return null;
    }
}