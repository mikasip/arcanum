import React from 'react';
import Card from './Card';

const closedCardImage = require('../assets/general/background_card1.jpg');

interface ClosedCardProps {
  disabled?: boolean;
  onPress?: () => void;
  shadow?: boolean;
}

const ClosedCard: React.FC<ClosedCardProps> = ({
  disabled = true,
  onPress,
  shadow = true,
}) => {
  return (
    <Card
      image={closedCardImage}
      onPress={onPress}
      shadow={shadow}
      disabled={disabled}
    />
  );
};

export default ClosedCard;
