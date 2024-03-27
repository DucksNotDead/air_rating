import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header";
import AppRouter from "./router";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <div className={"app-page"}>
          <AppRouter/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
