import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import TodoList from './TodoList.js'


ReactDOM.render(<TodoList />, document.getElementById('root'));
registerServiceWorker();
