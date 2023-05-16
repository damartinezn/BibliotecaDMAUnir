import { useState } from 'react';

const useSessionStorage = (key, initialValue) => {
    
    const [value, setValue] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    const updateValue = (newValue) => {
        setValue(newValue);
        sessionStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, updateValue];
};

export default useSessionStorage;
