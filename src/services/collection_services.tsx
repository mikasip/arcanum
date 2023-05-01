import { testData } from '../extra/testData';
import { CardInterface } from '../redux/reducers/types/collection_types'
export const collectionService = {
    getCard,
    removeCard,
    setLeader,
    getLeader,
};

async function getCard(): Promise<string[]> {
    // return await getFromServer('/api/');
    return testData.ownedCardIds
}

async function removeCard({ cardId }: { cardId: string }): Promise<string[]> {
    // return await getFromServer('/api/');
    const cardIds = testData.ownedCardIds
    testData.ownedCardIds = cardIds.filter(id => id != cardId)
    return testData.ownedCardIds
}

async function setLeader(leaderId: string): Promise<string | undefined> {
    // return await getFromServer('/api/');
    console.log("setting leader id")
    testData.leaderId = leaderId
    return leaderId
}

async function getLeader(): Promise<string | undefined> {
    return testData.leaderId
}
