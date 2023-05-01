import { MissionInterface } from "../redux/reducers/types/mission_types"
import { arinthea, dramar, feleria, fiere, furio, garrus, kraagen, krafath, leerith, lilith, lyndriel, morlaf, murlet, nurmith, ormo, piglet, salvar, talaria, valaria } from "./cards"

export const mission1: MissionInterface = {
    id: "1",
    name: "Dark Creatures",
    x: 450,
    y: 1360,
    radius: 100,
    locked: false,
    enemies: [ormo, furio, krafath]
}

export const mission2: MissionInterface = {
    id: "2",
    name: "Fairy land",
    x: 160,
    y: 1080,
    radius: 100,
    locked: true,
    enemies: [arinthea, talaria, feleria]
}

export const mission3: MissionInterface = {
    id: "3",
    name: "Ogre brothers",
    x: 735,
    y: 1095,
    radius: 100,
    locked: true,
    enemies: [morlaf, murlet]
}

export const mission4: MissionInterface = {
    id: "4",
    name: "Mighty humans",
    x: 450,
    y: 865,
    radius: 100,
    locked: true,
    enemies: [garrus, lilith, salvar, nurmith]
}

export const mission5: MissionInterface = {
    id: "5",
    name: "Furious creatures",
    x: 75,
    y: 800,
    radius: 100,
    locked: true,
    enemies: [fiere, kraagen]
}

export const mission6: MissionInterface = {
    id: "6",
    name: "Elven shananigans",
    x: 770,
    y: 800,
    radius: 100,
    locked: true,
    enemies: [lyndriel, leerith]
}

export const mission7: MissionInterface = {
    id: "7",
    name: "Battle against the wise old witch",
    x: 430,
    y: 430,
    radius: 100,
    locked: true,
    enemies: [valaria]
}

export const mission8: MissionInterface = {
    id: "8",
    name: "The power of fire",
    x: 0,
    y: 0,
    radius: 100,
    locked: true,
    enemies: [dramar]
}

export const mission9: MissionInterface = {
    id: "9",
    name: "The Piglet king",
    x: 0,
    y: 0,
    radius: 100,
    locked: true,
    enemies: [piglet]
}