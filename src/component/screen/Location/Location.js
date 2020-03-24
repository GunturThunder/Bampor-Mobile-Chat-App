import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

class Location extends Component {
    render() {
        return (
            <MapView
                style={{ flex: 1, width: window.width }} //window pake Dimensions
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} >
                <MapView.Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Lokasi"
                    description="Hello" />
            </MapView>
        )
    }
}

export default Location;