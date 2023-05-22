import { NextApiRequest, NextApiResponse } from "next";
import { RequestType } from "@/utils/types";

interface ErrorResponse {
  error: string;
  status?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { type }: { type?: RequestType } = req.body;

  if (!type) {
    res.status(400).json({ error: "Missing Request Type" });
    return;
  }

  if (!type || (type !== 'stats' && type !== 'full')) {
    res.status(400).json({ error: 'Invalid Request Type' });
    return;
  }

  const url =
    type === "stats"
      ? "https://ekloges.ypes.gr/current/stat/v/epik_1.js"
      : "https://ekloges.ypes.gr/current/dyn1/v/epik_1.js";

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "status" in error) {
      const { status, message } = error as { status: number; message: string };
      res.status(status || 500).json({ error: message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
