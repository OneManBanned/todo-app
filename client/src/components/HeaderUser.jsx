import { useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function HeaderUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className="headerUser">
            <ul>
                {user ? (<li>
                    <button className="btn" onClick={onLogout}>
                        <span><FaSignOutAlt /></span>
                        <span>Logout</span>
                    </button>
                </li>) :
                    (
                        <>
                            <li>
                                <Link to='/login'>
                                    <span><FaSignInAlt /></span>
                                    <span>Login</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <span><FaUser /></span>
                                    <span>Register</span>
                                </Link>
                            </li>
                        </>
                    )

                }
            </ul >
        </header >
    )
}

export default HeaderUser