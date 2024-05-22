import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../componente/Home/Home'
import Intranet from '../componente/Intranet/Modulo'
import Documentos from '../componente/Intranet/Home'
import userContext from '../auth/hooks/UseContext'
import CalidadFolder from '../componente/Intranet/Listarcalidad'

export default function PrivateRoute() {

  const { user } = useContext(userContext);
    if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return (
    <Routes>
      {/* Use individual Route components */}
      <Route path='/Home' element={<Home />}></Route>
      <Route path='/Modulo' element={<Intranet />}></Route>
      <Route path='/Listar' element={<Documentos />}></Route>
      <Route path='/ListarCalidad' element={<CalidadFolder />}></Route>
      


      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  );
}

