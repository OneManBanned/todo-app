import { useDispatch } from "react-redux"
import { deleteTodo } from "../features/todos/todosSlice"

export default function GoalItem({ todo }) {
    const dispatch = useDispatch()

    return (
        <div className="goal">
            <div>
                {new Date(todo.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{todo.text}</h2>
            <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">X</button>
        </div>
    )
}
