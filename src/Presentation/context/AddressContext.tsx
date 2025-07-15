import React, { createContext, useContext, useEffect, useState } from 'react';
import { Address } from '../../Domain/entities/Address';
import GetAddressByUserUseCase from '../../Domain/useCase/address/getAddressByUser';
import { Order } from '../../Domain/entities/Order';
import CreateOrderUseCase from '../../Domain/useCase/order/CreateOrder';
import { ResponseApiDelivery } from '../../Data/sources/models/ResponseApiDelivery';

interface AddressContextType {
  refPoint: string;
  latitude: number;
  longitude: number;
  addresses: Address[];
  getAddressByUser(id_user: string): Promise<void>;
  create(order: Order): Promise<ResponseApiDelivery>,
  setAddress: (refPoint: string, latitude: number, longitude: number) => void;
  resetAddress: () => void;
}


export const AddressContext = createContext<AddressContextType | undefined>(undefined);


export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refPoint, setRefPoint] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [addresses, setAddresses] = useState<Address[]>([]);


  const getAddressByUser = async (id_user: string): Promise<void> => {
    const response = await GetAddressByUserUseCase(id_user);
    setAddresses(response);

  }

   const create = async (order: Order): Promise<ResponseApiDelivery> => {
      const response = await CreateOrderUseCase(order);
      getAddressByUser(order.id_customer);
      return response;
    };

  const setAddress = (ref: string, lat: number, lng: number) => {
    setRefPoint(ref);
    setLatitude(lat);
    setLongitude(lng);
  };

  const resetAddress = () => {
    setRefPoint('');
    setLatitude(0.0);
    setLongitude(0.0);
  };

  return (
    <AddressContext.Provider 
    value={{ 
      refPoint, 
      latitude, 
      longitude,
      addresses,
      getAddressByUser,
      create,
      setAddress, 
      resetAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
