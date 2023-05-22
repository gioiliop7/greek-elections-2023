export type Statistics = {
  CountTm: number;
  Edres: number;
  Descr: string;
};

export type FullData = {
  Akyra: number;
  Egkyra: number;
  Leyka: number;
  Gramenoi: number;
  party: Party[];
};

export type Party = {
  Edres: number;
  EdresEpik: number;
  PARTY_ID: number;
  Perc: number;
  Rank: number;
  VOTES: number;
  // other properties of party object
};

export interface ParliamentParty {
  id: number;
  percent: number;
  rank: number;
  edres: number;
  votes: number;
}

export interface GeneralData {
  epikrateiaName: string;
  percentageOfPartipation: number;
  percentageOfAkyra: number;
  percentageOfLeyka: number;
  percentageOfEgkyra: number;
  akyra: number;
  leyka: number;
  egkyra: number;
  grammenoi: number;
  participation: number;
}

export type PartyNames = {
  [id: number]: string;
  2: string;
  3: string;
  4: string;
  106: string;
  108: string;
  122: string;
}

export type RequestType = "stats" | "full";