import React, { Component } from 'react';
import firebase from 'firebase'
import { View, Text, Image, StyleSheet, TextInput,StatusBar } from 'react-native';
import { TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler';
import { db, auth } from '../../Config/Config';
import Userr from '../Global/Global';


const styles = StyleSheet.create({
    wrapChat: {
        marginHorizontal: 20,
        borderBottomColor: '#D4D4D6',
        borderBottomWidth: 1,
        backgroundColor: 'white'
    }, actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})
class CallScreen extends Component {
    state = {
        user: []
    }
    componentDidMount() {
        this.getDataUser()
    }

    getDataUser() {
        db.ref('/user').on('value', (snapshot) => {
            const current_user = auth.currentUser.uid
            const data = snapshot.val()
            const user = Object.values(data)
            const result = user.filter(user => user.uid !== current_user);
            this.setState({
                user: result
            })
            console.log(result)
        })
    }
    renderRow = ({ item }) => {
        return (
            <View style={styles.wrapChat}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Inbox', item)}>
                    <View style={{ height: 100, marginTop: 20, flexDirection: 'row' }}>
                        <View>
                            <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{uri:`${item.image}`}} />
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{ marginLeft: 26, marginHorizontal: 90 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#848484' }}>{item.name}</Text>
                            <Text style={{ marginTop: 20, color: '#959595' }}>{item.status}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#959595', marginLeft: -90 }}>5 min</Text>
                        </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        console.log(this.props.navigation.getParam('name'))
        return (
            <ScrollView >
                <FlatList
                    data={this.state.user}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.uid}
                />
            </ScrollView>
        )
    }
}
export default CallScreen;