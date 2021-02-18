import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import ReactModal from 'react-modal'; // React Modal

import Title from 'components/Title'; // Title
import Button from 'components/Button'; // Button
import styles from 'styles/components/Modal.module.css'; // Component styles

export default function DancefestModal({
  children,
  title = 'Title',
  open = true,
  cancelText = 'Cancel',
  submitText = 'Submit',
  onCancel = () => {},
  onSubmit = () => {},
  ...props
}) {
  return (
    <ReactModal
      isOpen={open}
      className={styles.modal__container}
      overlayClassName={styles.modal__overlay}
      onRequestClose={onCancel}
      {...props}
    >
      <Title>{title}</Title>
      <div className={styles.modal__body}>{children}</div>
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
