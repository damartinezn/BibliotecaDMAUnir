import React from "react";

const InputSelect = ({ options, name, value, handleChange, label }) => {
    return (
        <div>
            <label htmlFor={label} className="form-label">{label}</label>
            <select name={name} defaultValue={value} onChange={handleChange} className="form-select form-select-sm">
                <option value="unico">Open this select menu</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;


