import { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import './transactions.css';

const DATE_INPUT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export default function RecordDebtModal({ isOpen, onClose }) {
  const { customers, addDebt, formatCurrency } = useCustomers();

  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!customerId) next.customerId = 'Please select a customer';
    if (!amount.trim()) next.amount = 'Debt amount is required';
    else if (!/^\d+(\.\d+)?$/.test(amount)) next.amount = 'Enter a valid amount';
    else if (parseFloat(amount) <= 0) next.amount = 'Amount must be greater than zero';
    if (!date.trim()) next.date = 'Please select a date';
    else if (!DATE_INPUT_REGEX.test(date)) next.date = 'Enter a valid date';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = addDebt({
      customerId,
      amount: parseFloat(amount),
      description: description.trim(),
      date,
    });
    if (result && result.overLimit) {
      window.alert(
        `Credit limit warning: New balance ${formatCurrency(result.newBalance)} exceeds credit limit of ${formatCurrency(result.creditLimit)}. Debt was recorded.`
      );
    }
    setCustomerId('');
    setAmount('');
    setDescription('');
    setDate('');
    setErrors({});
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record new debt"
      closeLabel="Close debt entry"
    >
      <form onSubmit={handleSubmit} className="dt-record-form">
        <div className="dt-input-field">
          <label className="dt-input-label">Customer</label>
          <select
            className="dt-input dt-select"
            value={customerId}
            onChange={(event) => setCustomerId(event.target.value)}
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
        <Input
          label="Amount (RWF)"
          placeholder="e.g. 25000"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          type="text"
          error={!!errors.amount}
          helperText={errors.amount}
          required
        />
        <Input
          label="Description (optional)"
          placeholder="e.g. Groceries on credit"
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
            Record debt
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

RecordDebtModal.displayName = 'RecordDebtModal';
