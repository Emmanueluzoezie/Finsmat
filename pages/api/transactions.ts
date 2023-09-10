// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Commitment, Transaction } from '@solana/web3.js';
import { createTransferCheckedInstruction, getAccount, getAssociatedTokenAddress, getMint } from '@solana/spl-token';
// import { LAMPORTS_PER_SOL, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransaction } from '../../utiles/createTransfer';
import { Amount, Memo, Recipient, References, SPLToken } from '../../utiles/type';
import base58 from 'base58-random';
// import * as base58 from "base-58";

type Data = {
  name: string
}

const get = async (req: NextApiRequest,
  res: NextApiResponse) => {
  const label = req.query.product;
  const icon = 'https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png';

  res.status(200).send({
    label,
    icon,
  });
};

async function post(req: NextApiRequest, res: NextApiResponse ) {
  try {
    const accountField = req.body?.account;
    if (!accountField) {
      res.status(400).send({ error: 'Missing account' });
      return;
    }

    const sender = new PublicKey(accountField);
    const ix = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: new PublicKey("2eeLQxYpuwpdMxsqCSpYazgxSqdy3wS6DAosATtezHHR"),
      lamports: 133700000,
    });

    const transaction = new Transaction();
    transaction.add(ix);

    const connection = new Connection("https://api.devnet.solana.com");
    const bh = await connection.getLatestBlockhash();
    transaction.recentBlockhash = bh.blockhash;
    transaction.feePayer = sender;

    await connection.requestAirdrop(sender, 1000000000);

    // TODO: Sign the transaction here before sending it
    // transaction.sign(...);

    const serializedTransaction = transaction.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    });


    const base64Transaction = serializedTransaction.toString('base64');
    const message = 'Thank you for using Jonuel pay';

    // const strategy : TransactionConfirmationStrategy =  {
    //   signature: transaction.
    // }
    // connection.confirmTransaction();

    res.status(200).send({ transaction: base64Transaction, message });
  } catch (error) {
    console.log("an error occurred", error)
  }
}


export default function handler(request: NextApiRequest, response: NextApiResponse<Data>
) {
  if (request.method === 'GET') return get(request, response);
  if (request.method === 'POST') return post(request, response);

  throw new Error(`Unexpected method ${request.method}`);
}

