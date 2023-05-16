import {cryptoOptions} from '../consts.ts';
import {NewTransaction, NewTransactionSimple} from '../types/transactions.ts';
import {createTrasaction as createTransactionConnection} from '../connections/transactions.ts';
import {ORIGIN} from '../consts.ts';

function makeTransactionFull(simpleTransaction: NewTransactionSimple): NewTransaction {
  return {
    name: simpleTransaction.name,
    fiat: simpleTransaction.fiat,
    crypto_options: simpleTransaction.cryptoOptions.map(({id, address}) => ({
      address,
      ...cryptoOptions[id],
    })),
  };
}

export async function createTransaction({
  newTransaction,
  origin = ORIGIN,
}: {
  newTransaction: NewTransaction;
  origin?: string;
}) {
  const transaction = await createTransactionConnection(newTransaction, origin);

  return transaction;
}

export async function createTransactionSimple(simpleTransaction: NewTransactionSimple) {
  return createTransaction({newTransaction: makeTransactionFull(simpleTransaction)});
}
