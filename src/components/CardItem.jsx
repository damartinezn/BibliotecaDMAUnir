import React from 'react'
import Imagen from './Imagen'
import { NavLink } from 'react-router-dom';

export default function CardItem(props) {

    return (
        <div className="col">
            <div className="card shadow-sm p-2 mb-1 bg-body-tertiary">
                <div className='image-container'>
                    <Imagen ruta={props.imagen} alt={props.autor} clase='img-thumbnail w-100 h-50 '></Imagen>
                </div>
                <NavLink className='btn btn-outline-primary' to={`/libro/${props.isbn13}`}  >Alquilar</NavLink>
            </div>
        </div>
    )
}


