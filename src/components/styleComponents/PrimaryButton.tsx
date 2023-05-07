import React from 'react';
import { COLORS } from '../../constants/colors';
import CustomButton from './CustomButton';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  transparent?: boolean;
  disabled?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  transparent = false,
  disabled = false,
}) => {
  const style = transparent
    ? {}
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
      };

  return (
    <CustomButton
      title={title}
      titleColor={transparent ? COLORS.primary : COLORS.white}
      onPress={onPress}
      gradientColors={
        transparent ? undefined : [COLORS.primary, COLORS.primary2]
      }
      buttonColor="transparent"
      textStyle={{ fontWeight: 'bold' }}
      buttonStyle={style}
      disabled={disabled}
    />
  );
};

export default PrimaryButton;
