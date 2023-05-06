import React, { useState } from 'react';
import { Spell } from '../redux/reducers/types/collection_types';
import { View, Text, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type SpellViewProps = {
    spell: Spell
    active?: boolean
}

const SpellView: React.FC<SpellViewProps> = ({ spell, active = false }) => {

    const [width, setWidth] = useState(100);
    const spellImageScaleMultiplier = useSharedValue(1);

    spellImageScaleMultiplier.value = active ? 5 : 1
    const animatedScale = useAnimatedStyle(() => {
        return ({ transform: [{ scale: withTiming(spellImageScaleMultiplier.value, { duration: 200 }) }] })
    })

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', gap: 10, alignItems: 'center' }}
            onLayout={(event: any) => setWidth(event.nativeEvent.layout.width)}>
            <Animated.View style={[{ overflow: 'hidden', flex: 1, aspectRatio: 1, borderRadius: 5, borderColor: COLORS.background, borderWidth: 1 }, animatedScale]}>
                <Image source={spell.image} style={{ flex: 1, resizeMode: 'cover', width: undefined, height: undefined }} />
            </Animated.View>
            <Text style={{ flex: 5, color: COLORS.white, fontSize: width * 0.03, fontWeight: 'bold', alignSelf: 'center' }}>({spell.type.charAt(0).toUpperCase() + spell.type.slice(1)}) {spell.description}</Text>
        </View>
    );
};

export default SpellView;