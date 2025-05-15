import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Principal from './Vista/Principal';
import Login from './Vista/Login';
import Principal0Visual from './Vista/Principal0Visual';
import PrincipalNormalVisual from './Vista/PrincipalNormalVision';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/0visual" element={<Principal0Visual />} />
        <Route path="/visual" element={<PrincipalNormalVisual />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
