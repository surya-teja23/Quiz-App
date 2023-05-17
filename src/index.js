import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './Context/DataContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  // <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  // </React.StrictMode>
);