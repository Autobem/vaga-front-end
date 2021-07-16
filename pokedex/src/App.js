import React from "react";
import { Router } from './route/Router.js';
import GlobalState from './global/GlobalState';



export default function App() {
  return (
    <>

      <GlobalState>
        <Router />
      </GlobalState>

    </>
  );
}