import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import HeaderUser from './components/HeaderUser'
import HeaderTodo from './components/HeaderTodo'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  const { theme } = useSelector((state) => state.theme)


  return (
    <div className={`theme-${theme} `}>
      <div className="background">
        <Router>
          <HeaderUser />
          <main className='container'>
            <HeaderTodo />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </main>
        </Router >
        <ToastContainer />
      </div>
    </div>
  )
}

export default App
