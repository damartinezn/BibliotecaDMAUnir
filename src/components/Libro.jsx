import { React, useEffect, useState } from 'react'
import Boton from './Boton';
import Input from './Input';
import { useLocation, useNavigate, useParams } from 'react-router';
import { agregarLibro, consultaLibrosByIsbn13, editarLibro, eliminarLibro } from '../services/LibrosService';
import Alertas from './Alertas';
import Imagen from './Imagen';
import useSessionStorage from '../hooks/useSessionStorage';

export default function Libro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [isbn10, setIsbn10] = useState('');
    const [sinopsis, setSipnosis] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [imagen, setImagen] = useState('');
    const [anioPublicacion, setAnioPublicacion] = useState('');
    const [editorial, setEditorial] = useState('');
    const [nameButton, setButton] = useState('GUARDAR');
    const [mensajeError, setMensajeError] = useState('');
    const [logueado, setLogin] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    let rutaEventosConLibro = useNavigate();
    const [libroStorage, setlibroStorage] = useSessionStorage('libros', []);

    useEffect(() => {
        let valor = sessionStorage.getItem("login") === 'true' ? true : false;
        setLogin(valor)
    }, []);

    let navigateClose = useNavigate();
    let paramsEnviados = useParams();
    let location = useLocation();
    let currentPath = location.pathname;

    useEffect(() => {
        if (paramsEnviados !== undefined && paramsEnviados.item !== undefined) {
            try {
                let auxLibro = consultaLibrosByIsbn13(paramsEnviados.item, libroStorage);
                setTitulo(auxLibro[0].titulo);
                setAutor(auxLibro[0].autor);
                setIsbn13(auxLibro[0].isbn13);
                setIsbn10(auxLibro[0].isbn10);
                setSipnosis(auxLibro[0].sipnosis);
                setCantidad(auxLibro[0].cantidad);
                setAnioPublicacion(auxLibro[0].anioPublicacion);
                setEditorial(auxLibro[0].editorial);
                setImagen(auxLibro[0].imagen);
            } catch (error) {
                rutaEventosConLibro('/libro');
            }
        } else {
            valorNulos();
        }
    }, [paramsEnviados]);

    const handleSubmit = (event) => {
        if (currentPath && logueado) {
            if (currentPath.indexOf('edit') !== -1) {
                if (validacionesForm()) {
                    try {
                        let libroEditado = editarLibro(titulo, autor, isbn13, isbn10,
                            imagen, sinopsis, parseInt(cantidad),
                            parseInt(anioPublicacion), editorial, isbn13, libroStorage);
                        setlibroStorage(libroEditado)
                        rutaEventosConLibro('/libro');
                    } catch (error) {
                        setMensaje(true);
                        setMensajeError('Ocurrió un error al editar el libro !!  ');
                    }
                }
            } else if (currentPath.indexOf('delete') !== -1) {
                try {
                    let eliminado = eliminarLibro(isbn13, libroStorage);
                    setlibroStorage(eliminado)
                    rutaEventosConLibro('/libro');
                } catch (error) {
                    setMensaje(true);
                    setMensajeError('Ocurrió un error al eliminar el libro !!  ');
                }
            } else if (currentPath.indexOf('/save') !== -1) {
                if (validacionesForm()) {
                    try {
                        let librosGuardar = agregarLibro(titulo, autor, isbn13, isbn10,
                            imagen, sinopsis, parseInt(cantidad),
                            parseInt(anioPublicacion), editorial, libroStorage);
                        setlibroStorage(librosGuardar)
                        rutaEventosConLibro('/libro');
                    } catch (error) {
                        setMensaje(true);
                        setMensajeError('Ocurrió un error al agregar el libro !!  ');
                    }
                }
            }
        }
        if (!logueado) {
            setMensaje(true);
            setMensajeError('No inició sesión para realizar una acción con los libros !!  ');
        }
        eliminarMensaje();
        event.preventDefault();
    };

    const validacionesForm = () => {
        let retornar = true;
        if (!imagen.includes('http')) {
            setMensajeError('Debe ingresar una url con la portada del libro !!! ');
            setMensaje(true);
            retornar = false;
        }
        if (parseInt(cantidad) <= 0) {
            setMensajeError('Debe ingresar una cantidad que sea mayor a cero !!! ');
            setMensaje(true);
            retornar = false;
        }
        if (parseInt(anioPublicacion) <= 1000) {
            setMensajeError('Debe ingresar un año que sea mayor a mil !!! ');
            setMensaje(true);
            retornar = false;
        }
        return retornar;
    }

    const valorNulos = () => {
        setTitulo("");
        setAutor("");
        setIsbn13("");
        setIsbn10("");
        setSipnosis("");
        setCantidad("");
        setAnioPublicacion("");
        setEditorial("");
    }

    useEffect(() => {
        if (currentPath) {
            if (currentPath.indexOf('edit') !== -1) {
                setButton('Editar');
            } else if (currentPath.indexOf('delete') !== -1) {
                setButton('Eliminar');
            } else if (currentPath.indexOf('/save') !== -1) {
                setButton('Guardar');
            }
        }
    }, [currentPath])

    const eliminarMensaje = () => {
        setTimeout(() => {
            setMensaje(false);
        }, 5000);
    }

    return (
        <div className=''>
            <form className='row g-3 needs-validation text-start' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-6">
                        <Input label="Titulo:" type="text" name="titulo" value={titulo} onChange={({ target }) => setTitulo(target.value)} desabilitar={nameButton === 'Eliminar' ? true : undefined} />
                    </div>
                    <div className="col-6">
                        <Input label="Autor:" type="text" name="autor" value={autor} onChange={({ target }) => setAutor(target.value)} desabilitar={nameButton === 'Eliminar' ? true : undefined} />
                    </div>
                    <div className="col-6">
                        <Input label="Isbn 13:" type="text" name="isbn13" value={isbn13} onChange={({ target }) => setIsbn13(target.value)} desabilitar={nameButton === 'Editar' || nameButton === 'Eliminar' ? true : undefined} />
                    </div>
                    <div className="col-6">
                        <Input label="Isbn 10:" type="text" name="isbn10" value={isbn10} onChange={({ target }) => setIsbn10(target.value)} desabilitar={nameButton === 'Editar' || nameButton === 'Eliminar' ? true : undefined} />
                    </div>
                    <div className="col-6">
                        <Input label="Cantidad:" type="number" name="cantidad" value={cantidad} onChange={({ target }) => setCantidad(target.value)} desabilitar={nameButton === 'Eliminar' ? true : undefined} />
                    </div>
                    <div className="col-6">
                        <Input label="Año publicación:" type="number" name="anioPublicacion" value={anioPublicacion} onChange={({ target }) => setAnioPublicacion(target.value)} desabilitar={nameButton === 'Eliminar' ? true : undefined} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="sinopsis" className="form-label">Sinopsis:</label>
                        {nameButton === 'Eliminar' ? <textarea className="form-control" id="sinopsis" rows="2" value={sinopsis} onChange={({ target }) => setSipnosis(target.value)} disabled /> :
                            <textarea className="form-control" id="sinopsis" rows="2" value={sinopsis} onChange={({ target }) => setSipnosis(target.value)} />}
                    </div>
                    <div className="col-6">
                        <label htmlFor="editorial" className="form-label">Editorial:</label>
                        {nameButton === 'Eliminar' ? <textarea className="form-control" id="editorial" rows="2" value={editorial} onChange={({ target }) => setEditorial(target.value)} disabled /> :
                            <textarea className="form-control" id="editorial" rows="2" value={editorial} onChange={({ target }) => setEditorial(target.value)} />
                        }
                    </div>
                    <div className="col-6">
                        <Input label="Imagen:" type="text" name="imagen" value={imagen} onChange={({ target }) => setImagen(target.value)} desabilitar={nameButton === 'Eliminar' ? true : undefined} />
                    </div>
                    <div className="col-6"></div>
                    <div className="d-grid gap-2 col-6 mx-auto mt-4">
                        <Boton type="submit" label={nameButton} clase={nameButton === 'Guardar' ? 'btn btn-sm btn-secondary' : nameButton === 'Editar' ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-danger'}></Boton>
                    </div>
                </div>
            </form>
            {
                mensaje ? <Alertas clase='alert alert-warning m-2 p-1' mensaje={mensajeError}></Alertas> : <></>
            }
            <div className="d-grid gap-2 col-2 mt-4">
                <Boton type="close" label="Cancelar" clase='btn btn-sm btn-primary' onClick={() => navigateClose("/libro")}></Boton>
            </div>
            {
                imagen !== undefined && imagen.length > 0 ? <Imagen ruta={imagen} alt={autor} clase='imagenAlquilar'></Imagen> : <></>
            }
        </div>
    )
}