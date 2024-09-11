import { SiStarship } from "react-icons/si";
import { useTodo } from "../context/useTodo";
import { TodoItem } from "./TodoItem";
import { motion } from "framer-motion";

export const TodoList = () => {
  const { todos } = useTodo();
  if (!todos.length) {
    return (
      <div className="max-w-lg  m-auto px-5">
        <h1 className="flex flex-col items-center gap-5 px-5 py-10 font-bold text-center rounded-xl bg-gray-200">
          <SiStarship className="text-5xl" />
          You have nothing to do!
        </h1>
      </div>
    );
  }

  return (
    <motion.ul className="grid max-w-lg gap-2 px-5 m-auto">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo._id} />
      ))}
    </motion.ul>
  );
};
