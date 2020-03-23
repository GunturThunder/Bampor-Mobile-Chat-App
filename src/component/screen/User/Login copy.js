import React, { Component } from 'react';
import { View, Text,ToastAndroid} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { auth } from "../../Config/Config";

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
            <Container>
                <Header />
                <Content>
                    <Form style={{marginBottom:20}}>
                        <Item>
                            <Input placeholder="Email" onChangeText={email => this.setState({ email })} value={this.state.email} />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" onChangeText={password => this.setState({ password })} value={this.state.password} />
                        </Item>
                    </Form>

                    <TouchableOpacity style={{marginHorizontal: 30,marginBottom: 10,backgroundColor: "#2295d4",borderRadius: 10,height: 52,alignItems: 'center',justifyContent: 'center',}} onPress={this.handleLogin}>
                        <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }  style={{justifyContent:'center',alignItems:'center'}}><Text>Dinn't Have Account Yet ?, Register Here</Text></TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default Login;