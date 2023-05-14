import { BibliotecaRouter } from './components/BibliotecaRouter';
import Menu from './views/Menu';
import './styles/StyleImagen.css';
import { LibroContext } from './components/LibroContext';
import { useState } from 'react';

function App() {
  const [value, changeValue] = useState('Bienvenido ')

  return (
    <div>
      <header>
        <div className="v-100 bg-secondary bg-opacity-50 pb-5">
          <LibroContext.Provider value={{value,changeValue}}>
            <Menu></Menu>
            <div className="container shadow-lg p-5 mt-3 rounded text-center bg-light text-dark opacity-3">
              <BibliotecaRouter></BibliotecaRouter>
            </div>
          </LibroContext.Provider >
        </div>
      </header>
    </div>
  );
}

export default App;
