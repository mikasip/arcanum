import { Effect } from "../redux/reducers/types/collection_types"

export const chargeOfLoyaltyEffect1: Effect = {
    targetEffect: false,
    effectLaunchHook: "startOfBattle",
    manipulateFunctionId: "chargeOfLoyaltyEffect1"
}
export const ogreSpellEffect1: Effect = {
    targetEffect: false,
    effectLaunchHook: "enemyDies",
    manipulateFunctionId: "vengefulHarvestEffect1"
}
export const fairyEffect1: Effect = {
    targetEffect: false,
    effectLaunchHook: "enemyAttack",
    manipulateFunctionId: "pixiesBlessingEffect1"
}

export const webOfRebirthEffect1: Effect = {
    targetEffect: false,
    effectLaunchHook: "enemyAttack",
    manipulateFunctionId: "webOfRebirthEffect1"
}
export const healingRootsEffect1: Effect = {
    targetEffect: false,
    effectLaunchHook: "allyAttack",
    manipulateFunctionId: "healingRootsEffect1"
}
export const elvenGraceEffect1: Effect = {
    targetEffect: false,
    effectLaunchHook: "enemyAttack",
    manipulateFunctionId: "elvenGraceEffect1"
}
export const enchantedBloomEffect1: Effect = {
    targetEffect: false,
    manipulateFunctionId: "enchantedBloomEffect1"
}
