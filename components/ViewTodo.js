import React from "react";
import { StyleSheet, Text, Button, View, Modal } from 'react-native';

export default function AddTodo({ openTodo, setOpenTodo, todo }) {

  if (todo != null)
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={openTodo}
        onRequestClose={() => {
          setOpenTodo(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formContainer}>
              <View style={styles.formInputs}>
                <Text style={styles.titles}>Nombre</Text>
                <Text>{todo.title}</Text>
              </View>
              <View style={styles.formInputs}>
                <Text style={styles.titles}>Estado</Text>
                <Text style={todo.completed ? styles.complete : styles.notComplete}>{todo.completed ? 'Completado' : 'Sin completar'}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Button onPress={() => setOpenTodo(false)} title='Cerrar' color='coral' />
              </View>
            </View>
          </View>
        </View>
      </Modal >
    )
  else
    return (null)
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  form: {
    flexDirection: 'row',
  },
  formContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: 190,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  formInputs: {
    justifyContent: "center",
    flexDirection: "column",
  },
  formContainer: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  titles: {
    fontWeight: "bold",
    fontSize: 18,
    color: 'coral',
  },
  complete: {
    color: 'green',
  },
  notComplete: {
    color: 'red',
  },
})