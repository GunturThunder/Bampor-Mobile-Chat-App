import React, { Component } from 'react';
import { View,Text,TextInput,TouchableOpacity, AsyncStorage } from 'react-native';

class Home extends Component{
    state={
        phone:'',
        name:''
    }
    handleChange = key => val =>{
        this.setState({[key]:val})
    }
  

    submitForm = () =>{
        alert(this.state.phone+'\n'+this.state.name)
    }
    render(){
        return(
            <View style={{justifyContent:'center',flex:1}}>
                <TextInput style={{borderWidth:1,borderColor:'black'}} placeholder="Email" value={this.state.phone} onChangeText={this.handleChange('phone')} />
                <TextInput style={{borderWidth:1,borderColor:'black'}} placeholder="Name" value={this.state.name} onChangeText={this.handleChange('name')}/>
                <TouchableOpacity onPress={this.submitForm}>
                    <Text>Enter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home