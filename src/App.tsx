import { useEffect, useState } from 'react';
import Task from './components/Task';
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const savedTask = localStorage.getItem('savedTask');
  useEffect(() => {
    if (savedTask) {
      const task = JSON.parse(savedTask);
      setTodos(task);
    }
  }, [])
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim().length) {

      const todo = {
        id: todos.length,
        text: inputValue,
        completed: false
      }
      setTodos([...todos, todo]);

      setInputValue('');
    } else {
      alert("Please fill out the input field.")
    }
  }
  useEffect(() => {
    localStorage.setItem('savedTask', JSON.stringify(todos));

  }, [todos])
  return (
    <div className="max-w-2xl mx-5 md:mx-auto mt-10 shadow-lg shadow-black/30 border border-gray-400 p-10 rounded-lg text-gray-400">
      <h2 className="text-4xl font-medium border-b-2 border-gray-400 pb-1 w-fit mx-auto">Task Manager</h2>

      <form className="grid grid-cols-5 border border-gray-400 my-5 rounded-md" onSubmit={addTodo}>
        <input value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Add new task" className="bg-transparent col-span-4 px-5 py-2 focus:outline-none" />
        <button type='submit' className="hover:bg-gray-400 hover:text-white font-bold transition-colors">Add</button>
      </form>

      <div className="flex flex-col space-y-7">
        {
          todos.map((todo, i) => (
            <Task key={i} data={todo} todos={todos} setTodos={setTodos} />
          ))
        }
      </div>
    </div>
  )
}

export default App
