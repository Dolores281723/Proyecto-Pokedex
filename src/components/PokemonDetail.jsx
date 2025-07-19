// src/components/PokemonDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetail = () => {
  // useParams nos da el parámetro de la URL, en este caso 'pokemonName'
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error al obtener los detalles del Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [pokemonName]); // Se ejecuta cada vez que el nombre del Pokémon en la URL cambia

  if (loading) {
    return <p className="status-message">Cargando detalles del Pokémon...</p>;
  }

  if (!pokemon) {
    return <p className="status-message">No se pudo encontrar el Pokémon. <Link to="/">Volver al inicio</Link></p>;
  }

  // Obtenemos la imagen oficial, si no existe, usamos el sprite por defecto
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="pokemon-detail-container">
      <Link to="/" className="back-link">← Volver a la Pokédex</Link>
      <div className="pokemon-detail-card">
        <img src={imageUrl} alt={pokemon.name} className="pokemon-detail-image" />
        <h2 className="pokemon-detail-name">{pokemon.name}</h2>
        <div className="pokemon-types">
          {pokemon.types.map((typeInfo) => (
            <span key={typeInfo.type.name} className={`type-badge type-${typeInfo.type.name}`}>
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        <div className="pokemon-info">
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        </div>
        <h3>Estadísticas Base</h3>
        <div className="pokemon-stats">
          {pokemon.stats.map((statInfo) => (
            <div className="stat-item" key={statInfo.stat.name}>
              <span className="stat-name">{statInfo.stat.name}</span>
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${statInfo.base_stat}px` }} // Usamos el valor para el ancho
                >
                  {statInfo.base_stat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;