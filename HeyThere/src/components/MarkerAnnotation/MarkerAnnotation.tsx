import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MapboxGL from "@rnmapbox/maps";
import Images from '../../assets';

interface MarkerAnnotationRequiredProps {
    onPress: (data: any) => void;
    counter: any;
    coordinates: any;
}

// Optional props
interface MarkerAnnotationOptionalProps {
    markerIconStyle?: ViewStyle
}

// Combine required and optional props to build the full prop interface
interface MarkerAnnotationProps
    extends MarkerAnnotationRequiredProps,
    MarkerAnnotationOptionalProps { }

const MarkerAnnotation: React.FC<MarkerAnnotationProps> = (props) => {
    const { onPress, counter, coordinates, markerIconStyle } = props;
    const id = `pointAnnotation${counter}`;
    const coordinate = coordinates[counter].cordinates;
    return (
        <MapboxGL.PointAnnotation
            key={id}
            id={id}
            title='Test'
            coordinate={coordinate}>
            <TouchableOpacity onPress={() => { onPress(coordinates[counter]) }}>
                <Animatable.Image
                    source={Images.locationMarker}
                    style={[styles.markerIconStyle, markerIconStyle]} />
            </TouchableOpacity>
        </MapboxGL.PointAnnotation>
    );
};

const styles = StyleSheet.create({
    markerIconStyle: {
        flex: 1,
        resizeMode: 'contain',
        width: 40,
        height: 40
    }
});

export default MarkerAnnotation;
