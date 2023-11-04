import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } =
        useSelector((state) => state.auth)

    const { name, password } = formData

    const onChange = (e) => {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = { name, password }
        dispatch(login(userData))
    }

    useEffect(() => {
        if (isError) { toast.error(message) }
        if (isSuccess || user) { navigate('/') }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) { return <Spinner /> }

    return (
        <>
            <section className="heading">
                <h2> Login </h2>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            value={password}
                            placeholder='Enter your password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button
                            type='submit'
                            className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section >
        </>
    )
}

export default Login