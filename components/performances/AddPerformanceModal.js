import React, { useState } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import Input from '@components/Input'; // Input
import Modal from '@components/Modal'; // Modal
import Dropdown from '@components/Dropdown'; // Dropdown
import styles from '@styles/components/performances/PerformanceModal.module.scss'; // Component styles

export default function AddPerformanceModal({
  open,
  setOpen,
  addPerformance,
  schoolOptions,
  performanceLevelOptions,
  danceStyleOptions,
  danceSizeOptions,
}) {
  const [danceTitle, setDanceTitle] = useState('');
  const [dancersString, setDancersString] = useState('');
  const [choreographersString, setChoreographersString] = useState('');
  const [school, setSchool] = useState(null);
  const [competitionLevel, setCompetitionLevel] = useState(null);
  const [danceStyle, setDanceStyle] = useState(null);
  const [danceSize, setDanceSize] = useState(null);

  const clearFields = () => {
    setDanceTitle('');
    setDancersString('');
    setChoreographersString('');
    setSchool(null);
    setCompetitionLevel(null);
    setDanceStyle(null);
    setDanceSize(null);
  };

  const onCancel = () => {
    setOpen(false);
    clearFields();
  };

  const onSubmit = async () => {
    await addPerformance({
      danceTitle,
      dancersString,
      choreographersString,
      school: school.value,
      competitionLevel: competitionLevel.label,
      competitionLevelID: competitionLevel.value,
      danceStyle: danceStyle.label,
      danceStyleID: danceStyle.value,
      danceSize: danceSize.label,
      danceSizeID: danceSize.value,
    });

    setOpen(false);
    clearFields();
  };

  return (
    <Modal
      containerClassName={styles.modal__container}
      title={'New Performance'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText={'Add Performance'}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <div className={styles.modal}>
        <div>
          <h2>Dance Title</h2>
          <Input
            placeholder="Title"
            value={danceTitle}
            onChange={event => setDanceTitle(event.target.value)}
          />
        </div>
        <div>
          <h2>Dancer(s)</h2>
          <Input
            placeholder="names, names, names"
            value={dancersString}
            onChange={event => setDancersString(event.target.value)}
          />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
        <div>
          <h2>Choreographer(s)</h2>
          <Input
            placeholder="names, names"
            value={choreographersString}
            onChange={event => setChoreographersString(event.target.value)}
          />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
        <div>
          <h2>School</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="School"
            options={schoolOptions}
            selected={school}
            onChange={school => setSchool(school)}
          />
        </div>
        <div>
          <h2>Competition Level</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Level"
            options={performanceLevelOptions}
            selected={competitionLevel}
            onChange={competitionLevel => setCompetitionLevel(competitionLevel)}
          />
        </div>
        <div>
          <h2>Style</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Style"
            options={danceStyleOptions}
            selected={danceStyle}
            onChange={danceStyle => setDanceStyle(danceStyle)}
          />
        </div>
        <div>
          <h2>Size</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Size"
            options={danceSizeOptions}
            selected={danceSize}
            onChange={danceSize => setDanceSize(danceSize)}
          />
        </div>
      </div>
    </Modal>
  );
}

AddPerformanceModal.propTypes = {
  addPerformance: PropTypes.func,
  danceSizeOptions: PropTypes.any,
  danceStyleOptions: PropTypes.any,
  getPerformances: PropTypes.func,
  open: PropTypes.any,
  performanceLevelOptions: PropTypes.any,
  performanceToEdit: PropTypes.shape({
    choreographers: PropTypes.shape({
      join: PropTypes.func,
    }),
    competition_level: PropTypes.any,
    dance_size: PropTypes.any,
    dance_style: PropTypes.any,
    dance_title: PropTypes.any,
    id: PropTypes.any,
    performers: PropTypes.shape({
      join: PropTypes.func,
    }),
    school_id: PropTypes.any,
  }),
  schoolOptions: PropTypes.any,
  setLoading: PropTypes.func,
  setOpen: PropTypes.func,
};
