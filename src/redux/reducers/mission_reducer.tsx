import { COMPLETE_MISSION, MapInterface, MissionActionTypes, MissionInterface, } from './types/mission_types';
import { testData } from '../../extra/testData';

interface MissionsState {
    currentMap: MapInterface
}

const initialState: MissionsState = {
    currentMap: testData.currentMap
};

export function missionReducer(state: MissionsState = initialState, action: MissionActionTypes): MissionsState {
    switch (action.type) {
        case COMPLETE_MISSION: {
            return {
                ...state,
                currentMap: action.payload
            };
        }
        default:
            return state
    }
};