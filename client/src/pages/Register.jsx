import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, register } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        password2: '',
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } =
        useSelector((state) => state.auth)

    const { name, password, password2 } = formData

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

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
        console.log('hi')
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name, password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="form">
                <form onSubmit={onSubmit} >
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
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name='password2'
                            value={password2}
                            placeholder='Re-enter your password'
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

export default Register