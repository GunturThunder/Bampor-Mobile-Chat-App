import React, { Component, version } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { db, auth } from '../../Config/Config';
import firebase from 'firebase';
import Userr from '../Global/Global'

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    header: {
        backgroundColor: 'white',
    },
    content: {
        height: 500,
        marginHorizontal: 10,
        marginTop: 10
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
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                uid: props.navigation.getParam('uid'),
            },
            user:[],
            textMessage: '',
            messageList: [],
            // user: [],
            imageSource: Userr.image ? {uri: Userr.image} : require('../../../img/profile/profile1.png'),
            upload: false
        }
    }
   async componentDidMount() {
        await this.getDataUser()
        // console.log(this.state.user.name)
    }

    getDataUser() {
        db.ref('/user/').child(`${auth.currentUser.uid}/`).on('value', (snapshot) => {
            const current_user = auth.currentUser.uid
            const data = snapshot.val()
            const user = Object.values(data)
            console.log('data', data)
            this.setState({
                user: data
            })
        })
    }
    // changeName = async () => {
    //     if(this.state.name.length < 3){
    //         Alert.alert('Error , Pleaser Enter Valid Name');
    //     }
    //     else if()
    // }
    handleLogout = () => {
        // Action Logout
        auth.signOut()
            .then(res =>(this.props.navigation.navigate("Login"))
            )
    };
    changeImage = () => {
        const option = {
            quantity: 0.7, allowsEditing: true, mediaType: 'photo', noData: true,
            storageOptions: {
                skipBackup: true, waitUntilSaved: true, path: 'images', cameraRoll: true
            }
        }
        ImagePicker.showImagePicker(option, response => {
            if (response.error) {
                console.log(error)
            }
            else if (!response.didCancel) {
                this.setState({
                    upload: true,
                    imageSource: { uri: response.uri }
                }, this.uploadFile)
            }
        })
    }

    uploadUserImage = (imageUrl) => {
        Userr.image = imageUrl;
        db.ref('user').child(`${auth.currentUser.uid}`).update({ image: imageUrl });
        Alert.alert('Succses', 'Image Changed Succsessful')
        this.setState({ upload: false, imageSource: { uri: imageUrl } })
    }

    uploadFile = async () => {
        const file = await this.uriToBlob(this.state.imageSource.uri);
        firebase.storage().ref(`profile_pictures/${this.state.user.uid}.png/`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => this.uploadUserImage(url))
            .catch(error => {
                this.setState({
                    upload: false,
                    imageSource: require('../../../img/profile/profile1.png')
                });
                Alert.alert('Error', 'Error On Upload Image')
            })

    }

    uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                reject(new Error('Error on upload image'));
            };

            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);

        })
    }

    render() {
        // console.log(this.state.user[0].uid)
        console.log(this.state.user)
        return (
            <View style={styles.wrap}>

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ marginBottom: 15 }}>
                            <Icon name="arrow-back" style={{ marginLeft: 20, marginTop: 20, color: '#75797C' }}></Icon>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: -40 }}><Text style={{ fontSize: 20, color: '#75797C' }}>Profile</Text></View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{ height: 250, backgroundColor: 'white', borderRadius: 10 }}>
                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity onPress={this.changeImage} style={{ width: 95, height: 95, borderRadius: 50, borderWidth: 3, borderColor: '#5579F1', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    this.state.upload ? <ActivityIndicator size="large" /> :
                                        <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{uri : `${this.state.user.image}`}} />
                                }

                            </TouchableOpacity>
                            <TextInput value={auth.currentUser.displayName} style={{ borderRadius: 10, padding: 10, fontSize: 18, fontWeight: 'bold', color: '#515151', backgroundColor: '#F8F8F8', width: 200, marginTop: 10 }} />
                            <TouchableOpacity onPress={() => { }} style={{ height: 50, backgroundColor: '#5579F1', paddingHorizontal: 85, marginTop: 10, justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Save Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 18, backgroundColor: 'white', height: 50, borderRadius: 10 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ComingSoon')} >
                                <Text style={{ fontSize: 18 }}>Closest Friend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BookNow')}>
                                <Icon name="arrow-forward"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 18, backgroundColor: 'white', height: 50, borderRadius: 10 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Text style={{ fontSize: 18 }} onPress={() => this.props.navigation.navigate('ComingSoon')}>Contact</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Icon name="arrow-forward"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 18, backgroundColor: 'white', height: 50, borderRadius: 10 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ComingSoon')} >
                                <Text style={{ fontSize: 18 }} >Other Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Icon name="arrow-forward"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 18, backgroundColor: 'white', height: 50, borderRadius: 10 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 50, alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.handleLogout} >
                                <Text style={{ fontSize: 18 }}>Logut</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleLogout} >
                                <Icon name="arrow-forward"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default User;