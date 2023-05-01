import React from 'react';
import { COLORS } from '../../constants/colors';
import CustomButton from './CustomButton';

type SecondaryButtonProps = {
    title: string,
    onPress: () => void,
    transparent?: boolean,
    disabled?: boolean,
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    title,
    onPress,
    transparent = false,
    disabled = false,
}) => {

    const style = transparent ? {} : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    }

    return (
        <CustomButton title={title} titleColor={COLORS.white} onPress={onPress}
            gradientColors={transparent ? undefined : [COLORS.background, COLORS.lightBackground]}
            buttonColor={'transparent'} buttonStyle={style} disabled={disabled} />
    );
};

export default SecondaryButton;

