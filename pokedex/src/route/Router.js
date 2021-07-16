import React from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import { HomePage } from '../pages/HomePage/HomePage.js';
import { PokedexPage } from '../pages/PokedexPage/PokedexPage.js';
import { DetailsPage } from '../pages/DetailsPage/DetailsPage.js';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route exact path={'/pokedex'} component={PokedexPage} />
        <Route exact path={'/pokedexDetails/:name'} component={DetailsPage} />
      </Switch>
    </BrowserRouter>

  );
}