import { createStore, combineReducers } from 'redux';
import { State, initialState } from './store';
import * as Action from './actions';

function reducer (state: State = initialState, action: Action.T) {
	return state;
}

export const store = createStore(reducer, initialState);
