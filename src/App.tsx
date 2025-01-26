import React from "react";

import { BrowserRouter } from "react-router";

import AppRouter from "./router/AppRouter";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
