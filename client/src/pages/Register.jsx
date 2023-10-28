import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        password2: '',
    })

    const { name, password, password2 } = formData

    const onChange = () => { }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please create an account</p>
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
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name='password2'
                            value={password2}
                            placeholder='enter your password2'
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