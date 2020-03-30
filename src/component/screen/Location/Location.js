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
            <View style={{flex:1}}>
            <MapView
                style={{ flex: 1, width: window.width }} //window pake Dimensions
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
        )
    }
}

export default FriendsProfile;