import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Images from '../../assets';
import colors from '../../constants/Colors';

interface HeaderRequiredProps {
    showBack: boolean;
    title: string;
}

// Optional props
interface HeaderOptionalProps {
    customStyle?: ViewStyle
    onBackPress?: () => void;
}

// Combine required and optional props to build the full prop interface
interface HeaderProps
    extends HeaderRequiredProps,
    HeaderOptionalProps { }

const Header: React.FC<HeaderProps> = (props) => {
    const { onBackPress, showBack, title } = props;

    return (
        <View style={styles.headerContainer}>
            {showBack ? <TouchableOpacity onPress={onBackPress}>
                <Image source={Images.back} style={styles.back} />
            </TouchableOpacity> : <View></View>}
            <Text style={styles.titleText}>{title}</Text>
            <View></View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 30,
        width: '90%',
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center"
    },
    titleText: {
        fontSize: 16,
        color: colors.BLACK,
        fontWeight: '800'
    },
    back: {
        height: 18,
        width: 18,
    }
});

export default Header;
