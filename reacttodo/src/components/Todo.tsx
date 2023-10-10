import { useState } from "react"

function Todo() {
    const [isBeingEdited, setIsBeingEdited] = useState(false)

    const toggle = () => {
        setIsBeingEdited(!isBeingEdited)
    }

    const update = () => {
        
        setIsBeingEdited(false)
    }

    return (
        <div className="p-2 rounded-md border-2 border-gray-500">
            {!isBeingEdited && <h1>Title: {}</h1>}
        </div>
    )
}

export default Todo