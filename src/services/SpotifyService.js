import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, ActivityIndicator, Component } from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation';
import axios from 'axios';

export async function ObterPerfil(accessToken) 
{
    var url = 'https://api.spotify.com/v1/me';
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    });
    const json = await res.json();
    return json;
}


export default {ObterPerfil}