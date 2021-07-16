import React from 'react'
import { useHistory } from "react-router-dom"
import { goToPokedexPage } from '../../route/coordinator'
import { HeaderContainer } from './styled'

export const Header = ({ leftButtonFunction, title, showRightButton }) => {
  const history = useHistory();

  const leftButtonTitle = () => {
    switch (title) {
      case "Lista de Pokémons":
        return "Ir para Pokedex";
      case "Pokédex":
        return "Voltar para lista de pokemons";
      default:
        return "Voltar";
    }
  };
  return (
    <HeaderContainer>
      <button onClick={leftButtonFunction}>
        {leftButtonTitle()}
      </button>
      <h1>{title}</h1>
      {/* {showRightButton && (
          <button onClick={() => goToPokedexPage(history)}>
            Ir para pokedex
          </button>
        )} */}
    </HeaderContainer>)
}
