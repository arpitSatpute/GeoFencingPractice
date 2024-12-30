
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as geolib from 'geolib';
const GoogleMapsScreen = () => {

const [markerList, setMarker] = useState([
  {
    id: 1,
    latitude: 21.842865,
    longitude: 77.044405,
    title: 'A',
    description: 'Team A',
  },
  {
    id: 2,
    latitude: 21.842860,
    longitude: 77.044415,
    title: 'B',
    description: 'Team B',
  },
]);
const mapRef = useRef(null);
const [origin, setOrigin] = useState();
const [mark, setMark] = useState<{ latitude: number; longitude: number } | undefined>(undefined);
const [destination, setDestination] = useState();
const [myCircle, setMyCircle] = useState({
  latitude: 21.842865,
  longitude: 77.044405,
});

geolib.isPointWithinRadius(
  { latitude: 51.525, longitude: 7.4575 },
  { latitude: 51.5175, longitude: 7.4678 },
  5000
);


function checkIfInside(coordinates, radius) {
  // checks if 51.525/7.4575 is within a radius of 5 km from 51.5175/7.4678
let status = geolib.isPointWithinRadius(coordinates, myCircle, radius);
  console.log('checkIfInside => ', status);
  let msg = '';

  if(status) {
    msg = 'Inside Fence';
  }
  else{
    msg = 'Outside Fence';
  }
  Alert.alert('GeoFence', msg, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => console.log('Pressed OK'),
    },
  ]);
}


return (
  <View style={styles.container}>
    {/* <View style={{zIndex: 1, flex: 1}}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBNCnuOJ70IX3fq76MZ3tYmQTM4zvT_KIg',
        language: 'en',
      }}
      />
    </View> */}

  <MapView
    onPress={e => {
      console.log(e.nativeEvent.coordinate);
      setMark(e.nativeEvent.coordinate);
      checkIfInside(e.nativeEvent.coordinate, 100);
    }}

    {...origin !== undefined ? <Marker coordinate={origin} /> : null}
    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    style={styles.map}
    region={{
      latitude: 21.842865,
      longitude: 77.044405,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }}
  >
    {mark !== undefined ? (<Marker coordinate={mark} />) : null }
    {origin !== undefined ? <Marker coordinate={origin} /> : null }
    {destination !== undefined ? (
    <Marker coordinate={destination} />
     ) : null}
      {
      markerList.map((marker) => {
        return (
          <Marker
          draggable
            key = {marker.id}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title = {marker.title}
            description={marker.description}
            onDragEnd={e => console.log({x: e.nativeEvent.coordinate})}
          />
        );
      })
    }

    <Circle
      center = {myCircle}
      radius={100}
      fillColor="red"
      strokeColor="blue"
    />

    </MapView>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 800,
      width: 450,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default GoogleMapsScreen;