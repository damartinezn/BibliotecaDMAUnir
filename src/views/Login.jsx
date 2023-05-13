import { React, useContext, useState } from 'react'
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
    let navigateLogin = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
        event.preventDefault();
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        event.preventDefault();
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        let auxLogin = consultaLoginUser(nombre, password, email);
        console.table(auxLogin[0], Object.keys(auxLogin).length)
        try {
            auxLogin !== null || auxLogin !== undefined ? sessionStorage.setItem('login', true) : sessionStorage.setItem('login', false);
            setAlerta(false);
            navigateLogin("/")
        } catch (error) {
            setName('');
            setPassword('');
            setEmail('');
            sessionStorage.setItem('login', false);
            setAlerta(true);
        }
        event.preventDefault();
    };
    return (
        <div className='text-center row p-5'>
            <div className='col'>
                <Imagen ruta='biblioteca.png' alt='imagen login' clase='img-fluid' />
            </div>
            <div className='col'>
                <form className='row g-3 needs-validation text-start' onSubmit={handleSubmit}>
                    <Input label="Username:" type="text" name="Username" value={nombre} onChange={handleNameChange} />
                    <Input label="Correo:" type="email" name="Correo" value={email} onChange={handleEmailChange} />
                    <Input label="Contraseña:" type="password" name="Contraseña" value={password} onChange={handlePasswordChange} />
                    <Boton type="submit" label="Enviar" clase='btn btn-primary'></Boton>
                </form>
            </div>
            {
                alerta ? <Alertas clase='alert alert-warning m-2 p-1' mensaje='No está registrado en el sistema !! '></Alertas> : <></>
            }
        </div>
    )
}
