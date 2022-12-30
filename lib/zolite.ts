
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

export function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
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

export function player(name: string) : Player {
   return { name: name, score: 0, role: Role.Undecided, hand: [] };
}

export function dealToPlayer(player: Player, cards: number[]) : Player {
    return { name: player.name, score: player.score, role: player.role, hand: cards};
}

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

export function zolite() : Zolite {
    var cards = [];
    for (let i = 0; i != 26; ++i) {
        cards.push(i);
    }
    return { 
        players: [ player("p1"), player("p2"), player("p3") ],
        trick: [],
        deck: cards,
        round: 0,
        turn: 0,
        leader: 0,
        calledZole: false,
        bigOne: -1
    };
}

export function zoliteDeal(z: Zolite, leader: number) : Zolite {
    let p1 = dealToPlayer(z.players[0], z.deck.slice(0, 8));
    let p2 = dealToPlayer(z.players[1], z.deck.slice(8, 16));
    let p3 = dealToPlayer(z.players[2], z.deck.slice(16, 24));
    let deck = z.deck.slice(24, 26);

    return {
        players: [ p1, p2, p3 ],
        trick: z.trick,
        deck: deck,
        round: z.round,
        turn: leader,
        leader: leader,
        calledZole: z.calledZole,
        bigOne: z.bigOne
    };
}
