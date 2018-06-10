import * as Redux from 'redux';
import * as Action from '../actions';
import * as Store from '../store';
import * as Util from '../util';

export interface ChangeDisplayStyleAction extends Redux.Action {
	type: Action.Names.CHANGE_DISPLAY_STYLE;
	payload: {
		style: Store.DisplayStyle;
	}
}
export function changeDisplayStyle (style: Store.DisplayStyle): ChangeDisplayStyleAction {
	return ({
		type: Action.Names.CHANGE_DISPLAY_STYLE,
		payload: {
			style
		}
	});
}

export interface PrevPageAction extends Redux.Action {
	type: Action.Names.PREV_PAGE;
}
export function prevPage(): PrevPageAction {
	return {type: Action.Names.PREV_PAGE};
}

export interface BackPageAction extends Redux.Action {
	type: Action.Names.BACK_PAGE;
}
export function backPage(): BackPageAction {
	return {type: Action.Names.BACK_PAGE};
}

export interface ChangeFilterAction extends Redux.Action {
	type: Action.Names.CHANGE_FILTER;
	payload: {
		filter: Store.Filter;
	}
}
export function changeFilter(filter: Store.Filter): ChangeFilterAction {
	return ({
		type: Action.Names.CHANGE_FILTER,
		payload: {
			filter,
		}
	});
}

export interface OpenFilterDialogAction extends Redux.Action {
	type: Action.Names.OPEN_FILTER_DIALOG;
}
export function openFilterDialog(): OpenFilterDialogAction {
	return {type: Action.Names.OPEN_FILTER_DIALOG};
}

export function reducer(state: Store.State = Store.initialState, action: Action.T) {
	switch(action.type) {
	case Action.Names.CHANGE_DISPLAY_STYLE:
		if (state.dstyle != action.payload.style) {
			return ({
				...state,
				dstyle: action.payload.style,
				page: 0
			});
		}
		return state;
	case Action.Names.PREV_PAGE:
		if (state.page < Util.calcTotalPage(state.available.length, state.dstyle)) {
			return ({
				...state,
				page: state.page+1
			});
		}
		return state;
	case Action.Names.BACK_PAGE:
		if (state.page > 0) {
			return ({
				...state,
				page: state.page-1
			});
		}
		return 	state;
	case Action.Names.CHANGE_FILTER:
		if (state.filter != action.payload.filter) {
			return {
				...state,
				filter: action.payload.filter,
				dialogOpen: false
			};
		}
		else {
			return {
				...state,
				dialogOpen: false
			};
		}
	case Action.Names.OPEN_FILTER_DIALOG:
		return {
			...state,
			dialogOpen: true
		};
	}
	return state;
}
