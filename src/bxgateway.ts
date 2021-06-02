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

export interface Request {
    id: number,
    method: string,
    params: any[],
}

export interface RequestParams {
    include?: string[],
    filters?: string,
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

export class BxgatewayGo extends EventEmitter {
    private _gw: WebSocket

    constructor(url: string, authKey: string) {
        super();
        this._gw = new WebSocket(url, {
            headers: {
                'Authorization': authKey
            },
            rejectUnauthorized: false
        });

        this._gw.on('open', () => this.emit('open'));
        this._gw.on('error', (err) => this.emit('error', err));

        this._gw.on('message', (msg: string) => {
            const data: NewTransactionResponse = JSON.parse(msg);
            if (data.params) this.emit('message', data.params.result);
        });
    }

    subscribe(topic: string, options?: StreamOptions) {
        if (!this._gw.OPEN) throw new Error('Websocket connection to gateway closed');

        let req: Request = {
            id: 1,
            method: "subscribe",
            params: [
                topic,
            ]
        }

        if (options) {

            let params: any = {};
            if (options.include) {
                params.include = options.include;
            }

            if (options.filters) {
                let filter = ``;
                if (options.filters.to) {
                    filter += `({to} == '${options.filters.to}')`;
                }

                if (options.filters.method) {
                    filter += ` ${options.filters.method.toUpperCase()} `;
                }

                if (options.filters.from) {
                    filter += `({from} == '${options.filters.from}')`;
                }

                params.filter = filter;
            }

            req.params.push(params);
        }

        console.log(JSON.stringify(req));
        this._gw.send(JSON.stringify(req));
    }
}