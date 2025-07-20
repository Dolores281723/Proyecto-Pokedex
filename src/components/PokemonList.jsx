// src/components/PokemonList.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Hubo un error al obtener los pokemons", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, []);

   const playPokemonCry = (pokemonName) => {
    const cleanName = pokemonName.toLowerCase().trim();
    const soundUrl = `https://play.pokemonshowdown.com/audio/cries/${cleanName}.mp3`;
    const audio = new Audio(soundUrl);
    audio.play().catch(error => console.error("Error al reproducir el sonido:", error));
  };

  if (loading) {
    return <p>Cargando Pokémon...</p>;
  }

  return (

  
    <div className="pokedex-container">
      <h1>Mi Pokédex</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => {
          // --- NUEVA LÓGICA PARA OBTENER EL ID ---
          // La URL es como "https://pokeapi.co/api/v2/pokemon/1/", la dividimos por "/"
          const id = pokemon.url.split('/')[6];
          // Creamos la URL de la imagen
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            // NUEVO: Envolvemos la tarjeta en un componente Link
            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link" key={id}>
              <div className="pokemon-card"
                onClick={() => playPokemonCry(pokemon.name)}
                >
                <img src={imageUrl} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;