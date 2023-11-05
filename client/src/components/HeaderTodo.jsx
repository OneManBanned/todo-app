import { change } from '../features/theme/themeSlice'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moon from '/images/icon-moon.svg'
import Sun from '/images/icon-sun.svg'

export default function HeaderTodo() {

    const location = useLocation()
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme)

    return (
        <header className='headerTodo'>
            <h1>
                <Link to='/'>{location.pathname === '/'
                    ? 'Todo'
                    : location.pathname.slice(1)}</Link>
            </h1>
            <div className='darkMode'>
                <label htmlFor="darkMode">
                    <img src={theme === 'light' ? Moon : Sun} alt="" />
                </label>
                <input type="checkbox" id="darkMode"
                    onClick={() => dispatch(change())} />
            </div>
        </header>
    )
}
