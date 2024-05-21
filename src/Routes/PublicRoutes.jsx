import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../auth/Login/Login'
import Registros from '../auth/Registros/Registros'



export default function PublicRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/registro' element={<Registros />}></Route>
        </Routes>
    )
}
