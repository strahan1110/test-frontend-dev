'use client';

import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './index.css';

// Configure environment variables
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
