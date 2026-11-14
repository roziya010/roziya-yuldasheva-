import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { formatToDisplayDate } from '../types/order';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOrder: (data: {
    customerName: string;
    description: string;
    deliveryDate: string;
  }) => void;
}

export function NewOrderModal({ isOpen, onClose, onAddOrder }: NewOrderModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetForm = () => {
    setCustomerName('');
    setDescription('');
    setDeliveryDate('');
    setErrorMessage('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = customerName.trim();
    const trimmedDescription = description.trim();
    const trimmedDate = deliveryDate.trim();

    if (!trimmedName || !trimmedDescription || !trimmedDate) {
      setErrorMessage('Iltimos, barcha maydonlarni to‘ldiring.');
      return;
    }

    onAddOrder({
      customerName: trimmedName,
      description: trimmedDescription,
      deliveryDate: formatToDisplayDate(trimmedDate),
    });

    resetForm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C1E16]/35 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-order-modal-title"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-[#E6D9CC] bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between border-b border-[#EFE6DC] pb-4">
          <h2
            id="new-order-modal-title"
            className="font-display text-lg font-semibold text-[#2C1E16]"
          >
            Yangi buyurtma qo‘shish
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Yopish"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#6E5A4F] transition-colors hover:bg-[#F5EFE8] hover:text-[#2C1E16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C5A3C]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="customer-name"
              className="mb-1.5 block text-sm font-medium text-[#3D2B20]"
            >
              Mijoz ismi
            </label>
            <input
              id="customer-name"
              name="customerName"
              type="text"
              required
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Masalan: Dilnoza Karimova"
              className="w-full rounded-lg border border-[#DFD0C0] bg-[#FCF9F6] px-3.5 py-2.5 text-sm text-[#2C1E16] placeholder-[#9D887A] transition-colors focus:border-[#8C5A3C] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="order-description"
              className="mb-1.5 block text-sm font-medium text-[#3D2B20]"
            >
              Buyurtma tavsifi
            </label>
            <input
              id="order-description"
              name="description"
              type="text"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Masalan: 1 ta asal tort"
              className="w-full rounded-lg border border-[#DFD0C0] bg-[#FCF9F6] px-3.5 py-2.5 text-sm text-[#2C1E16] placeholder-[#9D887A] transition-colors focus:border-[#8C5A3C] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="delivery-date"
              className="mb-1.5 block text-sm font-medium text-[#3D2B20]"
            >
              Topshirish sanasi
            </label>
            <input
              id="delivery-date"
              name="deliveryDate"
              type="date"
              required
              value={deliveryDate}
              onChange={(e) => {
                setDeliveryDate(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              className="w-full rounded-lg border border-[#DFD0C0] bg-[#FCF9F6] px-3.5 py-2.5 text-sm text-[#2C1E16] tabular-nums transition-colors focus:border-[#8C5A3C] focus:bg-white focus:outline-none"
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-[#E7C2B8] bg-[#FDF2EF] px-3.5 py-2.5 text-sm font-medium text-[#9B3423]"
            >
              {errorMessage}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="min-h-[40px] rounded-lg border border-[#DFD0C0] bg-white px-4 py-2 text-sm font-medium text-[#5A463A] transition-colors hover:bg-[#F7F1EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C5A3C] whitespace-nowrap shrink-0"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="min-h-[40px] rounded-lg bg-[#8C5A3C] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#74492F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C5A3C] whitespace-nowrap shrink-0"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
