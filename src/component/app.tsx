import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Input from '@material-ui/core/Input';

import SearchBar from 'material-ui-search-bar';

import * as Store from '../store';
import * as Action from '../actions';
import * as AppModule from '../module/app';

export interface AppProps {
	state: Store.State;
}

const styles = {
	leftButton: {},
	rightButton: {}
};

type ClassNames = keyof typeof styles;

const AppComponent = withStyles(styles)<AppProps>(
	(props: AppProps & WithStyles<ClassNames>) => {
		const classes = props.classes;
		if (!props.state.zoom.isEmpty) {
			return (<div>Full</div>);
		}
		else {
			let appbar = (<AppBar position='static'>
				<Toolbar>
					<IconButton className={classes.leftButton} color='inherit' aria-label='Menu'><LeftIcon/></IconButton>
					<IconButton className={classes.rightButton} color='inherit' aria-label='Menu'><RightIcon/></IconButton>
					<Input id='search' />
				</Toolbar>
			</AppBar>);
			return (
				<div>
					{appbar}
				</div>
			);
		}
	}
);

export default ReactRedux.connect(
	(state: Store.State) => ({state}),
	(dispatch: Redux.Dispatch<Action.T>) => ({
	})
)(AppComponent);
