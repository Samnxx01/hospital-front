import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../Intranet/Modulo.css'
import Container from 'react-bootstrap/esm/Container';

export default function Modulo() {
  const [formData, setFormData] = useState({
    nombre_archivo: '',
    archivo: '',
    descripcion: ''
  });


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [imagen, setImagen] = useState(null);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };


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
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    const fetchImpresoras = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/inventario/listarcompu', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        // Ensure data has the expected structure and property
        if (data && data.listarIntranet) {
          setComputadores(data.listarIntranet);
        } else {
          console.error('la api no responde.');
          // Handle the case where the API data is missing or has an unexpected structure
        }
      } catch (error) {
        console.error('Error fetching impresoras:', error);
      }
    };

    fetchImpresoras();
  }, []);

  useEffect(() => {
    const obtenerArchivosPDF = async () => {
      try {
        const nuevosPDFs = [];
        const nuevasFaltas = [];
  
        for (const archivo of archivosDb) {
          const id = archivo._id;
          const response = await fetch(`http://localhost:8000/api/documentos/hospital/ArchivosSubidos/${id}`);
  
          if (response.ok) {
            const pdfBlob = await response.blob();
            const url = URL.createObjectURL(pdfBlob);
            nuevosPDFs.push({ url, nombre: archivo.nombre_archivo });
            nuevasFaltas.push(false);
          } else {
            nuevosPDFs.push(null);
            nuevasFaltas.push(true);
          }
        }
  
        setPDFURLs(nuevosPDFs);
        setPDFFaltas(nuevasFaltas);
      } catch (error) {
        console.error('Error al obtener los archivos PDF:', error);
      }
    };
  
    obtenerArchivosPDF();
  }, [archivosDb]);
  
  return (
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Intranet</title>
        </head>
        <body >
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
                <Form.Group  className="mb-3">
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

        </body>
      </html>
    </>
  )
}
