import * as React from "react";
import { useState } from "react";
import { View, Image, Text } from "react-native";
import { ObterPerfil } from "../services/DeezerService";

function Deezer({ route, navigation }) {
  const [nome, setNome] = useState(0);
  const [imagem, setImagem] = useState(0);
  var aux = route.params.split('&');
  var token = aux[0].substring(13);
   ObterPerfil(token).then((result) => {
    console.log(result);
    setNome(result.firstname);
    setImagem(result.picture_medium);
  })
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

export default Deezer;
