import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Principal from '../Vistas/principal';


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
