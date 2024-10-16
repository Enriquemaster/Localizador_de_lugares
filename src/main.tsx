import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LocationProvider } from './context/LocationContext';  // Importa el contexto de ubicación
import 'leaflet/dist/leaflet.css';
import './tailwind.css';
import { Storage } from '@ionic/storage';

const initStorage = async () => {
  const storage = new Storage();
  await storage.create();
  return storage;
};

const container = document.getElementById('root');
const root = createRoot(container!);

initStorage().then(() => {
  root.render(
    <React.StrictMode>
      <LocationProvider>
        <App />
      </LocationProvider>
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Error al inicializar el almacenamiento:', error);
});