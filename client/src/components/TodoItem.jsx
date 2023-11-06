import { useDispatch } from "react-redux"
import { deleteTodo } from "../features/todos/todosSlice"

export default function GoalItem({ todo }) {
    const dispatch = useDispatch()


    return (
        <div className='todo'>
            <label htmlFor="completed" aria-label="completed"></label>
            {todo.completed ? <h1>True</h1> : <h1>False</h1>}
            <input type="checkbox" id="completed" checked={todo.completed} />
            <p>{todo.text}</p>
            <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">X</button>
        </div>
    )
}
