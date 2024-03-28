import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header";
import AppRouter from "./router";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className={"app-page"}>
          <Header/>
          <AppRouter/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
