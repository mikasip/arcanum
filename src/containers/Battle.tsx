import React, { useState } from 'react';
import { CardInterface, CardBase, Spell, BattleState, SpellTargetGroup, EffectLaunchHook, Effect } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './Main';
import { View, Text, Image, LayoutAnimation } from 'react-native';
import OpenedCard from '../components/OpenedCard';
import CardRow from '../components/CardRow';
import PrimaryButton from '../components/styleComponents/PrimaryButton';
import SecondaryButton from '../components/styleComponents/SecondaryButton';
import { COLORS } from '../constants/colors';
import CardModalPopup from '../components/CardModalPopup';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { effectFunctions } from '../constants/effectFunctions';
import SpellView from '../components/SpellView';

type BattleProps = NativeStackScreenProps<StackParamList, "Battle">

export type CardItem = {
    card: CardInterface
    active: boolean
}

type CardAndDamage = {
    card: CardInterface,
    damage: number;
}

type CardAndSpell = {
    card: CardInterface,
    spell: Spell
}

type ActionState = {
    performer?: CardInterface,
    targets?: CardInterface[],
    spell?: Spell,
    damage?: number,
}

type Player = "Self" | "Enemy"

type BattleTurnState = "StartOfBattle" | "StartOfOwnTurn" | "SelectingAction" | "SelectingTarget" | "EndOfOwnTurn" | "StartOfEnemyTurn" | "EndOfEnemyTurn"
const rowGap = 3

