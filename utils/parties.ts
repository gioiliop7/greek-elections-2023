import ethnikiDimiourgia from "../assets/images/ethniki_dimiourgia.png";
import kke from "../assets/images/kke.png";
import mera25 from "../assets/images/mera25.png";
import pasok from "../assets/images/pasok.png";
import pleusi from "../assets/images/pleusi.png";
import ptda from "../assets/images/ptda.png";
import syriza from "../assets/images/syriza.png";
import ellinikiLysi from "../assets/images/elliniki_lisi.png";
import nd from "../assets/images/nd.svg";

import { PartyNames } from "./types";

export function getPartyLogo(id: number) {
  switch (id) {
    case 2:
      return nd;
    case 4:
      return syriza;
    case 106:
      return pasok;
    case 3:
      return kke;
    case 108:
      return ellinikiLysi;
    case 122:
      return mera25;
    default:
      break;
  }
}
export function getPartyName(id: number) {
  const partyNames: PartyNames = {
    2: "Νεα Δημοκρατία",
    4: "Σύριζα",
    106: "ΠΑΣΟΚ - Κίνημα Αλλαγής",
    3: "ΚΚΕ",
    108: "Ελληνική Λύση",
    122: "ΜΕΡΑ 25",
  };

  return partyNames[id] || "";
}
