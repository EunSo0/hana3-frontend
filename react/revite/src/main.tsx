import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CounterProvider } from './contexts/counter-context.tsx';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CounterProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CounterProvider>
  </React.StrictMode>
);