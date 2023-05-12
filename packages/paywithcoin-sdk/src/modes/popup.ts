import { getPopupSizes } from "../utils/browser.js";
import { PaymentLinksProps, createPaymentLink } from "../utils/links.js";

export function openPopup({ origin, transaction }: PaymentLinksProps) {
  const popupSize = getPopupSizes({
    height: 400,
    width: 400,
  });
  return window.open(
    createPaymentLink({ origin, transaction }),
    "",
    `width=${popupSize.width},height=${popupSize.height},left=${popupSize.left},top=${popupSize.top}`
  );
}
