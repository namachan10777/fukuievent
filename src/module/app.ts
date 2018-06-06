import * as Redux from 'redux';
import * as Action from '../actions';
import * as Store from '../store';

export interface ChangeDisplayStyleAction extends Redux.Action {
	type: Action.Names.CHANGE_DISPLAY_STYLE;
	payload: {
		style: Store.DisplayStyle;
	}
}

export interface PrevPageAction extends Redux.Action {
	type: Action.Names.PREV_PAGE;
}

export interface BackPageAction extends Redux.Action {
	type: Action.Names.BACK_PAGE;
}

export interface ChangeFilterAction extends Redux.Action {
	type: Action.Names.CHANGE_FILTER;
	payload: {
		filter: Store.Filter;
	}
}

export interface OpenCardAction extends Redux.Action {
	type: Action.Names.OPEN_CARD;
	payload: {
		eventId: number;
	}
}
