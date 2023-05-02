import { React, useState } from 'react'
import Input from '../components/Input'
import Imagen from '../components/Imagen';
import Boton from '../components/Boton';

export default function Login() {
    const [nombre, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

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
        console.log(nombre, password, email)
        event.preventDefault();
        // hacer algo con los datos
    };
    return (
        <div className='container text-center row'>
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
        </div>
    )
}
