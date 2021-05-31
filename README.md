# Bxgateway-js

## Usage
```js
import { BxgatewayGo } from 'bxgateway';

const gw = new BxgatewayGo(
    'ws://127.0.0.1:28334/ws', 
    'YOUR_API_KEY'
);

gw.on('open', () => {
    gw.subscribe('pendingTxs', {
        filters: {
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
        },
        include: [
            'tx_contents'
        ]
    });
});

gw.on('message', (msg) => {
    console.log(msg);
});
```