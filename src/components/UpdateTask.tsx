import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
interface TaskProps {
    data: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateTask: React.FC<TaskProps> = ({ data, todos, setTodos, setIsOpen }) => {
    const { id, text } = data;
    const [inputValue, setInputValue] = useState<string>(text);
    const inputRef = useRef<HTMLInputElement>(null);
    function UpdateTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (inputValue.trim().length) {
            const newTodos = todos.map(todo => {
                if (todo.id === id) {
                    todo.text = inputValue;
                }
                return todo;
            })
            setTodos(newTodos);
            setIsOpen(false);
        }
    }
    useEffect(() => {
        inputRef.current?.focus();
    }, [])
    return (
        <div className="absolute -top-7 left-0 w-full h-screen bg-black/60 flex flex-col justify-center items-center">
            <IoMdClose className="text-4xl absolute top-10 right-10 cursor-pointer" onClick={() => setIsOpen(false)} />
            <form className="flex border border-gray-400 my-5 rounded-md" onSubmit={UpdateTask}>
                <input ref={inputRef} value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Update task" className="bg-transparent px-5 py-2 focus:outline-none w-full sm:w-96" />
                <button type='submit' className="hover:bg-gray-400 hover:text-white font-bold transition-colors px-4">Update</button>
            </form>
        </div>
    );
};

export default UpdateTask;