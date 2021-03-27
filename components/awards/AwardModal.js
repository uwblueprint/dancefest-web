import React, { useState, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import axios from 'axios'; // axios

import Input from '@components/Input'; // Input
import Modal from '@components/Modal'; // Modal
import Dropdown from '@components/Dropdown'; // Dropdown
import styles from '@styles/components/awards/AwardModal.module.scss'; // Component styles

// Create/Edit Performance Modal
export default function AwardModal({ mode, open, setOpen, setAwardTitle, submitAward }) {
  const handleOnChange = e => {
    setAwardTitle(e.target.value);
  };

  return (
    <Modal
      containerClassName={styles.modal__container}
      title={mode === 'edit' ? 'Edit Award' : 'New Award'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText="Add Award"
      onCancel={() => setOpen(false)}
      onSubmit={submitAward}
    >
      <div className={styles.modal}>
        <div>
          <h2>Award Title*</h2>
          <Input className={styles.modal__entryId} placeholder="Title" onChange={handleOnChange} />
        </div>
        <div>
          <h2>Nominated Dance</h2>
          <h3>If the award is to be given to a performance enter their entry ID here:</h3>
          <Input className={styles.modal__entryId} placeholder="Entry ID" />
        </div>
        <div>
          <h2>Award Type*</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Award Type" />
        </div>
        <div>
          <h2>Nominated Dancer(s)</h2>
          <h3>If the award is to be given to a specific student enter their name here:</h3>
          <Input placeholder="names, names, names" />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
      </div>
    </Modal>
  );
}
