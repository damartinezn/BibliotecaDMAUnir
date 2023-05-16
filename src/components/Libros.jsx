import { React, useState, useEffect } from 'react'
import Boton from './Boton';
import { useNavigate } from 'react-router';
import useSessionStorage from '../hooks/useSessionStorage';

export default function Libros() {
    const [libros, setLibros] = useState([]);
    let navigateEditLibro = useNavigate();
    let navigateNewLibro = useNavigate();
    const [libroStorage, setibroStorage] = useSessionStorage('libros', []);

    useEffect(() => {
        setLibros(libroStorage)
    }, []);

    const handleEditNavigation = ( item) => {
        if (item !== undefined) {
            navigateEditLibro(`/libro/edit/${item}`);
        }
    }

    const handleDeleteNavigation = ( item) => {
        if (item !== undefined) {
            navigateEditLibro(`/libro/delete/${item}`);
        }
    }

    return (
        <>
            <div className='text-start'>
                <Boton type="submit" label="Nuevo" clase='btn btn-primary' onClick={() => navigateNewLibro("/save")}></Boton>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">isbn13</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((item) => (
                        <tr key={item.isbn13}>
                            <th scope="row">{item.isbn13}</th>
                            <td>{item.titulo}</td>
                            <td>{item.autor}</td>
                            <td>{item.cantidad}</td>
                            <td>
                                <Boton type="submit" label="Editar" clase='btn btn-sm btn-primary m-2' onClick={() =>handleEditNavigation(item.isbn13)} ></Boton>
                                <Boton type="submit" label="Eliminar" clase='btn  btn-sm btn-danger m-2' onClick={() =>handleDeleteNavigation(item.isbn13)} ></Boton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}