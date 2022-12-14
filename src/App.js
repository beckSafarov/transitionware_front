import { useEffect } from 'react'
import './globals.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingScreen from './pages/LandingScreen'
import SignUpScreen from './pages/auth/SignUpScreen'
import LoginScreen from './pages/auth/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import axios from 'axios'
import useAuthContext from './hooks/useAuthContext'
import Loading from './components/Loading'
import { baseUrl } from './constants'
import { shortConfig } from './utils/rxConfig'
function App() {
  const {setUser, authUnsuccessful, authDone} = useAuthContext()

  useEffect(()=>{
    handleAuth()
  }, [])

  const handleAuth = async () => {
    try {
      const res = await axios.get(`${baseUrl}/t4/auth/me`, {}, shortConfig)
      setUser(res.data.data)
    } catch (error) {
      authUnsuccessful()
      console.error(error)
    }
  }

  return (
    <>
      {!authDone ? (
        <Loading show />
      ) : (
        <Router>
          <Routes>
            <Route path={'/'} element={<LandingScreen />} />
            <Route path={'/signup'} element={<SignUpScreen />} />
            <Route path={'/login'} element={<LoginScreen />} />
            <Route path={'/home'} element={<HomeScreen />} />
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App
