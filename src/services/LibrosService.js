import { Libro } from '../models/Libro';
const librosJson = require('../data/dataLibro.json');

export const consultaLibros = librosJson.libros.map(libro =>
    new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
        libro.imagen, libro.sipnosis, libro.criticas, libro.antidad,
        libro.anioPublicacion, libro.genero, libro.editorial));

export const consultaLibrosNombre = (nombreBuscar) => { 
    return librosJson.libros.filter(item => item.titulo === nombreBuscar).map(libro =>
    new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
        libro.imagen, libro.sipnosis, libro.criticas, libro.antidad,
        libro.anioPublicacion, libro.genero, libro.editorial));
}

export const filtraCategoriaLibros = () =>{
    let categorias =  librosJson.libros.map(libro => libro.genero);
    return  categorias.filter((genero, index) => {
        return index === categorias.findIndex(obj => obj.id === genero.id);
    });
}