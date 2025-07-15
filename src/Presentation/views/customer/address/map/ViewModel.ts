import React, { useContext, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Camera } from "react-native-maps";
import {useAddress } from "../../../../context/AddressContext";

export default function useCustomerAddressMapViewModel() {
  const [messagePermission, setMessagePermission] = useState("");
  const [refPoint, setRefPoint] = useState({
    name: '',
    latitude: 0.0,
    longitude: 0.0,
  });
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
  const mapRef = useRef<MapView | null>(null);
  const {setAddress} = useAddress();



  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();

      if (foreground.granted) {
        startForegroundUpdate();
      }
    };

    requestPermissions();
  }, [])
  
  // Metodo para cambiar la ubicacion en el mapa
  const onRegionChangeComplete = async (latitude: number, longitude: number) => {
    try {
     const place = await Location.reverseGeocodeAsync({
      latitude,
      longitude
     });

     let city;
     let street;
     let streetNumber;

     place.find(p => {
      city = p.city;
      street = p.street;
      streetNumber = p.streetNumber;
      setRefPoint({
        name:`${street}, ${streetNumber}, ${city}`, 
        latitude,
        longitude
      });

     })

    } catch (error) {
      console.log('ERROR: ' + error);
      
    }

  }

  //Metodo para seleccionar la ubicacion del usuario en el mapa
  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();

    if (!granted) {
      setMessagePermission("Permiso de ubicacion denegado");
      return;
    }

    const location = await Location.getLastKnownPositionAsync(); //UBICACION ACTUAL, UNA SOLA VEZ
    setPosition(location?.coords);
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
  };
  return {
    position,
    mapRef,
    messagePermission,
    ...refPoint,
    setAddress,
    setMessagePermission,
    onRegionChangeComplete
  };
}
