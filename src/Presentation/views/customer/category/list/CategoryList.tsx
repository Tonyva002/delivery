import React, { useEffect } from "react";
import { View, Dimensions, StatusBar } from "react-native";
import useCustomerCategoryListViewModel from "./ViewModel";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomerCategoryItem from "./Item";
import { ClientStackParamList } from "../../../../navigator/CustomerStackNavigator";
import { useFocusEffect } from "@react-navigation/native";

type CategoryListScreenProps = {navigation: NativeStackNavigationProp<ClientStackParamList,"CustomerCategoryListScreen" >;
};

export default function CustomerCategoryListScreen({
  navigation,
}: CategoryListScreenProps) {
  const { categories, getCategories } = useCustomerCategoryListViewModel();

  const width = Dimensions.get("window").width;
  const heigth = Dimensions.get("window").height;

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );

  useEffect(() => {
    getCategories();
  }, []);

  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <GestureHandlerRootView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}
    >
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          top: heigth * 0.1,
        }}
      >
        <Carousel
          ref={ref}
          width={width}
          height={heigth * 0.6}
          data={safeCategories}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <CustomerCategoryItem
              category={item}
              height={heigth * 0.62}
              width={width - 70}
              navigation={navigation}
            />
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={safeCategories}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 20 }}
          onPress={onPressPagination}
        />
      </View>
    </GestureHandlerRootView>
  );
}
