import React, { useEffect, useState } from 'react'; // React

import Input from '@components/Input'; // Input
import Modal from '@components/Modal'; // Modal
import Dropdown from '@components/Dropdown'; // Dropdown
import styles from '@styles/components/awards/AwardModal.module.scss'; // Component styles

// Create/Edit Performance Modal
export default function AwardModal({
  mode,
  open,
  setOpen,
  danceSizeOptions,
  awardTypeOptions,
  performanceLevelOptions,
  danceStyleOptions,
  createAward,
  loading,
}) {
  const [awardTitle, setAwardTitle] = useState('');
  const [awardType, setAwardType] = useState(null);
  const [danceSize, setDanceSize] = useState(null);
  const [performanceLevel, setPerformanceLevel] = useState(null);
  const [danceStyle, setDanceStyle] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const handleOnChange = e => {
    setAwardTitle(e.target.value);
  };

  useEffect(() => {
    if (awardTitle !== '' && awardType !== null) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [awardTitle, awardType]);

  const discardChanges = () => {
    setAwardTitle('');
    setAwardType(null);
    setDanceSize(null);
    setPerformanceLevel(null);
    setDanceStyle(null);
    setDisableButton(true);
    setOpen(false);
  };

  const onSubmit = async () => {
    let sizeSelection = null;
    let perfLevelSelection = null;
    let styleSelection = null;
    if (danceSize !== null) sizeSelection = danceSize.value;
    if (performanceLevel !== null) perfLevelSelection = performanceLevel.value;
    if (danceStyle !== null) styleSelection = danceStyle.value;

    await createAward(
      awardTitle,
      awardType.value,
      sizeSelection,
      perfLevelSelection,
      styleSelection
    );
    discardChanges();
  };

  return (
    <Modal
      containerClassName={styles.modal__container}
      title={mode === 'edit' ? 'Edit Award' : 'New Award'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText={mode === 'edit' ? 'Confirm Edit' : 'Add Award'}
      onCancel={discardChanges}
      onSubmit={onSubmit}
      disableSubmitButton={loading || disableButton}
    >
      <div className={styles.modal}>
        <div>
          <h2>Award Title*</h2>
          <Input className={styles.modal__entryId} placeholder="Title" onChange={handleOnChange} />
        </div>
        <div>
          <h2>Award Type*</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Award Type"
            options={awardTypeOptions}
            onChange={type => setAwardType(type)}
          />
        </div>
        <div>
          <h2>Eligible dance categories</h2>
          <h3>
            Select categories that apply to the potential winners of this award. (Selecting no
            categories will mean that all performances are elligible for this award).
          </h3>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Dance Size"
            options={danceSizeOptions}
            onChange={size => setDanceSize(size)}
          />
        </div>
        <div>
          <h2>Performance Level*</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Performance Level"
            options={performanceLevelOptions}
            onChange={level => setPerformanceLevel(level)}
          />
        </div>
        <div>
          <h2>Dance Style*</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Dance Style"
            options={danceStyleOptions}
            onChange={style => setDanceStyle(style)}
          />
        </div>
      </div>
    </Modal>
  );
}
