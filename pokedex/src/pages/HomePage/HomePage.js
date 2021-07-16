import React, { useContext, useState } from 'react';
import { CardPokemon } from '../../components/CardPokemon/CardPokemon';
import { Header} from '../../components/Header/Header';
import GlobalStateContext from '../../global/GlobalStateContext';
import {goToPokedexPage} from '../../route/coordinator'
import { useHistory } from "react-router-dom";
import { HomePageContainer } from './styled';

export const HomePage = ()=>{
    const [inputName, setInputName] = useState("")
    const {dataPokemon} = useContext(GlobalStateContext)
    const history = useHistory()
    
    const onChangeName = (event) => {
        setInputName(event.target.value)
    }

    let pokeFilter = dataPokemon.filter((pokemon) => {
        if (pokemon.name.toLowerCase().includes(inputName.toLowerCase())) {
            return true 
        } else {
            return false
        }
    })
    //      pokemonFilteredPage.filter((pokemon) => {
    //      return (inputName ? dataPokemon.name.toLowerCase().includes(inputName.toLowerCase()) : true)
    // })

console.log("atualiando input", inputName)

    return (
        <>  
        <Header 
        title={"Lista de Pokémons"}
        leftButtonFunction = {() => goToPokedexPage(history)}
        />
        <form >
            <label>
                <input
                  type="text"
                  value={inputName}
                  onChange={onChangeName}
                  placeholder="Nome do pokémon"
                />
            </label>
        </form>
        <HomePageContainer>
           {pokeFilter &&
               pokeFilter.map((pokemon) =>{
                return <CardPokemon key={pokemon.name} pokemon={pokemon}/>
               })
           }
        </HomePageContainer>
         
        </>
    )

}