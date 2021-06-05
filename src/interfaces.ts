export type Hex = string;
export type Address = string;

export interface StreamOptions {
    filters?: string,
    include?: string[]
}

export interface Request {
    id: number,
    method: string,
    params: any[] | any,
}

export interface Response {
    method: string,
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

export interface AuthOptions {
    certPath?: string,
    keyPath?: string,
    authorization?: string
}

export type BlockAlias = 'latest' | 'pending';

export interface BundleSimulationOptions {
    stateBlockNumber?: number | BlockAlias,
    timestamp?: number
}

export interface BundleSubmissionOptions {
    minTimestamp?: number,
    maxTimestamp?: number
}