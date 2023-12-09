import axios from 'axios';

import { Shop } from '@/lib/Shop';

import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const { lat, lng, range } = req.query;
  const apiUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

  try {
    const query = {
      key: process.env.API_KEY,
      lat,
      lng,
      range,
      format: 'json',
    };
    const response = await axios.get(apiUrl, { params: query });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const shops = (response.data.results.shop as Shop[]).map((original) => new Shop(original));

    res.status(200).json(shops);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export default handler;
