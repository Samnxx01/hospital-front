import React from 'react'
import Narvbar from '../../Narvbar/Narvbar'
import { io } from 'socket.io-client'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';




export default function Home() {

    

  const socket = io('http://localhost:8080');
  socket.on('connect', () => {
    console.log('conectado')

  })

    const navigate = useNavigate();

    const enviarIntranet = () => {
      navigate('/Modulo');
    };
    
  return (
    <>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HOME</title>
    </head>
    <body style={{backgroundColor:'red', height:"897px"}} >
        <Narvbar/>
      <h2 style={{textAlign:'center'}} color='  '><label>MENU DE LA INTRANET</label></h2>
      <div  style={{justifyContent: 'center', textAlign: 'center', display: 'flex', padding: "50px"}} > 
        <Card  variant="top" style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center', marginRight:"50px"}} >
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuBCQ595tXlMd0JqUjrylnv35ssxf8sxydtF5omu-cw&s" />
            <h1 className='bi bi-pc-display-horizontal' ></h1>
            <Card.Body>
              <Card.Title style={{marginTop:'40px'}}>Modulo de Intranet</Card.Title>
            </Card.Body>
            <Card.Body>
              <Button style={{height:'70px', marginTop:'70px'}} onClick={enviarIntranet}>Ingrese al modulo</Button>
            </Card.Body>
          </Card>
        </div>
    </body>
    </html>
    </>
  )
}
