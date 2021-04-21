import React, { useState, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import axios from 'axios'; // axios
import Event from '@containers/Event'; // Event state

import Input from '@components/Input'; // Input
import Modal from '@components/Modal'; // Modal
import Dropdown, { formatDropdownOptions } from '@components/Dropdown'; // Dropdown
import styles from '@styles/components/performances/PerformanceModal.module.scss'; // Component styles

import useSnackbar from '@utils/useSnackbar'; // Snackbar
import { formatSchools } from '@utils/schools'; // Format schools util

export default function EditPerformanceModal({
  open,
  setOpen,
  loading,
  setLoading,
  getPerformance,
  performance,
}) {
  const { snackbarError } = useSnackbar();
  const [event] = Event.useContainer();

  const [danceTitle, setDanceTitle] = useState('');
  const [dancersString, setDancersString] = useState('');
  const [choreographersString, setChoreographersString] = useState('');
  const [performanceLink, setPerformanceLink] = useState('');
  const [school, setSchool] = useState(null);
  const [competitionLevel, setCompetitionLevel] = useState(null);
  const [danceStyle, setDanceStyle] = useState(null);
  const [danceSize, setDanceSize] = useState(null);

  // Dropdown options
  const [schoolDropdownOptions, setSchoolDropdownOptions] = useState([]);
  const [performanceLevelDropdownOptions, setPerformanceLevelDropdownOptions] = useState([]);
  const [danceStyleDropdownOptions, setDanceStyleDropdownOptions] = useState([]);
  const [danceSizeDropdownOptions, setDanceSizeDropdownOptions] = useState([]);

  const fieldsMissing = !danceTitle || !school || !competitionLevel || !danceStyle || !danceSize;

  const getFilters = async () => {
    setLoading(true);

    const getSchools = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: '/api/schools/collect',
        });
        const schools = formatSchools(response.data);

        // Modal dropdown options
        setSchoolDropdownOptions(
          formatDropdownOptions(schools, {
            value: 'id',
            label: 'schoolName',
          })
        );
      } catch (err) {
        snackbarError(err);
      }
    };

    const getSettings = async () => {
      const response = await axios({
        method: 'GET',
        url: '/api/settings/collect',
      });
      const settings = response.data;

      const performanceLevelSettings = settings.filter(
        setting => setting.type === 'COMPETITION_LEVEL'
      );
      const danceStyleSettings = settings.filter(setting => setting.type === 'STYLE');
      const danceSizeSettings = settings.filter(setting => setting.type === 'DANCE_SIZE');

      // Set the label of each dropdown option to the `value` field of each setting (the setting name in the DB)
      // Set the selected value (which is sent to API upon save) to the `id` field of each setting (the setting id in the DB)
      // upon clicking a dropdown option
      const formatOptionsFields = {
        value: 'id',
        label: 'value',
      };

      // Modal dropdown options
      setPerformanceLevelDropdownOptions(
        formatDropdownOptions(performanceLevelSettings, formatOptionsFields)
      );
      setDanceStyleDropdownOptions(formatDropdownOptions(danceStyleSettings, formatOptionsFields));
      setDanceSizeDropdownOptions(formatDropdownOptions(danceSizeSettings, formatOptionsFields));
    };

    await getSchools();
    await getSettings();

    setLoading(false);
  };

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

  const updatePerformance = async () => {
    const { id } = performance;
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
          performanceLink,
          competitionLevel: competitionLevel.label,
          competitionLevelID: competitionLevel.value,
          danceSize: danceSize.label,
          danceSizeID: danceSize.value,
          danceStyle: danceStyle.label,
          danceStyleID: danceStyle.value,
          danceTitle,
          eventID: event.id,
          schoolID: school.value,
        },
      });

      getPerformance();
    } catch (err) {
      snackbarError(err);
    }

    setLoading(false);
    setOpen(false);
    clearFields();
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    if (performance) {
      const {
        danceTitle,
        performers,
        choreographers,
        performanceLink,
        schoolName,
        schoolId,
        performanceLevel,
        performanceLevelID,
        danceStyle,
        danceStyleID,
        danceSize,
        danceSizeID,
      } = performance;
      setDanceTitle(danceTitle);
      setPerformanceLink(performanceLink);
      setDancersString(performers.join(', '));
      setChoreographersString(choreographers.join(', '));
      setSchool({ label: schoolName, value: schoolId });
      setCompetitionLevel({ label: performanceLevel, value: performanceLevelID });
      setDanceStyle({ label: danceStyle, value: danceStyleID });
      setDanceSize({ label: danceSize, value: danceSizeID });
    }
  }, [performance]);

  return (
    <Modal
      containerClassName={styles.modal__container}
      title={'Edit Performance'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText={'Edit Performance'}
      onCancel={onCancel}
      onSubmit={updatePerformance}
      disableSubmitButton={loading || fieldsMissing}
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
          <h2>Performance link</h2>
          <Input
            placeholder="Performance Link"
            value={performanceLink}
            onChange={event => setPerformanceLink(event.target.value)}
          />
        </div>
        <div>
          <h2>School</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="School"
            options={schoolDropdownOptions}
            selected={school}
            onChange={school => setSchool(school)}
          />
        </div>
        <div>
          <h2>Competition Level</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Level"
            options={performanceLevelDropdownOptions}
            selected={competitionLevel}
            onChange={competitionLevel => setCompetitionLevel(competitionLevel)}
          />
        </div>
        <div>
          <h2>Style</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Style"
            options={danceStyleDropdownOptions}
            selected={danceStyle}
            onChange={danceStyle => setDanceStyle(danceStyle)}
          />
        </div>
        <div>
          <h2>Size</h2>
          <Dropdown
            className={styles.modal__dropdown}
            placeholder="Size"
            options={danceSizeDropdownOptions}
            selected={danceSize}
            onChange={danceSize => setDanceSize(danceSize)}
          />
        </div>
      </div>
    </Modal>
  );
}

EditPerformanceModal.propTypes = {
  addPerformance: PropTypes.func,
  getPerformance: PropTypes.func,
  open: PropTypes.any,
  performance: PropTypes.shape({
    choreographers: PropTypes.shape({
      join: PropTypes.func,
    }),
    competition_level: PropTypes.any,
    danceSize: PropTypes.any,
    danceSizeID: PropTypes.any,
    danceStyle: PropTypes.any,
    danceStyleID: PropTypes.any,
    danceTitle: PropTypes.any,
    dance_size: PropTypes.any,
    dance_style: PropTypes.any,
    dance_title: PropTypes.any,
    id: PropTypes.any,
    performanceLevel: PropTypes.any,
    performanceLevelID: PropTypes.any,
    performers: PropTypes.shape({
      join: PropTypes.func,
    }),
    schoolId: PropTypes.any,
    schoolName: PropTypes.any,
    school_id: PropTypes.any,
  }),
  setLoading: PropTypes.func,
  setOpen: PropTypes.func,
};
