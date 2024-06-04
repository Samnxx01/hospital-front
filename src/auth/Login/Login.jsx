import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css';
import userContext from '../hooks/UseContext';
import img from '../../../public/img/hospital.jpg'
export default function Login() {

  const { addUser } = useContext(userContext)



  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //osea que estos datos van para el hook
    try {

      const response = await fetch('http://localhost:8080/api/auth/login/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'metasploit': ''
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {


        const data = await response.json();
        addUser(data)
        localStorage.setItem('user', JSON.stringify(data));
        alert('¡Inicio de sesion exitoso');
        navigate('/Home'); // Redirigir a la página de inicio de sesión
      } else {
        console.error('datos incorrectos');
        alert('Correo incorrecto o contraseña invalida');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  return (
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Login</title>
        </head>
        
        <body style={{backgroundColor: 'green', backgroundImage:`url(${img})`, height: "100vh", minHeight:'100%' ,backgroundSize:'cover', margin:'0', padding:'0' }}>
          
        <h1 style={{ textAlign: 'center', fontSize:'100px', color:'red' }}>HOSPITAL LAS MALVINAS</h1>
         <h2 style={{ textAlign: 'center', fontSize:'100px', color:'red' }}>INTRANET</h2>
          <Container className="d-flex justify-content-center align-items-center" style={{ justifyContent: 'center' }}> {/* Utiliza clases de Bootstrap para centrar vertical y horizontalmente */}
            <Row style={{display:'flex', justifyContent:'center'}} >
                <Form  className="login-form" style={{ borderRadius:'10px',width: '250px',  display: 'block',  textAlign: 'center', marginTop: '100px' }}> {/* Agrega una clase para aplicar estilos personalizados */}
                  <Form.Text className="text"  >Ingrese su credenciales</Form.Text>
                  <Form.Group className="mb-3" >
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      id="nickname"
                      name="nickname"
                      autoComplete="nickname"
                      value={formData.nickname}
                      onChange={handleInputChange}
                      required
                      placeholder="usuario"
                    />
                  </Form.Group>


                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Contraseña"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordar" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Link to="/Registro" variant="info">Registrarse</Link>{' '}
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Ingresar
                  </Button>
                </Form>
            </Row>
          </Container>

        </body>
      </html>
    </>
  );
}

