import "./App.css";
import Axios from "axios";
import { useState } from "react";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          type: res.data.types[0].type.name,
        });
      }
    );
    setPokemonChosen(true);
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          value = {pokemonName.toLowerCase()}
        />
        {pokemonName && <button onClick={searchPokemon}>Search Pokémon</button>}
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>PLEASE CHOOSE A POKEMON</h1>
        ) : (
          <>
            <h2>{pokemon.name.toUpperCase()}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Number: #{pokemon.number}</p>
            <p>Species: {pokemon.species}</p>
            <p>Type: {pokemon.type}</p>
            <p>Hp: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
