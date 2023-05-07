import { testData } from '../extra/testData';
import { CardInterface } from '../types/collection_types';

async function getCard(): Promise<string[]> {
  // return await getFromServer('/api/');
  return testData.ownedCardIds;
}

async function buyCard(card: CardInterface): Promise<CardInterface> {
  // return await getFromServer('/api/');
  if (testData.gemCount < card.price) throw new Error('Not enough gems');
  testData.ownedCardIds.push(card.id);
  testData.gemCount -= card.price;
  return card;
}

async function removeCard({ cardId }: { cardId: string }): Promise<string[]> {
  // return await getFromServer('/api/');
  const cardIds = testData.ownedCardIds;
  testData.ownedCardIds = cardIds.filter(id => id !== cardId);
  return testData.ownedCardIds;
}

async function setLeader(leaderId: string): Promise<string | undefined> {
  // return await getFromServer('/api/');
  testData.leaderId = leaderId;
  return leaderId;
}

async function getLeader(): Promise<string | undefined> {
  return testData.leaderId;
}

export const collectionService = {
  buyCard,
  getCard,
  removeCard,
  setLeader,
  getLeader,
};
