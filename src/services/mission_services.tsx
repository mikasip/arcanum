import { testData } from '../extra/testData';
import { MapInterface, MissionInterface } from '../redux/reducers/types/mission_types';
export const missionsService = {
    completeMission
};

async function completeMission(missionId: string): Promise<MapInterface> {
    // return await getFromServer('/api/');
    const completedMissionIndex = testData.currentMap.missions.findIndex(mission => mission.id == missionId)
    testData.currentMap.missions[completedMissionIndex].locked = true
    return testData.currentMap
}
