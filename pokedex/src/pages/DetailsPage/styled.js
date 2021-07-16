import styled from "styled-components";
import { backgroundCard } from "../../constants/colors";

export const PokeInfosContainer = styled.main`
  height: 80vh;
  margin: 20px 10vw;
  display:flex;
  justify-content: space-evenly;
`

export const ImagesContainer = styled.div`
  align-self: center;
  height: 75%;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ImgWrapper = styled.img`
  height: 25vh;
  background: ${backgroundCard};
`

export const StatsContainer = styled.div`
  background: ${backgroundCard};
  align-self: center;
  height: 75%;
  width: 300%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const TitleContainer = styled.div`
  align-self: center;
`

export const TypeAndMovesContainer = styled.div`
  align-self: center;
  height: 75%;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const TypesContainer = styled.div`
  background: ${backgroundCard};
  height: 10%;
  display: flex;
  justify-content: space-between;
`

export const MovesContainer = styled.div`
  background: ${backgroundCard};
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;
`