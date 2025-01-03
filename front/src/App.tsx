
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Login from './pages/Login/Login'
// import Home from './pages/Home/Home'
// import Register from './pages/Register/Register'

function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Navbar />
          <Login/>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
