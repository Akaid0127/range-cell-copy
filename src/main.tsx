import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css/normalize.css';
import App from './App.tsx';
import './mock/mock.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
