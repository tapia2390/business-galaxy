import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
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
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSaveTask = (
    title: string,
    description: string,
    taskId?: number
  ) => {
    if (taskId) {
      updateTask(taskId, { title, description });
    } else {
      createTask({ title, description, isDone: false });
    }
    setEditingTask(null);
  };

  if (loading) return <ActivityIndicator size="large" color={Colors.primary} />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TaskForm task={editingTask} onSave={handleSaveTask} />
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onComplete={completeTask}
              onDelete={removeTask}
              onEdit={() => setEditingTask(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // <- ESTA LÍNEA ES LA CLAVE para Android
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 16, // Un pequeño espacio extra dentro
  },
});
