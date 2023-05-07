import { React, useState } from 'react'
import Input from './Input'
import Boton from './Boton';
import InputSelect from './InputSelect';
import { consultaLibrosNombre, filtraCategoriaLibros } from '../services/LibrosService';
import Card from './Card';
import Alertas from './Alertas';


const genderOptions = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Femenino" },
    { value: "other", label: "Otro" },
];

export default function BusquedaControl() {
    const [nombre, setName] = useState('');
    const [contador, setContador] = useState(0);
    const [selectorUno, setSelectorUno] = useState("");
    const [generos, setLibros] = useState([]);
    const [libros, setLibrosFiltrados] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
        event.preventDefault();
    };

    const handleGenderChange = (event) => {
        setSelectorUno(event.target.value);
    };

    const handleByNomberClick = (event) => {
        if (nombre.length > 0) {
            setLibrosFiltrados([])
            let libAux = consultaLibrosNombre(nombre);
            setLibrosFiltrados(libAux);
            setContador(contador + 1)
        }
        event.preventDefault();
    }

    return (
        <>
            <div className="text-start  mb-4  fw-bold shadow-lg p-3 bg-body-tertiary rounded border border-dark">
                <div className="row align-items-center">
                    <div className="col">
                        <Input label="Titulo:" type="text" name="titulo" value={nombre} onChange={handleNameChange} />
                    </div>
                    <div className="col-6">
                        <hr className='invisible' />
                        <Boton label="Buscar" clase='btn btn-outline-primary' onClick={handleByNomberClick}></Boton>
                    </div>
                </div>
                <div className="row align-items-center mt-2">
                    <div className="col">
                        <InputSelect name='Categoria'
                            label='Categoria'
                            value={selectorUno}
                            options={genderOptions}
                            handleChange={handleGenderChange}></InputSelect>
                    </div>
                    <div className="col">
                        <InputSelect name='Autor'
                            label='Autor'
                            value={selectorUno}
                            options={genderOptions}
                            handleChange={handleGenderChange}></InputSelect>
                    </div>
                    <div className="col">
                        <InputSelect name='Año publicacion'
                            label='Año de publicación'
                            value={selectorUno}
                            options={genderOptions}
                            handleChange={handleGenderChange}></InputSelect>
                    </div>
                </div>
                Resultado: {libros.length}
                <>
                    {libros.length == 0 && contador > 0 ? <Alertas clase='alert alert-primary p-1' mensaje='No se encontraron coincidencias !! '></Alertas> : <></>}
                </>
            </div>
            <Card libros={libros}></Card>
        </>
    )
}