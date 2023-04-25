import { CardBase, CardInterface, CardType, Effect, ManipulateFunctionParams, Spell } from "../redux/reducers/types/collection_types"
import { Race } from "../redux/reducers/types/collection_types"
import { MapInterface, MissionInterface } from "../redux/reducers/types/mission_types"


const fairy: Race = "Fairy"
const ogre: Race = "Ogre"
const human: Race = "Human"
const elf: Race = "Elf"
const creature: Race = "Creature"


const arinthea = { id: "1", type: "Hero" as CardType, name: 'Arinthea', race: fairy, image: require('../assets/heros/snow_fairy_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Icy and graceful fairy who wields sharp icicles as weapons and summons blizzards to freeze opponents in their tracks. Her ability to glide over snow and ice make her a slippery opponent." }
const talaria = { id: "2", type: "Hero" as CardType, name: 'Talaria', race: fairy, image: require('../assets/heros/leaf_fairy_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Gentle and nurturing fairy who brings plants to life, using vines and leaves to ensnare opponents and heal her allies. Her ability to blend into foliage and summon a swarm of insects make her a tricky opponent." }
const feleria = { id: "4", type: "Hero" as CardType, name: 'Feleria', race: fairy, image: require('../assets/heros/fire_fairy_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Fierce and hot-headed fairy who burns enemies to ashes with its fiery breath and wields flames as weapons. Her ability to move quickly and set traps make her a dangerous opponent." }
const morlaf = { id: "3", type: "Hero" as CardType, name: 'Morlaf', race: ogre, image: require('../assets/heros/ogre2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This towering and intimidating ogre wields a massive spiked club and has a thick hide that can shrug off attacks. His sheer strength and menacing appearance make him a force to be reckoned with." }
const fiere = { id: "5", type: "Hero" as CardType, name: 'Fiere', race: creature, image: require('../assets/heros/werewolf_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This savage and ferocious werewolf rends enemies apart with razor-sharp claws, transforming into a fearsome beast under the light of the full moon. Its heightened senses and incredible strength make it a force to be reckoned with." }
const kraagen = { id: "6", type: "Hero" as CardType, name: 'Kraagen', race: creature, image: require('../assets/heros/wooden_creature_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This sturdy and resilient creature is made entirely of wood and can sprout roots to anchor itself in place. Its ability to blend into forest environments and regenerate quickly make it a tough opponent." }
const lyndriel = { id: "7", type: "Hero" as CardType, name: 'Lyndirel', race: elf, image: require('../assets/heros/green_elf_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: " This nimble and agile elf wields a bow and arrows to strike from a distance, using its speed and stealth to stay one step ahead of foes. Its knowledge of natural remedies and poisons make it a useful ally." }
const garrus = { id: "8", type: "Hero" as CardType, name: 'Garrus', race: human, image: require('../assets/heros/bearded_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Cunning and resourceful character who uses trickery and deception to gain advantage over its enemies. Whether it's through bribery, blackmail, or outright lies, this human is always one step ahead of its foes." }
const piglet = { id: "9", type: "Hero" as CardType, name: 'Piglet', race: creature, image: require('../assets/heros/pig_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This plucky and determined pig charges headfirst into battle, using its tusks to gore enemies and its small size to dodge attacks. Its bravery and tenacity make it an unexpected but effective opponent." }
const valaria = { id: "10", type: "Hero" as CardType, name: 'Valaria', race: elf, image: require('../assets/heros/old_witch_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Ancient and enigmatic witch who channels arcane knowledge and dark magic to manipulate the battlefield, using potions and spells to control opponents and summon creatures to do her bidding. Her years of experience and wisdom make her a formidable foe." }
const lilith = { id: "11", type: "Hero" as CardType, name: 'Lilith', race: human, image: require('../assets/heros/bow_woman_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: " This skilled and precise archer rains arrows down on opponents, using her agility and mastery of the bow to strike from a distance. Her focus and accuracy make her a deadly opponent." }
const ormo = { id: "12", type: "Hero" as CardType, name: 'Ormo', race: creature, image: require('../assets/heros/dark_creature_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Shadowy and elusive creature who uses its stealth and speed to slip past foes unnoticed, striking with deadly precision when the time is right. Its mysterious origins and unpredictable nature make it a dangerous opponent." }
const leerith = { id: "13", type: "Hero" as CardType, name: 'Leerith', race: elf, image: require('../assets/heros/green_elf2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This fierce and cunning ranger wields a bow and sword, using his deep connection to the forest to track enemies and strike from hiding places. His knowledge of natural remedies and keen senses make him a valuable ally." }
const furio = { id: "14", type: "Hero" as CardType, name: 'Furio', race: creature, image: require('../assets/heros/mystic_creature_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Otherworldly and unpredictable creature who wields bizarre powers and abilities, using its telekinetic and teleportation abilities to confuse and disorient opponents. Its alien appearance and inscrutable motives make it a truly unique opponent." }
const krafath = { id: "15", type: "Hero" as CardType, name: 'Krafath', race: creature, image: require('../assets/heros/wooden_creature2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This gentle and serene creature is the embodiment of nature, using her connection to the earth and the trees to heal allies and summon powerful forest spirits. Her ability to meld with trees and control plants make her a versatile and unpredictable opponent." }
const murlet = { id: "16", type: "Hero" as CardType, name: 'Murlet', race: ogre, image: require('../assets/heros/ogre_with_sword_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This ancient and wise shaman channels the primal power of the earth, using his knowledge of herbs and magic to heal allies and call forth powerful elemental creatures. His experience and strength make him a formidable opponent." }
const nurmith = { id: "17", type: "Hero" as CardType, name: 'Nurmith', race: human, image: require('../assets/heros/man_sword2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This holy and righteous warrior wields a sword and shield, calling upon the power of the divine to smite evil and protect the innocent. His unwavering faith and determination make him a powerful ally in any battle." }
const salvar = { id: "18", type: "Hero" as CardType, name: 'Salvar', race: human, image: require('../assets/heros/man_sword1_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "This dark and sinister spellcaster controls the forces of death, summoning undead minions to do his bidding and sapping the life force of his enemies. His mastery of necromancy and forbidden magic make him a fearsome opponent." }
const dramar = { id: "19", type: "Hero" as CardType, name: 'Dramar', race: fairy, image: require('../assets/heros/fire_spell_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [] as Spell[], description: "Fiery and passionate fairy who casts powerful fire spells to incinerate enemies and boost the power of her allies. Her ability to imbue weapons with flames and teleport short distances make her a versatile opponent." }

const heros = [arinthea, talaria, feleria, morlaf, fiere, kraagen, lyndriel, garrus, piglet, valaria,
    lilith, ormo, leerith, furio, krafath, murlet, nurmith, salvar, dramar]

const cardBases: CardBase[] = []
heros.forEach((hero) => {
    cardBases.push({ image: hero.image, card: hero })
})

const deckHeros = [arinthea, piglet, valaria,
    lilith, ormo, leerith, salvar, dramar]

const deckCardBases: CardBase[] = []
deckHeros.forEach((hero) => {
    deckCardBases.push({ image: hero.image, card: hero })
})

const mission1: MissionInterface = {
    id: "1",
    name: "Dark Creatures",
    x: 450,
    y: 1360,
    radius: 100,
    locked: false,
    enemies: [ormo, furio, krafath]
}

const mission2: MissionInterface = {
    id: "2",
    name: "Fairy land",
    x: 160,
    y: 1080,
    radius: 100,
    locked: true,
    enemies: [arinthea, talaria, feleria]
}

const mission3: MissionInterface = {
    id: "3",
    name: "Ogre brothers",
    x: 735,
    y: 1095,
    radius: 100,
    locked: true,
    enemies: [morlaf, murlet]
}

const mission4: MissionInterface = {
    id: "4",
    name: "Mighty humans",
    x: 450,
    y: 865,
    radius: 100,
    locked: true,
    enemies: [garrus, lilith, salvar, nurmith]
}

const mission5: MissionInterface = {
    id: "5",
    name: "Furious creatures",
    x: 75,
    y: 800,
    radius: 100,
    locked: true,
    enemies: [fiere, kraagen]
}

const mission6: MissionInterface = {
    id: "6",
    name: "Elven shananigans",
    x: 770,
    y: 800,
    radius: 100,
    locked: true,
    enemies: [lyndriel, leerith]
}

const mission7: MissionInterface = {
    id: "7",
    name: "Battle against the wise old witch",
    x: 430,
    y: 430,
    radius: 100,
    locked: true,
    enemies: [valaria]
}

const mission8: MissionInterface = {
    id: "8",
    name: "The power of fire",
    x: 0,
    y: 0,
    radius: 100,
    locked: true,
    enemies: [dramar]
}

const mission9: MissionInterface = {
    id: "9",
    name: "The Piglet king",
    x: 0,
    y: 0,
    radius: 100,
    locked: true,
    enemies: [piglet]
}
const missions: MissionInterface[] = [mission1, mission2, mission3, mission4, mission5, mission6, mission7]

const map1: MapInterface = {
    image: require('../assets/general/island_tall3.jpg'),
    missions: missions,
    originalWidth: 864,
    originalHeight: 1728,
}

const currentMap = map1

const chargeOfLoyaltyEffect1: Effect = {
    type: "passive",
    targetEffect: false,
    effectLaunchHook: "startOfBattle",
    manipulateFunction: (params: ManipulateFunctionParams) => {
        const { self, allies, enemies, ownLeader, enemyLeader } = params
        ownLeader.hp += 2 * allies.filter(ally => { ally.race == "Human" }).length
        return ({ self, allies, enemies, ownLeader, enemyLeader })
    }
}

const chargeOfLoyalty: Spell = { name: "Charge of Loyalty", image: require('../assets/general/chargeofloyalty.jpg'), description: "Channels the life force of Human allies into the leader, granting them 2 HP for each Human ally present at start of the battle.", effects: [chargeOfLoyaltyEffect1] }

const ogreSpellEffect1: Effect = {
    type: "passive",
    targetEffect: false,
    effectLaunchHook: "enemyDies",
    manipulateFunction: (params: ManipulateFunctionParams) => {
        const { self, allies, enemies, ownLeader, enemyLeader } = params
        enemyLeader.hp -= 1
        return ({ self, allies, enemies, ownLeader, enemyLeader })
    }
}

const ogreSpell: Spell = { name: "Vengeful Harvest", image: require('../assets/general/vengefulharvest.jpg'), description: "This spell allows the Ogre leader to extract the life force of fallen enemy heroes, causing the enemy leader to lose 1 HP each time an enemy hero dies.", effects: [ogreSpellEffect1] }

const fairyEffect1: Effect = {
    type: "passive",
    targetEffect: false,
    effectLaunchHook: "enemyAttack",
    manipulateFunction: (params: ManipulateFunctionParams) => {
        const { self, allies, enemies, ownLeader, enemyLeader, targets } = params
        if (targets) {
            targets.forEach(target => {
                const attackedAlly = allies.find(ally => ally.id == target.id)
                if (attackedAlly && attackedAlly.hp >= 1) attackedAlly.hp += 1
            })
        }
        return ({ self, allies, enemies, ownLeader, enemyLeader })
    }
}

const spider: CardInterface = { id: "spider", name: "Spider", attack: 1, defence: 0, hp: 1, type: "Minion", race: "Creature", spells: [], image: require("../assets/heros/spider_minion.jpg"), description: "A weak but agile fighter, capable of quickly darting in and out of combat to attack enemies." }

const webOfRebirthEffect1: Effect = {
    type: "passive",
    targetEffect: false,
    effectLaunchHook: "enemyAttack",
    manipulateFunction: (params: ManipulateFunctionParams) => {
        const { self, allies, enemies, ownLeader, enemyLeader, targets, deadAllies } = params
        if (targets) {
            for (let target of targets) {
                const attackedAlly = deadAllies?.find(ally => ally.id == target.id)
                if (attackedAlly) {
                    allies.push(spider);
                }
            }
        }
        return ({ self, allies, enemies, ownLeader, enemyLeader })
    }
}

const fairySpell: Spell = { name: "Pixie's Blessing", image: require('../assets/general/pixiesblessing.jpg'), description: "Blesses the ally Fairys with the power to heal themselves for 1 HP whenever they are injured, as long as they have at least 1 HP remaining.", effects: [fairyEffect1] }

const webOfRebirth: Spell = { name: "Web of Rebirth", image: require('../assets/general/webofrebirth.jpg'), description: "Weaves a powerful web that imbues fallen ally heroes with the power to spawn a Spider upon their death. Spider: Creature minion with 1 HP, 0 DEF and 1 ATK.", effects: [webOfRebirthEffect1] }

const healingRootsEffect1: Effect = {
    type: "passive",
    targetEffect: false,
    effectLaunchHook: "allyAttack",
    manipulateFunction: (params: ManipulateFunctionParams) => {
        const { self, attackingAllies, allies, enemies, ownLeader, enemyLeader, targets, deadAllies } = params
        if (attackingAllies && attackingAllies.find(ally => ally.id == self.id)) {
            self.hp += 1
        }
        return ({ self, allies, enemies, ownLeader, enemyLeader })
    }
}

const healingRoots: Spell = { name: "Healing Roots", image: require('../assets/general/healingroots.jpg'), description: "The Sproutling's roots delve deep into the earth, drawing upon the natural energies of the forest to heal itself for 1 HP after attacking an enemy.", effects: [healingRootsEffect1] }

const sproutling: CardInterface = { id: "sproutling", name: "Sproutling", attack: 1, defence: 0, hp: 1, type: "Minion", race: "Elf", spells: [healingRoots], image: require("../assets/heros/sproutling.jpg"), description: "A weak but agile fighter, capable of quickly darting in and out of combat to attack enemies." }

const elvenGraceEffect1: Effect = {
    type: "passive",
    targetEffect: false,
    effectLaunchHook: "enemyAttack",
    manipulateFunction: (params: ManipulateFunctionParams) => {
        const { self, allies, enemies, ownLeader, enemyLeader, targets, deadAllies } = params
        if (targets) {
            for (let target of targets) {
                const attackedAlly = deadAllies?.find(ally => ally.id == target.id)
                if (attackedAlly && attackedAlly.race == "Elf") {
                    allies.push(sproutling);
                }
            }
        }
        return ({ self, allies, enemies, ownLeader, enemyLeader })
    }
}

const elvenGrace: Spell = { name: "Elven Grace", image: require('../assets/general/elvengrace.jpg'), description: "Imbues the fallen allies with a spark of life, allowing them to continue fighting in the form of a Sproutling. Sproutling: Elf Minion with 1 HP, 0 DEF, 1 ATK and passive ability to heal for 1 HP whenever they deal damage to an enemy.", effects: [elvenGraceEffect1] }

const fairy_leader = { id: "1", type: "Leader" as CardType, name: 'Aranthum', race: fairy, image: require('../assets/heros/fairy_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [fairySpell], description: "" }
const orc_leader = { id: "2", type: "Leader" as CardType, name: 'Urluth', race: ogre, image: require('../assets/heros/orc_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [ogreSpell], description: "" }
const human_leader = { id: "3", type: "Leader" as CardType, name: 'Fareth', race: human, image: require('../assets/heros/human_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [chargeOfLoyalty], description: "" }
const creature_leader = { id: "4", type: "Leader" as CardType, name: 'Fearborn', race: creature, image: require('../assets/heros/shadow_creature_hero.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [webOfRebirth], description: "" }
const elf_leader = { id: "5", type: "Leader" as CardType, name: 'Lerion', race: elf, image: require('../assets/heros/elf_leader.jpg'), "hp": 20, "defence": 0, "attack": 0, "spells": [elvenGrace], description: "" }

const leaders: CardInterface[] = [
    fairy_leader, orc_leader, human_leader, elf_leader, creature_leader
]

export const testData = {
    cardBases,
    deckCardBases,
    deckHeros,
    currentMap,
    leaders
}