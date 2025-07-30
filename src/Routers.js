import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Chatbot from './Chatbot/Chatbot/Chatbot';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
