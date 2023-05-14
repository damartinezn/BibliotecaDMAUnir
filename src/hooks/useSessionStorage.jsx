import  { useState } from 'react';

export function useSessionStorage(key) {
    const [value, setValue] = useState()
    let objetoJSON = window.sessionStorage.getItem(key);
    if (objetoJSON !== undefined && objetoJSON !== null) {
        setValue(JSON.parse(objetoJSON));
    }
    return value;
}