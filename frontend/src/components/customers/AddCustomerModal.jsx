import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

const PHONE_REGEX = /^\+?[0-9\s]{8,}$/;
const NON_NEGATIVE_NUMBER_REGEX = /^\d*\.?\d*$/;

export default function AddCustomerModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Full name is required';
    if (!phone.trim()) next.phone = 'Phone number is required';
    else if (!PHONE_REGEX.test(phone)) next.phone = 'Enter a valid phone number';
    if (creditLimit.trim() !== '') {
      if (!NON_NEGATIVE_NUMBER_REGEX.test(creditLimit)) {
        next.creditLimit = 'Enter a valid number';
      } else if (parseFloat(creditLimit) < 0) {
        next.creditLimit = 'Credit limit must be non-negative';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      creditLimit: creditLimit.trim() ? parseFloat(creditLimit) : 0,
      notes: notes.trim(),
      joinedAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    onAdd(newCustomer);
    setName('');
    setPhone('');
    setCreditLimit('');
    setNotes('');
    setErrors({});
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add customer"
      closeLabel="Close add customer"
    >
      <form onSubmit={handleSubmit} className="dt-add-customer-form">
        <Input
          label="Full name"
          placeholder="e.g. Grace Mukantwari"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          required
          autoFocus
        />
        <Input
          label="Phone number"
          placeholder="e.g. +250 788 123 456"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          type="tel"
          error={!!errors.phone}
          helperText={errors.phone}
          required
        />
        <Input
          label="Credit limit (RWF, optional)"
          placeholder="e.g. 100000"
          value={creditLimit}
          onChange={(event) => setCreditLimit(event.target.value)}
          type="text"
          error={!!errors.creditLimit}
          helperText={errors.creditLimit}
        />
        <Input
          label="Notes (optional)"
          placeholder="Any additional details"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <footer className="dt-modal-footer">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={submitting}
            loading={submitting}
          >
            Add customer
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

AddCustomerModal.displayName = 'AddCustomerModal';
