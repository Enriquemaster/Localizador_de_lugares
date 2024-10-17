import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Opulento } from "uvcanvas";
import imagenWebp from './assets/images/flux.svg'; // Importa la imagen .webp
import Hacker from './assets/images/Hacker.gif'; // Importa la imagen .webp

const Sobre: React.FC = () => {
  const history = useHistory();

  const handleStart = () => {
    history.push('/welcome');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bg-gray-100 flex flex-col items-center justify-center relative h-full w-full">
        
         {/* Fondo con PNG */}
         <div
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            backgroundImage: `url(${imagenWebp})`,  // U
            backgroundSize: 'cover',  // Ajusta el tamaño del fondo
            backgroundPosition: 'center',  // Centra el PNG
            backgroundRepeat: 'no-repeat'  // No repite el PNG
          }}
        ></div>

        {/* Contenido de bienvenida - Z-index mayor para que se vea sobre el fondo */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <IonImg src={Hacker} alt="Bienvenido" className="mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Hecho por Jose Enrique Caamal Kuk!</h1>
          <p className="text-black text-center mt-2">
  <span className="font-bold">Alumno:</span><br />
  José Enrique Caamal Kuk<br /><br />

  <span className="font-bold">Nombre de la materia:</span><br />
  Programación de Aplicaciones Híbridas<br /><br />

  <span className="font-bold">Actividad:</span><br />
  U3. ADA2. App "Localizador de Lugares" (Geolocalización)<br /><br />

  <span className="font-bold">Docente:</span><br />
  Luis Gilberto Tec Cetz<br /><br />

  <span className="font-bold">Semestre y Grupo:</span><br />
  9ª<br /><br />

  <span className="font-bold">Fecha de entrega:</span><br />
  17 de octubre de 2024<br />
</p>
          <IonButton expand="full" onClick={handleStart} color="primary" className="mt-4">
           Regresar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Sobre;
