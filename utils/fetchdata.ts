const dev = process.env.NODE_ENV !== "production";
const server = dev ? "http://localhost:3000" : process.env.EKLOGES_PUBLIC_URL;
import { ElectionData } from "./types";

export const fetchData = async (ep = 99999): Promise<ElectionData> => {
  const statsOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "stats", id: ep }),
  };
  const fullOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "full", id: ep }),
  };
  let statsRes, fullRes, deputiesRes, votesRes;
  if (ep == 99999) {
    statsRes = await fetch(`${server}/api/epikrateia`, statsOptions);
    fullRes = await fetch(`${server}/api/epikrateia`, fullOptions);
    deputiesRes = await fetch(`${server}/api/deputies`);
  } else {
    statsRes = await fetch(`${server}/api/ep`, statsOptions);
    fullRes = await fetch(`${server}/api/ep`, fullOptions);
    //Brings names per region
    deputiesRes = await fetch(`${server}/api/cpp`, fullOptions);
    //Brings votes per region
    votesRes = await fetch(`${server}/api/ep-votes`, fullOptions);
  }

  const stats = statsRes.ok ? await statsRes.json() : null;
  const full = fullRes.ok ? await fullRes.json() : null;
  const deputies = deputiesRes.ok ? await deputiesRes.json() : null;
  const deputiesVotes = votesRes && votesRes.ok ? await votesRes.json() : null;
  return { deputies, stats, full, deputiesVotes };
};

export const fetchCountries = async (country = 57): Promise<ElectionData> => {
  const statsOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "stats", id: country }),
  };
  const fullOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "full", id: country }),
  };
  let statsRes, fullRes;
  statsRes = await fetch(`${server}/api/country`, statsOptions);
  fullRes = await fetch(`${server}/api/country`, fullOptions);

  const stats = statsRes.ok ? await statsRes.json() : null;
  const full = fullRes.ok ? await fullRes.json() : null;
  const deputies = null;
  const deputiesVotes = null;
  return { deputies, stats, full, deputiesVotes };
};
