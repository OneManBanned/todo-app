import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    })

    const { name, password } = formData

    const onChange = () => { }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Login and start setting goals</p>
            </section>
            <section className="form">
                <form >
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            value={name}
                            placeholder='enter your name'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            value={password}
                            placeholder='enter your password'
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