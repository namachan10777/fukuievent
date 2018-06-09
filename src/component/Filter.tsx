import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import * as Store from '../store';
import * as Action from '../actions';
import * as AppModule from '../module/app';

interface FilterDialogProps {
	filter: Store.Filter;
	open: boolean;
	onClose: (filter: Store.Filter, open: boolean) => void;
}

class FilterDialogComponent extends React.Component<FilterDialogProps> {
	handleClose() {
		this.props.onClose(this.props.filter, false);
	}
	render() {
		const {onClose, filter, open, ...other} = this.props;
		return (
			<Dialog
				open={open}
				onClose={() => this.handleClose()}
				aria-labelledby='filter'
				{...other}>
				<DialogTitle id='filter-dialog-title'>
					絞り込み
				</DialogTitle>
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
		onClose: (filter: Store.Filter, open: boolean) => {
			dispatch(AppModule.changeFilter(filter, open));
		}
	})
)(FilterDialogComponent);
