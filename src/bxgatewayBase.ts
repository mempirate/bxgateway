import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { StreamOptions, Request, StreamTopic } from './interfaces';
import { Debugger } from 'debug';

export default class BxgatewayBase extends EventEmitter {
    _gw: WebSocket;

    private readonly _debug: Debugger;

    constructor(dbg: Debugger) {
        super();
        this._debug = dbg;
    }

    subscribe(topic: StreamTopic, options?: StreamOptions) {
        if (!this._gw.OPEN) throw new Error('Websocket connection to gateway closed');

        let req: Request = {
            id: 1,
            method: 'subscribe',
            params: [
                topic,
                options
            ]
        };

        this._debug.extend('subscribe')(JSON.stringify(req));
        this._gw.send(JSON.stringify(req));
    }

    sendTransaction(signedTransaction: string) {
        if (!this._gw.OPEN) throw new Error('Websocket connection to gateway closed');

        signedTransaction = signedTransaction.startsWith('0x') ? signedTransaction.slice(2) : signedTransaction;

        let req: Request = {
            id: 1,
            method: 'blxr_tx',
            params: {
                transaction: signedTransaction
            }
        }

        this._debug.extend('blxr_tx')(JSON.stringify(req));
        this._gw.send(JSON.stringify(req));
    }

    close() {
        this._debug('close requested');
        this._gw.close();
    }
}