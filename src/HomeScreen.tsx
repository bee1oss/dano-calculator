import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, BackHandler } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Product } from './data/defaultProducts';
import { readFromFile } from './Product/fileOperations';
import { defaultProducts } from './data/defaultProducts';

const HomeScreen: React.FC = () => {
  const [products,setProducts] = useState<Product[]>([]);

  useEffect(() =>{
    readFromFile(setProducts,defaultProducts)
  })

  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
