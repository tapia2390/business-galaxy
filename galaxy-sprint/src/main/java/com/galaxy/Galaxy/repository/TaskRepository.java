package com.galaxy.Galaxy.repository;

import com.galaxy.Galaxy.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}