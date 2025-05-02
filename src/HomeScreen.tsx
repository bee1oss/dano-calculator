import React from 'react';
import { View, Text, Button, StyleSheet, BackHandler } from 'react-native';

const HomeScreen: React.FC = () => {
  const handleExit = () => {
    BackHandler.exitApp(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teslimat Ekranı    </Text>
      <Button title="Çıkış Yap" onPress={handleExit} color="red" />
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
