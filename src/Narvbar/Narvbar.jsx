import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import userContext from '../auth/hooks/UseContext';
import { useNavigate } from 'react-router-dom';





function Narvbar() {
  const {cerrarSesion} = useContext(userContext)
   const navigate = useNavigate();

      const enviarMenu = () => {
      navigate('/');
    };

  return (
    <>
    <Navbar  expand="lg-expand" className="bg-body-tertiary">
      <Container>
        
        <Navbar.Brand href="/Home" >INTRANET-HOSPITAL</Navbar.Brand>
        
            <Button           style={{
            fontSize: '20px',
            padding: '10px 20px', // Añadimos padding para aumentar el área de clic
            width: 'auto', // Aseguramos que el botón tenga ancho automático
            height: 'auto', // Aseguramos que el botón tenga alto automático
            display: 'block', // Aseguramos que el botón sea un bloque
            
          }} onClick={() =>{
              enviarMenu()
              cerrarSesion()
            }}>Cerrar sesion</Button>
      </Container>
    </Navbar>
    </>
  )
}

export default Narvbar
