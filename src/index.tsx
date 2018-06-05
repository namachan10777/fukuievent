import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

import * as Reducer from './reducer';

ReactDOM.render(
	<Provider store={Reducer.store}>
		Hello React!
	</Provider>,
	document.getElementById('root')
);
