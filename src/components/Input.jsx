import React from 'react'

export default function Input(props) {
    return (
        <div className="col-12">
            <label htmlFor={props.name} className="form-label">{props.label}</label>
            <input className='form-control' id={props.name} type={props.type} name={props.name} value={props.value} onChange={props.onChange} required />
            <div className="invalid-feedback">
                Please provide a valid city.
            </div>
        </div>
    );
}

