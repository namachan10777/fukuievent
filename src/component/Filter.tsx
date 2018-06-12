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
		category: string;
		city: string;
		eventPlace: string;
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
		this.state = {category, eventPlace, city};
	}
	generateFilter() {
		let category = this.state.category === '' ? None : Option(this.state.category);
		let eventPlace = this.state.eventPlace === '' ? None : Option(this.state.eventPlace);
		let city = this.state.city === '' ? None : Option(this.state.city);
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
	genChangeHandler(name: string) {
		switch(name) {
		case 'category':
			return (e: any) => this.setState({category: e.target.value});
		case 'eventPlace':
			return (e: any) => this.setState({eventPlace: e.target.value});
		case 'city':
			return (e: any) => this.setState({city: e.target.value});
		}
		return (e: any) => {};
	}
	render() {
		const {onClose, filter, open, ...other} = this.props;
		const classes = this.props.classes;
		let genMenuItems = (entries: string[]) =>
			entries.map((entry, i) => (<MenuItem value={entry} key={entry+i}>{entry}</MenuItem>));
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
								value={this.state.category}
								onChange={this.genChangeHandler('category')}
								input={<Input id='category' />}>
								<MenuItem value=''><em>全て</em></MenuItem>
								{genMenuItems(Store.categoryEntries)}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='city'>場所</InputLabel>
							<Select
								value={this.state.city}
								onChange={this.genChangeHandler('city')}
								input={<Input id='city' />}>
								<MenuItem value=''><em>全て</em></MenuItem>
								{genMenuItems(Store.cityEntries)}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='eventPlace'>場所</InputLabel>
							<Select
								value={this.state.eventPlace}
								onChange={this.genChangeHandler('eventPlace')}
								input={<Input id='eventPlace' />}>
								<MenuItem value=''><em>全て</em></MenuItem>
								{genMenuItems(Store.eventPlaceEntries)}
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
