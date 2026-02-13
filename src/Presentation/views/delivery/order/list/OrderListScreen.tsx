import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StatusBar, useWindowDimensions, FlatList } from "react-native";
import useOrderListViewModel from "./OrderListViewModel";
import { TabView, TabBar } from "react-native-tab-view";
import { MyColors } from "../../../../theme/AppTheme";
import OrderListItem from "./Item";

export default function DeliveryOrderListScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      style={{ backgroundColor: "white" }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: MyColors.grayLight }}
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


interface Props {
  status: string;
}
function OrderListView({ status }: Props) {
  const {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrders,
    user,
  } = useOrderListViewModel();

  //Estado de la status bar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, []),
  );

  useEffect(() => {
    getOrders(user?.id!, status);
  }, [user]);

  return (
    <View>
      <FlatList
        data={
          status === "DESPACHADO"
            ? ordersDispatched
            : status === "EN CAMINO"
              ? ordersOnTheWay
              : status === "ENTREGADO"
                ? ordersDelivery
                : []
        }
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
}

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case "first":
      return <OrderListView status="DESPACHADO" />;

    case "second":
      return <OrderListView status="EN CAMINO" />;

    case "third":
      return <OrderListView status="ENTREGADO" />;

    default:
      return <OrderListView status="DESPACHADO" />;
  }
};

const routes = [
  { key: "first", title: "DESPACHADO" },
  { key: "second", title: "EN CAMINO" },
  { key: "third", title: "ENTREGADO" },
];

