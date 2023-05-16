import {NewTransaction, Transaction} from '../types/transactions.ts';

export async function getTransaction(code: string, origin: string): Promise<Transaction> {
  const response = await fetch(`${origin}/api/transactions/${code}`);
  return await response.json();
}

export async function createTrasaction(
  newTransaction: NewTransaction,
  origin: string,
): Promise<Transaction> {
  const response = await fetch(`${origin}/api/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  });
  return await response.json();
}
