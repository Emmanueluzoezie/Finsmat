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

async function post(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Account provided in the transaction request body by the wallet.
  const accountField = req.body?.account;
  if (!accountField) throw new Error('missing account');

  const sender = new PublicKey(accountField);

  // const merchant = Keypair.fromSecretKey(
  //   new Uint8Array(JSON.parse("[226,230,33,166,183,94,221,240,76,0,177,119,22,166,134,93,69,185,83,121,221,13,229,219,18,55,91,84,86,112,53,87,139,130,97,105,159,216,5,167,211,57,175,154,105,195,156,4,68,100,253,224,35,32,204,44,126,175,226,176,146,254,206,226]")),
  // );


  // Build Transaction
  const ix = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: new PublicKey("2eeLQxYpuwpdMxsqCSpYazgxSqdy3wS6DAosATtezHHR"),
    lamports: 133700000
  })

  let transaction = new Transaction();
  transaction.add(ix);

  const connection = new Connection("https://api.devnet.solana.com")
  const bh = await connection.getLatestBlockhash();
  transaction.recentBlockhash = bh.blockhash;
  transaction.feePayer = sender;

  // airdrop 1 SOL just for fun
  connection.requestAirdrop(sender, 1000000000);

  // for correct account ordering 
  transaction = Transaction.from(transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  }));

  // transaction.sign(merchant);
  // console.log(base58.encode(transaction.signature));

  // Serialize and return the unsigned transaction.
  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  const base64Transaction = serializedTransaction.toString('base64');
  const message = 'Thank you for using Jonuel';

  // const strategy : TransactionConfirmationStrategy =  {
  //   signature: transaction.
  // }
  // connection.confirmTransaction();

  res.status(200).send({ transaction: base64Transaction, message });

}


export default function handler(request: NextApiRequest, response: NextApiResponse<Data>
) {
  if (request.method === 'GET') return get(request, response);
  if (request.method === 'POST') return post(request, response);

  throw new Error(`Unexpected method ${request.method}`);
}

