import { change } from '../features/theme/themeSlice'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moon from '../../public/images/icon-moon.svg'
import Sun from '../../public/images/icon-sun.svg'

export default function HeaderTodo() {
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme)

    return (
        <header className='headerTodo'>
            <div className="logo">
                <Link to='/'>Todo</Link>
            </div>
            <div className='darkMode'>
                <label htmlFor="darkMode"><img src={
                    theme === 'light'
                        ? Moon
                        : Sun
                } alt="" /></label>
                <input type="checkbox" id="darkMode"
                    onClick={() => dispatch(change())} />
            </div>
        </header>
    )
}
