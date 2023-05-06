import { MissionInterface } from '../types/mission_types';
import {
  arinthea,
  dramar,
  feleria,
  fiere,
  furio,
  garrus,
  kraagen,
  krafath,
  leerith,
  lilith,
  lyndriel,
  morlaf,
  murlet,
  nurmith,
  ormo,
  piglet,
  salvar,
  talaria,
  valaria,
} from './cards';
import {
  creature_leader,
  elf_leader,
  fairy_leader,
  human_leader,
  orc_leader,
} from './leaders';

export const mission1: MissionInterface = {
  id: '1',
  name: 'Dark Creatures',
  x: 450,
  y: 1360,
  radius: 100,
  locked: false,
  enemies: [ormo, furio, krafath],
  leader: orc_leader,
};

export const mission2: MissionInterface = {
  id: '2',
  name: 'Fairy land',
  x: 160,
  y: 1080,
  radius: 100,
  locked: true,
  enemies: [arinthea, talaria, feleria],
  leader: fairy_leader,
};

export const mission3: MissionInterface = {
  id: '3',
  name: 'Ogre brothers',
  x: 735,
  y: 1095,
  radius: 100,
  locked: true,
  enemies: [morlaf, murlet],
  leader: creature_leader,
};

export const mission4: MissionInterface = {
  id: '4',
  name: 'Mighty humans',
  x: 450,
  y: 865,
  radius: 100,
  locked: true,
  enemies: [garrus, lilith, salvar, nurmith],
  leader: human_leader,
};

export const mission5: MissionInterface = {
  id: '5',
  name: 'Furious creatures',
  x: 75,
  y: 800,
  radius: 100,
  locked: true,
  enemies: [fiere, kraagen],
  leader: creature_leader,
};

export const mission6: MissionInterface = {
  id: '6',
  name: 'Elven shananigans',
  x: 770,
  y: 800,
  radius: 100,
  locked: true,
  enemies: [lyndriel, leerith],
  leader: elf_leader,
};

export const mission7: MissionInterface = {
  id: '7',
  name: 'Battle against the wise old witch',
  x: 430,
  y: 430,
  radius: 100,
  locked: true,
  enemies: [valaria],
  leader: elf_leader,
};

export const mission8: MissionInterface = {
  id: '8',
  name: 'The power of fire',
  x: 0,
  y: 0,
  radius: 100,
  locked: true,
  enemies: [dramar],
  leader: human_leader,
};

export const mission9: MissionInterface = {
  id: '9',
  name: 'The Piglet king',
  x: 0,
  y: 0,
  radius: 100,
  locked: true,
  enemies: [piglet],
  leader: creature_leader,
};
