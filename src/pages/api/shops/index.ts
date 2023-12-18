/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import axios from 'axios';

import { Shop } from '@/lib/Shop';

import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const { lat, lng, range, start = 1, keyword } = req.query;
  const apiUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

  try {
    const query = {
      key: process.env.API_KEY,
      lat,
      lng,
      range,
      start,
      keyword,
      count: 12,
      format: 'json',
    };
    const response = await axios.get(apiUrl, { params: query });
    const resultsStart = response.data.results.results_start as number;
    const totalCount = response.data.results.results_available as number;
    const shops = (response.data.results.shop as Shop[]).map((original) => new Shop(original));

    res.status(200).json({ totalCount, resultsStart, shops });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export default handler;
