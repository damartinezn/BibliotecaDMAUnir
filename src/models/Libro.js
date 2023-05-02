import { Critica } from "./Critica";
import { Genero } from "./Genero";

export class Libro {
    constructor(titulo, autor, isbn13, isbn10, imagen, sipnosis, criticas, cantidad, anioPublicacion, genero, editorial) {
        this.titulo          = titulo;
        this.autor           = autor;
        this.anioPublicacion = anioPublicacion;
        this.editorial       = editorial;
        this.criticas        = new Critica(criticas);
        this.isbn13          = isbn13;
        this.isbn10          = isbn10;
        this.imagen          = imagen;
        this.sipnosis        = sipnosis;
        this.cantidad        = cantidad;
        this.genero          = new Genero(genero)
    }
}
