import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image, StyleSheet, TextInput, FlatList } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { db, auth } from '../../Config/Config';
import { Icon, Header, Tab, Tabs, TabHeading } from 'native-base';
import ChatScreen from './ChatScreen';
import StatusScreen from './StatusScreen';
import CallScreen from './CallScreen';

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
    handleLogout = () => {
        // Action Logout
        auth.signOut()
            .then(res =>(this.props.navigation.navigate("Login"))
            )
    };

    render() {
        return (
            <View style={styles.wrap}>
                <View>
                    <Image style={{ position: 'absolute' }} source={require('../../../img/pic1fix.png')} />
                    <View style={{ marginHorizontal: 30, marginTop: 14 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 33, color: 'white', fontWeight: 'bold' }}>Bampor</Text>
                            <TouchableOpacity onPress={this.handleLogout}><Icon style={{ color: 'white' }} name="settings" /></TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#DDDEFD', borderRadius: 25, marginTop: 24, justifyContent: 'center' }}>
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
                        <Tab heading={<TabHeading style={{ backgroundColor: '#9283F8' }}><Text style={{ color: 'white' }}>Status</Text></TabHeading>}>
                            <StatusScreen navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#9283F8' }}><Text style={{ color: 'white' }}>Call</Text></TabHeading>}>
                            <CallScreen navigation={this.props.navigation} />
                        </Tab>
                    </Tabs>
                </View>
            </View>
        )
    }
}

export default Home