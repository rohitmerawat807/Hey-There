import React, { useRef, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';
import MapboxGL from "@rnmapbox/maps";
import keys from '../constants/Keys';
import Images from '../assets';

function Map() {

    const mapboxRef = useRef(null);
    const [coordinates, setCordinates] = useState([])

    React.useEffect(() => {
        MapboxGL.setAccessToken(keys.access_token);
    }, [])

    React.useEffect(() => {
        MapboxGL.locationManager.start();
        return (): void => {
            MapboxGL.locationManager.stop();
        };
    }, []);

    React.useEffect(() => {
       console.log('mapboxRef :', mapboxRef.current);
    }, [mapboxRef]);

    const renderAnnotation = (counter: any) => {
        const id = `pointAnnotation${counter}`;
        const coordinate = coordinates[counter];
        return (
            <MapboxGL.PointAnnotation
                key={id}
                id={id}
                title='Test'
                coordinate={coordinate}>
                <Image
                    source={Images.locationMarker}
                    style={{
                        flex: 1,
                        resizeMode: 'contain',
                        width: 25,
                        height: 25
                    }} />
            </MapboxGL.PointAnnotation>
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
                paddingBottom={0} >
                <MapboxGL.MapView
                    ref={mapboxRef}
                    style={styles.map}
                    zoomEnabled={true}
                    userTrackingMode
                >
                    <MapboxGL.UserLocation
                        visible={true}
                        animated={true}
                        requestsAlwaysUse={true}
                        renderMode={"native"} />
                    {renderAnnotations()}
                </MapboxGL.MapView>
            </ScreenLayout>
        </ScreenContainer>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: {

    },
    map: {
        flex: 1
    }
})