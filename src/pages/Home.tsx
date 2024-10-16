import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/react';
import { useLocation } from '../context/LocationContext';
import GoogleMapComponent from './mapa'; // Asegúrate de que la ruta sea correcta
import { Storage } from '@ionic/storage';

interface Location {
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const { coordinates, getCurrentPosition } = useLocation();
  const [storage, setStorage] = useState<Storage | null>(null);
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [latitudeInput, setLatitudeInput] = useState('');
  const [longitudeInput, setLongitudeInput] = useState('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

  // Inicializar almacenamiento
  useEffect(() => {
    const initStorage = async () => {
      const storageInstance = new Storage();
      await storageInstance.create();
      setStorage(storageInstance);
    };

    initStorage();
  }, []);

  // Cargar ubicaciones guardadas al montar el componente
  useEffect(() => {
    const loadSavedLocations = async () => {
      if (storage) {
        const locations = await storage.get('savedLocations');
        if (locations) {
          setSavedLocations(locations as Location[]);
          setMarkers(locations.map((loc: Location) => ({ lat: loc.latitude, lng: loc.longitude })));
        }
      }
    };

    loadSavedLocations();
  }, [storage]);

  // Guardar ubicaciones en el almacenamiento
  const saveLocations = async (locations: Location[]) => {
    if (storage) {
      await storage.set('savedLocations', locations);
    }
  };

  // Maneja el clic en el mapa
  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newMarker = { lat, lng };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setSavedLocations((prevLocations) => {
      const updatedLocations = [...prevLocations, { latitude: lat, longitude: lng }];
      saveLocations(updatedLocations);
      return updatedLocations;
    });
  };

  // Función para eliminar una ubicación
  const deleteLocation = async (index: number) => {
    const updatedLocations = savedLocations.filter((_, i) => i !== index);
    setSavedLocations(updatedLocations);
    setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index)); // Eliminar marcador
    await saveLocations(updatedLocations); // Guardar cambios en el almacenamiento
  };

  const handleSearch = () => {
    const lat = parseFloat(latitudeInput);
    const lng = parseFloat(longitudeInput);

    if (!isNaN(lat) && !isNaN(lng)) {
      setMapCenter({ lat, lng });
      setMarkers([{ lat, lng }]);
    }
  };

  useEffect(() => {
    if (coordinates) {
      setMapCenter({ lat: coordinates.latitude, lng: coordinates.longitude });
    }
  }, [coordinates]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ubicación Actual</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-gray-100 p-2">
        <div className="bg-white rounded-lg shadow-md p-2">
          {/* Formulario de búsqueda */}
          <div className="flex flex-col">
            <div className="flex flex-row"> {/* Fila para inputs y botón */}
              <IonInput
                type="number"
                placeholder="Latitud"
                value={latitudeInput}
                onIonChange={(e) => setLatitudeInput(e.detail.value!)}
                className="mr-2 text-black"
              />
              <IonInput
                type="number"
                placeholder="Longitud"
                value={longitudeInput}
                onIonChange={(e) => setLongitudeInput(e.detail.value!)}
                className="mr-2 text-black"
              />
              <IonButton onClick={handleSearch} color="primary">
                Buscar
              </IonButton>
            </div>
          </div>

          {coordinates && (
            <GoogleMapComponent
              onMapClick={handleMapClick}
              markers={markers}
              initialCenter={mapCenter}
            />
          )}
          <h2 className="mt-4 text-lg font-semibold">Coordenadas:</h2>
          {coordinates ? (
            <p className="text-gray-700">
              Latitud: {coordinates.latitude}, Longitud: {coordinates.longitude}
            </p>
          ) : (
            <p className="text-gray-500">No se ha obtenido la ubicación aún.</p>
          )}
          <IonButton onClick={getCurrentPosition} expand="full" color="primary" className="mt-4">
            Obtener Ubicación
          </IonButton>
  

        <h2 className="text-md text-black font-semibold p-2">Ubicaciones Guardadas:</h2>
        <ul className="list-disc list-inside text-sm">
          {savedLocations.map((location, index) => (
            <li key={index} className="flex items-center justify-between text-black">
              <span>{`Latitud: ${location.latitude.toFixed(4)}, Longitud: ${location.longitude.toFixed(4)}`}</span>
              <IonButton onClick={() => deleteLocation(index)} color="danger" size="small" className="ml-2">
                Borrar
              </IonButton>
            </li>
          ))}
        </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
