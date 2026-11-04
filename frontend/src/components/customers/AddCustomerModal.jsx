import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

const PHONE_REGEX = /^\+?[0-9\s]{8,}$/;

export default function AddCustomerModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Full name is required';
    if (!phone.trim()) next.phone = 'Phone number is required';
    else if (!PHONE_REGEX.test(phone)) next.phone = 'Enter a valid phone number';
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
      notes: notes.trim(),
      outstandingBalance: 0,
      creditLimit: 0,
      status: 'current',
      joinedAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      location: '',
      transactions: [],
    };
    onAdd(newCustomer);
    setName('');
    setPhone('');
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
