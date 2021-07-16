
import styled from "styled-components";
import { backgroundCard } from "../../constants/colors";


export const CardContainer = styled.div`      display: flex;
    height: 35vh;
    width: 250px;
    margin: 10px;
    display: grid;
    grid-template-rows: 90% 10%;
`

export const Img = styled.img`
    height: 60%;
`
export const PokemonImg = styled.div`
    background: ${backgroundCard};
    display: flex;
    align-items:center;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    `
    
export const ButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`