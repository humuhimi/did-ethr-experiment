const hre = require("hardhat");

function generateRandomDID() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 16; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `did:example:${randomString}`;
}

async function main() {
    // 環境変数から設定を取得
    const RPC_URL = process.env.RPC_URL;
    const CHAIN_ID = parseInt(process.env.CHAIN_ID);
    const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
    const ACCOUNT2_PRIVATE_KEY = process.env.ACCOUNT_2_PRIVATE_KEY;
    const DID_CONTRACT_ADDRESS = process.env.DID_CONTRACT_ADDRESS;

    // DIDRegistryコントラクトのファクトリを取得
    const DIDRegistry = await hre.ethers.getContractFactory("DIDRegistry");

    // DIDRegistryコントラクトのインスタンスをアタッチ
    const didRegistry = await DIDRegistry.attach(DID_CONTRACT_ADDRESS);

    // プロバイダーと署名者を設定
    const provider = new hre.ethers.JsonRpcProvider(RPC_URL, CHAIN_ID);
    const signer = new hre.ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider);

    // DIDRegistryコントラクトのインスタンスに署名者を接続
    const connectedDidRegistry = await didRegistry.connect(signer);

    // ランダムなDIDを生成
    const randomDID = generateRandomDID();
    
    // DIDを登録
    const tx = await connectedDidRegistry.registerDID(randomDID);
    console.log(tx);
    // ContractTransactionResponse {
    //   provider: JsonRpcProvider {},
    //   blockNumber: null,
    //   blockHash: null,
    //   index: undefined,
    //   hash: '0x09344f1a89e2e478e13661fb3c9921fb1d2cdc3f3136b7211b8234a8be627415',
    //   type: 2,
    //   to: '0xD900654dd3356D4249bc1BF81FDBa2BF382B62Cf',
    //   from: '0xf75b8C7bb70572BcEEF5f0cf634A4E2AA2f30320',
    //   nonce: 1,
    //   gasLimit: 48012n,
    //   gasPrice: undefined,
    //   maxPriorityFeePerGas: 1000000000n,
    //   maxFeePerGas: 2750000000n,
    //   maxFeePerBlobGas: null,
    //   data: '0x570810e20000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001e6469643a6578616d706c653a3132333435363738396162636465666768690000',
    //   value: 0n,
    //   chainId: 1337n,
    //   signature: Signature { r: "0xbaf238a2b8fc8be1f7250693e1d772161b70d54089730acc23167676d8c96de5", s: "0x7981c94a4bf94fc9d39b0dd2c28b7b7b6c1461f0f48d5dafbc7a22603327225b", yParity: 1, networkV: null },
    //   accessList: [],
    //   blobVersionedHashes: null
    // }

    const signer2 = new hre.ethers.Wallet(ACCOUNT2_PRIVATE_KEY, provider);

    // DIDRegistryコントラクトのインスタンスに署名者を接続
    const connectedDidRegistry2 = await didRegistry.connect(signer2);

    // DIDを取得
    const did = await connectedDidRegistry2.getDID(signer.address);
    console.log(did);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});