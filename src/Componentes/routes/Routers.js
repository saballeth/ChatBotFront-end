import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../principal/App';


const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
