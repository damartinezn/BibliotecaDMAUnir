import { React, useEffect, useState } from 'react'
import Boton from './Boton';
import Input from './Input';
import { useLocation, useNavigate, useParams } from 'react-router';
import { consultaLibrosByIsbn13 } from '../services/LibrosService';
import Alertas from './Alertas';

export default function Libro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [isbn10, setIsbn10] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [anioPublicacion, setAnioPublicacion] = useState('');
    const [editorial, setEditorial] = useState('');
    const [nameButton, setButton] = useState('GUARDAR');
    const [logueado, setLogin] = useState(false);
    const [mensaje, setMensaje] = useState(false);

    useEffect(() => {
        let valor = sessionStorage.getItem("login") === 'true' ? true: false;
        setLogin(valor)
    }, []);

    let navigateClose = useNavigate();
    let paramsEnviados = useParams();
    let location = useLocation();
    let currentPath = location.pathname;

    useEffect(() => {
        if (paramsEnviados !== undefined && paramsEnviados.item !== undefined) {
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
        cambiarNameButton();
    }, [paramsEnviados]);

    const handleSubmit = (event) => {
        
        if (currentPath && logueado) {
            if (currentPath.indexOf('edit') !== -1) {
                console.log('EDITAR');
            } else if (currentPath.indexOf('delete') !== -1) {
                console.log('ELIMINAR');
            } else if (currentPath.indexOf('/save') !== -1) {
                console.log('GUARDAR');
            }
        }
        if (!logueado) {
            setMensaje(true);
        }
        event.preventDefault();
    };

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

    const cambiarNameButton = () => {
        if (currentPath) {
            if (currentPath.indexOf('edit') !== -1) {
                setButton('Editar');
            } else if (currentPath.indexOf('delete') !== -1) {
                setButton('Eliminar');
            } else if (currentPath.indexOf('/save') !== -1) {
                setButton('Guardar');
            }
        }
    }

    return (
        <div className=''>
            <form className='row g-3 needs-validation text-start' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-6">
                        <Input label="Titulo:" type="text" name="titulo" value={titulo} onChange={({ target }) => setTitulo(target.value)} />
                    </div>
                    <div className="col-6">
                        <Input label="Autor:" type="text" name="autor" value={autor} onChange={({ target }) => setAutor(target.value)} />
                    </div>
                    <div className="col-6">
                        <Input label="Isbn 13:" type="text" name="isbn13" value={isbn13} onChange={({ target }) => setIsbn13(target.value)} />
                    </div>
                    <div className="col-6">
                        <Input label="Isbn 10:" type="text" name="isbn10" value={isbn10} onChange={({ target }) => setIsbn10(target.value)} />
                    </div>
                    <div className="col-6">
                        <Input label="Cantidad:" type="text" name="cantidad" value={cantidad} onChange={({ target }) => setCantidad(target.value)} />
                    </div>
                    <div className="col-6">
                        <Input label="Año publicación:" type="text" name="anioPublicacion" value={anioPublicacion} onChange={({ target }) => setAnioPublicacion(target.value)} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="sipnosis" className="form-label">Sipnosis:</label>
                        <textarea className="form-control" id="sipnosis" rows="2" value={sipnosis} onChange={({ target }) => setSipnosis(target.value)} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="editorial" className="form-label">Editorial:</label>
                        <textarea className="form-control" id="editorial" rows="2" value={editorial} onChange={({ target }) => setEditorial(target.value)} />
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto mt-4">
                        <Boton type="submit" label={nameButton} clase={nameButton == 'Guardar' ? 'btn btn-sm btn-secondary' : nameButton == 'Editar' ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-danger'}></Boton>
                    </div>
                </div>
            </form>
            {
                mensaje ? <Alertas clase='alert alert-warning m-2 p-1' mensaje='No inició sesión  !! '></Alertas> : <></>
            }
            <div className="d-grid gap-2 col-2 mt-4">
                <Boton type="close" label="Cancelar" clase='btn btn-sm btn-primary' onClick={() => navigateClose("/libro")}></Boton>
            </div>
        </div>
    )
}