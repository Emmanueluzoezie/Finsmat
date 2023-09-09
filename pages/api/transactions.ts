// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(request: NextApiRequest, response: NextApiResponse<Data>
) {
  if (request.method === 'GET') return get(request, response);
  if (request.method === 'POST') return post(request, response);

  throw new Error(`Unexpected method ${request.method}`);
}

const get = async (req: NextApiRequest,
  res: NextApiResponse) => {
  const label = 'For purchased product';
  const icon = 'https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png';

  res.status(200).send({
    label,
    icon,
  });
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("yes is working")
};
