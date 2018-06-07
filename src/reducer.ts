import { createStore, combineReducers } from 'redux';
import { State, initialState } from './store';
import * as Action from './actions';
import { reducer } from './module/app';

export const store = createStore(reducer, initialState);
