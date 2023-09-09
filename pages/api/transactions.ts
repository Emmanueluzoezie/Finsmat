// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, PublicKey } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransfer } from '../../utiles/createTransfer';

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
  // Initialize Solana connection
  const connection = new Connection('https://api.mainnet-beta.solana.com'); // Update the URL if you're using a different network

  // Get sender and recipient public keys from request body
  const { senderPublicKey: senderKey, recipientPublicKey: recipientKey, amount } = req.body;

  // Validate the keys and amount
  if (!senderKey || !recipientKey || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create PublicKey objects
  const senderPublicKey = new PublicKey(senderKey);
  const recipientPublicKey = new PublicKey(recipientKey);

  try {
    const transaction = await createTransfer(
      connection,
      senderPublicKey,
      {
        recipient: recipientPublicKey,
        amount: amount,
      }
    );

    // TODO: Serialize and sign the transaction, then send it to the Solana network

    res.status(200).json({ message: 'Transaction created', transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
};
