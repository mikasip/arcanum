import { allMaps } from '../constants/maps';
import { testData } from '../extra/testData';
import { MapInterface } from '../types/mission_types';

async function completeMission(missionId: string): Promise<MapInterface> {
  // return await getFromServer('/api/');
  const currentMap = allMaps.find(map => map.id === testData.currentMapId);
  if (!currentMap) throw new Error('Map not found');
  const completedMissionIndex = currentMap.missions.findIndex(
    mission => mission.id === missionId,
  );
  currentMap.missions[completedMissionIndex].locked = true;
  return currentMap;
}

export const missionsService = {
  completeMission,
};
