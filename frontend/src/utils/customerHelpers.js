import { formatRWF } from '../data/customers';

export const formatCurrency = (amount) => formatRWF(amount);

export const computeBalance = (transactions, customerId) => {
  const customerTxs = transactions.filter((tx) => tx.customerId === customerId);
  return customerTxs.reduce((acc, tx) => {
    if (tx.type === 'debt') return acc + tx.amount;
    if (tx.type === 'payment') return acc - tx.amount;
    return acc;
  }, 0);
};
