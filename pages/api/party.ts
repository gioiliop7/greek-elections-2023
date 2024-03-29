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

  const { id } = req.body;

  if (id === undefined) {
    return res.status(400).json({ error: "Missing ID parameter" });
  }

  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) {
    return res.status(400).json({ error: "Invalid ID parameter" });
  }

  const url = `https://ekloges.ypes.gr/current/dyn/v/party_${idNumber}.js`;

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
