import { Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';

function Map() {

    return (
        <ScreenContainer backgroundType={"screen"}>
            <ScreenLayout useSafeArea >
                <Text>Map screen</Text>
            </ScreenLayout>
        </ScreenContainer>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: {

    }
})