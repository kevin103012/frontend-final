import React from 'react';

import './App.css';
import Principal from './pages/Principal';
import Abecedario from './pages/Abecedario';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/Abecedario" element={<Abecedario />} />
        {/* <Route path="/palabras" element={<Palabras />} /> */}
        {/* <Route path="/matematicas" element={<Matematicas />} /> */}
        {/* <Route path="/entrenar" element={<Entrenar />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
