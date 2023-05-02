import React from 'react'

export default function Imagen(props) {
    return (
        <img src={require(`../img/${props.ruta}`)} alt={props.alt} className={props.clase}></img>
    );
}


