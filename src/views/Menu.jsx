import { React, useContext, useEffect, useState } from 'react'
import '../styles/StyleImagen.css';
import Boton from '../components/Boton';
import { GeoContext } from '../components/GeoContext';

export default function Menu() {
    const [logueado, setLogin] = useState(false);
    const { value, changeValue } = useContext(GeoContext);

    const handleLogout = (event) => {
        // Actualizar el estado de autenticación al hacer logout
        window.sessionStorage.removeItem("login");
        window.sessionStorage.removeItem("loginInfo");
        setLogin(true);
        changeValue('Bienvenido ');
        event.preventDefault();
    };

    useEffect(() => {
        let valor = sessionStorage.getItem("login") === 'true' ? true : false;
        setLogin(valor)
    }, []);

    useEffect(() => {
        let valor = sessionStorage.getItem("login") === 'true' ? true : false;
        setLogin(valor)
        let objetoJSON = window.sessionStorage.getItem('loginInfo');
        if (objetoJSON !== undefined && objetoJSON !== null) {
            objetoJSON = JSON.parse(objetoJSON);
            changeValue(objetoJSON[0].nombre)
        }
        valor = sessionStorage.getItem("login") === 'true' ? true : false;
        setLogin(valor)
    }, []);

    return (
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
                    <label className="nameUser" ><span > {value} </span><i class="bi bi-person-circle"></i></label>
                    <span className="navbar-text">
                        {logueado === true ?
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
    )
}