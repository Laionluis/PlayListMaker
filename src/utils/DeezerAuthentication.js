import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as AuthSession from "expo-auth-session";
import { Button } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Component,
} from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";
import { myAppIdDeezer, mySecretIdDeezer } from "../../clientIds.js";

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

// Endpoint
const discovery = {
  authorizationEndpoint: "https://connect.deezer.com/oauth/auth.php",
  tokenEndpoint: "https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php/",
};

var myRedirectUri = ""; //quando o app buildar tem que colocar o link certo aqui e no app do spotifydeveloper

if (typeof document != "undefined") {
  //se for web
  myRedirectUri = "http://localhost:19006/"; //se tiver um site
} else {
  myRedirectUri = "exp://192.168.1.6:19000/";
}

export default function DeezerAuthentication() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: myAppIdDeezer,
      clientSecret: mySecretIdDeezer,
      scopes: ["basic_access", "email", "offline_access", "manage_library"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      // For usage in managed apps using the proxy
      redirectUri: myRedirectUri,
    },
    discovery
  );

  // cuida da resposta do login
  React.useEffect(() => {
    if (
      !mySecretIdDeezer ||
      !request ||
      !discovery ||
      response?.type !== "success"
    ) {
      return;
    }
    if (response.params.code) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://connect.deezer.com/oauth/access_token.php?app_id="+request.clientId+'&secret='+mySecretIdDeezer+'&code='+response.params.code+'&response_type=token';  
        fetch(proxyurl + url, {
            method: 'POST'
        }).then(response => response.text())
        .then(contents => RootNavigation.navigate('Deezer', contents))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    } else if (response.params.access_token) {
      RootNavigation.navigate("Deezer",AuthSession.TokenResponse.fromQueryParams(response.params)
      );
    } else {
      console.warn("unexpected response: ", response);
    }
  }, [response, discovery, request]);

  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    disabled: !request,
    style: styles.DeezerButton,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {
      setIsPress(true);
      promptAsync();
    },
  };

  //{isPress? <ActivityIndicator size="small" color="white" /> : "Entrar com Spotify"}
  return (
    <TouchableOpacity {...touchProps}>
      <Text id="TextEntrarSpotify" style={styles.submitButtonText}>
        {" "}
        Entrar com Spotify{" "}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  DeezerButton: {
    backgroundColor: "#ef5466",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
  },
});
