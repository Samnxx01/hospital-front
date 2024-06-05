import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../componente/Home/Home';
import Intranet from '../componente/Intranet/Modulo';
import Documentos from '../componente/Intranet/Procesos/Home';
import userContext from '../auth/hooks/UseContext';
import CalidadFolder from '../componente/Intranet/Procesos/Financiera/Listar';
import HomeSecond from '../componente/Home/HomeSecond';
import ListarCarpetas from '../componente/Intranet/Misionales/HomeSecun'
import ListarAdmin from '../componente/Intranet/Procesos/Administrativa/Listar';
import Talento from '../componente/Intranet/Procesos/Talento/Listar';
import Tecnologia from '../componente/Intranet/Procesos/Tecnologia/Listar';
import Juridica from '../componente/Intranet/Procesos/Juridica/Listar';
import HomeThird from '../componente/Intranet/Gerenciales/HomeThird';
import AsistencialAmb from '../componente/Intranet/Misionales/AsistencialAm/AsisAmb';
import Hospitalizcion from '../componente/Intranet/Misionales/Hospitalizacion/Partos';
import Urgencias from '../componente/Intranet/Misionales/Urgencias/Urgencias';
import Prevencion from '../componente/Intranet/Misionales/Promocion/Prevencion';
import Terapias from '../componente/Intranet/Misionales/Ayudas/Terapias';
import Administracion from '../componente/Intranet/Misionales/Riesgos/Administracion';
import Atencion from '../componente/Intranet/Gerenciales/Atencion/Atecion'
import Planeacion from '../componente/Intranet/Gerenciales/Planeacion/Planeacion';
import Calidad from '../componente/Intranet/Gerenciales/Calidad/Calidad';
import Mercadeo from '../componente/Intranet/Gerenciales/Direccionamiento/Mercadeo';


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
      <Route path='/Home-terciario' element={<ListarCarpetas />}></Route>
      <Route path='/Home-cuarto' element={<HomeThird />}></Route>
      <Route path='/Asistencial' element={<AsistencialAmb />}></Route>
      <Route path='/Hospitalizacion' element={<Hospitalizcion />}></Route>
      <Route path='/Urgencias' element={<Urgencias />}></Route>
      <Route path='/Promocion' element={<Prevencion />}></Route>
      <Route path='/Terapia' element={<Terapias />}></Route>
      <Route path='/Riesgo' element={<Administracion />}></Route>
      <Route path='/Atencion' element={<Atencion />}></Route>
      <Route path='/Planeacion' element={<Planeacion />}></Route>
      <Route path='/Calidad' element={<Calidad />}></Route>
      <Route path='/Mercadeo' element={<Mercadeo />}></Route>
      
      


      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  );
}

