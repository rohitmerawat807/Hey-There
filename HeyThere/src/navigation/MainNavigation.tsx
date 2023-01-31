import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from '../screens/Map';
import Chat from '../screens/Chat';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MapScreen" component={Map} />
                <Stack.Screen name="ChatScreen" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}