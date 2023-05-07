import { React, useState, useEffect } from 'react'
import CardItem from './CardItem'
import { consultaLibros } from '../services/LibrosService';

export default function Card(props) {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        console.log("ESTAMOS EN CARD", Object.keys(props.libros).length, props.libros)
        if(Object.keys(props.libros).length ==  0 || Object.keys(props.libros).length ==  undefined){
            setLibros(consultaLibros)
        }else{
            setLibros([])
            setLibros(props.libros);
        }
    }, [props]);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
            {libros.map((item) => (
                <CardItem imagen='biblioteca.png'
                    title={item.titulo}
                    sipnosis={item.sipnosis}
                    autor={item.autor}
                    key={item.isbn13}></CardItem>
            ))}
        </div>
    )
}
