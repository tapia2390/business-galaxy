import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTasks } from '../../hooks/useTasks';
import TaskItem from '../../components/TaskItem';
import TaskForm from '../../components/TaskForm';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const { tasks, loading, error, createTask, completeTask, removeTask } = useTasks();

  if (loading) return <ActivityIndicator size="large" color={Colors.primary} />;

  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <TaskForm onAdd={(title, description) => createTask({ title, description, isDone: false })} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onComplete={completeTask} onDelete={removeTask} />
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