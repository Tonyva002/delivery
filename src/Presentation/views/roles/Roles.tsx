import React from 'react';
import { View, Dimensions } from 'react-native';
import useRolesViewModel from './ViewModel';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RolesItem from './item';
import { StackParamList } from '../../navigator/MainStackNavigator';

type RolesScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "RolesScreen">;
};

export default function RolesScreen({navigation}: RolesScreenProps) {
  
  const { user } = useRolesViewModel();
  const width = Dimensions.get('window').width;
  const heigth = Dimensions.get('window').height;

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      
      count: index - progress.value,
      animated: true,
    });
  };

  return (
   
    <GestureHandlerRootView style={{flex: 1, justifyContent: 'center'}}>
     <View>
      <Carousel
        ref={ref}
        width={width}
        height={heigth / 2}
        data={user?.roles || []}
        onProgressChange={progress}
        renderItem={({item }) => (
          <RolesItem
          rol={item}
          height={400}
          width={width - 100}
          navigation={navigation}
           />
        )}
      />
 
      <Pagination.Basic
        progress={progress}
        data={user?.roles || []}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
    </GestureHandlerRootView>
  );
}
