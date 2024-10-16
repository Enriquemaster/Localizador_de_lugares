import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Geolocation } from '@capacitor/geolocation';

// Tipos para el contexto
interface LocationContextProps {
  coordinates: { latitude: number; longitude: number } | null;
  getCurrentPosition: () => void;
}

// Agregamos un tipo para las props del LocationProvider
interface LocationProviderProps {
  children: ReactNode; // ReactNode permite que cualquier elemento JSX sea hijo
}

// Crear el contexto con valores iniciales
const LocationContext = createContext<LocationContextProps>({
  coordinates: null,
  getCurrentPosition: () => {},
});

// Crear un hook para utilizar el contexto fácilmente
export const useLocation = () => useContext(LocationContext);

// Proveedor del contexto que envuelve la aplicación
export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  // Función para obtener la ubicación actual
  const getCurrentPosition = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      setCoordinates({ latitude, longitude });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  };

  return (
    <LocationContext.Provider value={{ coordinates, getCurrentPosition }}>
      {children} {/* Esto ahora está tipado correctamente */}
    </LocationContext.Provider>
  );
};
