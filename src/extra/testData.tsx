import { CardBase } from "../redux/reducers/types/collection_types"
import { Race } from "../redux/reducers/types/collection_types"

const fairy: Race = "Fairy"
const ogre: Race = "Ogre"
const human: Race = "Human"
const elf: Race = "Elf"
const creature: Race = "Creature"


const arinthea = { id: "1", name: 'Arinthea', race: fairy, image: require('../assets/heros/snow_fairy_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Icy and graceful fairy who wields sharp icicles as weapons and summons blizzards to freeze opponents in their tracks. Her ability to glide over snow and ice make her a slippery opponent." }
const talaria = { id: "2", name: 'Talaria', race: fairy, image: require('../assets/heros/leaf_fairy_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Gentle and nurturing fairy who brings plants to life, using vines and leaves to ensnare opponents and heal her allies. Her ability to blend into foliage and summon a swarm of insects make her a tricky opponent." }
const feleria = { id: "4", name: 'Feleria', race: fairy, image: require('../assets/heros/fire_fairy_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Fierce and hot-headed fairy who burns enemies to ashes with its fiery breath and wields flames as weapons. Her ability to move quickly and set traps make her a dangerous opponent." }
const morlaf = { id: "3", name: 'Morlaf', race: ogre, image: require('../assets/heros/ogre2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This towering and intimidating ogre wields a massive spiked club and has a thick hide that can shrug off attacks. His sheer strength and menacing appearance make him a force to be reckoned with." }
const fiere = { id: "5", name: 'Fiere', race: creature, image: require('../assets/heros/werewolf_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This savage and ferocious werewolf rends enemies apart with razor-sharp claws, transforming into a fearsome beast under the light of the full moon. Its heightened senses and incredible strength make it a force to be reckoned with." }
const kraagen = { id: "6", name: 'Kraagen', race: creature, image: require('../assets/heros/wooden_creature_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This sturdy and resilient creature is made entirely of wood and can sprout roots to anchor itself in place. Its ability to blend into forest environments and regenerate quickly make it a tough opponent." }
const lyndriel = { id: "7", name: 'Lyndirel', race: elf, image: require('../assets/heros/green_elf_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: " This nimble and agile elf wields a bow and arrows to strike from a distance, using its speed and stealth to stay one step ahead of foes. Its knowledge of natural remedies and poisons make it a useful ally." }
const garrus = { id: "8", name: 'Garrus', race: human, image: require('../assets/heros/bearded_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Cunning and resourceful character who uses trickery and deception to gain advantage over its enemies. Whether it's through bribery, blackmail, or outright lies, this human is always one step ahead of its foes." }
const piglet = { id: "9", name: 'Piglet', race: creature, image: require('../assets/heros/pig_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This plucky and determined pig charges headfirst into battle, using its tusks to gore enemies and its small size to dodge attacks. Its bravery and tenacity make it an unexpected but effective opponent." }
const valaria = { id: "10", name: 'Valaria', race: elf, image: require('../assets/heros/old_witch_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Ancient and enigmatic witch who channels arcane knowledge and dark magic to manipulate the battlefield, using potions and spells to control opponents and summon creatures to do her bidding. Her years of experience and wisdom make her a formidable foe." }
const lilith = { id: "11", name: 'Lilith', race: human, image: require('../assets/heros/bow_woman_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: " This skilled and precise archer rains arrows down on opponents, using her agility and mastery of the bow to strike from a distance. Her focus and accuracy make her a deadly opponent." }
const ormo = { id: "12", name: 'Ormo', race: creature, image: require('../assets/heros/dark_creature_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Shadowy and elusive creature who uses its stealth and speed to slip past foes unnoticed, striking with deadly precision when the time is right. Its mysterious origins and unpredictable nature make it a dangerous opponent." }
const leerith = { id: "13", name: 'Leerith', race: elf, image: require('../assets/heros/green_elf2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This fierce and cunning ranger wields a bow and sword, using his deep connection to the forest to track enemies and strike from hiding places. His knowledge of natural remedies and keen senses make him a valuable ally." }
const furio = { id: "14", name: 'Furio', race: creature, image: require('../assets/heros/mystic_creature_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Otherworldly and unpredictable creature who wields bizarre powers and abilities, using its telekinetic and teleportation abilities to confuse and disorient opponents. Its alien appearance and inscrutable motives make it a truly unique opponent." }
const krafath = { id: "15", name: 'Krafath', race: creature, image: require('../assets/heros/wooden_creature2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This gentle and serene creature is the embodiment of nature, using her connection to the earth and the trees to heal allies and summon powerful forest spirits. Her ability to meld with trees and control plants make her a versatile and unpredictable opponent." }
const murlet = { id: "16", name: 'Murlet', race: ogre, image: require('../assets/heros/ogre_with_sword_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This ancient and wise shaman channels the primal power of the earth, using his knowledge of herbs and magic to heal allies and call forth powerful elemental creatures. His experience and strength make him a formidable opponent." }
const nurmith = { id: "17", name: 'Nurmith', race: human, image: require('../assets/heros/man_sword2_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This holy and righteous warrior wields a sword and shield, calling upon the power of the divine to smite evil and protect the innocent. His unwavering faith and determination make him a powerful ally in any battle." }
const salvar = { id: "18", name: 'Salvar', race: human, image: require('../assets/heros/man_sword1_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "This dark and sinister spellcaster controls the forces of death, summoning undead minions to do his bidding and sapping the life force of his enemies. His mastery of necromancy and forbidden magic make him a fearsome opponent." }
const dramar = { id: "19", name: 'Dramar', race: fairy, image: require('../assets/heros/fire_spell_hero.jpg'), "hp": 5, "defence": 1, "attack": 3, "spells": [], description: "Fiery and passionate fairy who casts powerful fire spells to incinerate enemies and boost the power of her allies. Her ability to imbue weapons with flames and teleport short distances make her a versatile opponent." }

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

export const testData = {
    cardBases,
    deckCardBases,
    deckHeros,
}