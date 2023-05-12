export type PaymentLinksProps = {
  origin: string;
  transaction: string;
};

export function createPaymentLink({
  origin,
  transaction,
}: {
  origin: string;
  transaction: string;
}) {
  return `${origin}/${transaction}`;
}
