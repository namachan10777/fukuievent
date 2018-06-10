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

export type Filter = {
	category: Option<string>;
}

export type State = {
	dialogOpen: boolean,
	dstyle: DisplayStyle,
	page: number,
	search: string,
	filter: Filter,
	infos: EventInfo[],
	available: EventInfo[]
}

function enumerateCategoly (infos: EventInfo[]) {
	return infos
		.map(info => info.category)
		.filter((x, i, self) => self.indexOf(x) === i);
}

const json_file = JSON.parse(require('raw-loader!../data/fukui-event.txt'));
const infos = json_file.map((member: any, i: number) => new EventInfo(member, i));

function initializeState (json: any) {
	return ({
		dialogOpen: false,
		dstyle: DisplayStyle.X10,
		page: 0,
		search: '',
		filter: { category: None},
		infos: infos,
		available: infos
	});
}

export const initialState = initializeState(json_file);
export const categoryEntries = enumerateCategoly(infos);
