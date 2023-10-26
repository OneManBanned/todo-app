import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
    const [formData, setFormData] = useState<object>({
        name: '',
        password: '',
    })

    const { name, password }: any = formData

    const onChange = (e: any) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }
        ))
    }
    const onSubmit = (e: any) => { e.preventDefault() }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start a todo list</p>
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
                        <button type="submit" className='btn'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login