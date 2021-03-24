import React, { useState, Fragment } from "react";
import { Alert, Modal, StyleSheet, Text,TextInput, Button, View, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator, CheckBox } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {findAll, deleteData} from '../services/playListService';
import {CriarPlaylist, AddMusicasNaPlaylist} from '../services/SpotifyService';

export default function ModalPlaylist({userId, accessToken})
{
    const [modalVisible, setModalVisible] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [apertouSalvar, setApertouSalvar] = useState(false);
    const [terminou, setTerminou] = useState(false);
    const [isSelected, setSelection] = useState(true);

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nomeError, setNomeError] = useState('');
    const [sucesso, setSucesso] = useState('');
    
    function salvarPlaylist(playlist) {  
        if(playlist.length == 0){
            setNomeError("Playlist Vazia.");
            setSucesso('');
        } else{
            setNomeError(null);
            setApertouSalvar(true);
            var parametros = {
                nome: nome,
                descricao: descricao,
                publico: isSelected,
                user_id: userId,
                accessToken: accessToken
            };     
            CriarPlaylist(parametros).then((resp) => {
                var parametros2 = {
                    playlist_id: resp.id,                    
                    accessToken: accessToken,
                    musicas: playlist
                };     
                AddMusicasNaPlaylist(parametros2).then((retorno) =>{
                    setTerminou(true);
                    setApertouSalvar(false);
                    setSucesso("Playlist salva com sucesso, para ver suas playlists clique em 'Suas Playlists'.");
                    setNome('');
                    setDescricao('');
                    setSelection(true);
                    setTimeout(() => {setTerminou(false)}, 3000);
                });                    
            }).catch((error) => {
                setNomeError(error);
                setSucesso('');
                setApertouSalvar(false);
            });   
        }
    }

    function salvar() {  
        if (nome.trim() === "") {
            setNomeError("Nome é obrigatório.");
            setSucesso('');
        } else {            
            findAll().then(resp => salvarPlaylist(resp));      
        }        
    }

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
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Nome playlist"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={text => setNome(text)}
               value={nome}
               />
            {!!nomeError && (
            <Text style={{ color: "red" }}>{nomeError}</Text>
            )}
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Descrição playlist"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={text => setDescricao(text)}
               value={descricao}
               />
            <View style={styles.fixToText}>
                <CheckBox    
                    style={{alignSelf: "center", color: '#7a42f4'}}
                    value={isSelected}
                    onValueChange={setSelection}
                    onValueChange={setSelection}          
                />
                <Text style={{marginTop: 8, color: '#7a42f4'}} >Público</Text>
            </View>
            <View style={styles.fixToText}>  
                <TouchableOpacity
                    style={styles.Buttons}                                    
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text> Cancelar </Text>        
                </TouchableOpacity>  
                <TouchableOpacity
                    style={styles.Buttons}                                    
                    onPress={() => salvar()}>
                    <Text style={apertouSalvar? {display: 'none'} : !terminou? {display: 'flex'} : {display: 'none'}}> Salvar </Text>
                    <ActivityIndicator size="small" color="#00ff00" 
                        style={apertouSalvar && !terminou? {display: 'flex'} : {display: 'none'}} 
                    />
                    <Icon style={terminou? {display: 'flex'} : {display: 'none'}} 
                        name="done" size={20} color="#00ff00"
                    />
                </TouchableOpacity>      
            </View>
            {!!sucesso && terminou && (
            <Text style={{ color: "green" }}>{sucesso}</Text>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.Buttons}                                    
        onPress={() => setModalVisible(true)}>
        <Text> Salvar </Text>        
      </TouchableOpacity>     
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
    padding: 10,
    elevation: 2
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
    backgroundColor: 'white',
    flexDirection: 'row', 
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 3,
  },
  Buttons: {
      backgroundColor:"#666",
      borderRadius:25,
      height:35,
      width:100,
      alignItems:"center",
      justifyContent:"center",
      marginTop:15,
      marginBottom:10,
   },
   input: {
      margin: 5,
      width: 200,
      marginHorizontal: 20,
      padding: 5,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
  },
});
