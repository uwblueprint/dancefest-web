import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import ReactModal from 'react-modal'; // React Modal

import Title from '@components/Title'; // Title
import Button from '@components/Button'; // Button
import styles from '@styles/components/Modal.module.scss'; // Component styles

/**
 * Modal View
 * @param {Boolean} isOpen open state of modal
 * @param {Function} setIsOpen function to edit state of modal
 * @param {HTMLElement} children to populate modal
 * @returns {HTMLElement} modal
 */
export default function Modal({
  children,
  containerClassName = '',
  title = '',
  open = true,
  cancelText = '',
  submitText = 'Submit',
  onCancel = () => {},
  onSubmit = () => {},
  setModalOpen,
  disableSubmitButton = false,
  ...props
}) {
  return (
    <ReactModal
      isOpen={open}
      className={`${styles.modal__container} ${containerClassName}`}
      overlayClassName={styles.modal__overlay}
      onRequestClose={() => {
        onCancel();
        setModalOpen(false);
      }}
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
            disabled={disableSubmitButton}
          >
            {submitText}
          </Button>
        </div>
      ) : null}
    </ReactModal>
  );
}

Modal.propTypes = {
  cancelText: PropTypes.string,
  children: PropTypes.any,
  containerClassName: PropTypes.string,
  disableSubmitButton: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  setModalOpen: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  title: PropTypes.string,
};
