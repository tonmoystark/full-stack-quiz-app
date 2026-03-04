import React from 'react'
import AdminPanel from './pages/AdminPanel'
import RegistrationForm from './pages/RegistrationForm'
import LoginForm from './pages/LoginForm'
import UserPanel from './pages/UserPanel'
import { Route, Routes } from 'react-router-dom'
import UserHistory from './pages/UserHistory'

const App = () => {



  return (
    <div className='bg-slate-950 text-white'>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/userPanel" element={<UserPanel />} />
        <Route path="/userHistory" element={<UserHistory />} />
      </Routes>

    </div>
  )
}

export default App