import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteTodo, updateTodo } from "../features/todos/todosSlice"

export default function TodoItem({ todo }) {

    const dispatch = useDispatch()

    const updateCurrentTodo = () => {
        dispatch(updateTodo(todo._id))
    }

    useEffect(() => {
    }, [todo])

    return (
        <li className='todoItem'>
            <label
                htmlFor="comp"
                aria-label="completed"
                className={todo.completed
                    ? 'todoItem_label todoItem_label-complete'
                    : 'todoItem_label todoItem_label-active'}
            ></label>
            <input
                type="checkbox"
                id="comp"
                onChange={updateCurrentTodo}
                checked={todo.completed}
            />
            <p>{todo.text}</p>
            <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">X</button>
        </li>
    )
}
