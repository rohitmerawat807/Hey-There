import AsyncStorage from "@react-native-community/async-storage";

export const persistUserState = async (value: any) => {
    try {
        var data = await AsyncStorage.setItem('hasUserRegistered', value);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

export const retriveUserState = async () => {
    try {
        const value = await AsyncStorage.getItem("hasUserRegistered");
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log("error", error);
        // Error retrieving data
    }
}

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem("hasUserRegistered");
        return true;
    }
    catch (exception) {
        return false;
    }
}