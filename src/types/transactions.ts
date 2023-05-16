import {cryptoOptions} from '../consts.ts';

export type CryptoId = keyof typeof cryptoOptions;

export type FiatId = 'USD';

interface Fiat {
  id: FiatId;
  amount: number;
}

export type NewTransactionSimple = {
  name: string;
  fiat: Fiat;
  cryptoOptions: {
    id: CryptoId;
    address: string;
  }[];
};

export type CryptoOptionRaw = {
  id: CryptoId;
  name: string;
  code: string;
};

export type CryptoOption = CryptoOptionRaw & {
  address: string;
};

export type NewTransaction = {
  crypto_options: CryptoOption[];
  name: string;
  fiat: Fiat;
};

export type Transaction = {
  _id: string;
  crypto_options: CryptoOption[];
  name: string;
  fiat: Fiat;
  code: string;
  created: string;
  status: string;
  time_to_update: number;
  time_to_pay: number;
};
