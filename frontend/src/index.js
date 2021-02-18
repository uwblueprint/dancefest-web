// React imports
import React from 'react';
import ReactDOM from 'react-dom';

// Global imports
import 'styles/global.css';

// Navigation
import HandleNavigation from 'routes';

// React application
function App() {
  return (
    <div className="App">
      <HandleNavigation />
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
