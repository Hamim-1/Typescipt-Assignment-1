import { AiOutlineEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import UpdateTask from "./UpdateTask";
import { useState } from "react";
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
interface TaskProps {
    data: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Task: React.FC<TaskProps> = ({ data, todos, setTodos }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { id, text, completed } = data;
    const deleteTodo = () => {
        const newTodos = todos.filter(todo => todo.id != id);
        setTodos(newTodos)
    }
    function updateTodo(type: string) {
        let newTodos;
        if (type === 'check') {
            newTodos = todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        } else {
            newTodos = todos.filter(todo => id != todo.id)
        }
        setTodos(newTodos);
    }

    return (
        <>
            <div className={`flex justify-between items-center  duration-150 ${completed && 'text-gray-500'}`}>
                <div className="flex space-x-2 items-center">

                    <div className={`flex justify-center items-center p-1 size-5 border rounded-full ${completed ? 'border-gray-500' : 'border-gray-400'}`} onClick={() => updateTodo('check')}>
                        {
                            completed && <FaCheck />
                        }
                    </div>

                    <p className={`${completed && 'line-through'}`}>{text}</p>
                </div>

                <div className="flex items-center space-x-2">
                    <AiOutlineEdit className={`text-2xl cursor-pointer ${completed ? 'hidden' : 'inline-block'}`} onClick={() => setIsOpen(true)} />
                    <MdDeleteOutline className="text-2xl cursor-pointer" onClick={deleteTodo} />
                </div>

            </div>

            {
                isOpen && <UpdateTask todos={todos} setIsOpen={setIsOpen} data={data} setTodos={setTodos} />
            }
        </>
    );
};

export default Task;