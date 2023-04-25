import { request, failure } from './common_actions';
import { ActionCreator } from 'redux';
import { FetchActionTypes } from '../types/common_types';
import { COMPLETE_MISSION, MissionInterface, MissionActionTypes, MapInterface } from '../types/mission_types';
import { missionsService } from '../../../services/mission_services';

const completeMissionSuccess: ActionCreator<MissionActionTypes> = (map: MapInterface) => {
    return { type: COMPLETE_MISSION, payload: map };
}

export function completeMission(missionId: string) {
    return (dispatch: (arg0: MissionActionTypes | FetchActionTypes) => void) => { // async action: uses Redux-Thunk middleware to return a function instead of an action creator
        dispatch(request());
        return missionsService.completeMission(missionId)
            .then(
                response => {
                    dispatch(completeMissionSuccess(response))
                },
                error => {
                    dispatch(failure('Server error.'))
                })
    }
}