import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { Option, None } from 'monapt';

import * as Store from '../store';
import * as Action from '../actions';
import * as AppModule from '../module/app';

interface FilterDialogProps {
	filter: Store.Filter;
	open: boolean;
	onClose: (filter: Store.Filter) => void;
}

const styles = ({
	container: {
		display: 'flex',
		//flexWrap: 'wrap'
	},
	formControl: {
		margin: 3,
		minWidth: 120
	}
});

type ClassNames = keyof typeof styles;


class FilterDialogComponent extends React.Component<FilterDialogProps & WithStyles<ClassNames>> {
	state: {
		value: {
			category: string;
			city: string;
			eventPlace: string;
		},
		candidates: {
			category: string[];
			city: string[];
			eventPlace: string[];
		}
	}

	constructor(props: FilterDialogProps & WithStyles<ClassNames>) {
		super(props);
		let category = props.filter.category.match({
			Some: x => x,
			None: () => ''
		});
		let eventPlace = props.filter.eventPlace.match({
			Some: x => x,
			None: () => ''
		});
		let city = props.filter.city.match({
			Some: x => x,
			None: () => ''
		});
		let value = {category, eventPlace, city};

		let categoryCand = Store.solveFilters({
			category: None,
			city: props.filter.city,
			eventPlace: props.filter.eventPlace
		});
		let cityCand = Store.solveFilters({
			category: props.filter.category,
			city: None,
			eventPlace: None, 
		});
		let eventPlaceCand = Store.solveFilters({
			category: props.filter.category,
			city: props.filter.city,
			eventPlace: None 
		});
		let candidates = {
			category: categoryCand.categories,
			eventPlace: eventPlaceCand.eventPlacies,
			city: cityCand.cities
		};

		this.state = {
			value,
			candidates
		};
	}
	
	toOpt(str: string) {
		return str == '' ? None : Option(str);
	}

	generateFilter() {
		let category = this.toOpt(this.state.value.category);
		let eventPlace = this.toOpt(this.state.value.eventPlace);
		let city = this.toOpt(this.state.value.city);
		return {
			...this.props.filter,
			category,
			eventPlace,
			city
		};
	}
	handleOk() {
		this.props.onClose(this.generateFilter());
	}
	handleCancel() {
		this.props.onClose(this.props.filter);
	}
	// cityが変更されたときだけ、eventPlaceは強制的に変更される
	// cityはeventPlaceに拘束されないが、それ以外は互いに拘束される。
	handleCityChange(e: any) {
		// cityが変更されたのでeventPlaceを再計算
		// categoryは変更されない
		let city = this.toOpt(e.target.value);
		let cand = Store.solveFilters({category: this.toOpt(this.state.value.category), city, eventPlace: None});
		this.setState({
			value: {
				...this.state.value,
				city: e.target.value,
				eventPlace: ''
			},
			candidates: {
				...this.state.candidates,
				eventPlace: cand.eventPlacies,
				category: cand.categories
			}
		});
	}
	handleEventPlaceChange(e: any) {
		// eventPlaceが変更されたので、categoryを再計算
		// cityは変更されない
		let eventPlace = this.toOpt(e.target.value);
		let cand = Store.solveFilters({category: this.toOpt(this.state.value.category), city: this.toOpt(this.state.value.city), eventPlace});
		this.setState({
			value: {
				...this.state.value,
				eventPlace: e.target.value
			},
			candidates: {
				...this.state.candidates,
				category: cand.categories,
			}
		});
	}
	handleCategoryChange(e: any) {
		let category = this.toOpt(e.target.value);
		let cand = Store.solveFilters({category, city: this.toOpt(this.state.value.city), eventPlace: this.toOpt(this.state.value.eventPlace)});
		let cityCand = Store.solveFilters({category, city: None, eventPlace: this.toOpt(this.state.value.eventPlace)});
		this.setState({
			value: {
				...this.state.value,
				category: e.target.value
			},
			candidates: {
				...this.state.candidates,
				category: cand.categories,
				city: cityCand.cities
			}
		});
	}
	render() {
		const {onClose, filter, open, ...other} = this.props;
		const classes = this.props.classes;
		let genMenuItems = (entries: string[]) =>
			entries.map((entry, i) => (<MenuItem value={entry} key={entry+i}>{entry}</MenuItem>));
		console.log(this.state.candidates);
		return (
			<Dialog
				open={open}
				onClose={() => this.handleCancel()}
				disableBackdropClick
				disableEscapeKeyDown
				>
				<DialogTitle>
					絞り込み
				</DialogTitle>
				<DialogContent>
					<form className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='category'>カテゴリ</InputLabel>
							<Select
								value={this.state.value.category}
								onChange={(e: any) => this.handleCategoryChange(e)}
								input={<Input id='category' />}>
								<MenuItem value=''><em>全て</em></MenuItem>
								{genMenuItems(this.state.candidates.category)}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='city'>場所</InputLabel>
							<Select
								value={this.state.value.city}
								onChange={(e: any) => this.handleCityChange(e)}
								input={<Input id='city' />}>
								<MenuItem value=''><em>全て</em></MenuItem>
								{genMenuItems(this.state.candidates.city)}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='eventPlace'>場所</InputLabel>
							<Select
								value={this.state.value.eventPlace}
								onChange={(e: any) => this.handleEventPlaceChange(e)}
								input={<Input id='eventPlace' />}>
								<MenuItem value=''><em>全て</em></MenuItem>
								{genMenuItems(this.state.candidates.eventPlace)}
							</Select>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => this.handleCancel()} color='primary'>Cancel</Button>
					<Button onClick={() => this.handleOk()} color='primary'>Ok</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default ReactRedux.connect(
	(state: Store.State) => ({
		filter: state.filter,
		open: state.dialogOpen
	}),
	(dispatch: Redux.Dispatch<Action.T>) => ({
		onClose: (filter: Store.Filter) => {
			dispatch(AppModule.changeFilter(filter));
		}
	})
)(withStyles(styles)(FilterDialogComponent));
