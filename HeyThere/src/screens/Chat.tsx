import { useNavigation, useRoute } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Images from '../assets';
import ChatComponent from '../components/ChatComponent';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import ScreenLayout from '../components/ScreenLayout';
import colors from '../constants/Colors';
import Strings from '../strings/Strings';

function Chat() {

    const navigation = useNavigation();
    const chatListRef = useRef(null);
    const routes = useRoute();
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');

    const currentUserData = routes?.params?.userData;

    console.log('currentUserData :', currentUserData);

    const goBack = () => navigation.goBack();

    const sendMessage = () => {
        const newArray = [...messageList];
        const newMessageObj = {
            message: message,
            sender: true
        }
        newArray.push(newMessageObj);
        setMessageList(newArray);
        setMessage("");
        chatListRef.current.scrollToEnd();
    }

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

                <ChatComponent chatListRef={chatListRef} userData={messageList} />

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