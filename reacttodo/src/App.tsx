import { useEffect, useState } from 'react'
import Header from './components/Header'
import { TodoRender } from './components/TodoRender'

export type Todo = {
    id: number
    title: string
    description: string
    isCompleted: boolean
}

function App(){

    const [titleInput, setTitleInput] = useState("")
    const [descInput, setDescInput] = useState("")
    
    const existingTodos = localStorage.getItem("todos")
    const _todos = existingTodos ? JSON.parse(existingTodos) : []
    const [todos, setTodos] = useState<Todo[]>(_todos)

    useEffect(() => localStorage.setItem("todos", JSON.stringify(todos)))

    const addTodo = () => {
        const newTodo: Todo = {
            id: Math.random(),
            title: titleInput,
            description: descInput,
            isCompleted: false
        }
        setTodos([...todos, newTodo])
        setTitleInput("")
        setDescInput("")
    }

    const updateTodo = (id: number) => (title: string, description: string) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, title, description} : todo))
    }

    const deleteOne = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const deleteAll = () => {
        setTodos([])
    }

    return(
        <main className="max-w-[800px] m-auto min-h-screen bg-gray-400">
            <Header title="My todo app"/>

            <div className="border-2 rounded-md p-4 border-gray-800 flex flex-col items-center gap-4 max-w-[400px] m-auto">
                <input className="p-2" placeholder='Title' type="text" value={titleInput} onChange={(e) => setTitleInput(e.target.value)}/>
                <input className="p-2" placeholder='Description' type="text" value={descInput} onChange={(e) => setDescInput(e.target.value)}/>
                <button className="rounded-md border-2 bg-gray-900 text-white p-2" onClick={addTodo}>Add todo</button>
            </div>

            <hr className="my-4"/>

            <button className="rounded-md border-2 bg-gray-900 text-white p-2 m-auto block" onClick={deleteAll}>Delete all</button>
        
            <hr className="my-4"/>

            <Header title="Todos"/>

            <div  className="flex flex-wrap gap-4 m-4">
                {todos.map(todo => 
                <TodoRender 
                    todo={todo}
                    onDelete={ () => deleteOne(todo.id) }
                    onUpdate={ updateTodo(todo.id) } 
                />)}
            </div>

        </main>
    )
}

export default App
