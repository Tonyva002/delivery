import { useContext, useEffect, useState } from "react";
import { useAddress } from "../../../../context/AddressContext";
import { UserContext } from "../../../../context/UserContext";
import { Address } from "../../../../../Domain/entities/Address";
import { Order } from "../../../../../Domain/entities/Order";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";

export default function useCustomerAddressListViewModel() {
  const { addresses, getAddressByUser, create } = useAddress();
  const { user, saveUserSesion } = useContext(UserContext);
  const [checked, setChecked] = useState("");
  const {shoppingBag} = useContext(ShoppingBagContext);
  const [responseMessage, setResponseMessage] = useState('');
  

  useEffect(() => {
    if (user?.id) {
      getAddressByUser(user.id);
    }
    if (user.address !== null && user.address !== undefined) {
      changeRadioValue(user.address!);
    }
  }, [user]);

  const changeRadioValue = (address: Address) => {
    setChecked(address.id!);
    user.address = address;
    saveUserSesion(user);
  };

  const createOrder = async () => {
    const order: Order = {
      id_customer: user.id!,
      id_address: user.address?.id!,
      products: shoppingBag
    }
  
    const response = await create(order)
    setResponseMessage(response.message);
  }

  return {
    user,
    addresses,
    checked,
    responseMessage,
    setResponseMessage,
    createOrder,
    getAddressByUser,
    changeRadioValue,
  };
}
