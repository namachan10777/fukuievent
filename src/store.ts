import { Option, None } from 'monapt';

export enum DisplayStyle {
	Ten,
	Thirteen,
	All
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
	contact_phone_number: number;
	event_place: string;
	position: Pos;
	city: string;

	constructor (raw: any) {
		this.name = raw.name;
		this.category = raw.category;
		this.description = raw.description;
		this.schedule_description = raw.description;
		this.contact = raw.contact;
		this.contact_phone_number = raw.contact_phone_number.split('-').join();
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

export type Filter = {
	category: Option<string[]>;
}

export type State = {
	dstyle: DisplayStyle,
	page: number,
	search: Option<string>,
	filter: Filter,
	zoom: Option<EventInfo>,
	infos: EventInfo[],
}

function initializeState (json: any) {
	let infos = json.map((member: any) => new EventInfo(member));
	return ({
		dstyle: DisplayStyle.Ten,
		page: 0,
		search: None,
		filter: { category: Option([])},
		zoom: None,
		infos
	});
}

const json_file = JSON.parse(require('raw-loader!../data/fukui-event.txt'));

export const initialState = initializeState(json_file);
