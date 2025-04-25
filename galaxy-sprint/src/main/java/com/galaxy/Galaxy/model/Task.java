package com.galaxy.Galaxy.model;

import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean isDone;

    public Task() {}

    public Task(String title, boolean isDone) {
        this.title = title;
        this.isDone = isDone;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public boolean isDone() { return isDone; }
    public void setDone(boolean done) { isDone = done; }
}
