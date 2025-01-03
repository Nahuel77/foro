
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home/Home'
// import Login from './pages/Login/Login'

function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Navbar />
          <Home></Home>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
