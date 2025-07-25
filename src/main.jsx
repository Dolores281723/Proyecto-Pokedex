// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envuelve tu App en el BrowserRouter */}
    <BrowserRouter basename="/Proyecto-Pokedex/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);