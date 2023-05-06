import React, { useEffect, useState } from 'react';
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
    damage?: number
    activeSpell?: Spell
}

type CardAndDamage = {
    card: CardInterface,
    damage: number;
}

type CardAndSpell = {
    card: CardInterface,
    spell?: Spell
}

type Player = "Self" | "Enemy"

const rowGap = 3

const Battle: React.FC<BattleProps> = ({ navigation, route }) => {

    const { ownCards, ownLeader, enemyCards, enemyLeader } = route.params

    const starter: Player = Math.random() > 0.5 ? "Self" : "Enemy"
    const initialBattleState: BattleState = {
        ownLeader: { ...ownLeader },
        enemyLeader: { ...enemyLeader },
        allies: [...ownCards.map(card => { return ({ ...card }) })],
        enemies: [...enemyCards.map(card => { return ({ ...card }) })],
        deadAllies: [],
        deadEnemies: [],
        movedAllies: [],
        ownMana: 0,
        enemyMana: 0,
        roundNumber: 1,
        ownBattlePoints: starter == "Self" ? 1 : 2,
        enemyBattlePoints: starter == "Enemy" ? 1 : 2,
    }

    const [battleState, setBattleState] = useState<BattleState>(initialBattleState)

    // States regarding the UI
    const [ownTurn, setOwnTurn] = useState(starter == "Self")
    const [moduleCard, setModuleCard] = useState<CardInterface | undefined>(undefined);
    const [damagedCards, setDamagedCards] = useState<CardAndDamage[]>([])
    const [activeCardAndSpell, setActiveCardAndSpell] = useState<CardAndSpell | undefined>(undefined)
    const [showBattleMessage, setShowBattleMessage] = useState(false)
    const [battleStarted, setBattleStarted] = useState(false)

    const setDamagedCardWithTimeout = (cardAndDamage: CardAndDamage) => {
        setDamagedCards([...damagedCards, cardAndDamage])
        setTimeout(() => {
            setDamagedCards(damagedCards.filter(item => item == cardAndDamage))
        }, 2000)
    }

    const setActiveCardAndSpellWithTimeout = (cardAndSpell: CardAndSpell) => {
        setActiveCardAndSpell(cardAndSpell)
        setTimeout(() => {
            setActiveCardAndSpell(undefined)
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
        let newState = { ...battleState }
        newState = checkBattleHooks("startOfBattle", newState, false)
        newState = checkBattleHooks("startOfBattle", newState, true)
        setBattleStarted(true)
        ownTurn ? startOwnTurn({ ...newState }) : startEnemyTurn({ ...newState })
    }

    const startOwnTurn = (currentState: BattleState) => {
        let newState = { ...currentState }
        if (newState.roundNumber > 1) {
            setBattleState({ ...newState, ownMana: newState.ownMana + 1, ownBattlePoints: newState.ownBattlePoints + 1 })
        }
        newState = checkBattleHooks("startOfOwnTurn", newState, false)
        newState = checkBattleHooks("startOfEnemyTurn", newState, true)
        setShowBattleMessageWithTimeout(() => {
        })
    }

    const startEnemyTurn = (currentState: BattleState) => {
        let newState = { ...currentState }
        console.log(newState.roundNumber)
        if (newState.roundNumber > 1) {
            newState.enemyMana += 1
            newState.enemyBattlePoints += 1
            setBattleState({ ...newState })
        }
        newState = checkBattleHooks("startOfEnemyTurn", newState, false)
        newState = checkBattleHooks("startOfOwnTurn", newState, true)
        setShowBattleMessageWithTimeout(() => {
            playEnemyTurn(newState)
        })
    }

    const endOwnTurn = () => {
        let newState = { ...battleState }
        newState.movedAllies = [],
            setOwnTurn(false)
        newState = checkBattleHooks("endOfOwnTurn", newState, false)
        newState = checkBattleHooks("endOfEnemyTurn", newState, true)
        if (starter == "Enemy") {
            newState.roundNumber += 1
            setBattleState({ ...newState })
        }
        startEnemyTurn(newState)
    }

    const endEnemyTurn = (state: BattleState) => {
        let newState = { ...state }
        newState.movedAllies = [],
            setOwnTurn(true);
        newState = checkBattleHooks("endOfEnemyTurn", newState, false)
        newState = checkBattleHooks("endOfOwnTurn", newState, true)
        if (starter == "Self") {
            newState.roundNumber += 1
            setBattleState({ ...newState })
        }
        startOwnTurn(newState)
    }

    const playEnemyTurn = (currentState: BattleState) => {
        const allEnemyCards: CardInterface[] = [...enemyCardItems.map(item => item.card), enemyLeaderItem.card]
        const cardsAndSpellsToUse: CardAndSpell[] = []
        const cardsAndSpellsAvailable: CardAndSpell[] = []
        let cardsWithNotAvailableSkill = false
        for (const card of allEnemyCards) {
            for (const spell of card.spells) {
                if (spell.manaCost <= currentState.enemyMana) {
                    cardsAndSpellsAvailable.push({ card: card, spell: spell })
                } else cardsWithNotAvailableSkill = true
            }
        }
        let cardsWithAvailableSkill = allEnemyCards.filter(card =>
            card.spells.filter(spell => spell.manaCost <= currentState.enemyMana).length > 0
        )
        if (cardsWithAvailableSkill.length > 0) {
            if (!(cardsWithNotAvailableSkill && Math.random() > 0.5)) {
                let tempMana = currentState.enemyMana;
                let manaCost = tempMana;
                while (manaCost > 0) {
                    const objectsWithManaCost = cardsAndSpellsAvailable.filter(obj => obj.spell?.manaCost == manaCost)
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
            const lastInd = restCardsSortedByAttack.length > currentState.enemyBattlePoints ? currentState.enemyBattlePoints : restCardsSortedByAttack.length
            cardsToAttack = restCardsSortedByAttack.slice(0, lastInd)
        }
        const allCardsAndSpells: CardAndSpell[] = [...cardsAndSpellsToUse, ...cardsToAttack.map(card => { return ({ card: card, spell: undefined }) })]
        performEnemyAutoActionsRecursive(currentState, allCardsAndSpells, 0, endEnemyTurn)
    }

    const performEnemyAutoActionsRecursive = (currentState: BattleState, cardsAndSpells: CardAndSpell[], currentIndex: number, callback: (state: BattleState) => void) => {
        let newState: BattleState = { ...currentState }
        if (currentIndex < cardsAndSpells.length) {
            newState.active = cardsAndSpells[currentIndex].card
            newState.activeSpell = cardsAndSpells[currentIndex].spell
            const allAllies = [...newState.allies, newState.ownLeader]
            const target = allAllies[Math.floor(Math.random() * allAllies.length)]
            newState.targets = [target]
            newState = performAction(newState, true)
            setBattleState({ ...newState })
            console.log("cur iter: " + currentIndex)
            setTimeout(() => {
                performEnemyAutoActionsRecursive(newState, cardsAndSpells, currentIndex + 1, callback)
            }, 1000)
        } else {
            console.log("last iter")
            newState = { ...newState, active: undefined, activeSpell: undefined }
            setBattleState(newState)
            callback(newState)
        }
    }

    const performAction = (currentBattleState: BattleState, enemy: boolean = false) => {
        const { targets, activeSpell } = currentBattleState
        const performer = currentBattleState.active
        let newState: BattleState = { ...currentBattleState }
        if (!performer) { return (currentBattleState) }
        if (activeSpell) {
            setActiveCardAndSpellWithTimeout({ card: performer, spell: activeSpell })
            newState = enemy ? transformState(newState) : newState
            for (let effect of activeSpell.effects) {
                const effectFunction = effectFunctions.find(func => func.id == effect.manipulateFunctionId)?.effectFunction
                if (effectFunction) newState = effectFunction(newState, findCardAndChangeHp)
            }
            newState.ownMana -= activeSpell.manaCost
            newState = enemy ? transformState(newState) : newState
            if (activeSpell.type == "active") {
                if (enemy) {
                    newState = checkBattleHooks("enemySpell", newState, false)
                    newState = checkBattleHooks("allySpell", newState, true)
                } else {
                    newState = checkBattleHooks("allySpell", newState, false)
                    newState = checkBattleHooks("enemySpell", newState, true)
                }
            }
        }
        else if (targets && performer.attack) {
            enemy ? newState.attackingEnemies = [performer] : newState.attackingAllies = [performer]
            for (let target of targets) {
                newState = findCardAndChangeHp(newState, target, -performer.attack)
            }
            if (enemy) {
                newState = checkBattleHooks("enemyAttack", newState, false)
                newState = checkBattleHooks("allyAttack", newState, true)
            } else {
                newState = checkBattleHooks("allyAttack", newState, false)
                newState = checkBattleHooks("enemyAttack", newState, true)
            }
            !enemy ? newState.ownBattlePoints -= 1 : newState.enemyBattlePoints -= 1
        }
        newState.movedAllies.push(performer)
        return (newState)
    }

    const canBeTargeted = (card: CardInterface, group: SpellTargetGroup) => {
        if (!ownTurn) return false
        if (battleState.activeSpell) {
            for (let effect of battleState.activeSpell.effects) {
                if (effect.targetEffect) {
                    if (effect.targetGroup && effect.targetGroup.includes(group)) {
                        if (effect.targetRace) {
                            if (effect.targetRace === card.race) {
                                return (true)
                            }
                        } else {
                            return (true)
                        }
                    }
                }
            }
        }
        else {
            if (battleState.active && ["enemy", "enemyLeader"].includes(group)) {
                return (true)
            }
            if (ownTurn && !battleState.active && !
                battleState.movedAllies.includes(card) &&
                ["ally", "allyLeader"].includes(group) &&
                (battleState.ownBattlePoints > 0 || card.spells.filter(spell => spell.manaCost <= battleState.ownMana && spell.type == "active").length > 0)) {
                return (true)
            }

        }
        return (false)
    }

    const enemyCardItems = battleState.enemies.map(card => {
        const damagedCardObj = damagedCards.find(obj => obj.card == card)
        const cardAndSpellObj = activeCardAndSpell
        return ({
            card: card,
            active: canBeTargeted(card, "enemy"),
            damage: damagedCardObj?.damage,
            activeSpell: (activeCardAndSpell && activeCardAndSpell.card == card) ? activeCardAndSpell.spell : undefined
        })
    })
    const ownCardItems = battleState.allies.map(card => {
        const damagedCardObj = damagedCards.find(obj => obj.card == card)
        return ({
            card: card,
            active: canBeTargeted(card, "ally"),
            damage: damagedCardObj?.damage,
            activeSpell: (activeCardAndSpell && activeCardAndSpell.card == card) ? activeCardAndSpell.spell : undefined
        })
    })
    const damagedCardAllyLeader = damagedCards.find(obj => obj.card == battleState.ownLeader)
    const allyLeaderItem = {
        card: battleState.ownLeader,
        active: canBeTargeted(battleState.ownLeader, "allyLeader"),
        damage: damagedCardAllyLeader?.damage,
        activeSpell: (activeCardAndSpell && activeCardAndSpell.card == battleState.ownLeader) ? activeCardAndSpell.spell : undefined
    }
    const damagedCardEnemyLeader = damagedCards.find(obj => obj.card == battleState.enemyLeader)
    const enemyLeaderItem = {
        card: battleState.enemyLeader,
        active: canBeTargeted(battleState.enemyLeader, "enemyLeader"),
        damage: damagedCardEnemyLeader?.damage,
        activeSpell: (activeCardAndSpell && activeCardAndSpell.card == battleState.enemyLeader) ? activeCardAndSpell.spell : undefined
    }

    const onAttack = (card: CardInterface) => {
        setBattleState({ ...battleState, active: card })
        setModuleCard(undefined);
    }
    const onSpell = (card: CardInterface, spell: Spell) => {
        console.log(spell)
        if (battleState.ownMana < spell.manaCost) {
            console.log("Error message: Not enough mana")
            return
        }
        let newState: BattleState = { ...battleState, active: card, activeSpell: spell }
        setBattleState(newState)
        let haveTargetEffects = false
        for (let effect of spell.effects) {
            if (effect.targetEffect) {
                haveTargetEffects = true
            }
        }
        if (!haveTargetEffects) {
            newState = performAction(newState)
            setBattleState({ ...newState, active: undefined, activeSpell: undefined, attackingAllies: [], attackingEnemies: [] })
        }
        setModuleCard(undefined);
    }
    const transformState = (state: BattleState) => {
        const transformedState: BattleState = {
            ...state,
            ownLeader: state.enemyLeader,
            enemyLeader: state.ownLeader,
            allies: state.enemies,
            enemies: state.allies,
            deadAllies: state.deadEnemies,
            deadEnemies: state.deadAllies,
            ownMana: state.enemyMana,
            ownBattlePoints: state.enemyBattlePoints,
            enemyMana: state.ownMana,
            enemyBattlePoints: state.ownBattlePoints,
        }
        return (transformedState)
    }

    const checkBattleHooks = (hook: EffectLaunchHook, currentState: BattleState, enemy: boolean) => {
        let newState = enemy ? transformState({ ...currentState }) : { ...currentState }
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
        return enemy ? (transformState({ ...newState })) : { ...newState }
    }

    const findCardAndChangeHp = (state: BattleState, card: CardInterface, amount: number) => {
        const newBattleState = { ...state }
        const allyCard = newBattleState.allies.find(ally => ally == card)
        if (allyCard) {
            setDamagedCardWithTimeout({ card: allyCard, damage: amount })
            allyCard.hp += amount
            if (allyCard.hp <= 0) {
                allyCard.hp = 0
                newBattleState.deadAllies = [...newBattleState.deadAllies, allyCard]
                newBattleState.allies = [...newBattleState.allies.filter(ally => ally != allyCard)]
            }
            setAnimation();
        }
        if (card == newBattleState.ownLeader) {
            setDamagedCardWithTimeout({ card: newBattleState.ownLeader, damage: amount })
            newBattleState.ownLeader.hp += amount
        }
        if (card == newBattleState.enemyLeader) {
            setDamagedCardWithTimeout({ card: newBattleState.enemyLeader, damage: amount })
            newBattleState.enemyLeader.hp += amount
        }
        const enemyCard = newBattleState.enemies.find(enemy => enemy == card)
        if (enemyCard) {
            setDamagedCardWithTimeout({ card: enemyCard, damage: amount })
            enemyCard.hp += amount
            if (enemyCard.hp <= 0) {
                enemyCard.hp = 0
                newBattleState.deadEnemies = [...newBattleState.deadEnemies, enemyCard]
                newBattleState.enemies = newBattleState.enemies.filter(enemy => enemy != enemyCard)
            }
            setAnimation();
        }
        return { ...newBattleState }
    }
    const onAllyCardPress = (card: CardInterface) => {
        const cardItem = ownCardItems.find(item => item.card == card)
        if (cardItem) {
            if (!battleState.active && ownTurn) {
                setModuleCard(cardItem.card)
            } else {
                if (cardItem.active) {
                    const newState = performAction({ ...battleState, targets: [cardItem.card] })
                    setBattleState({ ...newState, active: undefined, targets: undefined, activeSpell: undefined, attackingAllies: [], attackingEnemies: [] })
                }
            }
        }
    }
    const onEnemyCardPress = (card: CardInterface) => {
        const cardItem = enemyCardItems.find(item => item.card == card)
        if (cardItem) {
            if (!cardItem.active && ownTurn) {
                setModuleCard(cardItem.card)
            } else {
                if (cardItem.active) {
                    const newState = performAction({ ...battleState, targets: [cardItem.card] })
                    setBattleState({ ...newState, active: undefined, targets: undefined, activeSpell: undefined, attackingAllies: [], attackingEnemies: [] })
                }
            }
        }
    }
    const onOwnLeaderPress = () => {
        if (!battleState.active && ownTurn) {
            setModuleCard(allyLeaderItem.card)
        } else {
            if (allyLeaderItem.active) {
                const newState = performAction({ ...battleState, targets: [allyLeaderItem.card] })
                setBattleState({ ...newState, active: undefined, targets: undefined, activeSpell: undefined, attackingAllies: [], attackingEnemies: [] })
            }
        }
    }
    const onEnemyLeaderPress = () => {
        if (!battleState.active && ownTurn) {
            setModuleCard(enemyLeaderItem.card)
        } else {
            if (enemyLeaderItem.active) {
                const newState = performAction({ ...battleState, targets: [enemyLeaderItem.card] })
                setBattleState({ ...newState, active: undefined, targets: undefined, activeSpell: undefined, attackingAllies: [], attackingEnemies: [] })
            }
        }

    }
    const onPrimaryButtonPress = () => {
        if (battleState.active) {
            setBattleState({ ...battleState, active: undefined, activeSpell: undefined })
        } else {
            endOwnTurn()
        }
    }

    const primaryButtonTitle = (battleState.active && ownTurn) ? "Cancel" : "Finish turn"
    const resign = () => {
        console.log("Resigned!")
    }
    const allyModuleCard = (moduleCard && (moduleCard == allyLeaderItem.card || ownCardItems.map(item => item.card).includes(moduleCard)))
    const canAttack = (battleState.ownBattlePoints > 0 && allyModuleCard && ownTurn && !battleState.movedAllies.includes(moduleCard))
    const canSpell = (allyModuleCard && ownTurn && !battleState.movedAllies.includes(moduleCard))

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
        if (battleState.active == cardItem.card) {
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
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{battleState.enemyBattlePoints}</Text>
                    <View style={{ aspectRatio: 1, height: '100%', borderRadius: 10, overflow: 'hidden' }}><Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={require('../assets/general/mana.jpg')}></Image></View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{battleState.enemyMana}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10 }}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{ownTurn ? 'Your turn!' : 'Enemys turn!'}</Text>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{'Round ' + battleState.roundNumber}</Text>
                    </View>
                    <View style={{ height: '100%', flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                        <View style={{ aspectRatio: 2 / 3, height: '70%' }}>
                            {battleState.deadEnemies.map(enemy => <View key={enemy.id} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, aspectRatio: 2 / 3 }}>
                                <OpenedCard card={enemy} />
                            </View>)}
                        </View>
                        <View style={{ aspectRatio: 2 / 3, height: '100%' }}>
                            <OpenedCard card={enemyLeaderItem.card} onPress={onEnemyLeaderPress} damageTaken={enemyLeaderItem.damage} activeSpell={enemyLeaderItem.activeSpell} disabled={false} borderColor={getCardBorderColor(enemyLeaderItem)} />
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
                    <View style={{ height: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
                        <View style={{ aspectRatio: 2 / 3, height: '100%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <OpenedCard card={allyLeaderItem.card} damageTaken={allyLeaderItem.damage} activeSpell={allyLeaderItem.activeSpell} onPress={onOwnLeaderPress} disabled={false} borderColor={getCardBorderColor(allyLeaderItem)} />
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
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{battleState.ownBattlePoints}</Text>
                    <View style={{ aspectRatio: 1, height: '100%', borderRadius: 10, overflow: 'hidden' }}><Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={require('../assets/general/mana.jpg')}></Image></View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>{battleState.ownMana}</Text>
                </View>
            </View>
            <CardModalPopup card={moduleCard} visible={moduleCard !== undefined} onClose={() => { setModuleCard(undefined) }}
                onAttack={canAttack ? onAttack : undefined} onSpell={canSpell ? onSpell : undefined} />
            {!battleStarted &&
                <View style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '50%', height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <PrimaryButton title={"Start battle"} onPress={startBattle} />
                    </View>
                </View>
            }
            {showBattleMessage &&
                <View style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '50%', height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.white }}>Round {battleState.roundNumber}</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.white }}>{ownTurn ? "Your turn" : "Enemy's turn"}</Text>
                    </View>
                </View>}
        </View>
    );
};

export default Battle;