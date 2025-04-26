import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "../../components/TaskItem";
import TaskForm from "../../components/TaskForm";
import { Colors } from "../../constants/Colors";
import { Task } from "../../types/task";

export default function HomeScreen() {
  const {
    tasks,
    loading,
    error,
    createTask,
    completeTask,
    removeTask,
    updateTask,
  } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State for editing task

  const handleSaveTask = (
    title: string,
    description: string,
    taskId?: number
  ) => {
    if (taskId) {
      // Update existing task
      updateTask(taskId, { title, description });
    } else {
      // Create new task
      createTask({ title, description, isDone: false });
    }
    setEditingTask(null); // Reset editing task after save
  };

  if (loading) return <ActivityIndicator size="large" color={Colors.primary} />;

  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <TaskForm
        task={editingTask} // Pass the task to be edited
        onSave={handleSaveTask}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onComplete={completeTask}
            onDelete={removeTask}
            onEdit={() => setEditingTask(item)} // Set task to be edited
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
});
