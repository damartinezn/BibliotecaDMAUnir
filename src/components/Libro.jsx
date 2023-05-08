import { React, useEffect, useState } from 'react'
import Boton from './Boton';
import Input from './Input';
import { useNavigate, useParams } from 'react-router';
import { consultaLibrosByIsbn13 } from '../services/LibrosService';

export default function Libro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [isbn10, setIsbn10] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [anioPublicacion, setAnioPublicacion] = useState('');
    const [editorial, setEditorial] = useState('');

    let navigateClose = useNavigate();
    const paramsEnviados = useParams();

    useEffect(() => {
        console.log("ESTAMOS EN CARD ", paramsEnviados.item, paramsEnviados.lenght)
        if ( paramsEnviados !== undefined && paramsEnviados.item !== undefined) {
            let auxLibro = consultaLibrosByIsbn13(paramsEnviados.item);
            setTitulo(auxLibro[0].titulo);
            setAutor(auxLibro[0].autor);
            setIsbn13(auxLibro[0].isbn13);
            setIsbn10(auxLibro[0].isbn10);
            setSipnosis(auxLibro[0].sipnosis);
            setCantidad(auxLibro[0].cantidad);
            setAnioPublicacion(auxLibro[0].anioPublicacion);
            setEditorial(auxLibro[0].editorial);
            
        } else {
            valorNulos();
        }
    }, [paramsEnviados]);

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
        event.preventDefault();
    };

    const handleAutorChange = (event) => {
        setAutor(event.target.value);
        event.preventDefault();
    };

    const handleAIsbn13Change = (event) => {
        setIsbn13(event.target.value);
        event.preventDefault();
    };
    const handleIsbn10Change = (event) => {
        setIsbn10(event.target.value);
        event.preventDefault();
    };
    const handleSipnosisChange = (event) => {
        setSipnosis(event.target.value);
        event.preventDefault();
    };
    const handleCantidadChange = (event) => {
        setCantidad(event.target.value);
        event.preventDefault();
    };
    const handleAnioPublicacionChange = (event) => {
        setAnioPublicacion(event.target.value);
        event.preventDefault();
    };
    const handleEditorialChange = (event) => {
        setEditorial(event.target.value);
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const valorNulos=()=>{
        setTitulo("");
        setAutor("");
        setIsbn13("");
        setIsbn10("");
        setSipnosis("");
        setCantidad("");
        setAnioPublicacion("");
        setEditorial("");
    }

    return (
        <div className=''>
            <form className='row g-3 needs-validation text-start' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-6">
                        <Input label="Titulo:" type="text" name="titulo" value={titulo} onChange={handleTituloChange} />
                    </div>
                    <div className="col-6">
                        <Input label="Autor:" type="text" name="autor" value={autor} onChange={handleAutorChange} />
                    </div>
                    <div className="col-6">
                        <Input label="Isbn 13:" type="text" name="isbn13" value={isbn13} onChange={handleAIsbn13Change} />
                    </div>
                    <div className="col-6">
                        <Input label="Isbn 10:" type="text" name="isbn10" value={isbn10} onChange={handleIsbn10Change} />
                    </div>
                    <div className="col-6">
                        <Input label="Cantidad:" type="text" name="cantidad" value={cantidad} onChange={handleCantidadChange} />
                    </div>
                    <div className="col-6">
                        <Input label="Año publicación:" type="text" name="anioPublicacion" value={anioPublicacion} onChange={handleAnioPublicacionChange} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="sipnosis" className="form-label">Sipnosis:</label>
                        <textarea className="form-control" id="sipnosis" rows="2" value={sipnosis} onChange={handleSipnosisChange} required ></textarea>
                    </div>
                    <div className="col-6">
                        <label htmlFor="editorial" className="form-label">Editorial:</label>
                        <textarea className="form-control" id="editorial" rows="2" value={editorial} onChange={handleEditorialChange} required ></textarea>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto mt-4">
                        <Boton type="submit" label="Guardar" clase='btn btn-sm btn-secondary'></Boton>
                    </div>
                </div>
            </form>
            <div className="d-grid gap-2 col-2 mt-4">
                <Boton type="close" label="Cancelar" clase='btn btn-sm btn-warning' onClick={() => navigateClose("/libro")}></Boton>
            </div>
        </div>
    )
}