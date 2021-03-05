import React, { useState, Fragment } from "react";
import { Alert, Modal, StyleSheet, Text, Button, View, TouchableWithoutFeedback, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ModalPlaylist({ playlist })
{
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {         
          setModalVisible(!modalVisible);
        }}
      >
       <TouchableWithoutFeedback onPress={() => {setModalVisible(false)}}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Fragment>        
              <FlatList style={styles.flatList}
                  data={playlist}
                  renderItem={({item}) =>  
                    <TouchableOpacity>    
                      <View style={styles.item}>       
                        <Image
                            style={{ width: 50, height: 50, marginLeft: 4,marginRight: 4 }}
                            source={{
                                uri: item.imagemUrl ?? '',
                            }}
                        />     
                        <View style={{ width: 180}}>     
                          <Text>{item.title}</Text>
                          <Text style={{fontSize: 12}}>{item.artista}</Text> 
                        </View> 
                        <Icon style={{position: 'absolute', right: 0}} name="delete-forever" size={35} color="#666"/>
                      </View>   
                    </TouchableOpacity>                      
                  }
                  keyExtractor={item => item.id}
                />
              </Fragment>  
            <Button
              title="Voltar"
              onPress={() => setModalVisible(!modalVisible)}
            >
            </Button>
          </View>
        </View>
      </Modal>
      <Button
        title="Ver Playlist"
        onPress={() => setModalVisible(true)}
      >
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    minWidth: '70%',
    height: '70%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  flatList: {         
    height: '100%', 
  },
  item: {         
    flex: 1,
    flexDirection: 'row', 
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 3,
  },
});
