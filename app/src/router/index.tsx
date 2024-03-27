import React from 'react';
import {Route, Routes} from "react-router-dom";
import routes from "./routes";
import '../index.css'

const AppRouter = () => {
  return (
      <Routes>
        {routes.map(route => (
            <Route key={route.path} element={route.element} path={route.path} />
        ))}
      </Routes>
  );
};

export default AppRouter;