import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container, TabsContainer, TabItem, TabText,
} from './styleRolagem.js';

export default function Tabs({ translateY }) {
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
    }}
    >
      <TabsContainer>
        <TabItem>
          <Icon name="person-add" size={30} color="#FFF" />
          <TabText style={{fontSize: 11}}>{'Criar\nAutomaticamente'}</TabText>
        </TabItem>  
        <TabItem>
          <Icon name="person-add" size={30} color="#FFF" />
          <TabText style={{fontSize: 11}}>Criar Manualmente</TabText>
        </TabItem>   
        <TabItem>
          <Icon name="person-add" size={30} color="#FFF" />
          <TabText style={{fontSize: 11}}>Suas Playlists</TabText>
        </TabItem>               
      </TabsContainer>
    </Container>
  );
}