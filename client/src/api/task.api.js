import axios from "axios";

export const getTaskRequest = async () => {
  return await axios.get("http://localhost:4000/task");
};

export const createTaskRequest = async (task) => {
  return await axios.post("http://localhost:4000/task", task);
};

export const deleteTaskRequest = async (id) => {
  return await axios.delete(`http://localhost:4000/task/${id}`);
};

export const getTaskRequestById = async (id) => {
  return await axios.get(`http://localhost:4000/task/${id}`);
};

export const updateTask = async (task, id) => {
  return await axios.put(`http://localhost:4000/task/${id}`, task);
};
