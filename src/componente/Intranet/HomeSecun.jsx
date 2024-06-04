import React from 'react'

function ProcesosMi() {
  return (
        <>

<html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Procesos</title>
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
                        <MenuItem onClick={enviarListar} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Adminsitrativa
                        </MenuItem>
                        <MenuItem onClick={enviarListar} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Talento Humano
                        </MenuItem>
                        <MenuItem onClick={enviarListar} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Tecnologia e informacion
                        </MenuItem>
                        <MenuItem onClick={enviarListar} disableRipple>
                            <FolderOpenIcon onClick={enviarListar} />
                           Gestion Juridica
                        </MenuItem>
                    </StyledMenu>

                </body>
            </html>
        </>
  )
}

export default ProcesosMi
