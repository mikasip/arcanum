import { BattleState, CardInterface } from '../types/collection_types';
import { spider, sproutling } from './cards';

type manipulateFunction = (
  state: BattleState,
  changeHpFunction: (
    currentState: BattleState,
    card: CardInterface,
    amount: number,
  ) => BattleState,
) => BattleState;

type EffectFunctionObject = {
  id: string;
  effectFunction: manipulateFunction;
};

export const effectFunctions: EffectFunctionObject[] = [
  {
    id: 'chargeOfLoyaltyEffect1',
    effectFunction: (params: BattleState, changeHpFunction) => {
      const { allies, ownLeader } = params;
      const humanAllies = allies.filter(ally => ally.race === 'Human');
      const hpChangeAmount = humanAllies.length * 2;
      const newState = changeHpFunction(params, ownLeader, hpChangeAmount);
      return { ...newState };
    },
  },
  {
    id: 'vengefulHarvestEffect1',
    effectFunction: (params: BattleState, changeHpFunction) => {
      const newState = changeHpFunction(params, params.enemyLeader, -1);
      return { ...newState };
    },
  },
  {
    id: 'pixiesBlessingEffect1',
    effectFunction: (params: BattleState, changeHpFunction) => {
      const { allies, targets } = params;
      let newState = params;
      if (targets) {
        targets.forEach(target => {
          const attackedAlly = allies.find(ally => ally.id === target.id);
          if (attackedAlly && attackedAlly.hp >= 1) {
            newState = changeHpFunction(newState, attackedAlly, 1);
          }
        });
      }
      return { ...newState };
    },
  },
  {
    id: 'webOfRebirthEffect1',
    effectFunction: (params: BattleState) => {
      const { allies, targets, deadAllies } = params;
      if (targets) {
        for (const target of targets) {
          const attackedAlly = deadAllies.find(ally => ally.id === target.id);
          if (
            attackedAlly &&
            attackedAlly.type === 'Hero' &&
            deadAllies.length < 2
          ) {
            allies.push({ ...spider });
          }
        }
      }
      return { ...params, allies };
    },
  },
  {
    id: 'healingRootsEffect1',
    effectFunction: (params: BattleState, changeHpFunction) => {
      const { active, attackingAllies } = params;
      let newState = params;
      if (attackingAllies && active && active.name === 'Sproutling') {
        newState = changeHpFunction(newState, active, 1);
      }
      return { ...newState };
    },
  },
  {
    id: 'elvenGraceEffect1',
    effectFunction: (params: BattleState) => {
      const { allies, targets, deadAllies } = params;
      if (targets) {
        for (const target of targets) {
          const attackedAlly = deadAllies?.find(ally => ally.id === target.id);
          if (
            attackedAlly &&
            attackedAlly.race === 'Elf' &&
            attackedAlly.type === 'Hero'
          ) {
            allies.push({ ...sproutling });
          }
        }
      }
      return { ...params, allies };
    },
  },
  {
    id: 'enchantedBloomEffect1',
    effectFunction: (params: BattleState) => {
      const { ownMana } = params;
      return { ...params, ownMana: ownMana + 1 };
    },
  },
  {
    id: 'flameBurstEffect1',
    effectFunction: (params: BattleState, changeHpFunction) => {
      let newState = { ...params };
      if (params.targets) {
        newState = changeHpFunction(newState, params.targets[0], -3);
      }
      return { ...newState };
    },
  },
  {
    id: 'fairyBondEffect1',
    effectFunction: (params: BattleState, changeHpFunction) => {
      let newState = { ...params };
      if (params.targets) {
        const target = params.targets[0];
        newState.movedAllies = newState.movedAllies.filter(
          ally => ally !== target,
        );
        newState = changeHpFunction(newState, target, 1);
      }
      return { ...newState };
    },
  },
  {
    id: 'spritelyRestorationEffect1',
    effectFunction: (params: BattleState, changeHpFunction) => {
      const { allies } = params;
      let newState = { ...params };
      for (const ally of allies) {
        if (ally.race === 'Fairy') {
          newState = changeHpFunction(newState, ally, 1);
        }
      }
      return { ...newState };
    },
  },
];
