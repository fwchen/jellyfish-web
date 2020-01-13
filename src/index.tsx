import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import { setRequestAuth } from './helper/interceptor.helper';

import './index.css';

setRequestAuth();
ReactModal.setAppElement('#root')
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
