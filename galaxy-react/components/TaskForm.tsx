import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  onAdd: (title: string, description: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '') return;
    onAdd(title, description);
    setTitle('');
    setDescription('');
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
      <Button title="Agregar" onPress={handleSubmit} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});