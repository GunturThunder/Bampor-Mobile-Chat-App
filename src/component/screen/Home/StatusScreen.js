import React, { Component } from 'react'
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import {db, auth} from '../../Config/Config';
import { StatusBar } from 'react-native'

class StatusScreen extends Component {
    state = {
        user:[]
    }
    componentDidMount(){
        this.getLocation()
    }
    getLocation(){
        db.ref('/user').on('value', (snapshot) => {
            const data = snapshot.val()
            const user = Object.values(data)
            this.setState({
                user : user
            })
        })
    }
    render(){
        const marker = this.state.user.map((item) => 
        <MapView.Marker
        coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
        }}
        title={item.name}/>
        )
        return (
            <MapView
            style={{ flex: 1, width: window.width }} //window pake Dimensions
            region={{
                latitude: -6.6210828,
                longitude:  106.8185388,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421 
            }} >
            {marker}
            </MapView>
        )
    }
}

export default StatusScreen;