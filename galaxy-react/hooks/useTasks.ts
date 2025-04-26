import { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../services/taskService';
import { Task } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      setError('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Omit<Task, 'id'>) => {
    console.log('new task create:', task); 
    const newTask = await addTask(task);
    setTasks(prev => [...prev, newTask]);
  };

  const completeTask = async (id: number) => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const updatedTask = await updateTask(id, { ...task, isDone: !task.isDone });
    setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
  }
};

  const removeTask = async (id: number) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, loading, error, createTask, completeTask, removeTask };
}