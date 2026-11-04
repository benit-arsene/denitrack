const formatRWF = (amount) => {
  return `RWF ${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
};

const CUSTOMER_STATUSES = {
  active: { label: 'Active', variant: 'success' },
  overdue: { label: 'Payment follow-up', variant: 'danger' },
  current: { label: 'Current', variant: 'neutral' },
};

const DEMO_CUSTOMERS = [
  {
    id: 'cust-001',
    name: 'Jean d\'Amour Uwimana',
    phone: '+250 788 123 456',
    outstandingBalance: 45000,
    creditLimit: 100000,
    status: 'active',
    joinedAt: '15 Jan 2026',
    location: 'Kigali',
    transactions: [
      { id: 'tx-101', date: '02 Nov 2026', type: 'Credit sale', amount: 25000, status: 'unpaid' },
      { id: 'tx-102', date: '28 Oct 2026', type: 'Payment received', amount: 15000, status: 'paid' },
      { id: 'tx-103', date: '14 Oct 2026', type: 'Credit sale', amount: 35000, status: 'unpaid' },
    ],
  },
  {
    id: 'cust-002',
    name: 'Grace Mukantwari',
    phone: '+250 782 987 654',
    outstandingBalance: 0,
    creditLimit: 75000,
    status: 'current',
    joinedAt: '03 Mar 2026',
    location: 'Nyamirambo',
    transactions: [
      { id: 'tx-201', date: '30 Oct 2026', type: 'Credit sale', amount: 18000, status: 'paid' },
      { id: 'tx-202', date: '22 Oct 2026', type: 'Payment received', amount: 18000, status: 'paid' },
    ],
  },
  {
    id: 'cust-003',
    name: 'Emmanuel Ndayisaba',
    phone: '+250 785 444 333',
    outstandingBalance: 82000,
    creditLimit: 90000,
    status: 'overdue',
    joinedAt: '12 Jan 2026',
    location: 'Kimironko',
    transactions: [
      { id: 'tx-301', date: '01 Nov 2026', type: 'Credit sale', amount: 50000, status: 'unpaid' },
      { id: 'tx-302', date: '18 Oct 2026', type: 'Credit sale', amount: 32000, status: 'unpaid' },
      { id: 'tx-303', date: '05 Oct 2026', type: 'Payment received', amount: 20000, status: 'paid' },
    ],
  },
  {
    id: 'cust-004',
    name: 'Aline Umuhoza',
    phone: '+250 781 222 111',
    outstandingBalance: 12000,
    creditLimit: 50000,
    status: 'active',
    joinedAt: '20 Feb 2026',
    location: 'Gikondo',
    transactions: [
      { id: 'tx-401', date: '29 Oct 2026', type: 'Credit sale', amount: 12000, status: 'unpaid' },
      { id: 'tx-402', date: '10 Oct 2026', type: 'Credit sale', amount: 20000, status: 'paid' },
    ],
  },
  {
    id: 'cust-005',
    name: 'Samuel Ruzindana',
    phone: '+250 784 555 666',
    outstandingBalance: 67000,
    creditLimit: 80000,
    status: 'overdue',
    joinedAt: '08 Jan 2026',
    location: 'Remera',
    transactions: [
      { id: 'tx-501', date: '25 Oct 2026', type: 'Credit sale', amount: 40000, status: 'unpaid' },
      { id: 'tx-502', date: '10 Oct 2026', type: 'Credit sale', amount: 27000, status: 'unpaid' },
    ],
  },
  {
    id: 'cust-006',
    name: 'Chantal Nyirahabimana',
    phone: '+250 783 777 888',
    outstandingBalance: 0,
    creditLimit: 60000,
    status: 'current',
    joinedAt: '14 Apr 2026',
    location: 'Kicukiro',
    transactions: [
      { id: 'tx-601', date: '26 Oct 2026', type: 'Credit sale', amount: 15000, status: 'paid' },
    ],
  },
];

export { DEMO_CUSTOMERS, CUSTOMER_STATUSES, formatRWF };
