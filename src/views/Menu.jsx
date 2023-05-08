import React from 'react'
import '../styles/StyleImagen.css';

export default function Menu() {

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
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}