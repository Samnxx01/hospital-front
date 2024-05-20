import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../componente/Home/Home'
import userContext from '../auth/hooks/UseContext'

export default function PrivateRoute() {

  const { user } = useContext(userContext);
    if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return (
    <Routes>
      {/* Use individual Route components */}
      <Route path='/Home' element={<Home />}></Route>


      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  );
}

