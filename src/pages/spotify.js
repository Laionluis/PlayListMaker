import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, Fragment } from 'react';
import { Animated , TouchableOpacity, FlatList, View, Image, Platform, UIManager, LayoutAnimation, Text, StyleSheet, Button, TextInput, Alert  } from 'react-native';
import { Container, Content, Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation, SafeAreaView} from '../styles/styleSpotify';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {ObterPerfil, ObterRecomendacaoes, PesquisarMusicas} from '../services/SpotifyService';
import styled from 'styled-components/native';
import Menu from '../menu/menu';
import Rolagem from '../rolagem/rolagem';
import { SearchBar } from 'react-native-elements';
import ModalPlaylist from '../controls/ModalPlaylist';

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) 
{
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Spotify({ route, navigation })
{
  const [musics, setMusics] = useState([]);
  const [playlistAtual, setplaylistAtual] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [firstBoxPosition, setFirstBoxPosition] = useState("left");
  const [secondBoxPosition, setSecondBoxPosition] = useState("left");
  const [thirdBoxPosition, setThirdBoxPosition] = useState("left");
  const [nome, setNome] = useState(0);
  const [showLoading, setshowLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [imagem, setImagem] = useState(0);
  const [carregouPerfil, setCarregouPerfil] = useState(0);  //pra nao ficar carregando toda hora 
  const { accessToken } = route.params;

  const toggleThirdBox = () => 
  {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setThirdBoxPosition(thirdBoxPosition === "left" ? "right" : "left");
  };
  

  if(!carregouPerfil)
  {
    ObterPerfil(accessToken).then((result) => 
    {            
      setNome(result.display_name);
      setImagem(result.images[0].url);
      setCarregouPerfil(true);
      setDisabled(true);
      toggleThirdBox();
    })    
  }

  let offset = 0;
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChanged(event) 
  {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  function onChange(e) {   
    const userInput = e;
    setSearch(userInput);
    var dataMusics = [];
    setMusics(dataMusics);    
    if(userInput.length > 3){
      var parametros = {
        descricao: userInput,
        accessToken: accessToken      
      };     
      setshowLoading(true);     
      PesquisarMusicas(parametros).then((result) => 
      {            
        result.tracks.items.forEach(function(name){
          dataMusics.push({id: name.id, title : name.name, artista: name.artists[0].name, imagemUrl: name.album.images[0].url});         
        });
        setMusics(dataMusics);
        setshowLoading(false);
      })
    }    
  }

  function onAdicionarNaPlaylist(item) {  
    const dataplaylists = playlistAtual;
    dataplaylists.push(item); 
    setplaylistAtual(dataplaylists);
    console.log(playlistAtual);
    Alert.alert('Música adicionada na playlist atual.');
  }
 
  return (
    <SafeAreaView>
      <Container>
        <Content>
          <Menu translateY={translateY} imagem={imagem} />          
         
          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <Card style={{
              transform: [{
                translateY: translateY.interpolate({
                  inputRange: [-350, 0, 380],
                  outputRange: [-50, 0, 380],
                  extrapolate: 'clamp',
                }),
              }],
            }}
            >
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666" />
                <Icon name="visibility-off" size={28} color="#666" />
              </CardHeader>
              <CardContent>
                
              </CardContent>
              <CardFooter>
                <Annotation>
                </Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>
          <PanGestureHandler
            enabled={true}
            activeOffsetY={[-50, 70]}
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <Card style={{
              transform: [{
                translateY: translateY.interpolate({
                  inputRange: [-350, 0, 380],
                  outputRange: [-50, 0, 380],
                  extrapolate: 'clamp',
                }),
              }],
            }}
            >
              <CardHeader>
                <SearchBar containerStyle={styles.container}
                  placeholder="Procurar músicas..."
                  showLoading={showLoading}
                  onChangeText={onChange}
                  value={search}
                />               
              </CardHeader>
              <CardContent >
                <Fragment>        
                  <FlatList style={styles.flatList}
                      data={musics}
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
                            <Icon style={{position: 'absolute', right: 0}} name="playlist-add" size={35} color="#666" onPress={() => onAdicionarNaPlaylist(item)}/>
                          </View>   
                        </TouchableOpacity>                      
                      }
                      keyExtractor={item => item.id}
                  />
                </Fragment>  
              </CardContent>
              <CardFooter>                            
                <View style={styles.fixToText}>
                  <ModalPlaylist playlist={playlistAtual}></ModalPlaylist>    
                  <Button
                    title="Salvar"
                    onPress={() => Alert.alert('Salvar')}
                  />
              </View>               
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>
        <Rolagem translateY={translateY} />
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    padding: 0,
    margin: 0
  },
  box: {
    height: 300,
    width: 300,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "blue"
  },
  moveRight: {
    alignSelf: "flex-end"
  },
  buttonContainer: {
    alignSelf: "center"
  },
  input: {   
      height: 30,
      width: 200,
      alignSelf: 'stretch',
      marginHorizontal: 0,  
      borderColor: '#666',
      borderWidth: 1,
      borderRadius: 7
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Spotify;