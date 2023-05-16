import {getTransaction} from './connections/transactions.ts';
import {openBrowserPopup} from './modes/popup.ts';
import {openBrowserTab} from './modes/tab.ts';
import {Transaction} from './types/transactions.ts';
import {createPaymentLink} from './utils/links.js';
import {ORIGIN} from './consts.ts';

export {createTransaction, createTransactionSimple} from './transactions/transactions.ts';

export function openPopup(transaction: Transaction, {origin = ORIGIN} = {}) {
  const popupResult = openBrowserPopup({
    origin,
    transaction: transaction.code,
  });
  if (popupResult === null) {
    const agree = confirm(
      'New popup with payment widget was blocked by your browser, do you want to be redirected to payment page?',
    );
    if (agree) {
      window.location.href = createPaymentLink({
        origin,
        transaction: transaction.code,
      });
    }
  }
}

export function openTab(transaction: Transaction, {origin = ORIGIN} = {}) {
  openBrowserTab({origin, transaction: transaction.code});
}

export function startCheck({
  transaction,
  onSuccess,
  onFail,
  timeout = 10_000,
}: {
  transaction: Transaction;
  onSuccess: (transaction: Transaction) => void;
  onFail: (transaction: Transaction) => void;
  timeout: number;
}) {
  timeout = timeout > 6_000 ? timeout : 6_000;
  let timeoutStopped = false;
  let timerId = setTimeout(async function tick() {
    const localTransaction = await getTransaction(transaction.code, origin);

    if (localTransaction.status.endsWith('_fail')) {
      onFail(localTransaction);
      timeoutStopped = true;
      return;
    } else if (localTransaction.status.endsWith('_finish')) {
      onSuccess(localTransaction);
      timeoutStopped = true;
      return;
    }

    if (timeoutStopped === true) {
      return;
    }

    timerId = setTimeout(tick, timeout);
  }, timeout);

  return () => {
    timeoutStopped = true;
    clearTimeout(timerId);
  };
}
