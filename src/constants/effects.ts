import { Effect } from '../types/collection_types';

export const chargeOfLoyaltyEffect1: Effect = {
  targetEffect: false,
  effectLaunchHook: 'startOfBattle',
  manipulateFunctionId: 'chargeOfLoyaltyEffect1',
};
export const ogreSpellEffect1: Effect = {
  targetEffect: false,
  effectLaunchHook: 'enemyDies',
  manipulateFunctionId: 'vengefulHarvestEffect1',
};
export const fairyEffect1: Effect = {
  targetEffect: false,
  effectLaunchHook: 'enemyAttack',
  manipulateFunctionId: 'pixiesBlessingEffect1',
};

export const webOfRebirthEffect1: Effect = {
  targetEffect: false,
  effectLaunchHook: 'enemyAttack',
  manipulateFunctionId: 'webOfRebirthEffect1',
};
export const healingRootsEffect1: Effect = {
  targetEffect: false,
  effectLaunchHook: 'allyAttack',
  manipulateFunctionId: 'healingRootsEffect1',
};
export const elvenGraceEffect1: Effect = {
  targetEffect: false,
  effectLaunchHook: 'enemyAttack',
  manipulateFunctionId: 'elvenGraceEffect1',
};
export const enchantedBloomEffect1: Effect = {
  targetEffect: false,
  manipulateFunctionId: 'enchantedBloomEffect1',
};
export const flameBurstEffect1: Effect = {
  targetEffect: true,
  targetGroup: ['enemy', 'enemyLeader'],
  manipulateFunctionId: 'flameBurstEffect1',
};
export const fairyBondEffect1: Effect = {
  targetEffect: true,
  targetGroup: ['ally', 'allyLeader'],
  manipulateFunctionId: 'fairyBondEffect1',
};
export const spritelyRestorationEffect1: Effect = {
  targetEffect: false,
  manipulateFunctionId: 'spritelyRestorationEffect1',
};
