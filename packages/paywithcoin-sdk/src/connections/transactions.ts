export async function getTransaction(code: string, origin: string) {
  const response = await fetch(`${origin}/api/transactions/${code}`);
  return await response.json();
}

type NewTransaction = {
  crypto_options: {
    id: string;
    name: string;
    code: string;
    address: string;
  }[];
  name: string;
  fiat: {
    id: string;
    amount: number;
  };
};

export async function createTrasaction(
  newTransaction: NewTransaction,
  origin: string
) {
  const response = await fetch(`${origin}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTransaction),
  });
  return await response.json();
}
