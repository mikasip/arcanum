import {
  COMPLETE_MISSION,
  MissionActionTypes,
} from '../../types/mission_types';
import { testData } from '../../extra/testData';

interface MissionsState {
  currentMapId: string;
}

const initialState: MissionsState = {
  currentMapId: testData.currentMapId,
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
        currentMapId: action.payload,
      };
    }
    default:
      return state;
  }
}
