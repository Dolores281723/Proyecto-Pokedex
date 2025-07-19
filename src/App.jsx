// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* La ruta raíz "/" mostrará la lista de Pokémon */}
        <Route path="/" element={<PokemonList />} />
        
        {/* Esta es una ruta dinámica. :pokemonName será el nombre del Pokémon */}
        <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;