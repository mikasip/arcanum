import {
  COMPLETE_MISSION,
  MapInterface,
  MissionActionTypes,
} from '../../types/mission_types';
import { testData } from '../../extra/testData';
import { allMaps } from '../../constants/maps';

interface MissionsState {
  currentMap: MapInterface;
}

const initialState: MissionsState = {
  currentMap: allMaps.find(it => it.id === testData.currentMapId) || allMaps[0],
};

export function missionReducer(
  // eslint-disable-next-line
  state: MissionsState = initialState,
  action: MissionActionTypes,
): MissionsState {
  switch (action.type) {
    case COMPLETE_MISSION: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
