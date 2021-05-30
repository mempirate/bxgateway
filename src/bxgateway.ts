import WebSocket, { ClientOptions } from 'ws';
import { EventEmitter } from 'events';

type Hex = string;
type Address = string;

export interface StreamOptions {
    filters?: {
        method?: string,
        to?: string,
        from?: string,
    },
    include?: string[]
}

export interface NewTransactionResponse {
    method: string,
    params?: {
        subscription: string,
        result: {
            txHash: string,
            txContents: Transaction,
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

export class Bxgateway extends EventEmitter {
    gw: WebSocket

    constructor(url: string, options?: ClientOptions) {
        super();
        this.gw = new WebSocket(url, options);

        this.gw.on('open', () => {
            this.emit('open');
        });

        this.gw.on('message', (msg: string) => {
            const data: NewTransactionResponse = JSON.parse(msg);
            if (data.params) this.emit('message', data.params.result);
        });

        this.gw.on('error', (err) => {
            this.emit('error', err);
        });
    }

    subscribe(topic: string, options?: StreamOptions) {
        if (!this.gw.OPEN) throw new Error('Websocket connection to gateway closed');

        let string = `{"id": 1, "method": "subscribe", "params": ["newTxs"`
        let ending = `]}`

        // gw.send(`{"id": 1, "method": "subscribe", "params": ["newTxs", {"include": ["tx_hash", "tx_contents"], "filters": "({to} == '${UNISWAPV2}') AND ({from} == '${LP}')"}]}`)
        if (options) {
            if (options.include) {
                string += `, {"include": [`;
                for (let i = 0; i < options.include.length; i++) {
                    if (options.include.length - 1 === i) {
                        string += `"${options.include[i]}"`;
                    } else {
                        string += `"${options.include[i]}", `;
                    }
                }
                string += `], `;
                ending = `}` + ending;
            }

            if (options.filters) {
                string += `"filters": `;
                ending = `"` + ending;
                if (options.filters.to) {
                    string += `"({to} == '${options.filters.to}') `;
                }

                if (options.filters.method) {
                    string += options.filters.method.toUpperCase();
                }

                if (options.filters.from) {
                    string += ` ({from} == '${options.filters.from}')`;
                }
            }

            string += ending;
        }

        this.gw.send(string);
    }
}