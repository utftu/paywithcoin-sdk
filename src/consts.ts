export const ORIGIN = 'https://paywithcoin.vercel.app';

export const cryptoOptions = {
  'XLM:test': {
    id: 'XLM:test',
    name: 'stellar testnet',
    code: 'XLM',
  },
  XLM: {
    id: 'XLM',
    name: 'stellar',
    code: 'XLM',
  },
} as const;
