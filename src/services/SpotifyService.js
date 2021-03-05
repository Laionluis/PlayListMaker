import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, ActivityIndicator, Component } from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation';

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

export async function ObterRecomendacaoes(parametros) 
{
    var nacionalidade = parametros.nacionalidade;
    var genero = parametros.genero;
    var url = 'https://api.spotify.com/v1/recommendations?market=' + nacionalidade + 'seed_genres=' + genero;
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

export async function PesquisarMusicas(parametros) 
{
    
    var descricao = parametros.descricao;
    var accessToken = parametros.accessToken;
    var url = 'https://api.spotify.com/v1/search?query=' + descricao + '&type=track&offset=0&limit=15';
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


export default {ObterPerfil, ObterRecomendacaoes, PesquisarMusicas}