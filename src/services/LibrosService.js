import { Libro } from '../models/Libro';
const librosJson = require('../data/dataLibro.json');

let librosRecuperados = librosJson.libros;
window.localStorage.setItem('libros', JSON.stringify(librosRecuperados));

export const consultaLibros = librosRecuperados.map(libro =>
    new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
        libro.imagen, libro.sipnosis, libro.criticas, libro.cantidad,
        libro.anioPublicacion, libro.genero, libro.editorial));

export const consultaLibrosNombre = (nombreBuscar) => {
    return librosRecuperados.filter(item => item.titulo.toLowerCase().includes(nombreBuscar.toLowerCase())).map(libro =>
        new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
            libro.imagen, libro.sipnosis, libro.criticas, libro.cantidad,
            libro.anioPublicacion, libro.genero, libro.editorial));
}

export const filtraCategoriaLibros = () => {
    let categorias = librosRecuperados.map(libro => libro.genero);
    return categorias.filter((genero, index) => {
        return index === categorias.findIndex(obj => obj.id === genero.id);
    });
}

export const consultaLibrosByIsbn13 = (isbn13Buscar) => {
    return librosRecuperados.filter(item => item.isbn13 === isbn13Buscar).map(libro =>
        new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
            libro.imagen, libro.sipnosis, libro.criticas, libro.cantidad,
            libro.anioPublicacion, libro.genero, libro.editorial));
}

export const alquilarLibro = (isbn13Alquilar) => {
    for (let index = 0; index < librosRecuperados.length; index++) {
        if (librosRecuperados[index].isbn13 === isbn13Alquilar) {
            librosRecuperados[index].cantidad = (librosRecuperados[index].cantidad - 1)
        }
    }
}


