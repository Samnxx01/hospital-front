import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from 'react-bootstrap/Table';

export default function Listarcalidad() {

    const [listarDocumentos, setListarDocumentos] = useState([]);

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
     
    return (
        <>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Calidad</title>
                </head>
                <body>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Table striped bordered hover>
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
                                            <tr key={documento._id}>
                                                <td>{documento._id}</td>
                                                <td>{documento.nombre_archivo}</td>
                                                <td>
                                                    {documento.pdf ? <a href={`http://localhost:8080/api/documentos/archivos/modulo${documento.pdf}`} target="_blank" rel="noopener noreferrer">Ver PDF</a> : null}
                                                    {documento.xlsx ? <a href={`http://localhost:8080/api/documentos/archivos/modulo${documento.xlsx}`} target="_blank" rel="noopener noreferrer">Ver XLSX</a> : null}
                                                    {documento.docx ? <a href={`http://localhost:8080/api/documentos/archivos/modulo${documento.docx}`} target="_blank" rel="noopener noreferrer">Ver DOCX</a> : null}
                                                </td>
                                                <td>{documento.descripcion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Hola mundo</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </body>
            </html>
        </>
    )
}

