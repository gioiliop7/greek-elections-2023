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

  if (!type || (type !== "stats" && type !== "full")) {
    res.status(400).json({ error: "Invalid Request Type" });
    return;
  }

  const url =
    type === "stats"
      ? "https://ekloges.ypes.gr/current/stat/v/epik_1.js"
      : "https://ekloges.ypes.gr/current/dyn1/v/epik_1.js";

  try {
    const requestOptions = {
      headers: {
        authority: "ekloges.ypes.gr",
        origin: "https://ekloges.ypes.gr",
        accept: "application/json, text/plain, */*",
        "accept-language": "el-GR,el;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        cookie: "_ga=GA1.2.223126820.1679741516; .Elections.Culture=el",
        pragma: "no-cache",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      },
    };
    const response = await fetch(url, requestOptions);
    console.log(response);
    const data = await response.text();
    console.log(data);
    res.status(200).json(data);
  } catch (error: unknown) {
    console.log(error);
    if (typeof error === "object" && error !== null && "status" in error) {
      const { status, message } = error as { status: number; message: string };
      res.status(status || 500).json({ error: message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
