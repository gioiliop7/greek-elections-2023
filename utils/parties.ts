import ethnikiDimiourgia from "../assets/images/ethniki_dimiourgia.png";
import kke from "../assets/images/kke.png";
import mera25 from "../assets/images/mera25.png";
import pasok from "../assets/images/pasok.png";
import pleusi from "../assets/images/pleusi.svg";
import ptda from "../assets/images/ptda.png";
import syriza from "../assets/images/syriza.png";
import ellinikiLysi from "../assets/images/elliniki_lisi.png";
import nd from "../assets/images/nd.svg";
import antarsya from "../assets/images/antarsya.png";
import axia from "../assets/images/axia.png";
import dipak from "../assets/images/dipak.png";
import ean from "../assets/images/ean.png";
import eleutheroi_ksana from "../assets/images/eleutheroi_ksana.png";
import ellines_oikologoi from "../assets/images/ellines_oikologoi.png";
import ena from "../assets/images/ena.png";
import enono from "../assets/images/enono.png";
import enosi_kentroon from "../assets/images/enosi_kentroon.svg";
import esy from "../assets/images/esy.png";
import kinima21 from "../assets/images/kinima21.png";
import kommounistiko from "../assets/images/komounistiko.png";
import kotes from "../assets/images/kotes.png";
import krama from "../assets/images/krama.png";
import mlkkke from "../assets/images/mlkkke.png";
import niki from "../assets/images/niki.png";
import oakke from "../assets/images/oakke.png";
import oikologoi_prasinoi from "../assets/images/oikologoi_prasinoi.svg";
import okd from "../assets/images/okd.png";
import orama from "../assets/images/orama.png";
import pnoi_dimokratias from "../assets/images/pnoi_dimokratias.png";
import prasino_kinima from "../assets/images/prasino_kinima.png";
import protovoulia from "../assets/images/protovoulia.png";
import simaxeia_anatropis from "../assets/images/simaxeia_anatropis.png";
import social from "../assets/images/social.png";
import tolma from "../assets/images/tolma.png";
import kinimaftoxon from "../assets/images/kinimaftoxon.png";
import domi from "../assets/images/domi.png";

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
    case 131:
      return niki;
    case 123:
      return pleusi;
    case 135:
      return simaxeia_anatropis;
    case 60:
      return ethnikiDimiourgia;
    case 128:
      return enono;
    case 28:
      return oikologoi_prasinoi;
    case 129:
      return kinima21;
    case 44:
      return antarsya;
    case 140:
      return pnoi_dimokratias;
    case 15:
      return enosi_kentroon;
    case 138:
      return eleutheroi_ksana;
    case 130:
      return kinimaftoxon;
    case 142:
      return ean;
    case 141:
      return prasino_kinima;
    case 134:
      return tolma;
    case 125:
      return kommounistiko;
    case 113:
      return esy;
    case 54:
      return kotes;
    case 143:
      return ena;
    case 137:
      return protovoulia;
    case 85:
      return axia;
    case 133:
      return krama;
    case 10:
      return mlkkke;
    case 66:
      return okd;
    case 139:
      return social;
    case 11:
      return oakke;
    case 136:
      return domi;
    case 132:
      return orama;
    case 20:
      return ellines_oikologoi;
    default:
      break;
  }
}

