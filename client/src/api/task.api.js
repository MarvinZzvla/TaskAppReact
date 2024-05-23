import axios from "axios";

export const getTaskRequest = async () => {
  return await axios.get("https://task-app-react-gules.vercel.app/task");
};

export const createTaskRequest = async (task) => {
  return await axios.post("https://task-app-react-gules.vercel.app/task", task);
};

export const deleteTaskRequest = async (id) => {
  return await axios.delete(
    `https://task-app-react-gules.vercel.app/task/${id}`
  );
};

export const getTaskRequestById = async (id) => {
  return await axios.get(`https://task-app-react-gules.vercel.app/task/${id}`);
};

export const updateTask = async (task, id) => {
  return await axios.put(
    `https://task-app-react-gules.vercel.app/task/${id}`,
    task
  );
};
