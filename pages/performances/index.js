import React, { useState } from 'react'; // React
import Layout from '@components/Layout'; // Layout wrapper

import Button from '@components/Button'; // Button
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import Modal from '@components/Modal'; // Modal
import Dropdown from '@components/Dropdown'; // Dropdown
import FilterDropdown from '@components/FilterDropdown'; // Filter Dropdown
import Table from '@components/Table'; // Table
import styles from '@styles/pages/Performances.module.scss'; // Page styles

// Temp constants
import data, { columns } from '../../data/mockParticipants';

// Page: Performances
export default function Performances() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  // const entryContent = <Table></Table>;

  return (
    <Layout>
      <div>
        <div className={styles.performances__navigation}>
          <Button className={styles.performances__navigation__button} variant="outlined">
            <img src="/vectors/back-arrow.svg" />
            Back to Events
          </Button>
          <h2 className={styles.performances__navigation__eventName}>
            {`OSSDF2021- Let's Dis-dance`}
          </h2>
        </div>
        <div className={styles.performances__header}>
          <Title className={styles.performances__header__pageTitle}>Performances</Title>
          <Input
            className={styles.performances__header__search}
            placeholder="Search"
            icon={() => <img src="/vectors/search.svg" />}
          />
          <Button
            className={`${styles.performances__header__filtersButton} ${
              showFilters && styles.performances__header__filtersButtonOpen
            }`}
            variant={showFilters ? 'contained' : 'outlined'}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
            <img
              src={showFilters ? '/vectors/chevron-down.svg' : '/vectors/chevron-down-grey.svg'}
            />
          </Button>
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Add Performance
          </Button>
        </div>
        {showFilters && (
          <div className={styles.performances__filters}>
            <div className={styles.performances__filters__buttons}>
              <FilterDropdown buttonText="School" />
              <FilterDropdown buttonText="Academic Level" />
              <FilterDropdown buttonText="Competition Level" />
              <FilterDropdown buttonText="Style" />
              <FilterDropdown buttonText="Size" />
            </div>
            <div className={styles.performances__filters__appliedFilters}>applied filters</div>
          </div>
        )}
        <div className={styles.performances__content}>
          <Tabs
            firstTabName="Entry View"
            secondTabName="Judging View"
            firstTabContent={<EntryTable />}
            secondTabContent={<JudgingTable />}
          />
        </div>
      </div>
      <PerformanceModal mode="new" open={modalOpen} setOpen={setModalOpen} />
    </Layout>
  );
}

// Entries Table
const EntryTable = () => {
  return <Table columns={columns} data={data} />;
};

// Judging Table
const JudgingTable = () => {
  return <Table columns={columns} data={[]} />;
};

// New Performance Modal
const PerformanceModal = ({ mode, open, setOpen }) => {
  return (
    <Modal
      containerClassName={styles.modal__container}
      title={mode === 'edit' ? 'Edit Performance' : 'New Performance'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText="Add Performance"
      onCancel={() => setOpen(false)}
    >
      <div className={styles.modal}>
        <div>
          <h2>Entry ID</h2>
          <Input className={styles.modal__entryId} placeholder="##" />
        </div>
        <div>
          <h2>Dance Title</h2>
          <Input placeholder="Title" />
        </div>
        <div>
          <h2>Dancer(s)</h2>
          <Input placeholder="names, names, names" />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
        <div>
          <h2>Choreographer(s)</h2>
          <Input placeholder="names, names" />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
        <div>
          <h2>School</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="School" />
        </div>
        <div>
          <h2>Competition Level</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Level" />
        </div>
        <div>
          <h2>Style</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Style" />
        </div>
        <div>
          <h2>Size</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Size" />
        </div>
      </div>
    </Modal>
  );
};
