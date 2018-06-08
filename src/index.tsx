import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

import * as Reducer from './reducer';

import App from './component/App';

ReactDOM.render(
	<Provider store={Reducer.store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
