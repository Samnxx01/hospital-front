import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../auth/Login/Login'



export default function PublicRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
        </Routes>
    )
}