export function getPartyName(id: number) {
  const partyNames: PartyNames = {
    2: "ΝΕΑ ΔΗΜΟΚΡΑΤΙΑ",
    4: "ΣΥΝΑΣΠΙΣΜΟΣ ΡΙΖΟΣΠΑΣΤΙΚΗΣ ΑΡΙΣΤΕΡΑΣ-ΠΡΟΟΔΕΥΤΙΚΗ ΣΥΜΜΑΧΙΑ",
    106: "ΠΑΣΟΚ - Κίνημα Αλλαγής",
    3: "ΚΟΜΜΟΥΝΙΣΤΙΚΟ ΚΟΜΜΑ ΕΛΛΑΔΑΣ",
    108: "Ελληνική Λύση",
    122: "ΜέΡΑ25-ΣΥΜΜΑΧΙΑ ΓΙΑ ΤΗ ΡΗΞΗ",
    131: "Νίκη",
    123: "ΠΛΕΥΣΗ ΕΛΕΥΘΕΡΙΑΣ - ΖΩΗ ΚΩΝΣΤΑΝΤΟΠΟΥΛΟΥ",
    135: "Συμμαχία Ανατροπής",
    60: "Εθνική Δημιουργία",
    128: "ΕΝΩΝΩ ΣΥΜΜΑΧΙΑ ΕΛΕΥΘΕΡΙΑΣ",
    28: "Οικολόγοι ΠΡΑΣΙΝΟΙ - ΠΡΑΣΙΝΗ ΕΝΟΤΗΤΑ",
    129: "Κίνημα 21",
    44: "ΑΝΤ.ΑΡ.ΣΥ.Α - ΑΝΤΙΚΑΠΙΤΑΛΙΣΤΙΚΗ ΑΡΙΣΤΕΡΗ ΣΥΝΕΡΓΑΣΙΑ για την ΑΝΑΤΡΟΠΗ",
    140: "Πνοή Δημοκρατίας",
    15: "Ένωση Κεντρώων",
    138: "ΕΛΕΥΘΕΡΟΙ ΞΑΝΑ",
    130: "Κίνημα Φτωχών",
    142: "ΕΑΝ...",
    141: "Πράσινο Κίνημα",
    134: "ΤΩΡΑ ΟΛΟΙ ΜΑΖΙ (Τ.ΟΛ.ΜΑ)",
    125: "ΚΟΜΜΟΥΝΙΣΤΙΚΟ ΚΟΜΜΑ ΕΛΛΑΔΑΣ (μαρξιστικό-λενινιστικό)",
    113: "ΕΛΛΗΝΩΝ ΣΥΝΕΛΕΥΣΙΣ",
    54: "ΚΑΠΝΙΣΤΙΚΕΣ ΟΜΑΔΕΣ ΓΙΑ ΤΗΝ ΤΕΧΝΗ ΚΑΙ ΤΗΝ ΕΙΚΑΣΤΙΚΗ ΣΥΓΚΡΟΤΗΣΗ",
    143: "ΕΝΟΤΗΤΑ - ΑΛΗΘΕΙΑ ΕΝ.Α",
    137: "ΠΟΛΙΤΙΚΗ ΠΡΩΤΟΒΟΥΛΙΑ",
    85: "ΚΟΙΝΩΝΙΑ ΑΞΙΩΝ - ΦΙΛΕΛΕΥΘΕΡΗ ΣΥΜΜΑΧΙΑ",
    133: "ΒΟΡΕΙΑ ΛΕΓΚΑ - ΚΡΑΜΑ",
    10: "Μαρξιστικό-Λένινιστικό Κομμουνιστικό Κόμμα Ελλάδας",
    66: "ΟΡΓΑΝΩΣΗ ΚΟΜΜΟΥΝΙΣΤΩΝ ΔΙΕΘΝΙΣΤΩΝ ΕΛΛΑΔΑΣ",
    139: "SOCIAL Σύγχρονο Δημοκρατικό Κόμμα",
    11: "ΟΑΚΚΕ-ΟΡΓΑΝΩΣΗ ΓΙΑ ΤΗΝ ΑΝΑΣΥΓΚΡΟΤΗΣΗ ΤΟΥ ΚΚΕ",
    136: "ΝΕΑ ΔΟΜΗ",
    132: "ΕΛΛΗΝΙΚΟ ΟΡΑΜΑ",
    20: "Δημοσθένης Βεργής ΕΛΛΗΝΕΣ ΟΙΚΟΛΟΓΟΙ",
    998: "Ανεξάρτητοι/Μεμονωμένοι Υποψήφιοι",
  };
  return partyNames[id] || "";
}

export function getPartyColor(id: number) {
  switch (id) {
    case 2:
      return "#1a5cc6";
    case 4:
      return "#d4262d";
    case 106:
      return "#017d3e";
    case 3:
      return "#e30200";
    case 108:
      return "#87c2d5";
    case 122:
      return "#e74026";
    case 131:
      return "#c15127";
    case 123:
      return "#ad2e89";
    case 135:
      return "#58aafe";
    case 60:
      return "#ef8c19";
    case 128:
      return "#d0d0d0";
    case 28:
      return "#509e2f";
    case 129:
      return "#551225";
    case 44:
      return "#bf1a20";
    case 140:
      return "#375b7b";
    case 15:
      return "#fa6608";
    case 138:
      return "#d0ecf6";
    case 130:
      return "#333333";
    case 142:
      return "#ef7c67";
    case 141:
      return "#1f9b58";
    case 134:
      return "#023f7e";
    case 125:
      return "#b20000";
    case 113:
      return "#007cc2";
    case 54:
      return "#6bc190";
    case 143:
      return "#e76a82";
    case 137:
      return "#000";
    case 85:
      return "#f5da6b";
    case 133:
      return "#a38d7d";
    case 10:
      return "#d71920";
    case 66:
      return "#000";
    case 10:
      return "#d71920";
    case 139:
      return "#ee47ae";
    case 11:
      return "#000";
    case 998:
      return "#000";
    case 20:
      return "#1d1b1c";
    case 132:
      return "#ffd148";
    case 136:
      return "#3c5b5d";
    default:
      break;
  }
}
