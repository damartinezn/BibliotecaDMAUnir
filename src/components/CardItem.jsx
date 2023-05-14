import React from 'react'
import Imagen from './Imagen'
import { NavLink } from 'react-router-dom';

export default function CardItem(props) {

    return (
        <div className="col shadow-sm p-2 mb-1 bg-body-tertiary rounded">
            <div className="card h-100 ">
                <Imagen ruta={props.imagen} alt='imagen login' clase='img-thumbnail w-100 h-50' />
                <div className="card-body text-start">
                    <h6 className="card-title "><span className='fw-bolder'>Titulo: </span>{props.title}</h6>
                    <p className="lh-sm fs-6 text-primary"><span className='fw-bolder text-dark'>Sinopsis: </span>{props.sipnosis}</p>
                    <small className="text-body-secondary fs-6"><span className='fw-bolder text-dark'>Autor: </span>{props.autor}</small>
                </div>
                <div className="card-footer">
                    <NavLink className='btn btn-outline-primary' to={`/libro/${props.isbn13}`}  >Alquilar</NavLink>
                </div>
            </div>
        </div>
    )
}


