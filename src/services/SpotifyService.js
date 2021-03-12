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

export async function CriarPlaylist(parametros) 
{    
    var user_id = parametros.user_id;
    var nome = parametros.nome;
    var descricao = parametros.descricao;
    var publico = parametros.publico;
    var accessToken = parametros.accessToken;
    var url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: nome,
            description: descricao,
            public: publico
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    });
    const json = await res.json();
    return json;
}

export async function AddMusicasNaPlaylist(parametros) 
{       
    var playlist_id = parametros.playlist_id;
    var musicas = parametros.musicas;
    var accessToken = parametros.accessToken;
    var tracks = '';
    musicas.forEach(function(item){
        tracks += 'spotify:track:' + item.idSpotify + ',';        
    });
    tracks = tracks.substring(0, tracks.length - 1);
    var url = 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks?uris=' + tracks;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    });
    const json = await res.json();
    return json;
}

export async function PesquisarPlaylists(parametros) 
{    
    var accessToken = parametros.accessToken;
    var url = 'https://api.spotify.com/v1/me/playlists';
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

export default {ObterPerfil, ObterRecomendacaoes, PesquisarMusicas, CriarPlaylist, AddMusicasNaPlaylist, PesquisarPlaylists}