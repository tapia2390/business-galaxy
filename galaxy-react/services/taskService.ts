import axios from 'axios';
import { Task } from '../types/task';



const API_URL = 'http://192.168.0.7:8080/tasks';

export const getTasks = async () => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};



export const addTask = async (task: Omit<Task, 'id'>) => {
  const response = await axios.post<Task>(API_URL, task);
  console.log('Respuesta del servidor al agregar tarea:', response.data);
  return response.data;
};

export const updateTask = async (id: number, task: Task) => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

