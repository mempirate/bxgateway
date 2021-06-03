# Bxgateway

## Usage

### Hosted light gateway (bxgateway-go)
```js
import { BxgatewayGo, Filter } from 'bxgateway';

const gw = new BxgatewayGo(
    'ws://127.0.0.1:28334/ws',
    'YOUR_API_KEY'
);

// Filter for watching all transactions to Uniswap V2 & V3 routers.
const filter = new Filter()
    .to('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D').or.to('0xE592427A0AEce92De3Edee1F18E0157C05861564')

gw.on('open', () => {
    gw.subscribe('newTxs', {
        // Don't forget to build the filter string
        filters: filter.build(),

        // Include uses the same strings as in the JSON-RPC requests
        // (tx_hash, tx_contents, header, header.number, ...)
        include: [
            'tx_contents'
        ]
    });
});

gw.on('message', (msg) => {
    console.log(msg);
});
```

### Cloud gateway (Enterprise)
```js
import { CloudGateway } from 'bxgateway';

const cloudGw = new CloudGateway(
    'wss://eth.feed.blxrbdn.com:28333',
    {
        certPath: 'path/to/bloxroute/external_gateway/registration_only/external_gateway_cert.pem',
        keyPath: 'path/to/bloxroute/external_gateway/registration_only/external_gateway_key.pem',
    });

cloudGw.on('open', () => {
    cloudGw.subscribe('newBlocks', {
        include: ['header.number']
    });
});

cloudGw.on('message', (msg) => console.log(msg));
```

## To do
* [ ] Implement other endpoints (mev, blxr_tx)
* [ ] Add Python gateway