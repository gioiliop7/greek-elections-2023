import { requestOptions } from "@/utils/fetchdata";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { type } = req.body;

  if (!type) {
    res.status(400).json({ error: "Missing Request Type" });
    return;
  }

  if (!type || (type !== "stats" && type !== "full")) {
    res.status(400).json({ error: "Invalid Request Type" });
    return;
  }

  const url =
    type === "stats"
      ? `https://ekloges.ypes.gr/current/stat/v/ep_57.js`
      : `
      https://ekloges.ypes.gr/current/dyn/v/ep_57.js`;

  try {
    const response = await fetch(url,requestOptions);
    if (!response.ok) {
      return res.status(404).json({ error: "Not Found" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
