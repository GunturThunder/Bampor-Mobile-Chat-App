import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image, StyleSheet, TextInput, FlatList, StatusBar } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { db, auth } from '../../Config/Config';
import { Icon, Header, Tab, Tabs, TabHeading } from 'native-base';
import ChatScreen from './ChatScreen';
import StatusScreen from './StatusScreen';
import CallScreen from './CallScreen';
import GetLocation from 'react-native-get-location'

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 17
    },
    wrapChat: {
        marginHorizontal: 20,
    }
})

class Home extends Component {
    state = {
        users: [],
        latitude: '',
        longitude: ''
      }
  
      getLocation(){
        const id = auth.currentUser.uid
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000
        })
        .then(location => {
          db.ref('/user/' + id ).child("latitude").set(location.latitude)
          db.ref('/user/' + id ).child("longitude").set(location.longitude)
        })
        .catch(error => {
          const { code, message} = error;
          console.warn(code, message);
        })
        this._isMounted = true;
      }
  
      componentDidMount(){
        this.getLocation()
      }
      
    handleLogout = () => {
        // Action Logout
        auth.signOut()
            .then(res =>(this.props.navigation.navigate("Login"))
            )
    };

    render() {
        // console.log("aaaaa"+this.state.longitude)
        return (
            <View style={styles.wrap}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View>
                    <Image style={{ position: 'absolute',height:100 }} source={require('../../../img/pic1fix.png')} />
                    <View style={{ marginHorizontal: 30, marginTop: 14 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Bampor</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profiles')}><Icon style={{ color: 'white',fontSize: 20, }} name="settings" /></TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#DDDEFD', borderRadius: 25, justifyContent: 'center',height:35,marginTop:5 }}>
                            <Icon style={{ color: '#6B6B6F', position: 'absolute', marginLeft: 15, paddingTop: 2 }} name="search"></Icon>
                            <View >
                                <TextInput onChangeText={this.searchHotelHadle} style={{ placeholderTextColor: '#BDC0C6', marginLeft: 45, marginHorizontal: 30 }} placeholder="Search ..." />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <Tabs>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#9283F8' }}><Text style={{ color: 'white' }}>Chat</Text></TabHeading>}>
                            <ChatScreen navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#9283F8' }}><Text style={{ color: 'white' }}>Friends Location</Text></TabHeading>}>
                            <StatusScreen navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#9283F8' }}><Text style={{ color: 'white' }}>Contacts</Text></TabHeading>}>
                            <CallScreen navigation={this.props.navigation} />
                        </Tab>
                    </Tabs>
                </View>
            </View>
        )
    }
}

export default Home