import { createTrasaction, getTransaction } from './connections/transactions.ts';
import { openPopup } from './modes/popup.ts';
import { openTab } from './modes/tab.ts';
import { createPaymentLink } from './utils/links.js';

export async function createTransactionBrowser({
	newTransaction,
	origin = 'https://paywithcoin.vercel.app'
}) {
	const transaction = await createTrasaction(newTransaction, origin);

	return {
		transaction,
		openPopup() {
			const popupResult = openPopup({
				origin,
				transaction: transaction.code
			});
			if (popupResult === null) {
				const agree = confirm(
					'New popup with payment widget was blocked by your browser, do you want to be redirected to payment page?'
				);
				if (agree) {
					window.location.href = createPaymentLink({
						origin,
						transaction: transaction.code
					});
				}
			}
		},
		openTab() {
			openTab({ origin, transaction: transaction.code });
		},
		startCheck({ onSuccess, onFail, timeout = 10_000 }) {
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
	};
}
