import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import HomeScreen from './src/HomeScreen';
import ProductManagerScreen from './src/ProductManagerScreen';

export type RootTabParamList = {
  Hesaplama:undefined;
  'Ürün Yönetimi':undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hesaplama" component={HomeScreen} />
        <Tab.Screen name="Ürün Yönetimi" component={ProductManagerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
