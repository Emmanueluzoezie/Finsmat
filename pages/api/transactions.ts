// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Commitment, Transaction } from '@solana/web3.js';
import { createTransferCheckedInstruction, getAccount, getAssociatedTokenAddress, getMint } from '@solana/spl-token';
// import { LAMPORTS_PER_SOL, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransaction } from '../../utiles/createTransfer';
import { Amount, Memo, Recipient, References, SPLToken } from '../../utiles/type';
// import * as base58 from "base-58";

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
  const label = req.query.product;
  const icon = 'https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png';

  res.status(200).send({
    label,
    icon,
  });
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  
  try{
    const senderPublicKey = new PublicKey(req.body?.account); // Convert to PublicKey
    const { amount, userId } = req.query;

    // Initialize merchant Keypair
    const merchant = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse("[226,230,33,166,183,94,221,240,76,0,177,119,22,166,134,93,69,185,83,121,221,13,229,219,18,55,91,84,86,112,53,87,139,130,97,105,159,216,5,167,211,57,175,154,105,195,156,4,68,100,253,224,35,32,204,44,126,175,226,176,146,254,206,226]")),
    );

    // Define transfer fields
    const transferFields = {
      amount: new BigNumber(`${amount}`), // Assuming you're using BigNumber
      memo: `${userId}`,
      splToken: undefined, // TODO: Provide SPL Token PublicKey
      reference: undefined, // TODO: Provide reference if any
    };

    // Create transaction
    const transaction = await createTransaction(senderPublicKey, transferFields);

    // Sign the transaction
    transaction.sign(merchant);

    // Send and confirm transaction
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const txid = await sendAndConfirmTransaction(connection, transaction, [merchant]);

    res.status(200).json({ message: 'Transaction created successfully', txid });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};

// const accountField = req.body?.account;
// if (!accountField) throw new Error('missing account');

// const sender = new PublicKey(accountField);

// const merchant = Keypair.fromSecretKey(
//   new Uint8Array(JSON.parse("[226,230,33,166,183,94,221,240,76,0,177,119,22,166,134,93,69,185,83,121,221,13,229,219,18,55,91,84,86,112,53,87,139,130,97,105,159,216,5,167,211,57,175,154,105,195,156,4,68,100,253,224,35,32,204,44,126,175,226,176,146,254,206,226]")),
// );


// // Build Transaction
// const ix = SystemProgram.transfer({
//   fromPubkey: sender,
//   toPubkey: new PublicKey("2eeLQxYpuwpdMxsqCSpYazgxSqdy3wS6DAosATtezHHR"),
//   lamports: 133700000
// })

// let transaction = new Transaction();
// transaction.add(ix);

// const connection = new Connection("https://api.devnet.solana.com")
// const bh = await connection.getLatestBlockhash();
// transaction.recentBlockhash = bh.blockhash;
// transaction.feePayer = merchant.publicKey;

// // for correct account ordering 
// transaction = Transaction.from(transaction.serialize({
//   verifySignatures: false,
//   requireAllSignatures: false,
// }));

// transaction.sign(merchant);
// // console.log(base58.encode(transaction.signature));

// // airdrop 1 SOL just for fun
// connection.requestAirdrop(sender, 1000000000);

// // Serialize and return the unsigned transaction.
// const serializedTransaction = transaction.serialize({
//   verifySignatures: false,
//   requireAllSignatures: false,
// });

// const base64Transaction = serializedTransaction.toString('base64');
// const message = 'Thank you for using AndyPay';

// // const strategy : TransactionConfirmationStrategy =  {
// //   signature: transaction.
// // }
// // connection.confirmTransaction();

// res.status(200).send({ transaction: base64Transaction, message });