import React from 'react';

export default function MenuItem(props) {
    return (
        <li className='nav-item'>
            <a className='nav-link active' href={props.link}>{props.label}</a>
        </li>
    );
}