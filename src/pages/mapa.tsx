import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ onMapClick, markers, initialCenter }) => {
  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA4cPEyP6494N4TwKwJ6HKzl55iecYIsVw">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialCenter} // Usa initialCenter para centrar el mapa
        zoom={15} // Ajusta el zoom según sea necesario
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;


