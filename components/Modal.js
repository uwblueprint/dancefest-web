import Modal from "react-modal"; // React modal

/**
 * Modal View
 * @param {Boolean} isOpen open state of modal
 * @param {Function} setIsOpen function to edit state of modal
 * @param {HTMLElement} children to populate modal
 * @returns {HTMLElement} modal
 */
function ModalView({ isOpen, setIsOpen, children, ...props }) {
  return (
    // Return react-modal populated with child components
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} {...props}>
      {children}
    </Modal>
  );
}

// Export modals
export { ModalView };
