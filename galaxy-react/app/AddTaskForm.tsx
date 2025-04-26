import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text } from 'react-native';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [isDone, setIsDone] = useState(false); 

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask = {
      title,
      isDone, 
    };

    onAddTask(newTask);
    setTitle('');
    setIsDone(false);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nueva tarea"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>¿Completada?</Text>
        <Switch
          value={isDone}
          onValueChange={setIsDone}
          thumbColor={isDone ? '#4CAF50' : '#ccc'}
        />
      </View>

      <Button title="Agregar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginBottom: 5,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default AddTaskForm;