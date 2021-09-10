import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

export default function TodoItem({ item, handleDelete, openViewTodo, handleEdit }) {
  return (
    <TouchableOpacity style={item.completed ? styles.completed : styles.notCompleted} onPress={() => openViewTodo(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.delete} onPress={() => handleDelete(item.id)}>
          <FontAwesome5 name="trash" size={24} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.edit} onPress={() => handleEdit(item)}>
          <Feather name="edit" size={24} color="white"/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    elevation: 4,
    alignItems: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: 'space-around',
    width: '100%',
  },
  verticalRule: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  title: {
    padding: 5,
    fontSize: 18,
  },
  delete: {
    backgroundColor: '#df4759',
    width: '30%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    padding:5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  edit: {
    backgroundColor: '#5bc0de',
    width: '30%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  completed: {
    backgroundColor: '#bcf4c3',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    elevation: 4,
    alignItems: "center",
  },
  notCompleted: {
    backgroundColor: '#ffd5d5',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    elevation: 4,
    alignItems: "center",
  }
})