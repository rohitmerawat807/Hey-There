import React, { useRef, useState } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';
import MapboxGL from "@rnmapbox/maps";
import keys from '../constants/Keys';
import MarkerAnnotation from '../components/MarkerAnnotation';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Strings from '../strings/Strings';

function Map() {

    const mapboxRef = useRef(null);
    const navigation = useNavigation();
    const [coordinates, setCordinates] = useState([
        [22.7196, 75.8577],
    ])

    React.useEffect(() => {
        MapboxGL.setAccessToken(keys.access_token);
    }, [])

    React.useEffect(() => {
        MapboxGL.locationManager.start();
        return (): void => {
            MapboxGL.locationManager.stop();
        };
    }, []);

    const onUserLocationUpdate = (location: any) => {
         console.log('location :', location);
    }

    const onPressAnnotation = () => {
        navigation.navigate('ChatScreen');
    }

    const renderAnnotation = (counter: any) => {
        return (
            <MarkerAnnotation
                counter={counter}
                coordinates={coordinates}
                onPress={onPressAnnotation}
            />
        );
    }

    const renderAnnotations = () => {
        const items = [];
        for (let i = 0; i < coordinates.length; i++) {
            items.push(renderAnnotation(i));
        }
        return items;
    }

    return (
        <ScreenContainer backgroundType={"screen"}>
            <ScreenLayout
                useSafeArea
                paddingHorizontal={0}
                paddingTop={0}
                paddingBottom={0}>
                <Header title={Strings.APP_NAME} showBack={false} />
                <MapboxGL.MapView
                    ref={mapboxRef}
                    style={styles.map}
                    zoomEnabled={true}
                    userTrackingMode>
                    <MapboxGL.UserLocation
                        visible={true}
                        animated={true}
                        requestsAlwaysUse={true}
                        onUpdate={onUserLocationUpdate}
                        renderMode={"native"} />
                    {renderAnnotations()}
                </MapboxGL.MapView>
            </ScreenLayout>
        </ScreenContainer>
    );
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})