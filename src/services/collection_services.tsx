import { testData } from '../extra/testData';
import { CardInterface } from '../redux/reducers/types/collection_types'
export const collectionService = {
    getCard,
    removeCard
};

async function getCard(): Promise<CardInterface[]> {
    // return await getFromServer('/api/');
    return testData.deckHeros
}

async function removeCard({ cardId }: { cardId: String }): Promise<CardInterface[]> {
    // return await getFromServer('/api/');
    const cards = testData.deckHeros
    cards.filter(card => card.id != cardId)
    return cards
}