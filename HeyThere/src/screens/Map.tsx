import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';
import MapboxGL from "@rnmapbox/maps";
import keys from '../constants/Keys';
import MarkerAnnotation from '../components/MarkerAnnotation';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Strings from '../strings/Strings';
import FireStoreManager from '../firestore/FireStoreManager';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { persistUserState, retriveUserState } from '../utils/LocalStore';

function Map() {

    const mapboxRef = useRef(null);
    const navigation = useNavigation();
    const [coordinates, setCordinates] = useState([]);

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
        getUserList()
    }, [])

    const getUserList = () => {
        FireStoreManager.getAllUsers((allUsers: any) => {
             if(allUsers?.length > 0) {
                setCordinates(allUsers);
             }
        })
    }

    const onUserLocationUpdate = async (location: any) => {
        const deviceId = await getUniqueId()
        const hasUserRegistered = await retriveUserState();
        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        const userdata = {
            cordinates: [location.coords?.latitude, location.coords?.longitude],
            deviceId: deviceId,
            timestamp: timestamp
        };

        if (Boolean(hasUserRegistered)) {
            return;
        }

        FireStoreManager.registerUser(userdata, (success: any) => {
            persistUserState('true')
        });
    }

    const onPressAnnotation = (data: any) => {
        navigation.navigate('ChatScreen', { userData: data });
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
                        onUpdate={(location: any) => { onUserLocationUpdate(location) }}
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