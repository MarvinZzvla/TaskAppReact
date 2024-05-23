import { createContext, useContext, useState } from "react";
import {
  getTaskRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequestById,
  updateTask,
} from "../api/task.api.js";

export const TaskContext = createContext();
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskContext Provider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [result, setResult] = useState([]);

  const loadData = async () => {
    const { data } = await getTaskRequest();
    setResult(data);
  };

  const handleDelete = async (id) => {
    try {
      const resultDelete = await deleteTaskRequest(id);
      setResult(result.filter((e) => e.id !== id));
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadDataById = async (id) => {
    try {
      const response = await getTaskRequestById(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskByID = async (task, id) => {
    try {
      const response = await updateTask(task, id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateToggle = async (id, isActive) => {
    try {
      const taskFound = result.find((task) => task.id === id);
      taskFound.done = isActive;
      const response = await updateTask({ done: isActive }, id);
      console.log(response);

      setResult(
        result.map((task) =>
          task.id === id ? { ...task, done: isActive } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        result,
        loadData,
        handleDelete,
        createTask,
        loadDataById,
        updateTaskByID,
        updateToggle,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
