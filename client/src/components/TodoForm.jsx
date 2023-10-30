import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodo } from '../features/todos/todosSlice'

export default function todoForm() {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createTodo({ text }))

        setText('')
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input
                        type="text"
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn" type='submit'>
                        Add Todo
                    </button>
                </div>
            </form>
        </section>
    )
}
