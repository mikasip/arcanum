import React, { useState } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button } from 'react-native-elements/dist/buttons/Button';
import HeroInspection from '../components/HeroInspection';

type LeaderCreationProps = {
    leaders: CardInterface[]
    onCreate: (leader: CardInterface) => void;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LeaderCreation: React.FC<LeaderCreationProps> = ({ leaders, onCreate }) => {
    const [currentLeader, setCurrentLeader] = useState<CardInterface>(leaders[0]);

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={height}
                autoPlay={false}
                data={leaders}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setCurrentLeader(leaders[index])}
                renderItem={({ item }) => (
                    <HeroInspection hero={item}>
                        <View style={{ position: 'absolute', bottom: 20, right: 30, width: 80 }}>
                            <Button onPress={() => { onCreate(item) }}
                                title={"Create Leader"}
                                titleStyle={{ fontSize: 12, color: 'tomato', fontWeight: 'bold' }}
                                buttonStyle={{ backgroundColor: 'white', borderColor: 'tomato', borderWidth: 2, borderRadius: 10 }} />
                        </View>
                    </HeroInspection>
                )}
            />
        </View>
    );
};

export default LeaderCreation;