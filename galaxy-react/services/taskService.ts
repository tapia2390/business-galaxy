import axios from 'axios';
import { Task } from '../types/task';

// Cambia según tu IP o usa 10.0.2.2 en Android emulator
//http://localhost:8080/tasks
const API_URL = 'http://localhost:8080/tasks';

export const getTasks = async () => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const addTask = async (task: Omit<Task, 'id'>) => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: Task) => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};