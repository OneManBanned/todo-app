import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTodo, updateTodo } from "../features/todos/todosSlice"

export default function TodoItem({ todo }) {

    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme)

    const updateCurrentTodo = () => {
        dispatch(updateTodo(todo._id))
    }

    useEffect(() => {
    }, [todo])

    return (
        <li className='todoItem'>
            <label
                htmlFor={`completed${todo._id}`}
                aria-label="completed"
                className={todo.completed
                    ? 'todoItem_label checkbox-complete'
                    : `todoItem_label checkbox-${theme}active`}
            ></label>
            <input
                type="checkbox"
                id={`completed${todo._id}`}
                onChange={updateCurrentTodo}
                checked={todo.completed}
            />
            <p>{todo.text}</p>
            <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">X</button>
        </li>
    )
}
