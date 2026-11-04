import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import CustomerList from '../components/customers/CustomerList';
import AddCustomerModal from '../components/customers/AddCustomerModal';
import { DEMO_CUSTOMERS } from '../data/customers';
import './../components/customers/customers.css';

export default function Customers() {
  const [customers, setCustomers] = useState([...DEMO_CUSTOMERS]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddCustomer = (newCustomer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const handleSelectCustomer = (id) => {
    navigate(`/customers/${id}`);
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
        <CustomerList customers={customers} onSelect={handleSelectCustomer} />
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
