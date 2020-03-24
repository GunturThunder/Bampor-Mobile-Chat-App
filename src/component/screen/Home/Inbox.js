import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import { db, auth, time } from '../../Config/Config'

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 100,
        backgroundColor: '#5579F1'
    },
    content: {
        flex: 1,
        // backgroundColor:'white'
    },
    contentChat: {
        flex: 1,
        marginHorizontal: 20
    },
    chat1: {
        backgroundColor: '#5579F1',
        marginTop: 20,
        width: 200,
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    chat2: {
        backgroundColor: '#E2E5F5',
        marginTop: 20,
        width: 200,
        padding: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    keyboard: {
        flex: 1,
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 30,
        color: 'white',
    },
})

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                uid: props.navigation.getParam('uid'),
            },
            textMessage: '',
            messageList: [],
            user: []
        }
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = (await db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.person.uid}/`).push()).key
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: time,
                from: auth.currentUser.uid
            }
            updates['messages/' + auth.currentUser.uid + '/' + this.state.person.uid + '/' + msgId] = message
            updates['messages/' + this.state.person.uid + '/' + auth.currentUser.uid + '/' + msgId] = message
            db.ref().update(updates);
            this.setState({ textMessage: '' })
        }
    }
    componentDidMount() {
        db.ref('/messages/').child(`${auth.currentUser.uid}/`).child(`${this.state.person.uid}/`)
            .on('child_added', (value) => {
                console.log(value.val())
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }
    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        // if(c.getDay() !== d.getDay()) {
        //     result = d.getDay() + '' + d.getMonth() + '' + result;
        // } 
        return result
    }
    renderRowProfile = ({ item }) => {
        return (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Zlatan Ibrahimovic</Text>
                <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={require('../../../img/profile1.png')} />
            </View>
        )
    }
    renderRow = ({ item }) => {
        // console.log(item)
        const Check = () => {
            if (item.from === auth.currentUser.uid) {
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'flex-end', marginRight: 30, color: '#B8B8B8' }}>{this.convertTime(item.time)}</Text>
                        </View>
                        <View style={styles.chat1}>
                            <Text style={{ color: item.from === auth.currentUser.uid ? 'white' : '#464646' }}>{item.message} </Text>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.chat2}>
                            <Text style={{ color: '#464646' }}>{item.message}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'flex-start', marginLeft: 30, color: '#B8B8B8' }}>{this.convertTime(item.time)}</Text>
                        </View>
                    </View>
                )
            }
        }
        return (
            <View>
                <Check />
            </View>
        )
    }
    render() {
        // console.log(props.navigation.getParam('uid'))
        // console.log(this.state.messageList)
        console.log(auth.currentUser.uid)
        return (

            <View style={styles.wrap}>
                <View style={styles.header}>
                    <View style={{ marginHorizontal: 20, marginVertical: 8 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}><Icon style={{ color: 'white', fontSize: 25 }} name="ios-arrow-back" /></TouchableOpacity>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <FlatList
                                data={this.state.person.uid}
                                renderItem={this.renderRowProfile}
                                keyExtractor={(item) => item.uid}
                            />
                        </View>
                        <Text style={{ fontSize: 12, color: 'white', marginTop: -15 }}>Busy</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.contentChat}>
                        <View style={{ height: 420, marginTop: 20 }}>
                            <ScrollView showsHorizontalScrollIndicator={false} >
                                <FlatList
                                    data={this.state.messageList}
                                    renderItem={this.renderRow}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </ScrollView>
                        </View>
                        <View style={styles.keyboard}>
                            <View style={{ backgroundColor: '#E2E5F5', borderRadius: 25, flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <View style={{ width: 40, height: 40, backgroundColor: '#637FE7', borderRadius: 40, marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={this.sendMessage}><Icon style={{ color: 'white', fontSize: 25 }} name="ios-send" /></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <TextInput value={this.state.textMessage} onChangeText={this.handleChange('textMessage')} style={{ placeholderTextColor: '#BDC0C6', width: 180 }} placeholder="Type a message" />
                                </View>
                            </View>
                            <ActionButton buttonColor="rgba(231,76,60,1)">
                                <ActionButton.Item buttonColor='#9b59b6' title="Emoticons">
                                    <Icon name="ios-happy" style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#3498db' title="Picture">
                                    <Icon name="ios-camera" style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#1abc9c' title="Shere Location">
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')}><Icon name="ios-compass" style={styles.actionButtonIcon} /></TouchableOpacity>
                                </ActionButton.Item>
                            </ActionButton>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Inbox;