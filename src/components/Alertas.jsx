import { React } from 'react'

export default function Alertas(props) {
    return (
        <div className={props.clase} role="alert">
            {props.mensaje}
        </div>
    )
}
