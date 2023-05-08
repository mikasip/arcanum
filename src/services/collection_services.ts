import { testData } from '../extra/testData';
import { CardInterface } from '../types/collection_types';

async function addCard(card: CardInterface): Promise<CardInterface> {
  // return await getFromServer('/api/');
  testData.ownedCardIds.push(card.id);
  return card;
}

async function buyCard(card: CardInterface): Promise<CardInterface> {
  // return await getFromServer('/api/');
  if (testData.gemCount < card.price) throw new Error('Not enough gems');
  testData.ownedCardIds.push(card.id);
  testData.gemCount -= card.price;
  return card;
}

async function removeCard(card: CardInterface): Promise<CardInterface> {
  // return await getFromServer('/api/');
  testData.ownedCardIds = testData.ownedCardIds.filter(id => id !== card.id);
  return card;
}

async function setLeader(leader: CardInterface): Promise<CardInterface> {
  // return await getFromServer('/api/');
  testData.leaderId = leader.id;
  return leader;
}

export const collectionService = {
  buyCard,
  addCard,
  removeCard,
  setLeader,
};
