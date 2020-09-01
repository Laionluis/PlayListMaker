import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { Animated , View, Image, Platform, UIManager, LayoutAnimation, Text, StyleSheet, Button} from 'react-native';
import {
  Container,
  Content,
  Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation, SafeAreaView,
} from '../styles/styleSpotify';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {ObterPerfil} from '../services/SpotifyService';
import styled from 'styled-components/native';
import Menu from '../menu/menu';
import Rolagem from '../rolagem/rolagem';

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) 
{
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Spotify({ route, navigation })
{
  const [firstBoxPosition, setFirstBoxPosition] = useState("left");
  const [secondBoxPosition, setSecondBoxPosition] = useState("left");
  const [thirdBoxPosition, setThirdBoxPosition] = useState("left");

  const toggleThirdBox = () => 
  {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setThirdBoxPosition(thirdBoxPosition === "left" ? "right" : "left");
  };

  const [nome, setNome] = useState(0);
  const [imagem, setImagem] = useState(0);
  const [carregouPerfil, setCarregouPerfil] = useState(0);  //pra nao ficar carregando toda hora 
  const { accessToken } = route.params;

  if(!carregouPerfil)
  {
    ObterPerfil(accessToken).then((result) => 
    {
      console.log(result);
      setNome(result.display_name);
      setImagem(result.images[0].url);
      setCarregouPerfil(true);
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
                <Title>Teste</Title>
                <Description>Teste</Description>
              </CardContent>
              <CardFooter>
                <Annotation>
                </Annotation>
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
    backgroundColor: 'white',
    alignItems: "flex-start",
    justifyContent: "center"
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
  }
});

export default Spotify;