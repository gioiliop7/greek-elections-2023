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
  131: string;
  123: string;
  135: string;
  60: string;
  128: string;
  28: string;
  129: string;
  44: string;
  140: string;
  15: string;
  138: string;
  130: string;
  142: string;
  141: string;
  134: string;
  125: string;
  113: string;
  54: string;
  143: string;
  137: string;
  85: string;
  133: string;
  10: string;
  66: string;
  139: string;
  11: string;
  136: string;
  132: string;
  20: string;
};

export type RequestType = "stats" | "full";
