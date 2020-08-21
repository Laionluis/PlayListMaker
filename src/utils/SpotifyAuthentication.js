import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import { Button } from 'react-native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, ActivityIndicator, Component } from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

var myAppId = '50083dcc75f24a2e9d03aa5edcc20afc';
var mySecretId = '2c71ade09e8a40fd8b71025bee3c795d';
var myRedirectUri = '';  //quando o app buildar tem que colocar o link certo aqui e no app do spotifydeveloper

if (typeof document != 'undefined') //se for web
{
  myRedirectUri = 'http://localhost:19006/'; //se tiver um site
} else
{
  myRedirectUri = 'exp://192.168.1.6:19000/';
}

export default function SpotifyAuthentication() {
  const [request, response, promptAsync ] = useAuthRequest(
    {
      clientId: myAppId,
      clientSecret: mySecretId,
      scopes: [        
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
      ], 
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: myRedirectUri
    },
    discovery
  );

  // cuida da resposta do login
  React.useEffect(() => {   
     if (!mySecretId || !request || !discovery || response?.type !== 'success') {
      return;
     }
     if (response.params.code) {
      AuthSession.exchangeCodeAsync(
        {
          clientId: request.clientId,
          clientSecret: request.clientSecret ?? mySecretId,
          redirectUri: request.redirectUri,
          scopes: request.scopes,
          code: response.params.code,
          extraParams: {
            // @ts-ignore: allow for instances where PKCE is disabled
            code_verifier: request.codeVerifier,
          },
        },
        discovery
      ).then(token => {
        RootNavigation.navigate('Spotify', token);
      });
    } else if (response.params.access_token) {
      RootNavigation.navigate('Spotify', AuthSession.TokenResponse.fromQueryParams(response.params));
    } else {
      console.warn('unexpected response: ', response);
    }   
  }, [response, discovery, request]);

  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    disabled : !request,                        
    style: styles.SpotifyButton, 
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {setIsPress(true); promptAsync();},                     
  };

  //{isPress? <ActivityIndicator size="small" color="white" /> : "Entrar com Spotify"}
  return (
    <TouchableOpacity
      {...touchProps}>      
      <Text id="TextEntrarSpotify" style = {styles.submitButtonText}> Entrar com Spotify </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
   SpotifyButton: {        
        backgroundColor:"#1db954",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:15,
        marginBottom:10
   },
    submitButtonText:{
      color: 'white'
   }
})