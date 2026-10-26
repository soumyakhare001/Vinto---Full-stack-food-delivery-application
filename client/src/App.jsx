import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
export const serverUrl='http://localhost:1000'
function App() {
  return (
    <div>
      <BrowserRouter>
     <Routes>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='forgotpassword' element={<ForgotPassword/>}/>
      
     </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
