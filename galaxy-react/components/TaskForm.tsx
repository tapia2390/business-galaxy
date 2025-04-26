import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  onAdd: (title: string, isDone: boolean) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [isDone, setIsDone] = useState(false); // Estado para el switch

  const handleSubmit = () => {
    if (title.trim()) {
      console.log('Tarea:', title);
      console.log('¿Está completada?', isDone);
      onAdd(title, isDone); 
      setTitle('');
      setIsDone(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>¿Completada?</Text>
        <Switch
          value={isDone} 
          onValueChange={setIsDone} 
          thumbColor={isDone ? Colors.primary : '#ccc'}
          trackColor={{ true: Colors.primary, false: '#ccc' }}
        />
      </View>

      <Button title="Agregar tarea" onPress={handleSubmit} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.card,
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: Colors.text,
  },
});