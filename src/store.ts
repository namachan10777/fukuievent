import { Option, None } from 'monapt';

export enum DisplayStyle {
	X10 = 10,
	X30 = 30,
	All = Number.MAX_VALUE
}

export type Pos = {
	latitude: number,
	longitude: number
}

export type Period = {
	start: Date,
	end: Date
}

export class EventInfo {
	name: string;
	category: string;
	period: Period;
	description: string;
	schedule_description: string;
	contact: string;
	contact_phone_number: string;
	event_place: string;
	position: Pos;
	city: string;
	id: number;

	constructor (raw: any, id: number) {
		this.id = id;

		this.name = raw.event_name;
		this.category = raw.category;
		this.description = raw.description;
		this.schedule_description = raw.description;
		this.contact = raw.contact;
		this.contact_phone_number = raw.contact_phone_number;
		this.event_place = raw.event_place;
		this.city = raw.city;

		let start = new Date(raw.start_date);
		let end   = new Date(raw.end_date);
		this.period = {start, end};

		let latitude = Number(raw.latitude);
		let longitude = Number(raw.longitude);
		this.position = {latitude, longitude};
	}
}

export enum TokenType {
	Decorated,
	Plain
}

export type Token = {
	tokenType: TokenType;
	text: string;
}

export class CardSrc {
	id: number;
	available: boolean;
	title: Token[];
	category: Token[];
	description: Token[];
	scheduleDescription: Token[];
	contact: Token[];
	phoneNumber: Token[];
	eventPlace: Token[];
	originalEventPlace: string;
	city: Token[];
	position: Pos;

	private decorate (origin: string, keyword: string) {
		let i = 0;
		let result = new Array<Token>(0);
		for (;;) {
			let idx = origin.indexOf(keyword, i);
			if (idx == -1) break;
			else {
				result.push({tokenType: TokenType.Plain, text: origin.slice(i, idx)});
				result.push({tokenType: TokenType.Decorated, text: origin.slice(idx, idx+keyword.length)});
				i = idx + keyword.length;
				this.available = true;
			}
		}
		result.push({tokenType: TokenType.Plain, text: origin.slice(i)});
		return result;
	}

	constructor(info: EventInfo, keyword: string) {
		this.originalEventPlace = info.event_place;
		this.id = info.id;
		if (keyword == '') {
			this.available = true;
			this.title = [{tokenType: TokenType.Plain, text:info.name}];
			this.category = [{tokenType: TokenType.Plain, text:info.category}];
			this.description = [{tokenType: TokenType.Plain, text:info.description}];
			this.scheduleDescription = [{tokenType: TokenType.Plain, text:info.schedule_description}];
			this.contact = [{tokenType: TokenType.Plain, text:info.contact}];
			this.phoneNumber = [{tokenType: TokenType.Plain, text:info.contact_phone_number}];
			this.eventPlace = [{tokenType: TokenType.Plain, text:info.event_place}];
			this.city = [{tokenType: TokenType.Plain, text:info.city}];
		}
		else {
			this.available = false;
			this.title = this.decorate(info.name, keyword);
			this.category = this.decorate(info.category, keyword);
			this.description = this.decorate(info.description, keyword);
			this.scheduleDescription = this.decorate(info.schedule_description, keyword);
			this.contact = this.decorate(info.contact, keyword);
			this.phoneNumber = this.decorate(info.contact_phone_number, keyword);
			this.eventPlace = this.decorate(info.event_place, keyword);
			this.city = this.decorate(info.city, keyword);
		}
	}
}

export type Filter = {
	category: Option<string>;
	eventPlace: Option<string>;
	city: Option<string>;
}

export type State = {
	dialogOpen: boolean,
	dstyle: DisplayStyle,
	page: number,
	keyword: string,
	filter: Filter,
	infos: EventInfo[],
	available: CardSrc[]
}

function enumerateCategoly (infos: EventInfo[]) {
	return infos
		.map(info => info.category)
		.filter((x, i, self) => self.indexOf(x) === i);
}

function enumerateEventPlace (infos: EventInfo[]) {
	return infos
		.map(info => info.event_place)
		.filter((x, i, self) => self.indexOf(x) === i);
}

function enumerateCity (infos: EventInfo[]) {
	return infos
		.map(info => info.city)
		.filter((x, i, self) => self.indexOf(x) === i);
}

const json_file = JSON.parse(require('raw-loader!../data/fukui-event.txt'));
const infos: EventInfo[] = json_file.map((member: any, i: number) => new EventInfo(member, i));

function initializeState (json: any) {
	return ({
		dialogOpen: false,
		dstyle: DisplayStyle.X10,
		page: 0,
		keyword: '',
		filter: { category: None, eventPlace: None, city: None},
		infos: infos,
		available: infos.map(info => new CardSrc(info, ''))
	});
}

export const initialState = initializeState(json_file);
export const categoryEntries = enumerateCategoly(infos);
export const eventPlaceEntries = enumerateEventPlace(infos);
export const cityEntries = enumerateCity(infos);
