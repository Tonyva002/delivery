import React, { useContext, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Camera } from "react-native-maps";
import { Order } from "../../../../../Domain/entities/Order";
import { OrderContext } from "../../../../context/OrderContext";

export default function useDeliveryOrderMapViewModel(order: Order) {
  const [messagePermission, setMessagePermission] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [refPoint, setRefPoint] = useState({
    name: "",
    latitude: 0.0,
    longitude: 0.0,
  });
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
  const [origin, setOrigin] = useState({
    latitude: 0.0,
    longitude: 0.0
  });

  const [destination, setDestination] = useState({
    latitude: order.address?.lat!,
    longitude: order.address?.lng!
  });

  const {updateToDelivered} = useContext(OrderContext)
  
  const mapRef = useRef<MapView | null>(null);
  const positionSubscription = useRef<Location.LocationSubscription | null>(
    null
  );



  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();

      if (foreground.granted) {
        startForegroundUpdate();
      }
    };

    requestPermissions();
  }, []);

  // Metodo para cambiar la ubicacion en el mapa
  const onRegionChangeComplete = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const place = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      let city;
      let street;
      let streetNumber;

      place.find((p) => {
        city = p.city;
        street = p.street;
        streetNumber = p.streetNumber;
        setRefPoint({
          name: `${street}, ${streetNumber}, ${city}`,
          latitude,
          longitude,
        });
      });
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  //Metodo para seleccionar la ubicacion del usuario en el mapa
  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();

    if (!granted) {
      setMessagePermission("Permiso de ubicacion denegado");
      return;
    }

    // Obtener la ubicación
    const location = await Location.getLastKnownPositionAsync();
    setPosition(location?.coords);
    setOrigin({
      latitude: location?.coords.latitude!,
      longitude: location?.coords.longitude!,
    })
    const newCamera: Camera = {
      center: {
        latitude: location?.coords.latitude!,
        longitude: location?.coords.longitude!,
      },
      zoom: 15,
      heading: 0,
      pitch: 0,
      altitude: 0,
    };
    mapRef.current?.animateCamera(newCamera, { duration: 2000 });

    // Antes de empezar una nueva suscripción, elimina la anterior si existe
    positionSubscription.current?.remove();
    
    positionSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (loc) => {
        console.log('POSITION: ' + JSON.stringify(location?.coords, null, 3));
        setPosition(loc.coords);
      }
    );
  }

  const stopForegroundUpdate = () => {
    positionSubscription?.current?.remove();
    setPosition(undefined);
  }
  
  //Metodo para actualizar la orden a entregado
  const updateToDeliveredOrder = async () => {
    const response = await updateToDelivered(order);
    setResponseMessage(response.message);

  }

  return {
    position,
    mapRef,
    messagePermission,
    ...refPoint,
    setMessagePermission,
    responseMessage,
    setResponseMessage,
    onRegionChangeComplete,
    stopForegroundUpdate,
    origin,
    destination,
    updateToDeliveredOrder
  };
}
