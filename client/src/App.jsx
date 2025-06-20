import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'   
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'  
import PrivateRoute from './components/privateRoute.jsx'
function App() {
  return (
    <BrowserRouter>
      <div className="app" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
        <Header />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<Signin />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route element={<PrivateRoute />} >
              <Route path='/profile' element={<Profile />} /> 
              //so now if the user tries to access the profile page, they will be redirected to the privateroute component 
            </Route>

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
