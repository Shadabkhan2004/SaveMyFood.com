import React,{ useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Pantry from './components/Pantry'
import Layout from './Layout'
import Home from './components/Home'
import About from './components/About'
import NotLoggedInPantry from './components/NotLoggedInPantry'
import RefreshHandler from './components/RefreshHandler'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const PrivateRoute = ({element}) => {
    return isLoggedIn ? element : <NotLoggedInPantry/>
  }
  return (
    <>
      <BrowserRouter>
        <RefreshHandler isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/' element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/pantry' element={<PrivateRoute element={<Pantry/>}/>}/>
              <Route path='/about' element={<About/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
