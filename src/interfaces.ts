export type Hex = string;
export type Address = string;

export interface StreamOptions {
    filters?: string,
    // Default: all
    include?: Includable[]
    // Default: false
    duplicates?: boolean,
    // Default: true
    includeFromBlockchain?: boolean,
    // Default: Mainnet
    blockchainNetwork?: Network
}

export interface Request {
    jsonrpc?: string,
    id: number,
    method: string,
    params: any[] | any,
}

export interface Response {
    method: string,
    result?: any,
    params?: {
        subscription: string,
        result: {
            txHash?: string,
            txContents?: Transaction,
        },
    },
    jsonrpc: number,
}

export interface Transaction {
    type: Hex,
    from: Address,
    gasPrice: Hex,
    gas: Hex,
    hash: Hex,
    input: Hex,
    nonce: Hex,
    value: Hex,
    v: Hex,
    r: Hex,
    s: Hex,
    to: Address,
    chainId: Hex
}

export type StreamTopic = 'newTxs' | 'pendingTxs' | 'newBlocks';

export type Network = 'Mainnet' | 'BSC-Mainnet'

export interface AuthOptions {
    certPath?: string,
    keyPath?: string,
    authorization?: string
}

export type Includable = 
    // newBlocks
    'hash' | 'header' | 'header.number' | 'header.parentHash' | 'header.sha3Uncles' | 'header.miner' |
    'header.stateRoot' | 'header.transactionsRoot' | 'header.receiptsRoot' | 'header.logsBloom' |
    'header.difficulty' | 'header.gasLimit' | 'header.gasUsed' | 'header.timestamp' | 'header.extraData' |
    'header.mixHash' | 'header.nonce' | 'transactions' | 'uncles' |
    // newTxs
    'tx_hash' | 'tx_contents' | 'tx_contents.input' | 'tx_contents.v' | 'tx_contents.r' | 'tx_contents.s' |
    'tx_contents.from' | 'tx_contents.to' | 'tx_contents.value' | 'tx_contents.nonce' | 'tx_contents.gas' |
    'tx_contents.gas_price'


export type BlockAlias = 'latest' | 'pending';

export interface BundleSimulationOptions {
    stateBlockNumber?: number | BlockAlias,
    timestamp?: number
}

export interface BundleSubmissionOptions {
    minTimestamp?: number,
    maxTimestamp?: number
}