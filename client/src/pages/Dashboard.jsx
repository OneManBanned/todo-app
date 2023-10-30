import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from "../components/TodoForm"
import Spinner from '../components/Spinner'
import { reset, getTodos } from '../features/todos/todosSlice'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { todos, isLoading, isError, message } = useSelector((state) => state.todos)

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

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashborad</p>
            </section>
            <TodoForm />
        </>
    )
}

export default Dashboard