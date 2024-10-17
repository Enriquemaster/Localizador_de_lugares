import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg, IonButtons } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import imagenWebp from './assets/images/flux.svg'; // Importa la imagen .webp
import Car from './assets/images/Car.gif'; // Importa la imagen .webp


const Welcome: React.FC = () => {
  const history = useHistory();

  const handleStart = () => {
    history.push('/home');
  };

  const handleStart1 = () => {
    history.push('/sobre');  // función para cambiar de ruta
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle>Bienvenido</IonTitle>
          <IonButtons slot="end"> {/* Coloca el botón al final de la barra de herramientas */}
            <IonButton onClick={handleStart1}>Sobre...</IonButton>
          </IonButtons>
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

        {/* Contenido de bienvenida */}
        <div className="relative z-10 flex flex-col items-center ">
          <IonImg src={Car} alt="Bienvenido" className="mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">¡Bienvenido a mi aplicación!</h1>
          <p className="text-black text-center mt-2">
           Consulta tus ubicaciones facilmente con esta aplicación
          </p>
          <IonButton expand="full" onClick={handleStart} color="primary" className="mt-4">
            Ingresar
          </IonButton>

          <div className="bg-white rounded-lg shadow-md p-4 mt-4"> 
          <h2 className="text-xl font-semibold text-gray-700 mt-2 text-center">¿Cómo empezar?</h2>
<p className="text-black text-sm mt-2  mb-4 font-bold">
    1. Busca tu ubicación actual. <br />
    2. Consulta lugares cercanos y favoritos. <br />
    3. ¡Explora y disfruta de tu experiencia!<br />
    4. Asegúrate de tener activados los servicios de ubicación en tu dispositivo.<br />
    5. Explora diferentes categorías de lugares para descubrir nuevas opciones.<br />
    6. Guarda tus lugares favoritos para acceder a ellos rápidamente en el futuro.<br />
</p>

</div>
       
         

        </div>
       
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
