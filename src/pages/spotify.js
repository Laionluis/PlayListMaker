import * as React from 'react';
import { useState } from 'react';
import { View, Image, Text } from 'react-native';
import {ObterPerfil} from '../services/SpotifyService';

function Spotify({ route, navigation }) {
  const [nome, setNome] = useState(0);
  const [imagem, setImagem] = useState(0);
  const { accessToken } = route.params;
  ObterPerfil(accessToken).then((result) => {
    console.log(result);
    setNome(result.display_name);
    setImagem(result.images[0].url);
  })
  return (
    <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center' }}>
      <Text>Nome: {nome}</Text>
      <Image
        style={{width: 100, height: 100,}}
        source={{
          uri: imagem
        }}
      />
    </View>
  );
}

export default Spotify;