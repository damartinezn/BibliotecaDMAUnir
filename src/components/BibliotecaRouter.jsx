import React from "react";
import { NotFound } from "../components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaLibros from "../views/ListaLibros";
import Libro from "./Libro";
import Login from "../views/Login";
import Busqueda from "../views/Busqueda"
import AlquilarLibro from "./AlquilarLibro";

export const BibliotecaRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Busqueda />} />
                <Route exact path="/libro" element={<ListaLibros />} />
                <Route exact path="/libro/save" element={<Libro />} />
                <Route exact path="/libro/edit/:item" element={<Libro />} />
                <Route exact path="/libro/delete/:item" element={<Libro />} />
                <Route exact path="/libro/:item" element={<AlquilarLibro />} />
                <Route caseSensitive path="/login/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
