import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../componente/Home/Home'
import Intranet from '../componente/Intranet/Modulo'
import Documentos from '../componente/Intranet/Procesos/Home'
import userContext from '../auth/hooks/UseContext'
import CalidadFolder from '../componente/Intranet/Procesos/Financiera/Listarcalidad'
import HomeSecond from '../componente/Home/HomeSecond'
import CarpetaSecond from '../componente/Intranet/HomeSecun'
import ListarAdmin from '../componente/Intranet/Procesos/Administrativa/Listar'
import Talento from '../componente/Intranet/Procesos/Talento/Listar'
import Tecnologia from '../componente/Intranet/Procesos/Tecnologia/Listar'
import Juridica from '../componente/Intranet/Procesos/Juridica/Listar'
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
      <Route path='/ListarFinanciero' element={<CalidadFolder />}></Route>
      <Route path='/ListarAdministrativa' element={<ListarAdmin />}></Route>
      <Route path='/ListarTalento' element={<Talento />}></Route>
      <Route path='/ListarTecnologia' element={<Tecnologia />}></Route>
      <Route path='/ListarJuridica' element={<Juridica />}></Route>
      <Route path='/Home-secundario' element={<HomeSecond />}></Route>
      <Route path='/Home-terciario' element={<HomeSecond />}></Route>
      


      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  );
}

