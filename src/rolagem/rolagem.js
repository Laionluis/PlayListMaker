import React from 'react';
import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container, TabsContainer, TabItem, TabText,
} from './styleRolagem.js';

export default function Tabs({ translateY, onCliqueOpcao }) {
  function onCliqueRolagem(opcao) {  
    onCliqueOpcao(opcao);      
  }
  return (
    <Container style={{
      transform: [{
        translateY: translateY.interpolate({
          inputRange: [0, 380],
          outputRange: [0, 30],
          extrapolate: 'clamp',
        }),
      }],
      opacity: translateY.interpolate({
        inputRange: [0, 380],
        outputRange: [1, 0.3],
        extrapolate: 'clamp',
      }),
      alignItems: 'center',
    }}
    >
      <TabsContainer>
        <TouchableOpacity onPress={() => onCliqueRolagem(1)}>
          <TabItem>     
              <View style={{justifyContent: 'center',alignItems: 'center'}}>           
                <Icon name="playlist-star" size={30} color="#FFF" />
              </View>     
              <TabText style={{fontSize: 11}}>{'Criar\nAutomaticamente'}</TabText>          
          </TabItem>  
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onCliqueRolagem(2)}> 
          <TabItem>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>            
              <Icon name="playlist-plus" size={30} color="#FFF" />
            </View>
            <TabText style={{fontSize: 11}}>Criar Manualmente</TabText>
          </TabItem>   
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onCliqueRolagem(3)}> 
          <TabItem>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>            
              <Icon name="playlist-music-outline" size={30} color="#FFF" />
            </View>
            <TabText style={{fontSize: 11}}>Suas Playlists</TabText>
          </TabItem>           
        </TouchableOpacity>     
      </TabsContainer>
    </Container>
  );
}