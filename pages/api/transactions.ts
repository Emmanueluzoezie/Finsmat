import { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionConfirmationStrategy } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'
// import * as base58 from "base-58";

type GetData = {
  label: string
  icon: string
}
type PostData = {
  transaction?: string,
  message?: string
}

function get(
  req: NextApiRequest,
  res: NextApiResponse<GetData>
) {
  const label = 'Payment your an item purchase';
  const icon = 'https://avatars.githubusercontent.com/u/87155142?s=400&u=cd92f3bdaf269e90b6526916aeae323453ba086e&v=4';

  res.status(200).send({
    label,
    icon,
  });
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) {
  const accountField = req.body?.account;
  if (!accountField) throw new Error('missing account');

  const sender = new PublicKey(accountField);

  const merchant = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse("[226,230,33,166,183,94,221,240,76,0,177,119,22,166,134,93,69,185,83,121,221,13,229,219,18,55,91,84,86,112,53,87,139,130,97,105,159,216,5,167,211,57,175,154,105,195,156,4,68,100,253,224,35,32,204,44,126,175,226,176,146,254,206,226]")),
  );

  const ix = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: new PublicKey("5uKAeWU6nsYawNjoPfw8ivB6zoXVFugpMaCG57nSP9qu"),
    lamports: 133700000
  });

  
  let transaction = new Transaction();
  transaction.add(ix);

  const connection = new Connection("https://api.devnet.solana.com");
  const bh = await connection.getLatestBlockhash();
  transaction.recentBlockhash = bh.blockhash;
  transaction.feePayer = merchant.publicKey;

  // Airdrop 1 SOL
  await connection.requestAirdrop(sender, 1000000000);

  transaction = Transaction.from(transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  }));

  transaction.sign(merchant);

  // Simulate the transaction
  const simulationResult = await connection.simulateTransaction(transaction);

  if (simulationResult.value.err) {
    console.error(`Error with transaction: ${simulationResult.value.err}`);
    res.status(400).send({ message: `Transaction simulation failed: ${simulationResult.value.err}` });
    return;
  }

  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  const base64Transaction = serializedTransaction.toString('base64');
  const message = 'Thank you for purchasing an item';

  res.status(200).send({ transaction: base64Transaction, message });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetData | PostData>
) {
  if (req.method == "GET") {
    console.log("received GET request");
    return get(req, res);
  } else if (req.method == "POST") {
    console.log("received POST request");
    return await post(req, res);
  }
}