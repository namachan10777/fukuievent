import * as Redux from 'redux';
import * as AppModule from './module/app';

export enum Names {
	CHANGE_DISPLAY_STYLE = 'JIGJPINTERN_CHANGE_DISPLAY_STYLE',
	PREV_PAGE = 'JIGJPINTERN_PREV_PAGE',
	BACK_PAGE = 'JIGJPINTERN_BACK_PAGE',
	CHANGE_FILTER = 'JIGJPINTERN_CHANGE_FILTER',
	OPEN_CARD = 'JIGJPINTERN_OPEN_CARD'
}

export type T =
	AppModule.ChangeDisplayStyleAction
	| AppModule.PrevPageAction
	| AppModule.BackPageAction
	| AppModule.ChangeFilterAction
	| AppModule.OpenCardAction
