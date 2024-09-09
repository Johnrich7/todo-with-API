import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { getCurrentTimeDate } from "../utility/getCurrentTimeDate";
// import { input } from "framer-motion/client";

interface TodoContextProps {
  todos: Todo[];
  addTodo: (name: string, text: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, name: string, text: string) => void;
  isLoading: boolean;
  error: string | null;
  fetchTodos: () => void;
}

export interface Todo {
  id: string;
  name: string;
  input: string;
  status: "undone" | "completed";
  createdAt: string;
  updatedAt: string;
}

const TODO_URL = "http://localhost:5000";
//list-todo
//add-todo
//delte-todo

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

export const TodoProvider = (props: { children: ReactNode }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);

  const fetchTodos = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${TODO_URL}/api/todos`);
      setTodos(response.data);
    } catch (error: any) {
      console.error("Error Fetching Data:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios Error Details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
        setError(`Failed to fetch todos: ${error.message}`);
      } else {
        setError("Failed to fetch todos");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [refetch]);

  const addTodo = async (name: string, input: string) => {
    try {
      const createdAt = getCurrentTimeDate();
      console.log(createdAt);
      await axios.post(`${TODO_URL}/api/todos`, { name, input });
      setRefetch((v) => !v);
    } catch (error: any) {
      console.error("Error in adding Todo:", error);
      setError("Failed to add todo. Please try again.");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${TODO_URL}/api/todos/${id}`);
      setRefetch((v) => !v);
    } catch (error: any) {
      console.error("Error Deleting Todo:", error);
      setError("Failed to delete todo. Please try again.");
    }
  };

  const editTodo = async (id: string, name: string, input: string) => {
    try {
      const updatedAt = getCurrentTimeDate();
      console.log(updatedAt);
      await axios.put(`${TODO_URL}/api/todos/${id}`, { name, input });
      setRefetch((v) => !v);
    } catch (error: any) {
      console.error("Error in Editing Todo:", error);
      setError("Failed to edit Todo. Please try again later");
    }
  };

  const value: TodoContextProps = {
    todos,
    isLoading,
    error,
    fetchTodos,
    addTodo,
    deleteTodo,
    editTodo,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};
