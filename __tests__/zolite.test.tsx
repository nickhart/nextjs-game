import { render, screen } from '@testing-library/react'
import {Suit, Rank, Card, deck, isTrumpSuit, isTrumpRank, isTrumpCard, dealToPlayer, Player, player, shuffle, zolite, zoliteDeal} from '../lib/zolite'

describe('Zolite', () => {

    it('has valid suits', () => {
        const expectedSuits = [0, 1, 2, 3];
        const suits = Object.values(Suit).filter((v) => !isNaN(Number(v)));
        expect(suits).toHaveLength(expectedSuits.length);
        var index = 0;
        suits.forEach(suit => {
            expect(suit).toBe(expectedSuits[index]);
            index++;
        });

        expect(isTrumpSuit(Suit.Club)).toBe(false);
        expect(isTrumpSuit(Suit.Club)).toBe(false);
        expect(isTrumpSuit(Suit.Heart)).toBe(false);
        expect(isTrumpSuit(Suit.Diamond)).toBe(true);
    });

    it('has valid ranks', () => {
        const expectedRanks = [0, 1, 2, 3, 4, 5, 6, 7];
        const ranks = Object.values(Rank).filter((v) => !isNaN(Number(v)));
        expect(ranks).toHaveLength(expectedRanks.length);
        var index = 0;
        ranks.forEach(rank => {
            expect(rank).toBe(expectedRanks[index]);
            index++;
        });

        expect(isTrumpRank(Rank.Queen)).toBe(true);
        expect(isTrumpRank(Rank.Jack)).toBe(true);
        expect(isTrumpRank(Rank.Ace)).toBe(false);
        expect(isTrumpRank(Rank.Ten)).toBe(false);
        expect(isTrumpRank(Rank.King)).toBe(false);
        expect(isTrumpRank(Rank.Nine)).toBe(false);
        expect(isTrumpRank(Rank.Eight)).toBe(false);
        expect(isTrumpRank(Rank.Seven)).toBe(false);
    });

    it('has a valid deck', () => {
        const expectedDeck = [
            { name: "QC", suit: Suit.Club, rank: Rank.Queen, value: 3, trump: true },
            { name: "JC", suit: Suit.Club, rank: Rank.Jack, value: 2, trump: true },
            { name: "AC", suit: Suit.Club, rank: Rank.Ace, value: 11, trump: false },
            { name: "TC", suit: Suit.Club, rank: Rank.Ten, value: 10, trump: false },
            { name: "KC", suit: Suit.Club, rank: Rank.King, value: 4, trump: false },
            { name: "9C", suit: Suit.Club, rank: Rank.Nine, value: 0, trump: false },
            { name: "QS", suit: Suit.Spade, rank: Rank.Queen, value: 3, trump: true },
            { name: "JS", suit: Suit.Spade, rank: Rank.Jack, value: 2, trump: true },
            { name: "AS", suit: Suit.Spade, rank: Rank.Ace, value: 11, trump: false },
            { name: "TS", suit: Suit.Spade, rank: Rank.Ten, value: 10, trump: false },
            { name: "KS", suit: Suit.Spade, rank: Rank.King, value: 4, trump: false },
            { name: "9S", suit: Suit.Spade, rank: Rank.Nine, value: 0, trump: false },
            { name: "QH", suit: Suit.Heart, rank: Rank.Queen, value: 3, trump: true },
            { name: "JH", suit: Suit.Heart, rank: Rank.Jack, value: 2, trump: true },
            { name: "AH", suit: Suit.Heart, rank: Rank.Ace, value: 11, trump: false },
            { name: "TH", suit: Suit.Heart, rank: Rank.Ten, value: 10, trump: false },
            { name: "KH", suit: Suit.Heart, rank: Rank.King, value: 4, trump: false },
            { name: "9H", suit: Suit.Heart, rank: Rank.Nine, value: 0, trump: false },
            { name: "QD", suit: Suit.Diamond, rank: Rank.Queen, value: 3, trump: true },
            { name: "JD", suit: Suit.Diamond, rank: Rank.Jack, value: 2, trump: true },
            { name: "AD", suit: Suit.Diamond, rank: Rank.Ace, value: 11, trump: true },
            { name: "TD", suit: Suit.Diamond, rank: Rank.Ten, value: 10, trump: true },
            { name: "KD", suit: Suit.Diamond, rank: Rank.King, value: 4, trump: true },
            { name: "9D", suit: Suit.Diamond, rank: Rank.Nine, value: 0, trump: true },
            { name: "8D", suit: Suit.Diamond, rank: Rank.Eight, value: 0, trump: true },
            { name: "7D", suit: Suit.Diamond, rank: Rank.Seven, value: 0, trump: true }
        ];

        const deckLength = 26;
        expect(expectedDeck.length).toBe(deckLength);

        let testDeck = deck();
        expect(testDeck.length).toBe(deckLength);

        for (let index = 0; index != deckLength; index++) {
            let testCard = testDeck[index];
            let expectedCard = expectedDeck[index];
            expect(testCard.name).toBe(expectedCard.name);
            expect(testCard.suit).toBe(expectedCard.suit);
            expect(testCard.rank).toBe(expectedCard.rank);
            expect(testCard.value).toBe(expectedCard.value);
            expect(isTrumpCard(testCard.suit, testCard.rank)).toBe(expectedCard.trump);
            index++;
        }
    });

    it('shuffles numbers', () => {
        let cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let shuffled = shuffle(cards);
        expect(shuffled.length).toBe(cards.length);
        for (let i = 0; i != 10; ++i) {
            expect(cards[i]).toBe(i);
        }
        var matches = 0;
        for (let i = 0; i != 10; ++i) {
            if (shuffled[i] == i) {
                matches++;
            }
        }
        expect(matches).toBeLessThan(10);
    });

    it('deals to player', () => {
        let cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let p = player("test");
        expect(p.hand.length).toBe(0);
        p = dealToPlayer(p, cards);
        expect(p.hand).toBe(cards);
    });

    it('deals the game', () => {
        const leader = 2;
        let z1 = zolite();
        let z2 = zoliteDeal(z1, leader);

        expect(z2.leader).toBe(leader);
        expect(z2.turn).toBe(leader);

        expect(z2.bigOne).toBe(z1.bigOne);
        expect(z2.calledZole).toBe(z1.calledZole);
        expect(z2.deck.length).toBe(2);
        expect(z2.trick).toBe(z1.trick);
        expect(z2.round).toBe(z1.round);

        for (let i = 0; i != 3; ++i) {
            let p1 = z1.players[i];
            let p2 = z2.players[i];
            expect(p2.name).toBe(p1.name);
            expect(p2.role).toBe(p1.role);
            expect(p2.score).toBe(p1.score);
            expect(p1.hand.length).toBe(0);
            expect(p2.hand.length).toBe(8);
        }
    });

  });
  