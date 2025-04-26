package com.galaxy.Galaxy.model;

public class Task {
    private Long id;
    private String title;
    private String description;
    private boolean isDone;

    public Task() {}

    public Task(Long id, String title, String description, boolean isDone) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isDone = isDone;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean getIsDone() { return isDone; }
    public void setIsDone(boolean done) { isDone = done; }
}