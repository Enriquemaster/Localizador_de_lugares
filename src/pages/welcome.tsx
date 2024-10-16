import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Zenitho } from 'uvcanvas';

const Welcome: React.FC = () => {
  const history = useHistory();

  const handleStart = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bg-gray-100 flex flex-col items-center justify-center relative h-full w-full">
        {/* Contenedor para hacer que Zenitho sea el fondo */}
        <div className="absolute inset-0 z-0 h-full w-full">
          {/* Aplica estilos directamente a Zenitho */}
          <Zenitho style={{ height: '100%', width: '100%' }} /> {/* Expande Zenitho */}
        </div>

        {/* Contenido de bienvenida */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <IonImg src="/assets/images/welcome.png" alt="Bienvenido" className="mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">¡Bienvenido a nuestra aplicación!</h1>
          <p className="text-gray-600 text-center mt-2">
            Explora nuestras funcionalidades y comienza tu aventura.
          </p>
          <IonButton expand="full" onClick={handleStart} color="primary" className="mt-4">
            Comenzar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;