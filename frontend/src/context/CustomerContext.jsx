import { createContext, useState, useCallback, useMemo } from 'react';
import {
  INITIAL_CUSTOMERS,
  INITIAL_TRANSACTIONS,
  CUSTOMER_STATUSES,
  computeStatus,
} from '../data/customers';
import { formatCurrency, computeBalance } from '../utils/customerHelpers';

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const getCustomer = useCallback(
    (id) => customers.find((c) => c.id === id),
    [customers]
  );

  const getCustomerTransactions = useCallback(
    (customerId) =>
      [...transactions]
        .filter((tx) => tx.customerId === customerId)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [transactions]
  );

  const getCustomerBalance = useCallback(
    (customerId) => computeBalance(transactions, customerId),
    [transactions]
  );

  const addCustomer = useCallback(
    (customer) => {
      setCustomers((prev) => [...prev, customer]);
    },
    []
  );

  const addDebt = useCallback(
    ({ customerId, amount, description, date }) => {
      const customer = getCustomer(customerId);
      if (!customer) return;

      const newBalance = computeBalance(transactions, customerId) + amount;
      const creditLimit = customer.creditLimit || 0;
      const overLimit = creditLimit > 0 && newBalance > creditLimit;

      const tx = {
        id: `tx-${Date.now()}`,
        customerId,
        type: 'debt',
        amount,
        description: description || '',
        date,
        status: 'completed',
      };

      setTransactions((prev) => [...prev, tx]);

      return { overLimit, creditLimit, newBalance };
    },
    [transactions, getCustomer]
  );

  const addPayment = useCallback(
    ({ customerId, amount, method, description, date }) => {
      const customer = getCustomer(customerId);
      if (!customer) return;

      const currentBalance = computeBalance(transactions, customerId);
      if (amount <= 0 || amount > currentBalance) return;

      const tx = {
        id: `tx-${Date.now()}`,
        customerId,
        type: 'payment',
        amount,
        method,
        description: description || '',
        date,
        status: 'completed',
      };

      setTransactions((prev) => [...prev, tx]);
    },
    [transactions, getCustomer]
  );

  const value = useMemo(
    () => ({
      customers,
      transactions,
      getCustomer,
      getCustomerTransactions,
      getCustomerBalance,
      addCustomer,
      addDebt,
      addPayment,
      computeStatus,
      formatCurrency,
      CUSTOMER_STATUSES,
    }),
    [
      customers,
      transactions,
      getCustomer,
      getCustomerTransactions,
      getCustomerBalance,
      addCustomer,
      addDebt,
      addPayment,
    ]
  );

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export default CustomerContext;
