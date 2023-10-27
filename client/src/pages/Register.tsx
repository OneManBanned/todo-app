import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { register, reset } from '../features/auth/authSlice.tsx'

function Register() {
    const [formData, setFormData] = useState<object>({
        name: '',
        password: '',
        password2: ''
    })

    const { name, password, password2 }: any = formData

    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const { user, isLoading, isError, isSuccess,
        message } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e: any) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }
        ))
    }
    const onSubmit = (e: any) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do no match')
        } else {
            const userData = { name, password }
            dispatch(register())
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id='name'
                            name='name' value={name} placeholder='Enter your name'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password'
                            name='password' value={password} placeholder='Enter your password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password2'
                            name='password2' value={password2} placeholder='Confirm password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register