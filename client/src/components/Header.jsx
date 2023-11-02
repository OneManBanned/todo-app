import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { change } from '../features/theme/themeSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>GoalSetter</Link>
            </div>
            <div>
                <label htmlFor="darkMode"></label>
                <input type="checkbox" id="darkMode"
                    onClick={() => dispatch(change())} />
            </div>
            <ul>
                {user ? (<li>
                    <button className="btn" onClick={onLogout}>
                        <FaSignOutAlt />Logout
                    </button>
                </li>) :
                    (
                        <>
                            <li>
                                <Link to='/login'>
                                    <FaSignInAlt />Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaUser />Register
                                </Link>
                            </li>
                        </>
                    )

                }
            </ul >
        </header >
    )
}

export default Header