import React from 'react'
import Imagen from './Imagen'

export default function CardItem(props) {
    return (
        <div className="col shadow-sm p-2 mb-1 bg-body-tertiary rounded">
            <div className="card h-100 ">
                <Imagen ruta={props.imagen} alt='imagen login' clase='img-thumbnail w-100 h-50' />
                <div className="card-body">
                    <h6 className="card-title fw-bold">{props.title}</h6>
                    <p className="lh-sm fs-6 text-primary">{props.sipnosis}</p>
                    <small className="text-body-secondary fs-6">{props.autor}</small>
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary fs-6">{props.autor}</small>
                </div>
            </div>
        </div>
    )
}


