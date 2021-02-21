import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import ReactModal from 'react-modal'; // React Modal

import Title from '@components/Title'; // Title
import Button from '@components/Buttons'; // Button
import styles from '@styles/components/Modal.module.scss'; // Component styles

/**
 * Modal View
 * @param {Boolean} isOpen open state of modal
 * @param {Function} setIsOpen function to edit state of modal
 * @param {HTMLElement} children to populate modal
 * @returns {HTMLElement} modal
 */
export default function DancefestModal({
  children,
  title = '',
  open = true,
  cancelText = '',
  submitText = 'Submit',
  onCancel = () => {},
  onSubmit = () => {},
  setModalOpen,
  ...props
}) {
  return (
    <ReactModal
      isOpen={open}
      className={styles.modal__container}
      overlayClassName={styles.modal__overlay}
      onRequestClose={() => setModalOpen(false)}
      {...props}
    >
      {title ? <Title>{title}</Title> : null}
      <div className={styles.modal__body}>{children}</div>
      {cancelText ? (
        <div className={styles.modal__footer}>
          <Button variant="outlined" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            className={styles.modal__footer_submitButton}
            variant="contained"
            onClick={onSubmit}
          >
            {submitText}
          </Button>
        </div>
      ) : null}
    </ReactModal>
  );
}

DancefestModal.propTypes = {
  cancelText: PropTypes.string,
  children: PropTypes.any,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  submitText: PropTypes.string,
  title: PropTypes.string,
};
