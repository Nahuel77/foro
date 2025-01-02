
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Login from './pages/Login/Login'

function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Navbar />
          <Login></Login>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
