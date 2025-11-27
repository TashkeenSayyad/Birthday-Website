import { useState } from 'react';

/**
 * Custom hook for managing modal state and body overflow
 * @param {number} closeDelay - Delay in ms before clearing selected item (default: 300)
 * @returns {Object} Modal state and handlers
 */
export const useModal = (closeDelay = 300) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setSelectedItem(null), closeDelay);
  };

  return {
    selectedItem,
    isOpen,
    openModal,
    closeModal,
  };
};
