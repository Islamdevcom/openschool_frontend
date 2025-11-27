import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SubjectsProvider } from './context/SubjectsContext';
import './i18n'; // ✅ Инициализация i18n

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SubjectsProvider>
          <App />
        </SubjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
