

## Support

- [Twitter](https://twitter.com/_atomicswap)
- [Discord](https://discord.com/invite/ZqpN4TuJ6a)

## Features

* Trustless trading using multisig transactions
* Create trades with as any number of assets (NFTs, Tokens, and etc)
* P2p networking between clients using webrtc
* Super simple to self-host
* PWA - progressive web app
* Blacklist/Whitelist assets
* Dark mode

## Getting Up and Running

### Install & Build

1. `npm install --save --legacy-peer-deps react-kawaii `
2. `cd functions`
3. `npm install`
4. Add secrets as explained in "Handling Secrets"
5. `npm run build`
6. `cd ..`
7. `npm run build`

Note: there is currently a bug in chakra-ui that causes builds to fail see this [issue](https://github.com/chakra-ui/chakra-ui/issues/5714).
The best way to resolve it for now is to replace "ColorAdjust" with "PrintColorAdjust" at
"node_modules/@chakra-ui/menu/dist/declarations/src/use-menu.d.ts:480:50" and "node_modules/@chakra-ui/menu/dist/declarations/src/use-menu.d.ts:986:61"

### Serving

After building you can serve the application using by running `firebase emulators:start` and `npm run preview`

### Hot Reloading

When developing you don't need to build the app but can use `firebase emulators:start` and `npm run dev`.
Note that while the frontend is rebuilt automatically the backend must be recompiled before you can serve new versions.

## Storing secrets

Secrets must be stored in a name with the format `secrets.ts` in the `functions/src/` directory.
(This ensures that they are ignored by git.) You get the secrets from [blockfrost](https://blockfrost.io).

Example:

```typescript
export const BLOCKFROST_ID_MAINNET = "...";
export const BLOCKFROST_ID_TESTNET = "...";
```


## **Authors**

This project derives its backend structure from the people who contribute — [contribute](CONTRIBUTING.md) and [honungsburk](https://github.com/honungsburk).

All Frontend implementation was done by [sergey00k](https://github.com/sergey00k).
