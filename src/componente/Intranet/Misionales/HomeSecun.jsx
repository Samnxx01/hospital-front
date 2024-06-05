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


function ProcesosMi() {

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
        navigate('/Asistencial');
    };
    const enviarListarAdm = () => {
        navigate('/Hospitalizacion');
    };
    const enviarListarTalen = () => {
        navigate('/Urgencias');
    };
    const enviarListarTecno = () => {
        navigate('/Promocion');
    };
    const enviarListarTerapia = () => {
        navigate('/Terapia');
    };
    const enviarListarRiesgo = () => {
        navigate('/Riesgo');
    };


    return (
        <>

            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Misionales</title>
                </head>
                <body>
                    <Narvbar />
                    <h2 style={{ display: 'flex', justifyContent: 'center' }}>Listando las carpetas</h2>

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
                            Gestion Asistencial Ambulatorio
                        </MenuItem>
                        <MenuItem onClick={enviarListarAdm} disableRipple>
                            <FolderOpenIcon onClick={enviarListarAdm} />
                            Gestion Hospitalizacion y partos
                        </MenuItem>
                        <MenuItem onClick={enviarListarTalen} disableRipple>
                            <FolderOpenIcon onClick={enviarListarTalen} />
                            Gestion de urgencias
                        </MenuItem>
                        <MenuItem onClick={enviarListarTecno} disableRipple>
                            <FolderOpenIcon onClick={enviarListarTecno} />
                            Gestion promocion y prevencion
                        </MenuItem>
                        <MenuItem onClick={enviarListarTerapia} disableRipple>
                            <FolderOpenIcon onClick={enviarListarTerapia} />
                            Gestion de ayudas diagnostico y terapautica
                        </MenuItem>
                        <MenuItem onClick={enviarListarRiesgo} disableRipple>
                            <FolderOpenIcon onClick={enviarListarRiesgo} />
                            Gestion administracion del riesgo
                        </MenuItem>
                    </StyledMenu>

                </body>
            </html>
        </>
    )
}

export default ProcesosMi
