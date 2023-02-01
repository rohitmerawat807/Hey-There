import firestore from "@react-native-firebase/firestore";
import FirebaseKeys from "../constants/FirebaseKeys";

class FireStoreManager {

    static registerUser = async (userData: any, callback: any) => {
        firestore().collection(FirebaseKeys.USER).add(userData).then(
            (response) => {
                console.log('response :', response);
                if (response.id) {
                    userData.id = response.id;
                    callback(userData);
                }
            }
        ).catch((error) => {
            callback(error);
        });
    }

    static getAllUsers = async (callback: any) => {
        firestore()
            .collection(FirebaseKeys.USER)
            .onSnapshot((QuerySnapshot: any) => {
                const dataAlpha: any = [];
                QuerySnapshot._docs.forEach((items: any) => {
                    dataAlpha.push(items.data());
                });
                callback(dataAlpha);
            });
    }

}

export default FireStoreManager;
