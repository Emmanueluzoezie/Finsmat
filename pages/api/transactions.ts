// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Commitment, Transaction } from '@solana/web3.js';
import { createTransferCheckedInstruction, getAccount, getAssociatedTokenAddress, getMint } from '@solana/spl-token';
// import { LAMPORTS_PER_SOL, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransfer } from '../../utiles/createTransfer';
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
  const label = 'For purchased product';
  const icon = 'https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png';

  res.status(200).send({
    label,
    icon,
  });
};

export class CreateTransferError extends Error {
  name = 'CreateTransferError';
}

/**
 * Fields of a Solana Pay transfer request URL.
 */
export interface CreateTransferFields {
  /** `recipient` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#recipient). */
  recipient: Recipient;
  /** `amount` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#amount). */
  amount: Amount;
  /** `spl-token` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#spl-token). */
  splToken?: SPLToken;
  /** `reference` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#reference). */
  reference?: References;
  /** `memo` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#memo). */
  memo?: Memo;
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {

  // const accountField = req.body?.account;
  // if (!accountField) throw new Error('missing account');

  // const sender = new PublicKey(accountField);

  // const connection = new Connection("https://api.devnet.solana.com")
  // const senderInfo = await connection.getAccountInfo(sender);
  // const recipient = new PublicKey("2eeLQxYpuwpdMxsqCSpYazgxSqdy3wS6DAosATtezHHR")
  // if (!senderInfo) throw new CreateTransferError('sender not found');

  // const recipientInfo = await connection.getAccountInfo(recipient);
  // if (!recipientInfo) throw new CreateTransferError('recipient not found');

  // // A native SOL or SPL token transfer instruction
  // const instruction = splToken
  //   ? await createSPLTokenInstruction(recipient, amount, splToken, sender, connection)
  //   : await createSystemInstruction(recipient, amount, sender, connection);

  // // If reference accounts are provided, add them to the transfer instruction
  // if (reference) {
  //   if (!Array.isArray(reference)) {
  //     reference = [reference];
  //   }

  //   for (const pubkey of reference) {
  //     instruction.keys.push({ pubkey, isWritable: false, isSigner: false });
  //   }
  // }

  // // Create the transaction
  // const transaction = new Transaction();
  // transaction.feePayer = sender;
  // transaction.recentBlockhash = (await connection.getRecentBlockhash(commitment)).blockhash;

  // // If a memo is provided, add it to the transaction before adding the transfer instruction
  // if (memo != null) {
  //   transaction.add(
  //     new TransactionInstruction({
  //       programId: MEMO_PROGRAM_ID,
  //       keys: [],
  //       data: Buffer.from(memo, 'utf8'),
  //     })
  //   );
  // }

  // // Add the transfer instruction to the transaction
  // transaction.add(instruction);

  // return transaction;




  const accountField = req.body?.account;
  if (!accountField) throw new Error('missing account');

  const sender = new PublicKey(accountField);

  const merchant = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse("[226,230,33,166,183,94,221,240,76,0,177,119,22,166,134,93,69,185,83,121,221,13,229,219,18,55,91,84,86,112,53,87,139,130,97,105,159,216,5,167,211,57,175,154,105,195,156,4,68,100,253,224,35,32,204,44,126,175,226,176,146,254,206,226]")),
  );


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
  transaction.feePayer = merchant.publicKey;

  // for correct account ordering 
  transaction = Transaction.from(transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  }));

  transaction.sign(merchant);
  // console.log(base58.encode(transaction.signature));

  // airdrop 1 SOL just for fun
  connection.requestAirdrop(sender, 1000000000);

  // Serialize and return the unsigned transaction.
  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  const base64Transaction = serializedTransaction.toString('base64');
  const message = 'Thank you for using AndyPay';

  // const strategy : TransactionConfirmationStrategy =  {
  //   signature: transaction.
  // }
  // connection.confirmTransaction();

  res.status(200).send({ transaction: base64Transaction, message });
};