import { React, useEffect, useState } from 'react'
import Boton from './Boton';
import { useParams } from 'react-router';
import { consultaLibrosByIsbn13 } from '../services/LibrosService';
import Imagen from './Imagen';
import { NavLink } from 'react-router-dom';
import Alertas from './Alertas';

export default function AlquilarLibro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [editorial, setEditorial] = useState('');
    const [mensaje, setMensaje] = useState(undefined);

    let paramsEnviados = useParams();

    useEffect(() => {
        if (paramsEnviados !== undefined && paramsEnviados.item !== undefined) {
            let auxLibro = consultaLibrosByIsbn13(paramsEnviados.item);
            setTitulo(auxLibro[0].titulo);
            setAutor(auxLibro[0].autor);
            setIsbn13(auxLibro[0].isbn13);
            setSipnosis(auxLibro[0].sipnosis);
            setCantidad(auxLibro[0].cantidad);
            setEditorial(auxLibro[0].editorial);
        } else {
            valorNulos();
        }
    }, [paramsEnviados]);


    const handleSubmit = (event) => {
        let random = Math.floor(Math.random() * 10) + 1;
        setMensaje((random % 2 === 0 ? true: false));
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
        <div className=''>
            <form className='row g-3 needs-validation text-start' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-12 text-center">
                        <label htmlFor={titulo} className="form-label fw-bolder fs-2">{titulo}</label>
                    </div>
                    <div className="col-6">
                        <label htmlFor={autor} className="form-label"><span className='fw-bolder'>Autor: </span>{autor}</label>
                        <div></div>
                        <label htmlFor={isbn13} className="form-label"><span className='fw-bolder'>Isbn13: </span>{isbn13}</label>
                        <div></div>
                        <label htmlFor={cantidad} className="form-label"><span className='fw-bolder'>Disponible: </span>{cantidad}</label>
                        <div></div>
                        <label htmlFor={sipnosis} className="form-label"><span className='fw-bolder'>Sipnosis: </span>{sipnosis}</label>
                        <div></div>
                        <label htmlFor={editorial} className="form-label"><span className='fw-bolder'>Editorial: </span>{editorial}</label>
                    </div>
                    <div className="col-6 text-center">
                        <Imagen ruta='iconDos.png' alt='imagen login' clase='img-thumbnail' />
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto mt-4">
                        <Boton type="submit" label='Confirmar' clase='btn btn-sm btn-secondary'></Boton>
                    </div>
                    {
                        mensaje ? <Alertas clase='alert alert-success m-1 p-1' mensaje='Se realizó el alquiler del libro !! '></Alertas> 
                        : mensaje === false ? <Alertas clase='alert alert-warning m-1 p-1' mensaje='Error al alquilar el libro !! '></Alertas> : <></>
                    }   
                </div>
            </form>
            <div className="d-grid gap-2 col-2 mt-4">
                <NavLink className='btn btn-sm btn-outline-primary' to="/">Regresar</NavLink>
            </div>
        </div>
    )
}