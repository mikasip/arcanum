import { MapInterface, MissionInterface } from "../redux/reducers/types/mission_types"
import { mission1, mission2, mission3, mission4, mission5, mission6, mission7 } from "./missions"

const map1Missions: MissionInterface[] = [mission1, mission2, mission3, mission4, mission5, mission6, mission7]

const map1: MapInterface = {
    id: "map1",
    image: require('../assets/general/island_tall3.jpg'),
    missions: map1Missions,
    originalWidth: 864,
    originalHeight: 1728,
}

export const allMaps = [map1]
