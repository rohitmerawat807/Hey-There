import React from 'react';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';
import MapboxGL from "@rnmapbox/maps";
import keys from '../constants/Keys';

function Map() {

    React.useEffect(() => {
        MapboxGL.setAccessToken(keys.access_token);
    }, [])

    return (
        <ScreenContainer backgroundType={"screen"}>
            <ScreenLayout
                useSafeArea
                paddingHorizontal={0}
                paddingTop={0}
                paddingBottom={0} >
                <MapboxGL.MapView style={styles.map} />
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