const Battle: React.FC<BattleProps> = ({ navigation, route }) => {

    const { ownCards, ownLeader, enemyCards, enemyLeader } = route.params

    const [battleState, setBattleState] = useState<BattleState>({
        ownLeader: { ...ownLeader },
        enemyLeader: { ...enemyLeader },
        allies: [...ownCards.map(card => { return ({ ...card }) })],
        enemies: [...enemyCards.map(card => { return ({ ...card }) })],
        deadAllies: [],
        deadEnemies: [],
    })

    // States regarding the UI
    const [ownTurn, setOwnTurn] = useState(true) //useState(Math.random() > 0.5);
    const starter: Player = ownTurn ? "Self" : "Enemy"
    const [roundNumber, setRoundNumber] = useState(1);
    const [moduleCard, setModuleCard] = useState<CardInterface | undefined>(undefined);
    const [currentTurnAttackedCards, setCurrentTurnAttackedCards] = useState<CardInterface[]>([])
    const [damagedCards, setDamagedCards] = useState<CardAndDamage[]>([])
    const [activeCardAndSpell, setActiveCardAndSpell] = useState<CardAndSpell | undefined>(undefined)
    const [currentAction, setCurrentAction] = useState<ActionState>({})
    const [showBattleMessage, setShowBattleMessage] = useState(false)
    const [battlePoints, setBattlePoints] = useState(ownTurn ? 1 : 2);
    const [mana, setMana] = useState(0);
    const [enemyBattlePoints, setEnemyBattlePoints] = useState(!ownTurn ? 1 : 2);
    const [enemyMana, setEnemyMana] = useState(0);
    const [battleTurnState, setBattleTurnState] = useState<BattleTurnState>("StartOfBattle")

    const setDamagedCardsWithTimeout = (cardsAndDamages: CardAndDamage[]) => {
        setDamagedCards(cardsAndDamages)
        setTimeout(() => {
            setDamagedCards(damagedCards.filter(item => cardsAndDamages.includes(item)))
        }, 2000)
    }

    const setShowBattleMessageWithTimeout = (timeoutAction?: () => void) => {
        setShowBattleMessage(true)
        setTimeout(() => {
            setShowBattleMessage(false)
            timeoutAction && timeoutAction()
        }, 1000)
    }

    // BATTLE HOOKS
    const startBattle = () => {
        checkAllyBattleHooks("startOfBattle")
        checkEnemyBattleHooks("startOfBattle")
        startRound()
    }

    const startRound = () => {
        ownTurn ? startOwnTurn() : startEnemyTurn()
    }

    const startOwnTurn = () => {
        if (roundNumber > 1) {
            setMana(mana + 1)
            setBattlePoints(battlePoints + 1)
        }
        setBattleTurnState("StartOfOwnTurn")
        setShowBattleMessageWithTimeout(() => {
            setBattleTurnState("SelectingAction")
        })
    }

    const startEnemyTurn = () => {
        if (roundNumber > 1) {
            setEnemyMana(enemyMana + 1)
            setEnemyBattlePoints(enemyBattlePoints + 1)
        }
        setBattleTurnState("StartOfEnemyTurn")
        setShowBattleMessageWithTimeout(() => {
            playEnemyTurn()
        })
    }

    const endOwnTurn = () => {
        setCurrentTurnAttackedCards([]);
        setOwnTurn(false);
        if (starter == "Enemy") endRound()
        startEnemyTurn()
    }

    const endEnemyTurn = () => {
        setCurrentTurnAttackedCards([]);
        setOwnTurn(true);
        if (starter == "Self") endRound()
        startOwnTurn()
    }

    const endRound = () => {
        setRoundNumber(roundNumber + 1)
    }

    const playEnemyTurn = () => {
        const allEnemyCards: CardInterface[] = [...enemyCardItems.map(item => item.card), enemyLeaderItem.card]
        const cardsAndSpellsToUse: CardAndSpell[] = []
        const cardsAndSpellsAvailable: CardAndSpell[] = []
        let cardsWithNotAvailableSkill = false
        for (const card of allEnemyCards) {
            for (const spell of card.spells) {
                if (spell.manaCost <= enemyMana) {
                    cardsAndSpellsAvailable.push({ card: card, spell: spell })
                } else cardsWithNotAvailableSkill = true
            }
        }
        let cardsWithAvailableSkill = allEnemyCards.filter(card =>
            card.spells.filter(spell => spell.manaCost <= enemyMana).length > 0
        )
        if (cardsWithAvailableSkill.length > 0) {
            if (!(cardsWithNotAvailableSkill && Math.random() > 0.5)) {
                let tempMana = enemyMana;
                let manaCost = tempMana;
                while (manaCost > 0) {
                    const objectsWithManaCost = cardsAndSpellsAvailable.filter(obj => obj.spell.manaCost == manaCost)
                    const objectsLength = objectsWithManaCost.length
                    if (objectsLength > 0) {
                        const ind = Math.floor(Math.random() * objectsLength)
                        cardsAndSpellsToUse.push(objectsWithManaCost[ind])
                        tempMana -= manaCost
                        manaCost = tempMana
                    } else {
                        manaCost -= 1
                    }
                }
            }
        }
        const restOfCards = allEnemyCards.filter(card => !cardsAndSpellsToUse.map(obj => obj.card).includes(card))
        const restCardsSortedByAttack = restOfCards.sort((a, b) => b.attack - a.attack)
        let cardsToAttack: CardInterface[] = []
        if (restCardsSortedByAttack.length > 0) {
            const lastInd = restCardsSortedByAttack.length > enemyBattlePoints ? enemyBattlePoints : restCardsSortedByAttack.length
            cardsToAttack = restCardsSortedByAttack.slice(0, lastInd)
        }
        for (const card of cardsToAttack) {
            performEnemyAutoAction(card, true)
        }
        endEnemyTurn()
    }

    const performEnemyAutoAction = (card: CardInterface, attack: boolean, spell?: Spell) => {
        if (attack) {
            const allAllies = [...ownCardItems.map(item => item.card), allyLeaderItem.card]
            const target = allAllies[Math.floor(Math.random() * allAllies.length)]
            performAction({ ...currentAction, damage: card.attack, targets: [target], performer: card }, true)
        }
    }

    const performAction = (actionState: ActionState, enemy: boolean = false) => {
        const { performer, targets, spell, damage } = actionState
        let newState: BattleState = { ...battleState, active: performer, targets: targets }
        if (!performer) { return }
        if (spell) {
            newState = enemy ? transformState(newState) : newState
            for (let effect of spell.effects) {
                const effectFunction = effectFunctions.find(func => func.id == effect.manipulateFunctionId)?.effectFunction
                if (effectFunction) newState = effectFunction(newState, findCardAndChangeHp)
            }
            newState = enemy ? newState : transformState(newState)
            !enemy ? setMana(mana - spell.manaCost) : setEnemyMana(enemyMana - spell.manaCost)
        }
        if (targets && damage) {
            for (let target of targets) {
                newState = findCardAndChangeHp(newState, target, -damage)
            }
            !enemy ? setBattlePoints(battlePoints - 1) : setEnemyBattlePoints(enemyBattlePoints - 1)
        }
        setBattleState({ ...newState })
        setCurrentAction({})
        if (!enemy) {
            if (battlePoints > 0 || mana > 0) setBattleTurnState("SelectingAction")
            else setBattleTurnState("EndOfOwnTurn")
        } else {
            if (!(enemyBattlePoints > 0 || enemyMana > 0)) setBattleTurnState("EndOfEnemyTurn")
        }
    }

    const canBeTargeted = (card: CardInterface, group: SpellTargetGroup) => {
        if (battleTurnState == "SelectingTarget" && ["enemy", "enemyLeader"].includes(group)) {
            return (true)
        }
        if (battleTurnState == "SelectingAction" && !
            currentTurnAttackedCards.includes(card) &&
            ["ally", "allyLeader"].includes(group) &&
            (battlePoints > 0 || card.spells.filter(spell => spell.manaCost <= mana).length > 0)) {
            return (true)
        }
        if (currentAction.spell) {
            for (let effect of currentAction.spell.effects) {
                if (effect.targetEffect) {
                    if (effect.targetGroup && effect.targetGroup == group) {
                        if (effect.targetRace) {
                            if (effect.targetRace == card.race) {
                                return (true)
                            }
                        } else {
                            return (true)
                        }
                    }
                }
            }
        }
        return (false)
    }

    const enemyCardItems = battleState.enemies.map(card => { return ({ card: card, active: canBeTargeted(card, "enemy") }) })
    const ownCardItems = battleState.allies.map(card => { return ({ card: card, active: canBeTargeted(card, "ally") }) })
    const allyLeaderItem = { card: battleState.ownLeader, active: canBeTargeted(battleState.ownLeader, "allyLeader") }
    const enemyLeaderItem = { card: battleState.enemyLeader, active: canBeTargeted(battleState.enemyLeader, "enemyLeader") }

    const onAttack = (card: CardInterface) => {
        setCurrentAction({ ...currentAction, performer: card, damage: card.attack })
        setModuleCard(undefined);
        setBattleTurnState("SelectingTarget")
    }
    const onSpell = (card: CardInterface, spell: Spell) => {
        const newAction = { ...currentAction, performer: card, spell: spell }
        setCurrentAction(newAction)
        let haveTargetEffects = false
        for (let effect of spell.effects) {
            if (effect.targetEffect) {
                haveTargetEffects = true
            }
        }
        if (!haveTargetEffects) {
            performAction(newAction)
        }
        setModuleCard(undefined);
        setBattleTurnState("SelectingTarget")
    }
    const transformState = (state: BattleState) => {
        const transformedState: BattleState = {
            ownLeader: state.enemyLeader,
            enemyLeader: state.ownLeader,
            allies: state.enemies,
            enemies: state.allies,
            deadAllies: state.deadEnemies,
            deadEnemies: state.deadAllies,
        }
        return (transformedState)
    }
    const checkAllyBattleHooks = (hook: EffectLaunchHook) => {
        let newState = { ...battleState }
        for (let spell of newState.ownLeader.spells) {
            for (let effect of spell.effects) {
                if (effect.effectLaunchHook == hook) {
                    const effectFunction = effectFunctions.find(func => func.id == effect.manipulateFunctionId)
                    effectFunction && (newState = effectFunction.effectFunction(newState, findCardAndChangeHp))
                }
            }
        }
        for (let card of newState.allies) {
            for (let spell of card.spells) {
                for (let effect of spell.effects) {
                    if (effect.effectLaunchHook == hook) {
                        const effectFunction = effectFunctions.find(func => func.id == effect.manipulateFunctionId)
                        effectFunction && (newState = effectFunction.effectFunction(newState, findCardAndChangeHp))
                    }
                }
            }
        }
        setBattleState(newState)
    }
    const checkEnemyBattleHooks = (hook: EffectLaunchHook) => {
        let newState = transformState({ ...battleState })
        for (let spell of newState.enemyLeader.spells) {
            for (let effect of spell.effects) {
                if (effect.effectLaunchHook == hook) {
                    const effectFunction = effectFunctions.find(func => func.id == effect.manipulateFunctionId)
                    effectFunction && (newState = effectFunction.effectFunction(newState, findCardAndChangeHp))
                }
            }
        }
        for (let card of newState.allies) {
            for (let spell of card.spells) {
                for (let effect of spell.effects) {
                    if (effect.effectLaunchHook == hook) {
                        const effectFunction = effectFunctions.find(func => func.id == effect.manipulateFunctionId)
                        effectFunction && (newState = effectFunction.effectFunction(newState, findCardAndChangeHp))
                    }
                }
            }
        }
        setBattleState(transformState({ ...newState }))
    }

    const findCardAndChangeHp = (state: BattleState, card: CardInterface, amount: number) => {
        const newBattleState = { ...state }
        const allyCard = newBattleState.allies.find(ally => ally == card)
        if (allyCard) {
            allyCard.hp += amount
            if (allyCard.hp <= 0) {
                allyCard.hp = 0
                newBattleState.deadAllies = [...newBattleState.deadAllies, allyCard]
                newBattleState.allies = [...newBattleState.allies.filter(ally => ally != allyCard)]
            }
            setDamagedCardsWithTimeout([{ card: allyCard, damage: amount }])
            setAnimation();
        }
        const enemyCard = newBattleState.enemies.find(enemy => enemy == card)
        if (enemyCard) {
            enemyCard.hp += amount
            if (enemyCard.hp <= 0) {
                enemyCard.hp = 0
                newBattleState.deadEnemies = [...newBattleState.deadEnemies, enemyCard]
                newBattleState.enemies = newBattleState.enemies.filter(enemy => enemy != enemyCard)
            }
            setDamagedCardsWithTimeout([{ card: enemyCard, damage: amount }])
            setAnimation();
        }
        return { ...newBattleState }
    }
    const onAllyCardPress = (card: CardInterface) => {
        const cardItem = ownCardItems.find(item => item.card == card)
        if (cardItem) {
            if (battleTurnState != "SelectingTarget") {
                setModuleCard(cardItem.card)
            } else {
                if (cardItem.active) {
                    performAction({ ...currentAction, targets: [cardItem.card] })
                }
            }
        }
    }
    const onEnemyCardPress = (card: CardInterface) => {
        const cardItem = enemyCardItems.find(item => item.card == card)
        if (cardItem) {
            if (!cardItem.active) {
                setModuleCard(cardItem.card)
            } else {
                if (battleTurnState == "SelectingTarget") {
                    performAction({ ...currentAction, targets: [cardItem.card] })
                }
            }
        }
    }
    const onOwnLeaderPress = () => {
        if (battleTurnState != "SelectingTarget") {
            setModuleCard(allyLeaderItem.card)
        } else {
            if (allyLeaderItem.active) {
                performAction({ ...currentAction, targets: [allyLeaderItem.card] })
            }
        }
    }
    const onEnemyLeaderPress = () => {
        if (!enemyLeaderItem.active) {
            setModuleCard(enemyLeaderItem.card)
        } else {
            if (battleTurnState == "SelectingTarget") {
                performAction({ ...currentAction, targets: [enemyLeaderItem.card] })
            }
        }

    }
    const onPrimaryButtonPress = () => {
        if (currentAction.performer) {
            setCurrentAction({})
            setBattleTurnState("SelectingAction")
        } else {
            endOwnTurn()
        }
    }

    const primaryButtonTitle = currentAction.performer ? "Cancel" : "Finish turn"
    const resign = () => {
        console.log("Resigned!")
    }
    const allyModuleCard = (moduleCard && (moduleCard == allyLeaderItem.card || ownCardItems.map(item => item.card).includes(moduleCard)))
    const canAttack = (battlePoints > 0 && allyModuleCard && ownTurn && !currentTurnAttackedCards.includes(moduleCard))

    const setAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeIn,
                springDamping: 0.7,
            },
        });
        LayoutAnimation.configureNext({
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
                springDamping: 0.7,
            },
        });
    };

    const getCardBorderColor = (cardItem: CardItem) => {
        if (currentAction.performer == cardItem.card) {
            return (COLORS.turquoise)
        } else if (cardItem.active) {
            return (COLORS.primary)
        } else {
            return (COLORS.black)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Image style={{ flex: 1, resizeMode: 'cover', width: undefined, height: undefined }} source={require('../assets/general/battle_field1.jpg')} />
            </View>
            <View style={{ flex: 1, gap: 10, justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
                <View style={{ flex: 0.15, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 3, width: '100%', }}>
                    <View style={{ aspectRatio: 1, height: '100%', borderRadius: 10, }}><Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={require('../assets/general/sword1.png')}></Image></View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{enemyBattlePoints}</Text>
                    <View style={{ aspectRatio: 1, height: '100%', borderRadius: 10, overflow: 'hidden' }}><Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={require('../assets/general/mana.jpg')}></Image></View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{enemyMana}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10 }}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{ownTurn ? 'Your turn!' : 'Enemys turn!'}</Text>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{'Round ' + roundNumber}</Text>
                    </View>
                    <View style={{ height: '100%', flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                        <View style={{ aspectRatio: 2 / 3, height: '70%' }}>
                            {battleState.deadEnemies.map(enemy => <View key={enemy.id} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, aspectRatio: 2 / 3 }}>
                                <OpenedCard card={enemy} />
                            </View>)}
                        </View>
                        <View style={{ aspectRatio: 2 / 3, height: '100%' }}>
                            <OpenedCard card={enemyLeaderItem.card} onPress={onEnemyLeaderPress} disabled={false} borderColor={getCardBorderColor(enemyLeaderItem)} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <CardRow cardItems={enemyCardItems} gap={rowGap} onCardPress={(card: CardInterface) => { onEnemyCardPress(card) }} getBorderColor={getCardBorderColor} />
                </View>
                <View style={{ flex: 1 }}>
                    <CardRow cardItems={ownCardItems} gap={rowGap} onCardPress={(card: CardInterface) => { onAllyCardPress(card) }} getBorderColor={getCardBorderColor} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ height: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 10 }}>
                        <View style={{ aspectRatio: 2 / 3, height: '100%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <OpenedCard card={allyLeaderItem.card} onPress={onOwnLeaderPress} disabled={false} borderColor={getCardBorderColor(allyLeaderItem)} />
                        </ View>
                        <View style={{ height: '70%', aspectRatio: 2 / 3 }}>
                            {battleState.deadAllies.map(ally => <View key={ally.id} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, aspectRatio: 2 / 3 }}>
                                <OpenedCard card={ally} />
                            </View>)}
                        </View>
                    </View>
                    <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'flex-end', gap: 10 }}>
                        <PrimaryButton title={primaryButtonTitle} onPress={onPrimaryButtonPress} transparent={false} disabled={!ownTurn} />
                        <SecondaryButton title={"Resign"} onPress={resign} transparent={false} />
                    </View>
                </View>
                <View style={{ flex: 0.15, flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
                    <View style={{ aspectRatio: 1, height: '100%', borderRadius: 10, }}><Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={require('../assets/general/sword1.png')}></Image></View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{battlePoints}</Text>
                    <View style={{ aspectRatio: 1, height: '100%', borderRadius: 10, overflow: 'hidden' }}><Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={require('../assets/general/mana.jpg')}></Image></View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{mana}</Text>
                </View>
            </View>
            <CardModalPopup card={moduleCard} visible={moduleCard !== undefined} onClose={() => { setModuleCard(undefined) }}
                onAttack={canAttack ? onAttack : undefined} onSpell={canAttack ? onSpell : undefined} />
            {battleTurnState == "StartOfBattle" &&
                <View style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '50%', height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <PrimaryButton title={"Start battle"} onPress={startBattle} />
                    </View>
                </View>
            }
            {showBattleMessage &&
                <View style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '50%', height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.white }}>Round {roundNumber}</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.white }}>{ownTurn ? "Your turn" : "Enemy's turn"}</Text>
                    </View>
                </View>}
        </View>
    );
};

export default Battle;