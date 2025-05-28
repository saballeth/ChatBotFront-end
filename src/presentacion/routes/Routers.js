import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Principal from '../Componentes/principal/Principal.js';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
