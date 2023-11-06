import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from "../components/TodoForm"
import Spinner from '../components/Spinner'
import TodoItem from "../components/TodoItem"
import { reset, getTodos } from '../features/todos/todosSlice'
import { current } from "@reduxjs/toolkit"

function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { todos, isLoading, isError, message } = useSelector((state) => state.todos)

    const [display, setDisplay] = useState('all')
    const [currentTodos, setCurrentTodos] = useState(todos)

    const displayChange = (e) => {
        setDisplay(e.target.value)
    }

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        if (!user) {
            navigate('/login')
        } else {
            dispatch(getTodos())
        }
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    useEffect(() => {
        if (display === 'all') {
            setCurrentTodos(todos)
        }
        if (display === 'active') {
            setCurrentTodos(todos.filter(todo => !todo.completed))
        }
        if (display === 'completed') {
            setCurrentTodos(todos.filter(todo => todo.completed))
        }
    }, [display, todos])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <TodoForm />
            <section className="content">
                {todos.length > 0 ? (
                    <div className="todos">
                        <form>
                            {currentTodos.map(todo => (
                                <TodoItem key={todo._id} todo={todo} />
                            ))}
                            <fieldset>
                                <div>
                                    <label htmlFor="all">all</label>
                                    <input
                                        type="radio"
                                        name="display"
                                        id="all"
                                        value="all"
                                        onChange={displayChange}
                                        checked={display === 'all'} />
                                </div>
                                <div>
                                    <label htmlFor="active">active</label>
                                    <input
                                        type="radio"
                                        name="display"
                                        id="active"
                                        value="active"
                                        onChange={displayChange}
                                        checked={display === 'active'} />
                                </div>
                                <div>
                                    <label htmlFor="completed">completed</label>
                                    <input
                                        type="radio"
                                        name="display"
                                        id="completed"
                                        value="completed"
                                        checked={display === 'completed'}
                                        onChange={displayChange}
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
                    : (<h3>You have not set any todos</h3>)}
            </section>
        </>
    )
}

export default Dashboard