import { CardInterface } from "../redux/reducers/types/collection_types"
import { fairySpell, ogreSpell, chargeOfLoyalty, webOfRebirth, elvenGrace } from "./spells"

export const fairy_leader: CardInterface = { id: "1", type: "Leader", name: 'Aranthum', race: "Fairy", image: require('../assets/heros/fairy_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [fairySpell], description: "" }
export const orc_leader: CardInterface = { id: "2", type: "Leader", name: 'Urluth', race: "Ogre", image: require('../assets/heros/orc_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [ogreSpell], description: "" }
export const human_leader: CardInterface = { id: "3", type: "Leader", name: 'Fareth', race: "Human", image: require('../assets/heros/human_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [chargeOfLoyalty], description: "" }
export const creature_leader: CardInterface = { id: "4", type: "Leader", name: 'Fearborn', race: "Creature", image: require('../assets/heros/shadow_creature_hero.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [webOfRebirth], description: "" }
export const elf_leader: CardInterface = { id: "5", type: "Leader", name: 'Lerion', race: "Elf", image: require('../assets/heros/elf_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [elvenGrace], description: "" }

export const startLeaderChoices = [fairy_leader, orc_leader, human_leader, creature_leader, elf_leader]