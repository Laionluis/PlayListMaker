import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
import SpotifyAuthentication from "./utils/SpotifyAuthentication";
import DeezerAuthentication from "./utils/DeezerAuthentication";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

class Login extends Component {
   constructor(props) {
    super(props);
   }
   state = {
      email: '',
      password: '',
      dimensions: {        
        screen,
        window
      }
   }

   onChange = ({ window, screen }) => {      
      console.log(screen, window);
      this.setState({ dimensions: { window, screen } });
   };

   componentDidMount() {
       Dimensions.addEventListener("change", this.onChange);
   }
   componentWillUnmount() {
       Dimensions.removeEventListener("change", this.onChange);
   }
   render() {
      const { dimensions } = this.state;
      return (
         <View style = {{flex:1,  justifyContent:'center', backgroundColor: '#003f5c'}}>         
            
            <View>            
                <View>
                     <SpotifyAuthentication/>
                </View>
                <View>
                     <DeezerAuthentication/>
                </View>
            </View>
         </View>
      )
   }
}
export default Login

const styles = StyleSheet.create({
   container: {
        justifyContent: 'center',
   },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
   input: {
      margin: 15,
      height: 40,
      marginHorizontal: 20,
      paddingLeft: 45,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   EntrarButton: {
        backgroundColor:"#fb5b5a",
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