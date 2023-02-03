import firestore from "@react-native-firebase/firestore";
import FirebaseKeys from "../constants/FirebaseKeys";

class FireStoreManager {

    static registerUser = async (userData: any, callback: any) => {
        firestore().collection(FirebaseKeys.USER).add(userData).then(
            (response) => {
                if (response.id) {
                    userData.id = response.id;
                    firestore().collection(FirebaseKeys.USER).doc(response.id).update({
                        id: response.id
                    }).then(() => {
                        console.log("user updated successfully");
                        callback(userData);
                    }).catch((error) => {
                        callback(error);
                    });
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

    static updateMessageList = async (message: any, userId: string, callback: any) => {
        firestore().collection(FirebaseKeys.USER).doc(userId)
            .update({
                messageList: message
            }).then(() => {
                callback(true);
            }).catch((error) => {
                callback(error);
            });
    }

    static getReceiversMessages = (receiverId: string, callback: any) => {
        firestore().collection(FirebaseKeys.USER).get().then((data) => {
            const dataAlpha: any = [];
            data.docs.forEach(items => {
                if (items.data().id === receiverId) {
                    const messageList = items.data();
                    dataAlpha.push(messageList);
                }
            });
            callback(dataAlpha);
        }).catch((error) => {
            console.log("error --->>>>", error);
            callback(error);
        });
    }

}

export default FireStoreManager;
