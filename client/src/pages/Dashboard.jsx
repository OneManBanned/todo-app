import { useEffect, useState, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from "../components/TodoForm"
import Spinner from '../components/Spinner'
import TodoItem from "../components/TodoItem"
import { reset, getTodos, deleteManyTodos } from '../features/todos/todosSlice'

function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { todos, isLoading, isError, message } = useSelector((state) => state.todos)

    const [display, setDisplay] = useState('all')
    const [currentTodos, setCurrentTodos] = useState(todos)

    const displayChange = (e) => setDisplay(e.target.value)

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
        activeCount()
    }, [display, todos])

    const activeCount = () => todos.filter(todo => !todo.completed).length

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)


    function handleDragEnd(e) {
        e.preventDefault()
        handleDragSort()
    }

    const handleDragSort = () => {
        let _currentTodos = [...currentTodos]

        const draggedItem = _currentTodos.splice(dragItem.current, 1)[0]

        _currentTodos.splice(dragOverItem.current, 0, draggedItem)

        dragItem.current = null
        dragOverItem.current = null

        setCurrentTodos(_currentTodos)
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <TodoForm />
            {todos.length > 0 ? (
                <section className="content">
                    <ul className="todos_list"
                    >
                        {currentTodos.map((todo, index) => (
                            <div
                                key={todo._id} index={index} draggable
                                onDragStart={(e) => dragItem.current = index}
                                onDragOver={(e) => dragOverItem.current = index}
                                onDragEnd={handleDragEnd}
                            >
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </ul>
                    <div className="todos_ui">
                        <p>{activeCount() == 1 ? `${activeCount()} item left` : `${activeCount()} items left`}</p>
                        <button className="mobile-btn" onClick={() => dispatch(deleteManyTodos())}>clear completed</button>
                    </div>
                    <fieldset className="content_radioGroup">
                        <div>
                            <label htmlFor="all" className={display === 'all' ? 'checked' : 'notChecked'}>all</label>
                            <input
                                type="radio"
                                name="display"
                                id="all"
                                value="all"
                                onChange={displayChange}
                                checked={display === 'all'} />
                        </div>
                        <div>
                            <label htmlFor="active" className={display === 'active' ? 'checked' : 'notChecked'}>active</label>
                            <input
                                type="radio"
                                name="display"
                                id="active"
                                value="active"
                                onChange={displayChange}
                                checked={display === 'active'} />
                        </div>
                        <div>
                            <label htmlFor="completed" className={display === 'completed' ? 'checked' : 'notChecked'}>completed</label>
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
                    <button className="desktop-btn" onClick={() => dispatch(deleteManyTodos())}>clear completed</button>
                </section>
            )
                : (<h3>You have not set any todos</h3>)}
        </>
    )
}

export default Dashboard