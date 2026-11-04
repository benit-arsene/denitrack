import { useState } from 'react';
import SearchInput from '../ui/SearchInput';
import CustomerRow from './CustomerRow';

export default function CustomerList({ customers }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.phone.replace(/\s/g, '').includes(query.replace(/\s/g, ''))
    );
  });

  return (
    <section className="dt-customer-list" aria-label="Customer directory">
      <div className="dt-list-header">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name or phone"
          className="dt-search-input"
        />
      </div>
      <div className="dt-list-results">
        <p className="dt-results-count">
          {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
        </p>
        <ul className="dt-customer-grid" role="list">
          {filteredCustomers.length === 0 ? (
            <li className="dt-empty-result">
              <p>No customers match your search.</p>
            </li>
          ) : (
            filteredCustomers.map((customer) => (
              <li key={customer.id}>
                <CustomerRow customer={customer} />
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

CustomerList.displayName = 'CustomerList';
