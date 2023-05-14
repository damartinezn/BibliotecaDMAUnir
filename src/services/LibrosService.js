import { Libro } from '../models/Libro';
const librosJson = require('../data/dataLibro.json');

let librosRecuperados = librosJson.libros;
let leer = window.sessionStorage.getItem('libros')
if (leer === undefined) {
    window.sessionStorage.setItem('libros', JSON.stringify(librosRecuperados));
}

export const consultaLibros = () => {
    let libros = recuperarLibros();
    librosRecuperados = libros !== undefined && libros !== null ? libros: librosRecuperados
    return librosRecuperados.map(libro =>
        new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
            libro.imagen, libro.sipnosis, libro.criticas, libro.cantidad,
            libro.anioPublicacion, libro.genero, libro.editorial))
};

export const consultaLibrosNombre = (nombreBuscar) => {
    let libros = recuperarLibros();
    librosRecuperados = libros !== undefined && libros !== null ? libros: librosRecuperados
    return librosRecuperados.filter(item => item.titulo.toLowerCase().includes(nombreBuscar.toLowerCase())).map(libro =>
        new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
            libro.imagen, libro.sipnosis, libro.criticas, libro.cantidad,
            libro.anioPublicacion, libro.genero, libro.editorial));
}

export const filtraCategoriaLibros = () => {
    let libros = recuperarLibros();
    librosRecuperados = libros !== undefined && libros !== null ? libros: librosRecuperados
    let categorias = librosRecuperados.map(libro => libro.genero);
    return categorias.filter((genero, index) => {
        return index === categorias.findIndex(obj => obj.id === genero.id);
    });
}

export const consultaLibrosByIsbn13 = (isbn13Buscar) => {
    let libros = recuperarLibros();
    librosRecuperados = libros !== undefined && libros !== null ? libros: librosRecuperados
    return librosRecuperados.filter(item => item.isbn13 === isbn13Buscar).map(libro =>
        new Libro(libro.titulo, libro.autor, libro.isbn13, libro.isbn10,
            libro.imagen, libro.sipnosis, libro.criticas, libro.cantidad,
            libro.anioPublicacion, libro.genero, libro.editorial));
}

export const alquilarLibro = (isbn13Alquilar) => {
    let libros = recuperarLibros();
    librosRecuperados = libros !== undefined && libros !== null ? libros: librosRecuperados
    for (let index = 0; index < librosRecuperados.length; index++) {
        if (librosRecuperados[index].isbn13 === isbn13Alquilar) {
            librosRecuperados[index].cantidad = (librosRecuperados[index].cantidad - 1)
        }
    }
    window.sessionStorage.setItem('libros', JSON.stringify(librosRecuperados));
}

export const agregarLibro = (titulo, autor, isbn13, isbn10,
    imagen, sipnosis, cantidad,
    anioPublicacion, editorial) => {
    let auxLibri = new Libro(titulo, autor, isbn13, isbn10,
        imagen, sipnosis, null, cantidad,
        anioPublicacion, null, editorial);
    librosRecuperados.push(auxLibri);
    window.sessionStorage.removeItem('libros');
    window.sessionStorage.setItem('libros', JSON.stringify(librosRecuperados));
}


const recuperarLibros=()=>{
    let objetoJSON = window.sessionStorage.getItem('libros');
    let objeto = undefined;
    if (objetoJSON !== undefined && objetoJSON !== null) {
        objeto = JSON.parse(objetoJSON);
    }
    return objeto
}