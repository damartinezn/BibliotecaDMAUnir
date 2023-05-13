import { BibliotecaRouter } from './components/BibliotecaRouter';
import Menu from './views/Menu';

function App() {
  return (
    <div>
        <header>
          <div className="v-100 bg-secondary bg-opacity-50 pb-5">
            <Menu></Menu>
            <div className="container shadow-lg p-5 mt-3 rounded text-center bg-light text-dark opacity-3">
              <BibliotecaRouter></BibliotecaRouter>
            </div>
          </div>
        </header>
    </div>
  );
}

export default App;
