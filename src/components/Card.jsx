import { React, useState, useEffect } from 'react'
import CardItem from './CardItem'
import useSessionStorage from '../hooks/useSessionStorage';

export default function Card(props) {
    const [libros, setLibros] = useState([]);
    const [libroStorage, setlibroStorage] = useSessionStorage('libros', []);

    useEffect(() => {
        if(Object.keys(props.libros).length ===  0 || Object.keys(props.libros).length ===  undefined){
            setLibros(libroStorage)
            setlibroStorage(libroStorage)
        }else{
            setLibros([])
            setLibros(props.libros);
        }
    }, [props]);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
            {libros.map((item) => (
                <CardItem imagen={item.imagen}
                    title={item.titulo}
                    sipnosis={item.sipnosis}
                    autor={item.autor}
                    isbn13={item.isbn13}
                    cantidad={item.cantidad}
                    criticas={item.criticas}
                    key={item.isbn13}></CardItem>
            ))}
        </div>
    )
}
