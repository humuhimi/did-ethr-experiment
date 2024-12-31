import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
import "@nomicfoundation/hardhat-ethers";
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュール用の__dirname代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// デバッグ用のログ出力
console.log('RPC_URL:', process.env.RPC_URL);
console.log('ACCOUNT_PRIVATE_KEY:', process.env.ACCOUNT_PRIVATE_KEY);
console.log('ACCOUNT_2_PRIVATE_KEY:', process.env.ACCOUNT_2_PRIVATE_KEY);

const account1 = process.env.ACCOUNT_PRIVATE_KEY as string
const account2 = process.env.ACCOUNT_2_PRIVATE_KEY as string
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: process.env.RPC_URL, // GanacheのRPC URL
      accounts: [account1, account2],
    },
  },
};

export default config;
