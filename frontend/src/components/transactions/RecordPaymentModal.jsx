import { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import './transactions.css';

const DATE_INPUT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'mobile_money', label: 'Mobile Money' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
];

export default function RecordPaymentModal({ isOpen, onClose }) {
  const { customers, getCustomerBalance, addPayment } = useCustomers();

  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [outstandingBalance, setOutstandingBalance] = useState(0);

  const handleCustomerChange = (id) => {
    setCustomerId(id);
    setOutstandingBalance(getCustomerBalance(id));
  };

  const validate = () => {
    const next = {};
    if (!customerId) next.customerId = 'Please select a customer';
    if (!amount.trim()) next.amount = 'Payment amount is required';
    else if (!/^\d+(\.\d+)?$/.test(amount)) next.amount = 'Enter a valid amount';
    else if (parseFloat(amount) <= 0) next.amount = 'Amount must be greater than zero';
    else if (parseFloat(amount) > outstandingBalance) {
      next.amount = `Amount cannot exceed outstanding balance (${outstandingBalance.toLocaleString('en-US')} RWF)`;
    }
    if (!method) next.method = 'Please select a payment method';
    if (!date.trim()) next.date = 'Please select a date';
    else if (!DATE_INPUT_REGEX.test(date)) next.date = 'Enter a valid date';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    addPayment({
      customerId,
      amount: parseFloat(amount),
      method,
      description: description.trim(),
      date,
    });
    setCustomerId('');
    setAmount('');
    setMethod('');
    setDescription('');
    setDate('');
    setErrors({});
    setOutstandingBalance(0);
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record payment"
      closeLabel="Close payment entry"
    >
      <form onSubmit={handleSubmit} className="dt-record-form">
        <div className="dt-input-field">
          <label className="dt-input-label">Customer</label>
          <select
            className="dt-input dt-select"
            value={customerId}
            onChange={(event) => handleCustomerChange(event.target.value)}
            required
          >
            <option value="">Select a customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.customerId && (
            <p className="dt-input-helper dt-input-helper--error">{errors.customerId}</p>
          )}
        </div>
        <div className="dt-input-field">
          <label className="dt-input-label">Outstanding balance (RWF)</label>
          <span className="dt-balance-display">{outstandingBalance.toLocaleString('en-US')}</span>
        </div>
        <Input
          label="Payment amount (RWF)"
          placeholder="e.g. 15000"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          type="text"
          error={!!errors.amount}
          helperText={errors.amount}
          required
        />
        <div className="dt-input-field">
          <label className="dt-input-label">Payment method</label>
          <select
            className="dt-input dt-select"
            value={method}
            onChange={(event) => setMethod(event.target.value)}
            required
          >
            <option value="">Select a method</option>
            {PAYMENT_METHODS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {errors.method && (
            <p className="dt-input-helper dt-input-helper--error">{errors.method}</p>
          )}
        </div>
        <Input
          label="Description (optional)"
          placeholder="e.g. Cash payment"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Input
          label="Date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          type="date"
          error={!!errors.date}
          helperText={errors.date}
          required
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
            Record payment
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

RecordPaymentModal.displayName = 'RecordPaymentModal';
