import React, { useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';
import MapboxGL from "@rnmapbox/maps";
import keys from '../constants/Keys';
import MarkerAnnotation from '../components/MarkerAnnotation';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Strings from '../strings/Strings';
import FireStoreManager from '../firestore/FireStoreManager';
import { getUniqueId } from 'react-native-device-info';
import { persistCurrentUserData, persistUserState, retriveUserState } from '../utils/LocalStore';
import Geolocation from '@react-native-community/geolocation';

function Map() {

    const mapboxRef = useRef(null);
    const navigation = useNavigation();
    const [coordinates, setCordinates] = useState([]);
    const [isUpdatedOnce, setUpdateOnceState] = useState(false);

    React.useEffect(() => {
        getUserList()

        Geolocation.getCurrentPosition(info => {
            updateUserLocation(info.coords)
        });
        MapboxGL.setAccessToken(keys.access_token);
        MapboxGL.locationManager.start();
        return (): void => {
            MapboxGL.locationManager.stop();
        };
    }, []);
    

    const getUserList = async () => {
        const deviceId = await getUniqueId();

        FireStoreManager.getAllUsers((allUsers: any) => {
            if (allUsers?.length > 0) {
                let otherUsers: any = [];
                allUsers?.map((user: any) => {
                    if (user?.deviceId !== deviceId) {
                        otherUsers.push(user);
                    }
                })
                setCordinates(otherUsers);
            }
        })
    }

    const updateUserLocation = async (location: any) => {
        const deviceId = await getUniqueId();
        const hasUserRegistered = await retriveUserState();
        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        const userdata = {
            cordinates: [location.latitude, location.longitude],
            deviceId: deviceId,
            timestamp: timestamp,
            messageList: []
        };

        if (Boolean(hasUserRegistered)) {
            return;
        }

        FireStoreManager.registerUser(userdata, (success: any) => {
            persistUserState('true');
            persistCurrentUserData(success);
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
                    <MapboxGL.Camera
                        followUserLocation={true}
                        followZoomLevel={2}
                    />
                    <MapboxGL.UserLocation
                        visible={true}
                        animated={true}
                        onUpdate={(location: any) => {
                            setUpdateOnceState(true)
                            if(!isUpdatedOnce && Platform.OS === 'android') {
                                updateUserLocation(location.coords)
                            }
                        }}
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
    map: {
        flex: 1
    }
})