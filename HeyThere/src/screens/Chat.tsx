import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Images from '../assets';
import ChatComponent from '../components/ChatComponent';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';
import colors from '../constants/Colors';
import FireStoreManager from '../firestore/FireStoreManager';
import Strings from '../strings/Strings';
import { retriveCurrentUserData } from '../utils/LocalStore';

function Chat() {

    const navigation = useNavigation();
    const chatListRef = useRef(null);
    const routes = useRoute();
    const [messageList, setMessageList] = useState([]);
    const [receiverList, setReceiverMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const [selfUserData, setSelfUserData] = useState({});
    const otherUser = routes?.params?.userData;

    React.useEffect(() => {
        getReceiversMessages()
        getSelfUser()
    }, [])

    const getReceiversMessages = async () => {
        FireStoreManager.getReceiversMessages(otherUser?.id, (response: any) => {
            if (Boolean(response)) {
                const allMessages: any = [...receiverList]
                const tempMessages = response[0]?.messageList;
                tempMessages?.map((message: any) => {
                    allMessages.push(message);
                })                
                setReceiverMessageList(allMessages);
            }
        })
    }

    const getChatHistory = (userId: string) => {
        FireStoreManager.getReceiversMessages(userId, (response: any) => {
            if (Boolean(response)) {
                const allMessages: any = [...messageList]                
                const tempMessages = response[0]?.messageList;
                tempMessages?.map((message: any) => {
                    allMessages.push(message);
                })
                setMessageList(allMessages);
            }
        })
    }

    const getSelfUser = async () => {
        const data = await retriveCurrentUserData()
        if (Boolean(data)) {
            getChatHistory(data?.id)
            setSelfUserData(data);
        }
    };

    const goBack = () => navigation.goBack();

    const sendMessage = () => {

        if (!message) {
            return;
        }

        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        const newArray: any = [...messageList];
        const newMessageObj = {
            message: message,
            senderId: selfUserData.id,
            receiverId: otherUser?.id,
            createdAt: timestamp
        }
        newArray.push(newMessageObj);
        setMessageList(newArray);

        FireStoreManager.updateMessageList(newArray, selfUserData.id, (response: boolean) => {
            if (response) {
                setMessage("");
                chatListRef.current.scrollToEnd();
            }
        })

    }

    const messages = receiverList.concat(messageList);
    messages.sort((x, y) => {
        return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
    }).reverse();

    return (
        <ScreenContainer
            backgroundType={"screen"}
            backgroundColor={colors.BACKGROUND}>
            <ScreenLayout
                useSafeArea
                paddingHorizontal={0}
                paddingTop={0}
                keyboardShouldPersistTaps={"always"}
                paddingBottom={0}>
                <Header
                    title={Strings.APP_NAME}
                    showBack={true}
                    onBackPress={goBack} />

                <ChatComponent chatListRef={chatListRef} userData={messages} otherUser={otherUser} />

                <View style={styles.messageBoxVeew}>
                    <TextInput
                        placeholder={Strings.PLACEHOLDER}
                        style={styles.inputStyle}
                        onChangeText={(text: string) => { setMessage(text) }}
                        value={message}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        style={styles.sendButton}>
                        <Image
                            source={Images.send}
                            style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </ScreenLayout>
        </ScreenContainer>
    );

}

export default Chat;

const styles = StyleSheet.create({
    messageBoxVeew: {
        backgroundColor: colors.WHITE,
        width: "90%",
        alignSelf: "center",
        borderRadius: 10
    },
    inputStyle: {
        height: 60,
        padding: 16,
        width: '80%'
    },
    sendButton: {
        height: 40,
        width: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.DARK_BLUE,
        position: "absolute",
        right: 10,
        top: 10
    },
    sendIcon: {
        height: 16,
        width: 18,
        tintColor: colors.WHITE
    }
})