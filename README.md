# Bxgateway

## Usage
```
npm install bxgateway
```
### Light Gateway
```js
import { LightGateway } from 'bxgateway';

const gw = new LightGateway(
    'ws://127.0.0.1:28334/ws',
    'YOUR_API_KEY'
);
```

### Cloud Gateway
```js
import { CloudGateway } from 'bxgateway';

const cloudGw = new CloudGateway('wss://api.blxrbdn.com/ws', {
    authorization: 'YOUR_API_KEY'
});
```

### Cloud Gateway (Enterprise)
```js
import { CloudGateway } from 'bxgateway';

const cloudGw = new CloudGateway('wss://eth.feed.blxrbdn.com:28333', {
    certPath: 'path/to/bloxroute/external_gateway/registration_only/external_gateway_cert.pem',
    keyPath: 'path/to/bloxroute/external_gateway/registration_only/external_gateway_key.pem',
});
```

### Streams
`newTxs`, `pendingTxs` and `newBlocks` streams are supported. The `newBlocks` stream does not work on bxgateway-go.
```js
import { Filter } from 'bxgateway';
// Filter for watching all transactions to Uniswap V2 & V3 routers.
const filter = new Filter()
    .to('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D').or.to('0xE592427A0AEce92De3Edee1F18E0157C05861564');

gw.on('open', () => {
    gw.subscribe('newTxs', {
        // Don't forget to build the filter string
        filters: filter.build(),

        // Include uses the same strings as in the JSON-RPC requests
        // (tx_hash, tx_contents, header, header.number, ...)
        include: ['tx_contents', 'tx_hash']
    });
});

gw.on('message', (msg) => {
    console.log(msg);
});
```
Example response:
```js
{
  txHash: '0xe0144f121d38beab28b60dceac6194fed161e4d9f2a2748677535c467179ed7e',
  txContents: {
    type: '0x0',
    nonce: '0x24',
    gasPrice: '0x35458af00',
    gas: '0x31a9d',
    value: '0x0',
    input: '0x791ac94700000000000000000000000000000000000000000000001b5dfc94b637631922000000000000000000000000000000000000000000000000004a21e6fd30f7bb00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000a157d6bf3675710ec65bfe5069bb38c10cfaed700000000000000000000000000000000000000000000000000000000060bbc1410000000000000000000000000000000000000000000000000000000000000002000000000000000000000000f4a6f4ac07e215484bd9b6fbca0b35ff8005dc52000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    v: '0x26',
    r: '0xedc7509612b4ac9f71453efc76ec591ff2da01e717e4aaed71513cbd91346565',
    s: '0x6fe401581eca0e32c7888c0182db9f675d08fc47643e85e5066c0c470f336b5f',
    to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
    from: '0xa157d6bf3675710ec65bfe5069bb38c10cfaed70',
    chainId: '0x1',
    hash: '0xe0144f121d38beab28b60dceac6194fed161e4d9f2a2748677535c467179ed7e'
  }
}
```
### MEV Services
```js
const mevGw = new CloudGateway('https://mev.api.blxrbdn.com', {
    authorization: 'YOUR_API_KEY'
});

const targetBlock = 12575306;

// Raw transactions can be 0x prefixed or not
mevGw.simulateBundle(['0xf902ab4d850280bff9a3830...', 'f902ab4d850280bff9a38302d39394e59242...'], targetBlock);

mevGw.submitBundle(['0xf902ab4d850280bff9a3830...', 'f902ab4d850280bff9a38302d39394e59242...'], targetBlock);
```