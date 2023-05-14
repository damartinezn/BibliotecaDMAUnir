import { React, useContext, useEffect, useState } from 'react'
import Input from '../components/Input'
import Imagen from '../components/Imagen';
import Boton from '../components/Boton';
import { consultaLoginUser } from '../services/LoginService';
import { useNavigate } from 'react-router';
import Alertas from '../components/Alertas';
import '../styles/StyleImagen.css'
import { GeoContext } from '../components/GeoContext';

export default function Login() {
    const [nombre, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [logueado, setLogin] = useState(false);
    let navigateLogin = useNavigate();
    const { value, changeValue } = useContext(GeoContext);

    const handleSubmit = (event) => {
        let auxLogin = consultaLoginUser(nombre, password, email);
        try { 
            Object.keys(auxLogin).length > 0 ? isUser() : notIsUser();
            changeValue(auxLogin[0].nombre);
            window.sessionStorage.setItem('loginInfo', JSON.stringify(auxLogin));
        } catch (error) {
            notIsUser()
        }
        resetValores();
        event.preventDefault();
    };

    const handleSubmitLogout = (event) => {
        resetValores();
        sessionStorage.setItem('login', false);
        window.sessionStorage.removeItem('loginInfo');
        changeValue('Bienvenido ');
        setLogin(!logueado);
        setAlerta(false);
        navigateLogin("/")
        event.preventDefault();
    }

    const resetValores = () => {
        setName('');
        setPassword('');
        setEmail('');
    }

    const isUser = () => {
        sessionStorage.setItem('login', true);
        setAlerta(false);
        navigateLogin("/")
    }

    const notIsUser = () => {
        sessionStorage.setItem('login', false);
        setAlerta(true);
        navigateLogin("/login/")
    }

    useEffect(() => {
        let valor = sessionStorage.getItem("login") === 'true' ? true : false;
        setLogin(valor);
        setAlerta(valor);
        console.log(value)
    }, [value])

    const formLogueado = () => {
        return <div className='text-center row p-5'>
            <div className='col'>
                <Imagen ruta='https://th.bing.com/th/id/R.6c4d2d1a3d833183859ae94febd4c211?rik=LlbqqScJdNXhOg&pid=ImgRaw&r=0' alt='imagen login' clase='imagenLogin' />
            </div>
            <div className='col'>
                <form className='row g-3 needs-validation text-start' onSubmit={handleSubmit}>
                    <Input label="Username:" type="text" name="Username" value={nombre} onChange={({ target }) => setName(target.value)} />
                    <Input label="Correo:" type="email" name="Correo" value={email} onChange={({ target }) => setEmail(target.value)} />
                    <Input label="Contraseña:" type="password" name="Contraseña" value={password} onChange={({ target }) => setPassword(target.value)} />
                    <Boton type="submit" label="Enviar" clase='btn btn-primary'></Boton>
                </form>
            </div>
            {
                alerta ? <Alertas clase='alert alert-warning m-2 p-1' mensaje='No está registrado en el sistema !! '></Alertas> : <></>
            }
        </div>
    }

    const formNotLogueado = () => {
        return <div className='text-center row p-5'>
            <div className='col'>
                <Imagen ruta='https://th.bing.com/th/id/R.6c4d2d1a3d833183859ae94febd4c211?rik=LlbqqScJdNXhOg&pid=ImgRaw&r=0' alt='imagen login' clase='imagenLogin' />
            </div>
            <div className='col text-center text-'>
                <form className='row g-3 needs-validation text-start' onSubmit={handleSubmitLogout}>
                    <Boton type="submit" label="Cerrar Sesión" clase='btn btn-primary'></Boton>
                </form>
            </div>
            {
                alerta ? <Alertas clase='alert alert-warning m-2 p-1' mensaje='YA ESTA EN EL SISTEMA !! '></Alertas> : <></>
            }
        </div>
    }

    return (
        <>
            {
                logueado === false ? formLogueado()
                    : formNotLogueado()
            }
        </>
    )
}
