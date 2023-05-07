import { CardInterface } from '../types/collection_types';
import {
  enchantedBloom,
  flameBurst,
  healingRoots,
  fairyBond,
  spritelyRestoration,
} from './spells';

export const spider: CardInterface = {
  id: 'spider',
  name: 'Spider',
  attack: 1,
  defence: 0,
  hp: 1,
  type: 'Minion',
  race: 'Creature',
  spells: [],
  image: require('../assets/heros/spider_minion.jpg'),
  description:
    'A weak but agile fighter, capable of quickly darting in and out of combat to attack enemies.',
  price: 10,
};
export const sproutling: CardInterface = {
  id: 'sproutling',
  name: 'Sproutling',
  attack: 1,
  defence: 0,
  hp: 1,
  type: 'Minion',
  race: 'Elf',
  spells: [healingRoots],
  image: require('../assets/heros/sproutling.jpg'),
  description:
    'A weak but agile fighter, capable of quickly darting in and out of combat to attack enemies.',
  price: 10,
};

export const arinthea: CardInterface = {
  id: 'arinthea',
  type: 'Hero',
  name: 'Arinthea',
  race: 'Fairy',
  image: require('../assets/heros/snow_fairy_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 1,
  spells: [spritelyRestoration],
  description:
    'Icy and graceful fairy who wields sharp icicles as weapons and summons blizzards to freeze opponents in their tracks. Her ability to glide over snow and ice make her a slippery opponent.',
  price: 10,
};
export const talaria: CardInterface = {
  id: 'talaria',
  type: 'Hero',
  name: 'Talaria',
  race: 'Fairy',
  image: require('../assets/heros/leaf_fairy_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 1,
  spells: [fairyBond],
  description:
    'Gentle and nurturing fairy who brings plants to life, using vines and leaves to ensnare opponents and heal her allies. Her ability to blend into foliage and summon a swarm of insects make her a tricky opponent.',
  price: 10,
};
export const feleria: CardInterface = {
  id: 'feleria',
  type: 'Hero',
  name: 'Feleria',
  race: 'Fairy',
  image: require('../assets/heros/fire_fairy_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 1,
  spells: [flameBurst],
  description:
    'Fierce and hot-headed fairy who burns enemies to ashes with its fiery breath and wields flames as weapons. Her ability to move quickly and set traps make her a dangerous opponent.',
  price: 10,
};
export const monio: CardInterface = {
  id: 'monio',
  type: 'Hero',
  name: 'Monio',
  race: 'Fairy',
  image: require('../assets/heros/monio.jpg'),
  hp: 5,
  defence: 0,
  attack: 1,
  spells: [enchantedBloom],
  description: '',
  price: 10,
};

export const morlaf: CardInterface = {
  id: 'morlaf',
  type: 'Hero',
  name: 'Morlaf',
  race: 'Ogre',
  image: require('../assets/heros/ogre2_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This towering and intimidating ogre wields a massive spiked club and has a thick hide that can shrug off attacks. His sheer strength and menacing appearance make him a force to be reckoned with.',
  price: 10,
};
export const fiere: CardInterface = {
  id: 'fiere',
  type: 'Hero',
  name: 'Fiere',
  race: 'Creature',
  image: require('../assets/heros/werewolf_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This savage and ferocious werewolf rends enemies apart with razor-sharp claws, transforming into a fearsome beast under the light of the full moon. Its heightened senses and incredible strength make it a force to be reckoned with.',
  price: 10,
};
export const kraagen: CardInterface = {
  id: 'kraagen',
  type: 'Hero',
  name: 'Kraagen',
  race: 'Creature',
  image: require('../assets/heros/wooden_creature_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This sturdy and resilient creature is made entirely of wood and can sprout roots to anchor itself in place. Its ability to blend into forest environments and regenerate quickly make it a tough opponent.',
  price: 10,
};
export const lyndriel: CardInterface = {
  id: 'lyndriel',
  type: 'Hero',
  name: 'Lyndirel',
  race: 'Elf',
  image: require('../assets/heros/green_elf_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    ' This nimble and agile elf wields a bow and arrows to strike from a distance, using its speed and stealth to stay one step ahead of foes. Its knowledge of natural remedies and poisons make it a useful ally.',
  price: 10,
};
export const garrus: CardInterface = {
  id: 'garrus',
  type: 'Hero',
  name: 'Garrus',
  race: 'Human',
  image: require('../assets/heros/bearded_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    "Cunning and resourceful character who uses trickery and deception to gain advantage over its enemies. Whether it's through bribery, blackmail, or outright lies, this human is always one step ahead of its foes.",
  price: 10,
};
export const piglet: CardInterface = {
  id: 'piglet',
  type: 'Hero',
  name: 'Piglet',
  race: 'Creature',
  image: require('../assets/heros/pig_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This plucky and determined pig charges headfirst into battle, using its tusks to gore enemies and its small size to dodge attacks. Its bravery and tenacity make it an unexpected but effective opponent.',
  price: 10,
};
export const valaria: CardInterface = {
  id: 'valaria',
  type: 'Hero',
  name: 'Valaria',
  race: 'Elf',
  image: require('../assets/heros/old_witch_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'Ancient and enigmatic witch who channels arcane knowledge and dark magic to manipulate the battlefield, using potions and spells to control opponents and summon creatures to do her bidding. Her years of experience and wisdom make her a formidable foe.',
  price: 10,
};
export const lilith: CardInterface = {
  id: 'lilith',
  type: 'Hero',
  name: 'Lilith',
  race: 'Human',
  image: require('../assets/heros/bow_woman_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    ' This skilled and precise archer rains arrows down on opponents, using her agility and mastery of the bow to strike from a distance. Her focus and accuracy make her a deadly opponent.',
  price: 10,
};
export const ormo: CardInterface = {
  id: 'ormo',
  type: 'Hero',
  name: 'Ormo',
  race: 'Creature',
  image: require('../assets/heros/dark_creature_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'Shadowy and elusive creature who uses its stealth and speed to slip past foes unnoticed, striking with deadly precision when the time is right. Its mysterious origins and unpredictable nature make it a dangerous opponent.',
  price: 10,
};
export const leerith: CardInterface = {
  id: 'leerith',
  type: 'Hero',
  name: 'Leerith',
  race: 'Elf',
  image: require('../assets/heros/green_elf2_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This fierce and cunning ranger wields a bow and sword, using his deep connection to the forest to track enemies and strike from hiding places. His knowledge of natural remedies and keen senses make him a valuable ally.',
  price: 10,
};
export const furio: CardInterface = {
  id: 'furio',
  type: 'Hero',
  name: 'Furio',
  race: 'Creature',
  image: require('../assets/heros/mystic_creature_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'Otherworldly and unpredictable creature who wields bizarre powers and abilities, using its telekinetic and teleportation abilities to confuse and disorient opponents. Its alien appearance and inscrutable motives make it a truly unique opponent.',
  price: 10,
};
export const krafath: CardInterface = {
  id: 'krafath',
  type: 'Hero',
  name: 'Krafath',
  race: 'Creature',
  image: require('../assets/heros/wooden_creature2_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This gentle and serene creature is the embodiment of nature, using her connection to the earth and the trees to heal allies and summon powerful forest spirits. Her ability to meld with trees and control plants make her a versatile and unpredictable opponent.',
  price: 10,
};
export const murlet: CardInterface = {
  id: 'murlet',
  type: 'Hero',
  name: 'Murlet',
  race: 'Ogre',
  image: require('../assets/heros/ogre_with_sword_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This ancient and wise shaman channels the primal power of the earth, using his knowledge of herbs and magic to heal allies and call forth powerful elemental creatures. His experience and strength make him a formidable opponent.',
  price: 10,
};
export const nurmith: CardInterface = {
  id: 'nurmith',
  type: 'Hero',
  name: 'Nurmith',
  race: 'Human',
  image: require('../assets/heros/man_sword2_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This holy and righteous warrior wields a sword and shield, calling upon the power of the divine to smite evil and protect the innocent. His unwavering faith and determination make him a powerful ally in any battle.',
  price: 10,
};
export const salvar: CardInterface = {
  id: 'salvar',
  type: 'Hero',
  name: 'Salvar',
  race: 'Human',
  image: require('../assets/heros/man_sword1_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'This dark and sinister spellcaster controls the forces of death, summoning undead minions to do his bidding and sapping the life force of his enemies. His mastery of necromancy and forbidden magic make him a fearsome opponent.',
  price: 10,
};
export const dramar: CardInterface = {
  id: 'dramar',
  type: 'Hero',
  name: 'Dramar',
  race: 'Fairy',
  image: require('../assets/heros/fire_spell_hero.jpg'),
  hp: 5,
  defence: 1,
  attack: 3,
  spells: [],
  description:
    'Fiery and passionate fairy who casts powerful fire spells to incinerate enemies and boost the power of her allies. Her ability to imbue weapons with flames and teleport short distances make her a versatile opponent.',
  price: 10,
};

export const allCards = [
  spider,
  sproutling,
  arinthea,
  talaria,
  feleria,
  morlaf,
  fiere,
  kraagen,
  lyndriel,
  garrus,
  piglet,
  valaria,
  lilith,
  ormo,
  leerith,
  furio,
  krafath,
  murlet,
  nurmith,
  salvar,
  dramar,
  monio,
];
