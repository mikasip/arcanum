import React, { useState } from 'react';
import { Spell } from '../redux/reducers/types/collection_types';
import { View, Text, Image } from 'react-native';
import { COLORS } from '../constants/colors';

type SpellViewProps = {
    spell: Spell
}

const SpellView: React.FC<SpellViewProps> = ({ spell }) => {

    const [width, setWidth] = useState(100);

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', gap: 10, alignItems: 'center' }}
            onLayout={(event: any) => setWidth(event.nativeEvent.layout.width)}>
            <View style={{ overflow: 'hidden', flex: 1, aspectRatio: 1, borderRadius: 5, borderColor: COLORS.background, borderWidth: 1 }}>
                <Image source={spell.image} style={{ flex: 1, resizeMode: 'cover', width: undefined, height: undefined }} />
            </View>
            <Text style={{ flex: 5, color: COLORS.white, fontSize: width * 0.03, fontWeight: 'bold', alignSelf: 'center' }}>({spell.type.charAt(0).toUpperCase() + spell.type.slice(1)}) {spell.description}</Text>
        </View>
    );
};

export default SpellView;