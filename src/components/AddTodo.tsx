import { useState, useEffect, useRef, FormEvent } from "react"
// import { TodoContext } from "../context/TodoContext"
import { useTodo } from "../context/useTodo"


export const AddTodo = () => {
    const [name, setName] = useState<string>('')
    const [input, setInput] = useState<string>('')
    const nameRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { addTodo } = useTodo()


    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus()
        }
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        addTodo(name, input)
        if (name.trim() !== '' && input.trim() !== '') {
            setName('')
            setInput('')
            
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="flex items-center gap-5 p-5 m-auto w-full max-w-lg">
                <input
                    ref={nameRef}
                    value={name}
                    name="name"
                    className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-700"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    type="text" />
                <input
                    ref={inputRef}
                    value={input}
                    className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-700"
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type Something..."
                    name="input"
                    type="text" />
                <button
                    type="submit"
                    className="px-5 py-2 text-sm font-normal bg-emerald-500 active:scale-90 rounded-xl"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}