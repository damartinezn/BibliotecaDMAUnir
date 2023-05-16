import { React, useEffect, useState } from 'react'
import Boton from './Boton';
import { useNavigate, useParams } from 'react-router';
import { alquilarLibro, consultaLibrosByIsbn13 } from '../services/LibrosService';
import { NavLink } from 'react-router-dom';
import Alertas from './Alertas';
import Imagen from './Imagen';
import Input from './Input';
import useSessionStorage from '../hooks/useSessionStorage';

export default function AlquilarLibro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [imagen, setImagen] = useState('');
    const [editorial, setEditorial] = useState('');
    const [mensaje, setMensaje] = useState(undefined);
    const [logueado, setLogin] = useState(false);
    const [mensajeDos, setMensajeDos] = useState(false);
    const [mensajeErrores, setMensajeErrores] = useState('');
    const [alquilar, setCantidadAlquiler] = useState([]);
    let paramsEnviados = useParams();
    let navigateLogin = useNavigate();
    const [libroStorage, setlibroStorage] = useSessionStorage('libros', []);

    useEffect(() => {
        let valor = sessionStorage.getItem("login") === 'true' ? true : false;
        setLogin(valor)
    }, []);

    useEffect(() => {
        if (paramsEnviados !== undefined && paramsEnviados.item !== undefined) {
            try {
                let auxLibro = consultaLibrosByIsbn13(paramsEnviados.item, libroStorage);
                setTitulo(auxLibro[0].titulo);
                setAutor(auxLibro[0].autor);
                setIsbn13(auxLibro[0].isbn13);
                setSipnosis(auxLibro[0].sipnosis);
                setCantidad(auxLibro[0].cantidad);
                setEditorial(auxLibro[0].editorial);
                setImagen(auxLibro[0].imagen)   
                setlibroStorage(libroStorage)
            } catch (error) {
                navigateLogin('/');   
            }
        } else {
            valorNulos();
        }
    }, [paramsEnviados]);


    const handleConfirmarAlquilerSubmit = (event) => {
        if (cantidad !== 0) {
            if (logueado) {
                try {
                    alquilarLibro(isbn13);
                    setMensaje(true);
                    setMensajeErrores('Se realizó el alquiler del libro !!')
                    setTimeout(() => {
                        navigateLogin("/");
                    }, 2000);
                } catch (error) {
                    setMensajeErrores('Ocurrió un error al realizar el proceso !!!');
                    setMensaje(false);
                }
            } else {
                setMensajeErrores('Debe iniciar sesión para realizar el alquiler de un libro   !!!');
                setMensajeDos(true)
            }
        } else {
            setMensajeErrores('No se tiene el libro en stock para alquilar, le invitamos a seleccionar otra opción ...');
            setMensaje(false);
            setTimeout(() => {
                navigateLogin("/");
            }, 1000);
        }
        event.preventDefault();
    };

    const valorNulos = () => {
        setTitulo("");
        setAutor("");
        setIsbn13("");
        setSipnosis("");
        setCantidad("");
        setEditorial("");
    }

    return (
        <div>
            <form className='row g-3 needs-validation text-start' onSubmit={handleConfirmarAlquilerSubmit}>
                <div className='row'>
                    <div className="col-12 text-center">
                        <label htmlFor={titulo} className="form-label fw-bolder fs-2">{titulo}</label>
                    </div>
                    <div className="col-6">
                        <label htmlFor={autor} className="form-label"><span className='fw-bolder'>Autor: </span>{autor}</label>
                        <div></div>
                        <label htmlFor={isbn13} className="form-label"><span className='fw-bolder'>Isbn13: </span>{isbn13}</label>
                        <div></div>
                        <label htmlFor={cantidad} className="form-label"><span className={cantidad === 0 ? 'fw-bolder text-danger' : 'fw-bolder'}>Disponible: {cantidad}</span></label>
                        <div></div>
                        <label htmlFor={sipnosis} className="form-label"><span className='fw-bolder'>Sipnosis: </span>{sipnosis}</label>
                        <div></div>
                        <label htmlFor={editorial} className="form-label"><span className='fw-bolder'>Editorial: </span>{editorial}</label>
                        <div className='row'>
                            <div className='col-6 fw-semibold'>
                                <Input label="Días a alquilar:" type="number" name="canAlquiler" value={alquilar} onChange={({ target }) => setCantidadAlquiler(target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <Imagen ruta={imagen} alt={autor} clase='imagenAlquilar' />
                    </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto mt-4">
                    <Boton type="submit" label='Confirmar' clase={cantidad !== 0 ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-warning'}></Boton>
                </div>
            </form>
            {
                mensaje ? <Alertas clase='alert alert-success m-1 p-1' mensaje={mensajeErrores}></Alertas>
                    : mensaje === false ? <Alertas clase='alert alert-warning m-1 p-1' mensaje={mensajeErrores}></Alertas> : <></>
            }
            {
                mensajeDos ? <Alertas clase='alert alert-warning m-1 p-1' mensaje={mensajeErrores}></Alertas> : <></>
            }
            <div className="d-grid gap-2 col-2 mt-4">
                <NavLink className='btn btn-sm btn-outline-primary' to="/">Regresar</NavLink>
            </div>
        </div>
    )
}