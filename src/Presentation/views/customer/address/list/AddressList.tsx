import React, { useEffect } from 'react'
import { View, FlatList, ToastAndroid } from 'react-native';
import useCustomerAddressListViewModel from './ViewModel';
import AddressListItem from './Item';
import RoundedButton from '../../../../components/RoundedButton';



export default function CustomerAddressListScreen() {


  const {addresses, checked, responseMessage, setResponseMessage, createOrder, changeRadioValue, getAddressByUser } = useCustomerAddressListViewModel();


  useEffect(() => {
    if(responseMessage !== ''){
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage('');
    }
  }, [responseMessage])

 

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      
        <FlatList
        data={addresses}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({item}) => <AddressListItem 
        address={item} 
        checked={checked}
        changeRadioValue={changeRadioValue} />}
         />
         

         <View style={{width: '100%', padding: 20, position: 'absolute', bottom: 10,}}>
          <RoundedButton text='CONTINUAR' onPress={() => createOrder()} />
         </View>
    </View>
  )
}
