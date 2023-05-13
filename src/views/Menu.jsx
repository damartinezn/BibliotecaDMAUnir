import { React, useEffect, useState } from 'react'
import '../styles/StyleImagen.css';
import Boton from '../components/Boton';

export default function Menu() {
    const [logueado, setLogin] = useState(false);

    const handleLogout = (event) => {
        console.log('TEST     ---------------')
        // Actualizar el estado de autenticación al hacer logout
        sessionStorage.setItem("login", false);
        //console.log(isAuthenticated)
        console.log('TEST     ---------------')
    };

    useEffect(() => {
        console.log('*************************/*******************')
        // Update the state
        let valor = sessionStorage.getItem("login");
        setLogin(valor)
        console.log(valor , ' --------------------------')
    }, []);

    return (
        <div>
            <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand mb-0 h1" href="/">Mi Bilioteca</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <a className="nav-link" aria-current="page" href="/">Libro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/libro">Lista Libros</a>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            {logueado == true  ?
                                <Boton type="submit"
                                    label='Cerrar Sesión'
                                    clase='btn btn-sm btn-outline-primary p-0 text-dark nav-link'
                                    onClick={handleLogout}></Boton> :
                                <a className="nav-link" href="/login">Login</a>
                            }
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}