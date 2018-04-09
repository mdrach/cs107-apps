import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "typeface-roboto";
import registerServiceWorker from './registerServiceWorker';

// import BitOperations from "./apps/bit_operations.js";
// import "./App.css";
// import 'react-select/dist/react-select.css';
// ReactDOM.render(<BitOperations />, document.getElementById('root'));
// registerServiceWorker();

import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
