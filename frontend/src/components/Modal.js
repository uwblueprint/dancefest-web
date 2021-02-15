import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import Modal, { ModalTransition } from '@atlaskit/modal-dialog'; // Atlaskit Modal
import styles from 'styles/components/Modal.module.css'; // Component styles

export default function DancefestModal({
  children,
  title = 'Title',
  open = false,
  cancelText = 'Cancel',
  submitText = 'Submit',
  onCancel = () => {},
  onSubmit = () => {},
}) {
  const Header = () => {
    return (
      <div className={styles.modal__header}>
        <h1>{title}</h1>
      </div>
    );
  };

  const Footer = props => {
    return (
      <div className={styles.modal__footer} {...props}>
        <button className={styles.modal__footer_cancelButton} onClick={onCancel}>
          {cancelText}
        </button>
        <button className={styles.modal__footer_submitButton} onClick={onSubmit}>
          {submitText}
        </button>
      </div>
    );
  };

  const Body = ({ children }) => <div className={styles.modal__body}>{children}</div>;

  const Container = ({ children }) => <div className={styles.modal__container}>{children}</div>;

  return (
    <ModalTransition>
      {open && (
        <Modal
          autoFocus={false}
          components={{
            Header,
            Footer,
            Body,
            Container,
          }}
          width={800}
          height={600}
          onClose={onCancel}
        >
          {children}
        </Modal>
      )}
    </ModalTransition>
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
