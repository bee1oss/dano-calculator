import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import HomeScreen from './screens/HomeScreen';
import ProductManagerScreen from './screens/ProductManagerScreen';

export type RootTabParamList = {
  Teslimat:undefined;
  'Ürün Yönetimi':undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Teslimat" component={HomeScreen} />
        <Tab.Screen name="Ürün Yönetimi" component={ProductManagerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
