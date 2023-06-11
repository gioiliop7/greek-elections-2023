import type { NextApiRequest, NextApiResponse } from "next";
import { requestOptions } from "@/utils/fetchdata";

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

  const { id, type } = req.body;

  if (id === undefined) {
    return res.status(400).json({ error: "Missing ID parameter" });
  }

  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) {
    return res.status(400).json({ error: "Invalid ID parameter" });
  }

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
      ? `https://ekloges.ypes.gr/current/stat/v/city_${idNumber}.js`
      : `https://ekloges.ypes.gr/current/dyn/v/city_${idNumber}.js`;

  try {
    const response = await fetch(url,requestOptions);
    if (!response.ok) {
      return res.status(404).json({ error: "Not Found" });
    }
    const data = await response.json();
    if (data.length == 0) {
      res.status(500).json({ error: "Data Not found" });
      return
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}