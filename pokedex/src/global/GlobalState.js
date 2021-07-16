import axios from "axios";
import React, { useEffect, useState } from "react";
import GlobalStateContext from "./GlobalStateContext";
import { BASE_URL } from "../constants/urls";

const GlobalState = (props) => {
    const [namePokemon, setNamePokemon] = useState([])
    const [dataPokemon, setDataPokemon] = useState([])
    const [pokedex, setPokedex] = useState([])



    useEffect(() => {
        getNamePokemon()
    }, [])


    useEffect(() => {
        const listPokemons = []
        namePokemon.forEach((item) => {
            axios.get(`${BASE_URL}/pokemon/${item.name}`)
                .then((response) => {
                    listPokemons.push(response.data)
                    if (listPokemons.length === 20) {
                        const orderList = listPokemons.sort((a, b) => {
                            return a.id - b.id
                        })
                        setDataPokemon(orderList)
                    }
                })
                .catch((err) => console.log(err.message))
        })

    }, [namePokemon])


    const getNamePokemon = () => {
        axios.get(`${BASE_URL}/pokemon?limit=20`)
            .then((response) => {
                setNamePokemon(response.data.results)
            })
            .catch((err) => console.log(err.message))
    }


    const data = { dataPokemon, setDataPokemon, pokedex, setPokedex }


    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>
    )

}
export default GlobalState
