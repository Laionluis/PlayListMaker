import React, { Component, useState, useCallback, Fragment} from "react";
import { View,FlatList, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

class AutoComplete extends Component {  

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        console.log('clicou fora');
    }
  }

  handleInputChange = value => {
    this.props.setEnabled(value);
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.nativeEvent.text;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.nativeEvent.text
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onPress = e => {
    console.log('test');
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onPress,
      onKeyDown,
      handleInputChange,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (  
          <Fragment>        
            <FlatList style={styles.flatList}
                data={filteredSuggestions}
                renderItem={({item}) =>  
                  <TouchableOpacity onPress={this.onPress}>                 
                    <Text style={styles.item}>{item}</Text>         
                  </TouchableOpacity>                      
                }
            />
          </Fragment>  
                          
        );
        handleInputChange(false);
      } else {
        suggestionsListComponent = (
          <View>
            <Text>No suggestions, you're on your own!</Text>
          </View>
        );
        handleInputChange(true);
      }
    } else{
      handleInputChange(true);
    }

    return (
      <View style={styles.container}>        
          <TextInput
            style = {styles.input}  
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <DropDownPicker
              items={[
                  {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />},
                  {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
                  {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
                  {label: 'A', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
                  {label: 'B', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
              ]}
              
              seachableStyle={{}}
              searchableError={() => <Text>Not Found</Text>}
              defaultValue={this.state.country}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.setState({
                  country: item.value
              })}
          />
      
          {suggestionsListComponent}
        
      </View>
    );
  }
}

export default AutoComplete;


const styles = StyleSheet.create({
    input: {   
      height: 30,
      width: '100%',
      alignSelf: 'stretch',
      marginHorizontal: 0,  
      borderColor: '#666',
      borderWidth: 1
    },
    container: {      
      width: '100%',
      padding: 10 
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    flatList: {      
      backgroundColor: 'red',     
      height: 200,
      width: '100%'    
    }
})