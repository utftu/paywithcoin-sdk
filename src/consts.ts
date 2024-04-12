export const ORIGIN = 'https://paywithcoin.online';

export const cryptoOptions = {
  'XLM:test': {
    id: 'XLM:test',
    name: 'stellar testnet',
    code: 'XLM',
    track_options: ['memo'],
  },
  XLM: {
    id: 'XLM',
    name: 'stellar',
    code: 'XLM',
    track_options: ['memo'],
  },
} as const;

////
