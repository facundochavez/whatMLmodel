import { NextApiRequest, NextApiResponse } from "next";

const createDatasetParameters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { modelDescription } = req.body;
    const data = modelDescription;
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export default {
  createDatasetParameters,
};
