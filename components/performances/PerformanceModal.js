import React, { useState, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import axios from 'axios'; // axios

import Input from '@components/Input'; // Input
import Modal from '@components/Modal'; // Modal
import Dropdown from '@components/Dropdown'; // Dropdown
import styles from '@styles/components/performances/PerformanceModal.module.scss'; // Component styles

const EVENT_ID = 1; // Temp event id

export default function PerformanceModal({
  open,
  setOpen,
  setLoading,
  getPerformances,
  addPerformance,
  schoolOptions,
  performanceLevelOptions,
  danceStyleOptions,
  danceSizeOptions,
  performanceToEdit = null,
  setPerformanceToEdit,
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
    setPerformanceToEdit(null);
    setOpen(false);
    clearFields();
  };

  const onSubmit = async () => {
    await addPerformance({
      danceTitle,
      dancersString,
      choreographersString,
      school: school.value,
      competitionLevel: competitionLevel.value,
      danceStyle: danceStyle.value,
      danceSize: danceSize.value,
    });

    setPerformanceToEdit(null);
    setOpen(false);
    clearFields();
  };

  const updatePerformance = async () => {
    const { id } = performanceToEdit;
    setLoading(true);

    try {
      await axios({
        method: 'PUT',
        url: '/api/performances/edit',
        data: {
          id,
          name: danceTitle,
          performers: dancersString.split(',').map(dancer => dancer.trim()),
          choreographers: choreographersString
            .split(',')
            .map(choreographer => choreographer.trim()),
          competitionLevel: competitionLevel.value,
          danceSize: danceSize.value,
          danceStyle: danceStyle.value,
          danceTitle,
          eventID: EVENT_ID,
          schoolID: school.value,
        },
      });

      getPerformances();
    } catch {
      // Empty catch block
    }

    setLoading(false);
    setPerformanceToEdit(null);
    setOpen(false);
    clearFields();
  };

  useEffect(() => {
    if (performanceToEdit) {
      const {
        danceTitle,
        performers,
        choreographers,
        schoolName,
        schoolId,
        performanceLevel,
        danceStyle,
        danceSize,
      } = performanceToEdit;
      setDanceTitle(danceTitle);
      setDancersString(performers.join(', '));
      setChoreographersString(choreographers.join(', '));
      setSchool({ label: schoolName, value: schoolId });
      setCompetitionLevel({ label: performanceLevel, value: performanceLevel });
      setDanceStyle({ label: danceStyle, value: danceStyle });
      setDanceSize({ label: danceSize, value: danceSize });
    } else {
      clearFields();
    }
  }, [performanceToEdit]);

  return (
    <Modal
      containerClassName={styles.modal__container}
      title={performanceToEdit !== null ? 'Edit Performance' : 'New Performance'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText={performanceToEdit !== null ? 'Edit Performance' : 'Add Performance'}
      onCancel={onCancel}
      onSubmit={performanceToEdit !== null ? updatePerformance : onSubmit}
    >
      <div className={styles.modal}>
        <div>
          <h2>Entry ID</h2>
          <Input className={styles.modal__entryId} placeholder="##" disabled />
        </div>
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

PerformanceModal.propTypes = {
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
  setPerformanceToEdit: PropTypes.func,
};
