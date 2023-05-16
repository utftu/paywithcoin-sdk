import {PaymentLinksProps, createPaymentLink} from '../utils/links.js';

export function openBrowserTab({origin, transaction}: PaymentLinksProps) {
  return window.open(createPaymentLink({origin, transaction}), '_blank');
}
