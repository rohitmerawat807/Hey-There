import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Images from '../../assets';
import colors from '../../constants/Colors';

interface ChatComponentRequiredProps {
    userData: any;
    chatListRef: any;
    otherUser: any
}

// Optional props
interface ChatComponentOptionalProps {

}

// Combine required and optional props to build the full prop interface
interface ChatComponentProps
    extends ChatComponentRequiredProps,
    ChatComponentOptionalProps { }

const ChatComponent: React.FC<ChatComponentProps> = (props) => {
    const { userData, chatListRef, otherUser } = props;

    const renderChatItem = ({ item }: any) => {
        const isSender = otherUser?.id === item?.senderId;
        return (
            <View style={!isSender ? styles.senderView : styles.receiverView}>
                <Text style={!isSender ? styles.senderText : styles.receiverText}>{item.message}</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={userData}
            ref={chatListRef}
            extraData={[]}
            style={{ marginHorizontal: 10 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderChatItem}
            ListEmptyComponent={<Image source={Images.noMessage} style={styles.imagePlaceholder} />}
        />
    );
};

const styles = StyleSheet.create({
    senderView: {
        maxWidth: '80%',
        padding: 16,
        borderRadius: 12,
        alignSelf: "flex-end",
        backgroundColor: colors.BLUE,
        margin: 6,
        justifyContent: "center",
        borderTopRightRadius: 0
    },
    receiverView: {
        maxWidth: '80%',
        padding: 16,
        borderRadius: 12,
        alignSelf: "flex-start",
        backgroundColor: colors.WHITE,
        margin: 6,
        justifyContent: "center",
        borderTopLeftRadius: 0
    },
    senderText: {
        color: colors.WHITE,
        fontSize: 15
    },
    receiverText: {
        color: colors.BLACK,
        fontSize: 15
    },
    imagePlaceholder: {
        alignSelf: "center",
        marginTop: '40%'
    }

});

export default ChatComponent;
