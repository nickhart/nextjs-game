

export enum Suit {
    Club = 0,
    Spade,
    Heart,
    Diamond
}

const suitNames = [ "C", "S", "H", "D" ];
const trumpSuits = [ false, false, false, true ];

export enum Rank {
    Queen = 0,
    Jack,
    Ace,
    Ten,
    King,
    Nine,
    Eight,
    Seven
}

const rankNames = [ "Q", "J", "A", "T", "K", "9", "8", "7" ];
const rankValues = [ 3, 4, 11, 10, 4, 0, 0, 0 ];
const trumpRanks = [ true, true, false, false, false, false, false, false ];

export function isTrumpSuit(suit: Suit) : boolean  {
    return trumpSuits[suit];
}

export function isTrumpRank(rank: Rank) : boolean {
    return trumpRanks[rank];
}

export function isTrumpCard(suit: Suit, rank: Rank) : boolean {
    return isTrumpSuit(suit) || isTrumpRank(rank);
}

export type Card = {
    name: string;
    suit: Suit;
    rank: Rank;
    value: number;
}

export enum Role {
    Undecided,
    BigOne,
    LittleOne
}

export type Player = {
    name: string;
    score: number;
    role: Role;
    hand: number[];
};

export type Zolite = {
    players: Player[];
    trick: number[];
    deck: number[];
    round: number;
    turn: number;
    leader: number;
    calledZole: boolean;
    bigOne: number;
}


function card(suit: Suit, rank: Rank) : Card {
    let name = rankNames[rank] + suitNames[suit];
    let value = rankValues[rank];
    return { name: name, suit: suit, rank: rank, value: value };
}

export function deck() : Card[] {
    let cards : Card[] = [];
    const suits = Object.values(Suit).filter((v) => !isNaN(Number(v)));
    const ranks = Object.values(Rank).filter((v) => !isNaN(Number(v)));

    for (let suit = Suit.Club; suit <= Suit.Diamond; suit++) {
        let maxRank = isTrumpSuit(suit) ? Rank.Seven : Rank.Nine;
        for (let rank = Rank.Queen; rank <= maxRank; rank++) {
            let c = card(Number(suit), Number(rank))
            cards.push(c);
        };
    };
    return cards;
}
