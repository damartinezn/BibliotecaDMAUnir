import Busqueda from './views/Busqueda';
import Login from './views/Login';

function App() {
  return (
    <div className="v-100 bg-secondary bg-opacity-50 p-5">
      <header className="container shadow-lg p-5 rounded text-center bg-light text-dark opacity-3">
        <Busqueda></Busqueda>
      </header>
    </div>
  );
}

export default App;
