import React from 'react';
import './App.css';
import Chart from './Chart';
import Map from './Map';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Chart />
        </div>
      </header>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 450,
          maxWidth: 600,
          left: 'calc(50% - 300px)',
        }}
      >
        <Map />
      </div>
    </div>
  );
};

export default App;
