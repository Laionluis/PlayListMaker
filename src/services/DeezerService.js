import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, ActivityIndicator, Component } from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation';

export async function ObterPerfil(accessToken) 
{
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'https://api.deezer.com/user/me?access_token=' + accessToken;
    const res = await fetch(proxyurl + url, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    });
    const json = await res.json();
    return json;
}


export default {ObterPerfil}