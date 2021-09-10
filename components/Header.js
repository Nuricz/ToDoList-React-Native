import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Lista de tareas</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 85,
    paddingTop: 38,
    backgroundColor: 'coral',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
