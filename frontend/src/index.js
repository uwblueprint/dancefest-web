// React imports
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Global imports
import 'styles/global.css';

// Navigation
import HandleNavigation from 'routes';
import Modal from 'components/Modal';
import DatePicker from 'components/DatePicker';
import Input from 'components/Input';
import Title from 'components/Title';
import Button from 'components/Button';
import { ReactComponent as Calendar } from 'assets/calendar.svg';
// React application
function App() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <div className="App">
      <HandleNavigation />
      <div style={{ marginLeft: '64px' }}>
        <Modal open={open} onCancel={() => setOpen(false)}>
          <Input name="random input" placeholder="hello" />
        </Modal>
        <br></br>
        <button onClick={() => setOpen(true)}>open modal</button>
        <br></br>
        <br></br>
        <DatePicker date={date} setDate={setDate} />
        <Title>Title</Title>
        <Input placeholder="Input" icon={Calendar} />
        <br />
        <Button variant="outlined">Outlined</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="edit" />
      </div>
    </div>
  );
}

// Render React application
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
