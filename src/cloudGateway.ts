import WebSocket from 'ws';
import fs from 'fs';

import BxgatewayBase from './bxgatewayBase';
import { Response, Request, StreamOptions } from './interfaces';

export interface AuthOptions {
    certPath?: string,
    keyPath?: string,
    authorization?: string
}

export class CloudGateway extends BxgatewayBase {
    constructor(url: string, authOpts: AuthOptions) {
        super();

        if (authOpts.authorization) {
            // Non-enterprise gateway
            this._gw = new WebSocket(
                url,
                {
                    headers: {
                        'Authorization': authOpts.authorization
                    },
                    rejectUnauthorized: false
                }
            );
        } else {
            // Enterprise gateway
            this._gw = new WebSocket(
                url,
                {
                    cert: fs.readFileSync(authOpts.certPath!),
                    key: fs.readFileSync(authOpts.keyPath!),
                    rejectUnauthorized: false
                }
            );
        }

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
}