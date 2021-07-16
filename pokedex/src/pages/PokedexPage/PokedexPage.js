import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Header } from '../../components/Header/Header';
import { CardPokemon } from '../../components/CardPokemon/CardPokemon';
import GlobalStateContext from '../../global/GlobalStateContext';
import { goToHomePage } from '../../route/coordinator';
import { PokedexContainer } from './styled';


export const PokedexPage = () => {
  const { pokedex } = useContext(GlobalStateContext);
  const history = useHistory();

  return (
    <>
      <Header
        title={"Pokédex"}
        leftButtonFunction={() => goToHomePage(history)}
      />
      <PokedexContainer>
        {pokedex &&
          pokedex.map((pokemon) => {
            return <CardPokemon key={pokemon.name} isPokedex pokemon={pokemon} />;
          })}
      </PokedexContainer>
    </>
  )
}


