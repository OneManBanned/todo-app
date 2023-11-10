import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodo } from '../features/todos/todosSlice'

export default function todoForm() {

    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)

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
                    <label className={completed
                        ? 'formGroup_checkbox formGroup_checkbox-complete'
                        : 'formGroup_checkbox formGroup_checkbox-active'}
                        htmlFor="complete" aria-label='is todo completed'></label>
                    <input type="checkbox" name="complete" id="complete"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)} />
                    <label htmlFor="text" className='todoText' aria-label='add a todo'></label>
                    <input
                        type="text"
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                </div>
            </form>
        </section>
    )
}
