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
  // other properties of party object
};

export interface ParliamentParty {
  id: number;
  percent: number;
  rank: number;
  edres: number;
}
