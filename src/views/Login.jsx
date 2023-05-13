import { React, useEffect, useState } from 'react'
import Input from '../components/Input'
import Imagen from '../components/Imagen';
import Boton from '../components/Boton';
import { consultaLoginUser } from '../services/LoginService';
import { useNavigate } from 'react-router';
import Alertas from '../components/Alertas';

export default function Login() {
    const [nombre, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [logueado, setLogin] = useState(false);
    let navigateLogin = useNavigate();

    const handleSubmit = (event) => {
        let auxLogin = consultaLoginUser(nombre, password, email);
        try {
            Object.keys(auxLogin).length > 0 ? isUser() : notIsUser();
        } catch (error) {
            notIsUser()
        }
        resetValores();
        event.preventDefault();
    };

    const handleSubmitLogout = (event) =>{
        resetValores();
        sessionStorage.setItem('login', false);
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
        let valor = sessionStorage.getItem("login") === 'true' ? true: false;
        setLogin(valor);
        setAlerta(valor);
    },[])

    const formLogueado = () => {
        return <div className='text-center row p-5'>
            <div className='col'>
                <Imagen ruta='biblioteca.png' alt='imagen login' clase='img-fluid' />
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
                <Imagen ruta='biblioteca.png' alt='imagen login' clase='img-fluid' />
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
                logueado === false  ? formLogueado()
                    : formNotLogueado()
            }
        </>
    )
}
