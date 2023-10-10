import { useState } from "react"
import { type Todo } from "../App"

type AppProps = {
    todo: Todo 
    onDelete: () => void
    onUpdate: (title: string, desc: string) => void
}

export const TodoRender = (renderProps: AppProps) => {

    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [titleInput, setTitleInput] = useState(renderProps.todo.title)
    const [descInput, setDescInput] = useState(renderProps.todo.description)

    const toggle = () => {
        setIsBeingEdited(!isBeingEdited)
    }

    const update = () => {
        renderProps.onUpdate(titleInput, descInput)
        setIsBeingEdited(false)
    }

    return (
        <div className="p-2 rounded-md border-2 border-gray-500">
            {!isBeingEdited ? <h1>Title: {renderProps.todo.title}</h1> : <input placeholder="Title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />}

            {!isBeingEdited ? <p>Description: {renderProps.todo.description}</p> : <input placeholder="Description" value={descInput} onChange={(e) => setDescInput(e.target.value)} />}

            <div className="flex gap-2">
                <button className="rounded-md border-2 bg-gray-900 text-white p-2" onClick={toggle}>
                    {!isBeingEdited ? <span>Edit</span> : <span>Cancel</span>}
                </button>
                <button className="rounded-md border-2 bg-gray-900 text-white p-2" onClick={renderProps.onDelete}>Delete</button>
                {isBeingEdited && (<button className="rounded-md border-2 bg-gray-900 text-white p-2" onClick={update}>Update</button>)}
            </div>
        </div>
    )
}
