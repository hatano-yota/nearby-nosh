/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import axios from 'axios';

import { Shop } from '@/lib/Shop';

import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const { shopId } = req.query;
  const apiUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

  try {
    const query = {
      key: process.env.API_KEY,
      id: shopId,
      format: 'json',
    };
    const response = await axios.get(apiUrl, { params: query });
    const shop = new Shop(response.data.results.shop[0] as Shop);

    res.status(200).json(shop);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export default handler;
