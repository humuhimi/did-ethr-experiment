import { EthrDID } from 'ethr-did';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

// .envファイルから環境変数を読み込む
dotenv.config();

// Ganacheのプロバイダーを設定
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
if (process.env.ETHEREUM_ADDRESS === undefined || process.env.CHAIN_ID === undefined) {
    throw new Error('ETHEREUM_ADDRESS or CHAIN_ID is not set in .env');
    }

// DIDを作成
const ethrDid = new EthrDID({
  identifier: process.env.ETHEREUM_ADDRESS, // 環境変数からアドレスを取得
  provider,
  chainNameOrId: process.env.CHAIN_ID, // 環境変数からチェーンIDを取得
});

// DIDドキュメントを取得
// const didDocument = await ethrDid.resolve();
// console.log(didDocument);