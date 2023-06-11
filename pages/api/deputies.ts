import { requestOptions } from "@/utils/fetchdata";
import { NextApiRequest, NextApiResponse } from "next";

interface ErrorResponse {
  error: string;
  status?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const url = "https://ekloges.ypes.gr/current/dyn/v/300.js";

  try {
    const response = await fetch(url,requestOptions);
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
