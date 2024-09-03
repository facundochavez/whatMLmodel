import type { NextApiRequest, NextApiResponse } from "next";
import geminiController from "@/controllers/geminiController";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      await geminiController.createDatasetParameters(req, res);
      break;
    default:
      res.status(405).json({ data: "Método no permitido" });
  }
}
