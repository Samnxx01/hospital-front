import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Calidad from './Financiera/Listarcalidad'
import { useNavigate } from 'react-router-dom';
import Narvbar from '../../../Narvbar/Narvbar'

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));



export default function listarDocumentos() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const enviarListar = () => {
        navigate('/ListarFinanciero');
    };
    const enviarListarAdm = () => {
        navigate('/ListarAdministrativa');
    };
    const enviarListarTalen = () => {
        navigate('/ListarTalento');
    };
    const enviarListarTecno = () => {
        navigate('/ListarTecnologia');
    };
    const enviarListarJuri = () => {
        navigate('/ListarJuridica');
    };

    




    /*  useEffect(() => {
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
      }, [archivosDb]);*/
    return (
        <>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Financiera</title>
                </head>
                <body>
                <Narvbar/>
                    <h2 style={{ display: 'flex', justifyContent: 'center' }}>Aqui vamos a listar los documentos</h2>
                  
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Elige la carpeta
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={enviarListar} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                            Gestion Financiera
                        </MenuItem>
                        <MenuItem onClick={enviarListarAdm} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Adminsitrativa
                        </MenuItem>
                        <MenuItem onClick={enviarListarTalen} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Talento Humano
                        </MenuItem>
                        <MenuItem onClick={enviarListarTecno} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Tecnologia e informacion
                        </MenuItem>
                        <MenuItem onClick={enviarListarJuri } disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Juridica
                        </MenuItem>
                    </StyledMenu>

                </body>
            </html>

        </>
    )
}
