import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo } from '../features/todos/todosSlice'

export default function todoForm() {

    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)
    const { theme } = useSelector((state) => state.theme)

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createTodo({ text, completed }))

        setText('')
        setCompleted(false)
    }

    return (
        <section className="todo-form">
            <form onSubmit={onSubmit}>
                <div className="formGroup">
                    <input type="checkbox" name="complete" id="complete"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)} />
                    <label className={completed
                        ? 'formGroup_checkbox checkbox-complete'
                        : `formGroup_checkbox checkbox-${theme}active`}
                        htmlFor="complete" aria-label='is todo completed'></label>
                    <input
                        type="text"
                        name='text'
                        id='text'
                        value={text}
                        placeholder='Create a new todo...'
                        onChange={(e) => setText(e.target.value)} />
                    <label htmlFor="text" className='todoText' aria-label='add a todo'></label>
                </div>
            </form>
        </section>
    )
}
