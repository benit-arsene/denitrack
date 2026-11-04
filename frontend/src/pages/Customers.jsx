import { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import Button from '../components/ui/Button';
import CustomerList from '../components/customers/CustomerList';
import AddCustomerModal from '../components/customers/AddCustomerModal';
import './../components/customers/customers.css';

export default function Customers() {
  const { customers, addCustomer } = useCustomers();
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddCustomer = (newCustomer) => {
    addCustomer(newCustomer);
  };

  return (
    <div className="page dt-customers-page">
      <header className="page-header dt-page-header">
        <div className="dt-header-content">
          <div>
            <h2>Customers</h2>
            <p className="page-description">Manage your customers and their credit.</p>
          </div>
          <Button variant="primary" onClick={() => setAddModalOpen(true)}>
            Add customer
          </Button>
        </div>
      </header>

      <div className="page-body dt-page-body">
        <CustomerList customers={customers} />
      </div>

      <AddCustomerModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />
    </div>
  );
}

Customers.displayName = 'Customers';
