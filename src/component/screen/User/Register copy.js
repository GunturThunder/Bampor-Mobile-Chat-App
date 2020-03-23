import React, { Component } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { auth,db  } from "../../Config/Config";

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            name: '',
            email: '',
            password: '',
            uid: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            loading: false,
            updatesEnabled: false,
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }

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

    handleSignUp = async () => {
        const { email, name, password } = this.state;
        if (name.length < 1) {
            ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
        } else if (email.length < 6) {
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
            await auth.createUserWithEmailAndPassword(email, password)
                .then(async userCredentials => {

                    db.ref('/user/' + userCredentials.user.uid)
                        .set({
                            name: this.state.name,
                            status: 'Online',
                            email: this.state.email,
                            photo: "http://photourl.com/photo"
                        })
                        .catch(error => console.log(error.message))

                    console.log(userCredentials);
                    ToastAndroid.show("Success", ToastAndroid.LONG)


                    if (userCredentials.user) {
                        userCredentials.user.updateProfile({
                            displayName: this.state.name,
                            photoURL: "http://linkphoto.com"
                        }).then((s) => {
                            this.props.navigation.navigate("Login")
                        })
                    }


                })
                .catch(error => {
                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                })

        }
    }

    render() {
        return (
            <View style={styles.wrap}>
                <View style={{position:'absolute',width:'100%'}}>
                    <View style={{position:'absolute',height:30,width:30,backgroundColor:'black',marginTop:135,marginLeft:220,borderRadius:30/2}}></View>
                    <Image style={{alignSelf:'flex-end',position:'absolute'}} source={require('../../../img/bg1.png')} />
                    <View style={{position:'absolute',width:80,height:80,backgroundColor:'black',borderRadius:80/2,marginLeft:20,marginTop:20}}></View>
                    <View style={{position:'absolute',width:30,height:30,backgroundColor:'black',borderRadius:30/2,marginLeft:20,marginTop:135}}></View>
                    <View style={{position:'absolute',height:50,width:50,marginTop:350,marginLeft:-25,borderRadius:50/2,backgroundColor:'black'}}></View>
                    <Image source={require('../../../img/bg2.png')} style={{marginTop:489}} />
                </View>
                <View style={{flex:1}}>
                <Content>
                    <Form style={{ marginBottom: 20 }}>
                        <Item>
                            <Input placeholder="Name" onChangeText={name => this.setState({ name })} value={this.state.name} />
                        </Item>
                        <Item>
                            <Input placeholder="Email" onChangeText={email => this.setState({ email })} value={this.state.email} />
                        </Item>
                        <Item>
                            <Input placeholder="Password" onChangeText={password => this.setState({ password })} value={this.state.password} />
                        </Item>
                    </Form>

                    <TouchableOpacity onPress={this.handleSignUp} style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: "#2295d4", borderRadius: 10, height: 52, alignItems: 'center', justifyContent: 'center', }} >
                        <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </Content>
                </View>
            </View>
        )
    }
}

export default Register;