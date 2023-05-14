import React from "react";

const Boton = (props) => {
    const { type, label, onClick, clase } = props;
    return (
        <button type={type} onClick={onClick} className={clase} >
            {label}
        </button>
    );
};

export default Boton;
