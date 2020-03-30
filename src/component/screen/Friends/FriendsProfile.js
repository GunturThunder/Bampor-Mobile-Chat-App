import React, { Component, version } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { db, auth } from '../../Config/Config';
import firebase from 'firebase';
import Userr from '../Global/Global';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    header: {
        backgroundColor: 'white',
    },
    content: {
        // height: 500,
        // marginHorizontal: 10,
        // marginTop: 10
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'

    },
})
// console.log(Userr.image)
class FriendsProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                uid: props.navigation.getParam('uid'),
                image: props.navigation.getParam('image'),
                longitude: props.navigation.getParam('longitude'),
                latitude: props.navigation.getParam('latitude'),
                email: props.navigation.getParam('email'),
            }
        }
    }
    render() {
        console.log(this.state.person)
        
        return (
            <View style={styles.wrap}>
                <ScrollView >
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ marginBottom: 15 }}>
                                <Icon name="md-arrow-back" style={{ marginLeft: 20, marginTop: 20, color: '#75797C', fontSize: 20 }}></Icon>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: -40 }}><Text style={{ fontSize: 20, color: '#75797C' }}>{this.state.person.name}</Text></View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={{ height: 250, backgroundColor: 'white', borderRadius: 10 }}>
                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.state.person.image }} />
                        </View>
                        <View style={{ backgroundColor: 'white', marginTop: 10, paddingVertical: 15 }}>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text style={{ color: '#75797C', fontSize: 15 }}>About and Email</Text>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#D4D4D6' }}>
                                    <Text style={{ color: '#75797C', fontSize: 15., marginVertical: 10 }}>Busy</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#75797C', fontSize: 15., marginVertical: 10, marginRight: 30 }}>{this.state.person.email}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Inbox', this.state.person)}>
                                        <Icon name="ios-chatbubbles" style={{ fontSize: 30, color: '#075E54' }} />
                                    </TouchableOpacity>
                                        <Icon name="ios-call" style={{ fontSize: 30, color: '#075E54', marginLeft: 30 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', marginTop: 10, paddingVertical: 15 }}>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text style={{ color: '#75797C', fontSize: 15, marginBottom: 10 }}>{this.state.person.name} 's Location</Text>
                                <MapView
                                    style={{ height: 250 }} //window pake Dimensions
                                    region={{
                                        latitude: this.state.person.latitude,
                                        longitude: this.state.person.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }} >
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: this.state.person.latitude,
                                            longitude: this.state.person.longitude,
                                        }}
                                        title={this.state.person.name} />
                                </MapView>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default FriendsProfile;