import { PaymentLinksProps, createPaymentLink } from "../utils/links.js";

export function openTab({ origin, transaction }: PaymentLinksProps) {
  return window.open(createPaymentLink({ origin, transaction }), "_blank");
}
