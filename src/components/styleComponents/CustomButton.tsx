import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

type CustomButtonProps = {
    title: string,
    onPress: () => void,
    buttonColor?: string,
    titleColor?: string,
    buttonStyle?: StyleProp<ViewStyle>,
    gradientColors?: string[],
    textStyle?: StyleProp<TextStyle>,
    disabled: boolean,
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    buttonColor,
    titleColor,
    buttonStyle,
    textStyle,
    gradientColors,
    disabled = false,
}) => {

    const text = <Text
        style={[styles.title, textStyle, { color: titleColor || '#fff' }]}>
        {title}
    </Text>
    return (
        <TouchableOpacity
            style={[styles.container, buttonStyle, { backgroundColor: buttonColor || '#512DA8' }]}
            onPress={onPress} disabled={disabled}>
            {gradientColors && <LinearGradient style={{
                width: '100%', height: '100%',
                justifyContent: 'center', alignItems: 'center'
            }} colors={gradientColors} start={{ x: 0.8, y: 0.5 }} end={{ x: 1, y: 1 }}>
                {text}
            </LinearGradient>}
            {!gradientColors && text}
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        overflow: 'hidden',
    },
    title: {
        color: '#fff',
        fontSize: 14,
        paddingHorizontal: 20,
    },
});
