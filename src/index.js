import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './Context/Authcontext';
import { SearchContextProvider } from './Context/Searchcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


