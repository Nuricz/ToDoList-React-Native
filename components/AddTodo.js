import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View, Switch, Modal, Alert } from 'react-native';

export default function AddTodo({
  handleSubmit,
  actual,
  modalVisible,
  setModalVisible,
  editTodo,
  setActual
}) {

  const [title, setTitle] = useState(actual ? actual.title : '');
  const [completed, setCompleted] = useState(false);

  const toggleSwitch = () => setCompleted(previousState => !previousState);

  function onSubmit() {
    const todo = {
      title,
      completed,
      id: actual ? actual.id : null,
    };
    if (actual) {
      editTodo(todo);
    } else {
      handleSubmit(todo);
    }
    setModalVisible(!modalVisible);
    cleanTodo();
  }

  function cleanTodo() {
    setTitle('');
    setCompleted(false);
    setActual(null);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Desea cerrar el formulario?", 'Se perderan los datos sin guardar',
          [
            {
              text: "Cancelar",
              onPress: () => setModalVisible(true),
              style: "cancel"
            },
            { text: "Cerrar", onPress: () => cleanTodo() }
          ],
          {
            cancelable: false,
          }
        );
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{actual ? 'Editar tarea' : 'Agregar tarea'}</Text>
          <View style={styles.formContainer}>
            <View style={styles.formInputs}>
              <Text>Nombre{console.log(actual ? actual.title : title)}</Text>
              <TextInput
                style={styles.input}
                placeholder='Titulo.. '
                onChangeText={setTitle}
                defaultValue={actual ? actual.title : title}
              />
            </View>
            <View style={styles.formInputs}>
              <Text>Estado</Text>
              <Switch
                trackColor={{ false: "#ababab", true: "coral" }}
                thumbColor="#f4f3f4"
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={completed}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button onPress={() => onSubmit({ title: title, completed: completed, id: null })}
                title={actual ? 'Actualizar' : 'Guardar'} color='coral' />
              <Button onPress={() => { setModalVisible(!modalVisible); cleanTodo() }} title='cancelar' color='grey' />
            </View>
          </View>
        </View>
      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
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
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 320,
    height: 200,
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
    justifyContent: "space-between",
    flexDirection: "row",
    width: 220,
  },
  formContainer: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around",
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    fontWeight: 'bold',
  },
})