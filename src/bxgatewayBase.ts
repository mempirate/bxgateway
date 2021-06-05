import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { StreamOptions, Request, StreamTopic } from './interfaces';

export default class BxgatewayBase extends EventEmitter {
    _gw: WebSocket;

    subscribe(topic: StreamTopic, options?: StreamOptions) {
        if (!this._gw.OPEN) throw new Error('Websocket connection to gateway closed');

        let req: Request = {
            id: 1,
            method: "subscribe",
            params: [
                topic,
            ]
        };

        if (options) req.params.push(options);

        this._gw.send(JSON.stringify(req));
    }

    sendTransaction(signedTransaction: string) {
        this._gw.send(`{"jsonrpc": "2.0", "id": 1, "method": "blxr_tx", "params": {"transaction": "${signedTransaction}"}}`);
    }

    close() {
        this._gw.close();
    }
}