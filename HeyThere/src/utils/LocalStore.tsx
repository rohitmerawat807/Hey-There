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

export const persistCurrentUserData = async (value: any) => {
    try {
        var data = await AsyncStorage.setItem('userData', JSON.stringify(value));
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

export const retriveCurrentUserData = async () => {
    try {
        const value = await AsyncStorage.getItem("userData");
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log("error", error);
        // Error retrieving data
    }
}

export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem("userData");
        return true;
    }
    catch (exception) {
        return false;
    }
}