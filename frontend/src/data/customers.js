const formatRWF = (amount) => {
  return `RWF ${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
};

export const CUSTOMER_STATUSES = {
  active: { label: 'Active', variant: 'success' },
  overdue: { label: 'Payment follow-up', variant: 'danger' },
  current: { label: 'Current', variant: 'neutral' },
};

// Determined customer status based on outstanding balance vs credit limit.
export const computeStatus = (balance, creditLimit) => {
  if (creditLimit > 0 && balance > creditLimit) {
    return 'overdue';
  }
  if (balance > 0) {
    return 'active';
  }
  return 'current';
};

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-001',
    name: "Jean d'Amour Uwimana",
    phone: '+250 788 123 456',
    creditLimit: 100000,
    notes: '',
    joinedAt: '15 Jan 2026',
  },
  {
    id: 'cust-002',
    name: 'Grace Mukantwari',
    phone: '+250 782 987 654',
    creditLimit: 75000,
    notes: 'Prefers mobile money payments.',
    joinedAt: '03 Mar 2026',
  },
  {
    id: 'cust-003',
    name: 'Emmanuel Ndayisaba',
    phone: '+250 785 444 333',
    creditLimit: 90000,
    notes: '',
    joinedAt: '12 Jan 2026',
  },
  {
    id: 'cust-004',
    name: 'Aline Umuhoza',
    phone: '+250 781 222 111',
    creditLimit: 50000,
    notes: '',
    joinedAt: '20 Feb 2026',
  },
  {
    id: 'cust-005',
    name: 'Samuel Ruzindana',
    phone: '+250 784 555 666',
    creditLimit: 80000,
    notes: 'Reliable long-term customer.',
    joinedAt: '08 Jan 2026',
  },
  {
    id: 'cust-006',
    name: 'Chantal Nyirahabimana',
    phone: '+250 783 777 888',
    creditLimit: 60000,
    notes: '',
    joinedAt: '14 Apr 2026',
  },
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-001',
    customerId: 'cust-001',
    type: 'debt',
    amount: 25000,
    description: 'Groceries on credit',
    date: '02 Nov 2026',
    status: 'completed',
  },
  {
    id: 'tx-002',
    customerId: 'cust-001',
    type: 'payment',
    amount: 15000,
    description: 'Partial payment',
    date: '28 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-003',
    customerId: 'cust-001',
    type: 'debt',
    amount: 35000,
    description: 'Weekly stock',
    date: '14 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-004',
    customerId: 'cust-002',
    type: 'debt',
    amount: 18000,
    description: 'Household supplies',
    date: '30 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-005',
    customerId: 'cust-002',
    type: 'payment',
    amount: 18000,
    description: 'Full settlement',
    date: '22 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-006',
    customerId: 'cust-003',
    type: 'debt',
    amount: 50000,
    description: 'Bulk order',
    date: '01 Nov 2026',
    status: 'completed',
  },
  {
    id: 'tx-007',
    customerId: 'cust-003',
    type: 'debt',
    amount: 32000,
    description: 'Restaurant supplies',
    date: '18 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-008',
    customerId: 'cust-003',
    type: 'payment',
    amount: 20000,
    description: 'Cash payment',
    date: '05 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-009',
    customerId: 'cust-004',
    type: 'debt',
    amount: 12000,
    description: 'Snacks and drinks',
    date: '29 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-010',
    customerId: 'cust-004',
    type: 'debt',
    amount: 20000,
    description: 'Cleaning items',
    date: '10 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-011',
    customerId: 'cust-004',
    type: 'payment',
    amount: 20000,
    description: 'Cash payment',
    date: '10 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-012',
    customerId: 'cust-005',
    type: 'debt',
    amount: 40000,
    description: 'Electronics',
    date: '25 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-013',
    customerId: 'cust-005',
    type: 'debt',
    amount: 27000,
    description: 'Kitchenware',
    date: '10 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-014',
    customerId: 'cust-006',
    type: 'debt',
    amount: 15000,
    description: 'Stationery',
    date: '26 Oct 2026',
    status: 'completed',
  },
  {
    id: 'tx-015',
    customerId: 'cust-006',
    type: 'payment',
    amount: 15000,
    description: 'Cash payment',
    date: '26 Oct 2026',
    status: 'completed',
  },
];

export { formatRWF };
