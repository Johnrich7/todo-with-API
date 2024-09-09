import { useEffect, useRef, useState } from "react";
import { Todo } from "../context/TodoContext";
// import { TodoContext } from "../context/TodoContext";
import { useTodo } from "../context/useTodo";
import { motion } from "framer-motion";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const TodoItem = (props: { todo: Todo }) => {
  const { todo } = props;
  const [editingName, setEditingName] = useState<string>("");
  const [editingTodoInput, setEditingTodoInput] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>("");
  const editingNameRef = useRef<HTMLInputElement>(null);
  const editingInputRef = useRef<HTMLInputElement>(null);
  const { deleteTodo, editTodo } = useTodo();

  useEffect(() => {
    if (editingTodoId !== null && editingNameRef.current) {
      editingNameRef.current.focus();
    }
  }, [editingTodoId]);

  const handleEdit = (todoId: string, todoName: string, todoText: string) => {
    setEditingTodoId(todoId);
    setEditingTodoInput(todoText);
    setEditingName(todoName);

    if (editingNameRef.current) {
      editingNameRef.current?.focus();
    }
  };

  const handleUpdate = (todoId: string) => {
    if (editingName.trim() !== "" && editingTodoInput.trim() !== "") {
      editTodo(todoId, editingName, editingTodoInput);
      setEditingTodoId(null);
      setEditingName("");
      setEditingTodoInput("");
    }
  };

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId);
  };

  return (
    <motion.li layout key={todo.id} className="p-5 rounded-xl bg-gray-200">
      {editingTodoId === todo.id ? (
        <motion.div className="flex gap-2">
          <input
            ref={editingNameRef}
            value={editingName}
            className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-700"
            onChange={(e) => setEditingName(e.target.value)}
            placeholder="Name"
            type="text"
          />
          <input
            ref={editingInputRef}
            value={editingTodoInput}
            className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-700"
            onChange={(e) => setEditingTodoInput(e.target.value)}
            placeholder="Text"
            type="text"
          />
          <button
            onClick={() => handleUpdate(todo.id)}
            className="px-5 py-2 border-2 text-sm font-normal text-orange-400 bg-orange-800 border-orange-900 active:scale-90 rounded-xl"
          >
            Update
          </button>
        </motion.div>
      ) : (
        <div className="relative flex flex-col gap-5">
          <motion.span layout className="flex flex-col">
            <span className="font-bold">{todo.name}</span>
            <span>{todo.input}</span>
        </motion.span>
        <div className="text-sm text-gray-700">
            {todo.createdAt ? (
               <p>created at: {todo.createdAt}</p>
                ) : null}
                {todo.updatedAt ? (
                 <p>updated at: {todo.updatedAt}</p>
                ): null}
        </div>
            

          <div className="absolute top-0 right-0 flex gap-2">
            <div className="flex items-center gap-5">
              <button
                onClick={() => handleEdit(todo.id, todo.name, todo.input)}
                className="px-5 py-2 bg-cyan-400 border-2 border-cyan-600 rounded-xl text-sm font-normal flex items-center gap-1"
              >
                <FaRegEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="px-5 py-2 bg-rose-600 border-2 border-rose-800 rounded-xl text-sm font-normal text-white flex items-center gap-1"
              >
                <MdDelete />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.li>
  );
};
