import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchProvider } from './context/searchContext';
import App from './App';
import './index.css';
import { AuthProvider } from './context/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
