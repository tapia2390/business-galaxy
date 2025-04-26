import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Task } from "../types/task";

interface Props {
  task?: Task; // Optional task prop for editing
  onSave: (title: string, description: string, taskId?: number) => void; // Handle both create and update
}

export default function TaskForm({ task, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Pre-fill form fields if task is provided (for editing)
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = () => {
    if (title.trim() === "" || description.trim() === "") {
      setError("Both title and description are required.");
      return;
    }
    setError(null);
    onSave(title, description, task?.id); // Pass task id for update, undefined for new task
    setTitle("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título de la tarea"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button
        title={task ? "Actualizar" : "Agregar"} // Change button text based on editing or creating
        onPress={handleSubmit}
        color={Colors.primary}
        disabled={title.trim() === "" || description.trim() === ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
});
