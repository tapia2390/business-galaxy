import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types/task";
import { Colors } from "../constants/Colors";

interface Props {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({
  task,
  onComplete,
  onDelete,
  onEdit,
}: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, task.isDone && styles.completed]}>
          {task.title}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onComplete(task.id)}>
          <Text style={{ color: Colors.success }}>
            {task.isDone ? "❌" : "✓"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEdit(task)}
          style={{ marginLeft: 16 }}
        >
          <Text style={{ color: Colors.primary }}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          style={{ marginLeft: 16 }}
        >
          <Text style={{ color: Colors.danger }}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: Colors.success,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
