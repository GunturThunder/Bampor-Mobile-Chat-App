import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db, auth } from '../../Config/Config';

class Home extends Component{
    handleLogout = () => {
        // Action Logout
        auth.signOut()
            .then(res => console.warn("You'are Logout now",this.props.navigation.navigate("Login"))
            )
      };
    render(){
        return(
            <View>
                <Text>Home</Text>
                <TouchableOpacity style={{backgroundColor:'blue'}} onPress={this.handleLogout}><Text>Logout</Text></TouchableOpacity>
            </View>
        )
    }
}

export default Home