# switch_chain_list

The source data is in src/chains. If you want to submit a network, you can create a file with the filename being the CAIP-2 representation as name and .json ans extension.

## Example

```json
{
  "name": "Ethereum Mainnet",
  "chain": "ETH",
  "network": "mainnet",
  "rpc": [
    "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
    "https://api.mycryptoapi.com/eth"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "infoURL": "https://ethereum.org",
  "shortName": "eth",
  "chainId": 1,
  "networkId": 1,
  "icon": "ethereum",
  "explorers": [{
    "name": "etherscan",
    "url": "https://etherscan.io",
    "icon": "etherscan",
    "standard": "EIP3091"
  }]
}
```

when an icon is used in either the network or a explorer there must be a json in src/icons with the name used (e.g. in the above example there must be a `ethereum.json` and a `etherscan.json` in there) - the icon jsons look like this:

```json

[
    {
      "url": "ipfs://QmdwQDr6vmBtXmK2TmknkEuZNoaDqTasFdZdu3DRw8b2wt",
      "width": 1000,
      "height": 1628,
      "format": "png"
    }
]

```

where:
 * the URL must be a IPFS url that is publicly resolveable
 * width and height are optional - but when one is there then the other must be there also
 * format is either "png", "jpg" or "svg"
