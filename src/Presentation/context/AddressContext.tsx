import React, { createContext, useContext, useEffect, useState } from "react";
import { Address } from "../../Domain/entities/Address";
import { Order } from "../../Domain/entities/Order";
import { Response } from "../../Domain/models/Response";
import { createAddressUseCase } from "../../core/di/AddressContainer";
import { getAddressByUserUseCase } from "../../core/di/AddressContainer";
import { createOrderUseCase } from "../../core/di/OrderContainer";

interface AddressContextType {
  refPoint: string;
  latitude: number;
  longitude: number;
  addresses: Address[];
  getAddressByUser(id_user: string): Promise<void>;
  createOrder(order: Order): Promise<Response>;
  createAddress(address: Address): Promise<Response>;
  setAddress: (refPoint: string, latitude: number, longitude: number) => void;
  resetAddress: () => void;
}

export const AddressContext = createContext<AddressContextType | undefined>(
  undefined,
);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [refPoint, setRefPoint] = useState("");
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const getAddressByUser = async (id_user: string) => {
    const response = await getAddressByUserUseCase.execute(id_user);
    setAddresses(response);
  };

  const createOrder = async (order: Order): Promise<Response> => {
    const response = await createOrderUseCase.execute(order);
    getAddressByUser(order.id_customer);
    return response;
  };

  const createAddress = async (address: Address): Promise<Response> => {
    const response = await createAddressUseCase.execute(address);

    if (response.success) {
      await getAddressByUser(address.id_user);
    }
    return response;
  };

  const setAddress = (ref: string, lat: number, lng: number) => {
    setRefPoint(ref);
    setLatitude(lat);
    setLongitude(lng);
  };

  const resetAddress = () => {
    setRefPoint("");
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
        createOrder,
        createAddress,
        setAddress,
        resetAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
