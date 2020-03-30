import React, { Component } from 'react';
import { View, Text, ToastAndroid, StyleSheet, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { auth } from "../../Config/Config";
import Icon from 'react-native-vector-icons/Ionicons';

const Toast = props => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            1,
            800,
        );
        return null;
    }
    return null;
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white'
    }
})

class Login extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            email: '',
            password: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            visible: false,
            Onprosess: false,
        };
    }

    handleLogin = () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG,
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG,
            );
        } else {
            // Action
            auth.signInWithEmailAndPassword(email, password)
                .then(async data => {
                    console.log(data)
                })
                .catch(error => console.log(error.message))
        }
    };
    componentDidMount() {
        this._isMounted = true;

    };

    componentWillUnmount() {
        this._isMounted = false;

    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };
    handleLogin = () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG,
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG,
            );
        } else {
            // Action
            auth.signInWithEmailAndPassword(email, password)
                .then(async data => {
                    console.log(data)
                    this.props.navigation.navigate("Home")
                })
                .catch(error => console.log(error.message))
        }
    };
    render() {
        return (
            <View style={styles.wrap}>
                <View style={{ position: 'absolute', width: '100%' }}>
                    <View style={{ position: 'absolute', height: 30, width: 30, backgroundColor: 'black', marginTop: 135, marginLeft: 220, borderRadius: 30 / 2 }}></View>
                    <Image style={{ alignSelf: 'flex-end', position: 'absolute' }} source={require('../../../img/bg1.png')} />
                    <View style={{ position: 'absolute', width: 80, height: 80, backgroundColor: 'black', borderRadius: 80 / 2, marginLeft: 20, marginTop: 20 }}></View>
                    <View style={{ position: 'absolute', width: 30, height: 30, backgroundColor: 'black', borderRadius: 30 / 2, marginLeft: 20, marginTop: 135 }}></View>
                    <View style={{ position: 'absolute', height: 50, width: 50, marginTop: 350, marginLeft: -25, borderRadius: 50 / 2, backgroundColor: 'black' }}></View>
                    <Image source={require('../../../img/bg2.png')} style={{ marginTop: 489 }} />
                </View>
                <Content style={{paddingTop:200,marginHorizontal:25}}>
                    <View style={{alignItems:'center'}}><Text style={{fontSize:20}}>Login</Text></View>
                    <Form style={{ marginBottom: 20 }}>
                        <Item>
                            <Input placeholder="Email" onChangeText={email => this.setState({ email })} value={this.state.email} />
                        </Item>
                        <Item>
                            <Input secureTextEntry placeholder="Password" onChangeText={password => this.setState({ password })} value={this.state.password} />
                        </Item>
                    </Form>

                    <TouchableOpacity style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: "#2295d4", borderRadius: 10, height: 52, alignItems: 'center', justifyContent: 'center', }} onPress={this.handleLogin}>
                        <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{ justifyContent: 'center', alignItems: 'center' }}><Text>Don't Have Account Yet ?, Register Here</Text></TouchableOpacity>
                </Content>
            </View>
        )
    }
}

export default Login;