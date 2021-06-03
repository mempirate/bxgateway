import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { Response, Request, Transaction, StreamOptions } from './interfaces';


export class BxgatewayGo extends EventEmitter {
    private readonly _gw: WebSocket

    constructor(url: string, authKey: string) {
        super();
        this._gw = new WebSocket(url, {
            headers: {
                'Authorization': authKey
            },
            rejectUnauthorized: false
        });

        // Pass on
        this._gw.on('open', () => this.emit('open'));
        this._gw.on('close', () => this.emit('close'));
        this._gw.on('error', (err) => this.emit('error', err));

        // Modify default messages to be more useful
        this._gw.on('message', (msg: string) => {
            const data: Response = JSON.parse(msg);
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
        };

        if (options) req.params.push(options);

        this._gw.send(JSON.stringify(req));
    }

    close() {
        this._gw.close();
    }
}