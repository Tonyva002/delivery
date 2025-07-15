import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StatusBar, useWindowDimensions, FlatList, Text } from "react-native";
import useAdminOrderViewModel from "./ViewModel";
import { TabView, TabBar } from "react-native-tab-view";
import { MyColors } from "../../../../theme/AppTheme";
import OrderListItem from "./Item";

interface Props {
  status: string;
  
}
function OrderListView({ status }: Props) {
  const { ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrders } = useAdminOrderViewModel();

  //Estado de la status bar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );

  useEffect(() => {
    getOrders(status);
  }, []);

  return (
    <View>
      <FlatList 
      data={
        status === 'PAGADO'
        ? ordersPayed
        : status === 'DESPACHADO'
        ? ordersDispatched
        : status === 'EN CAMINO'
        ? ordersOnTheWay
        : status === 'ENTREGADO'
        ? ordersDelivery
        : []
      }
      keyExtractor={(item) => item.id!}
      renderItem={({item}) => <OrderListItem order={item} />}
       />
    </View>
  );
}

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case "first":
      return <OrderListView status="PAGADO" />;

    case "second":
      return <OrderListView status="DESPACHADO" />;

    case "third":
      return <OrderListView status="EN CAMINO" />;

    case "fourth":
      return <OrderListView status="ENTREGADO" />;

    default:
      return <OrderListView status="PAGADO" />;
  }
};

const routes = [
  { key: "first", title: "PAGADO" },
  { key: "second", title: "DESPACHADO" },
  { key: "third", title: "EN CAMINO" },
  { key: "fourth", title: "ENTREGADO" },
];

export default function AdminOrderListScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      style={{ backgroundColor: 'white' }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: MyColors.gris_claro }}
          activeColor="black"
          inactiveColor="gray"
          scrollEnabled={true}
          style={{
            backgroundColor: "white",
            height: 70,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 34,
            elevation: 0,
          }}
        />
      )}
    />
  );
}
