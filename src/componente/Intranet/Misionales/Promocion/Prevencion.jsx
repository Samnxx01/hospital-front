import React from 'react'
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';


export default function Prevencion() {
  const [listarDocumentos, setListarDocumentos] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_archivo: '',
    archivo: '',
    descripcion: ''
  });

  const [imagen, setImagen] = useState(null);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  console.log(listarDocumentos)

  useEffect(() => {
    const fetchCalidad = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/documentos/listararchivos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        // Ensure data has the expected structure and property
        if (data && data.listarIntranet) {
          setlistarPDF(data.listarIntranet);
          setListarDocumentos(data.listarIntranet);
        } else {
          console.error('la api no responde.');
          // Handle the case where the API data is missing or has an unexpected structure
        }
      } catch (error) {
        console.error('Error fetching impresoras:', error);
      }
    };

    fetchCalidad();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      console.error('No hay archivo para subir');
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('imagen', imagen);

    try {
      const response = await fetch('http://localhost:8080/api/documentos/guardararchivos', {
        method: 'POST',
        body: formDataToSend,
      });
      console.log(formDataToSend)

      if (response.ok) {
        alert('¡Registro exitoso!');
        // Redirigir a la página de computadores
      } else {
        console.error('Error en el registro');
        alert('Error en el registro de png y jpg e extensiones no permitidas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const [imagenURLs, setImagenURLs] = useState([]);
  const [imagenFaltas, setImagenFaltas] = useState([]);
  const [listarPDF, setlistarPDF] = useState([]);
  console.log(listarPDF)


  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        const nuevasImagenesImg = [];
        const nuevasFaltasImg = [];
        const promesasImagenes = [];

        for (const documento of listarDocumentos) {
          if (!documento._id) {
            console.error('El documento no tiene un ID válido:', documento);
            continue; // Saltar a la próxima iteración si el documento no tiene un ID válido
          }

          const id = documento._id;
          const promise = fetch(`http://localhost:8080/api/documentos/archivos/modulo/${id}`)
            .then(response => {
              if (response.ok) {
                return response.blob();
              } else {
                throw new Error('Error al obtener la imagen');
              }
            })
            .then(imagenBlob => {
              const url = URL.createObjectURL(imagenBlob);
              nuevasImagenesImg.push(url);
              nuevasFaltasImg.push(false);
            })
            .catch(error => {
              console.error('Error al obtener la imagen:', error);
              nuevasImagenesImg.push(null);
              nuevasFaltasImg.push(true);
            });

          promesasImagenes.push(promise);
        }

        await Promise.all(promesasImagenes);

        setImagenURLs(nuevasImagenesImg);
        setImagenFaltas(nuevasFaltasImg);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

    obtenerImagenes();
  }, [listarDocumentos]);

  const enviarMenu = () => {
    navigate('/Home-secundario');
  };

  return (
    <>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Prevencion</title>
        </head>
        <body>
          <Container className="d-flex justify-content-center align-items-center" style={{ justifyContent: 'center' }}>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <h1 style={{ display: 'flex', justifyContent: 'center' }} >Aqui se carga el archivo</h1>
              <Form style={{ borderRadius: '10px', width: '250px', display: 'block', textAlign: 'center', marginTop: '100px' }} className="modulo-form">
                <Form.Group className="mb-3" >
                  <Form.Label >Nombre del Archivo</Form.Label>
                  <Form.Control type="text" placeholder="Nombre"
                    id="nombre_archivo"
                    name="nombre_archivo"
                    autoComplete="nombre_archivo"
                    value={formData.nombre_archivo}
                    onChange={handleInputChange}
                    required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Suba el archivo</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control type="text" placeholder="Descripcion"
                    id="descripcion"
                    name="descripcion"
                    autoComplete="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    required />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Ingresar
                </Button>
              </Form>

            </Row>
          </Container>

          <Card sx={{ maxWidth: 4005, margin: 'auto', mt: 5 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Documentos subidos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre de archivo</th>
                      <th>Archivo</th>
                      <th>Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listarDocumentos.map((documento) => (
                      <tr key={documento.iud}>
                        <td>{documento.iud}</td>
                        <td>{documento.nombre_archivo}</td>
                        <td>
                          {documento.pdf && (
                            <a href={`http://localhost:8080/api/documentos/archivos/modulo/${documento.iud}`} target="_blank" rel="noopener noreferrer">
                              Ver PDF
                            </a>
                          )}
                          {documento.xlsx && (
                            <a href={`http://localhost:8080/api/documentos/archivos/modulo/${documento.iud}`} target="_blank" rel="noopener noreferrer">
                              Ver XLSX
                            </a>
                          )}
                          {documento.docx && (
                            <a href={`http://localhost:8080/api/documentos/archivos/modulo/${documento.iud}`} target="_blank" rel="noopener noreferrer">
                              Ver DOCX
                            </a>
                          )}
                        </td>
                        <td>{documento.descripcion}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={enviarMenu} size="small">Menu</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </body>
      </html>
    </>
  )
}
