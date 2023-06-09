import { Spell } from '../types/collection_types';
import {
  chargeOfLoyaltyEffect1,
  elvenGraceEffect1,
  enchantedBloomEffect1,
  fairyBondEffect1,
  fairyEffect1,
  flameBurstEffect1,
  healingRootsEffect1,
  ogreSpellEffect1,
  webOfRebirthEffect1,
  spritelyRestorationEffect1,
} from './effects';

export const chargeOfLoyalty: Spell = {
  name: 'Charge of Loyalty',
  type: 'passive',
  manaCost: 0,
  image: require('../assets/general/chargeofloyalty.jpg'),
  description:
    'Channels the life force of Human allies into the leader, granting them 2 HP for each Human ally present at start of the battle.',
  effects: [chargeOfLoyaltyEffect1],
};
export const ogreSpell: Spell = {
  name: 'Vengeful Harvest',
  type: 'passive',
  manaCost: 0,
  image: require('../assets/general/vengefulharvest.jpg'),
  description:
    'This spell allows the Ogre leader to extract the life force of fallen enemy heroes, causing the enemy leader to lose 1 HP each time an enemy hero dies.',
  effects: [ogreSpellEffect1],
};
export const fairySpell: Spell = {
  name: "Pixie's Blessing",
  type: 'passive',
  manaCost: 0,
  image: require('../assets/general/pixiesblessing.jpg'),
  description:
    'Blesses the ally Fairys with the power to heal themselves for 1 HP whenever they are injured, as long as they have at least 1 HP remaining.',
  effects: [fairyEffect1],
};
export const webOfRebirth: Spell = {
  name: 'Web of Rebirth',
  type: 'passive',
  manaCost: 0,
  image: require('../assets/general/webofrebirth.jpg'),
  description:
    'Weaves a powerful web that imbues fallen ally heroes with the power to spawn a Spider upon their death. Spider: Creature minion with 1 HP, 0 DEF and 1 ATK.',
  effects: [webOfRebirthEffect1],
};
export const healingRoots: Spell = {
  name: 'Healing Roots',
  type: 'passive',
  manaCost: 0,
  image: require('../assets/general/healingroots.jpg'),
  description:
    "The Sproutling's roots delve deep into the earth, drawing upon the natural energies of the forest to heal itself for 1 HP after attacking an enemy.",
  effects: [healingRootsEffect1],
};
export const elvenGrace: Spell = {
  name: 'Elven Grace',
  type: 'passive',
  manaCost: 0,
  image: require('../assets/general/elvengrace.jpg'),
  description:
    'Imbues the fallen allies with a spark of life, allowing them to continue fighting in the form of a Sproutling. Sproutling: Elf Minion with 1 HP, 0 DEF, 1 ATK and passive ability to heal for 1 HP whenever they deal damage to an enemy.',
  effects: [elvenGraceEffect1],
};

export const enchantedBloom: Spell = {
  name: 'Enchanted Bloon',
  type: 'active',
  manaCost: 0,
  image: require('../assets/general/enchantedbloom.jpg'),
  description:
    'The fairy uses their magic to generate one unit of mana instantly.',
  effects: [enchantedBloomEffect1],
};
export const flameBurst: Spell = {
  name: 'Flame Burst',
  type: 'active',
  manaCost: 1,
  image: require('../assets/general/flame_burst.jpg'),
  description:
    'Feleria conjures a burst of intense flames, sending a wave of searing heat to a target enemy dealing 3 damage.',
  effects: [flameBurstEffect1],
};
export const fairyBond: Spell = {
  name: 'Fairy Bond',
  type: 'active',
  manaCost: 0,
  image: require('../assets/general/fairy_bond.jpg'),
  description:
    'Talaria forges a bond with an ally fairy, sacrificing a portion of their own turn to give the ally fairy a power to attack again and heal for 1 HP.',
  effects: [fairyBondEffect1],
};
export const spritelyRestoration: Spell = {
  name: 'Spritely Restoration',
  type: 'active',
  manaCost: 1,
  image: require('../assets/general/spritely_restoration.jpg'),
  description:
    'Arinthea channels their spritely essence restoring 1 HP of each ally Fairy',
  effects: [spritelyRestorationEffect1],
};
