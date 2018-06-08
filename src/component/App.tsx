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
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';

import * as Store from '../store';
import * as Action from '../actions';
import * as AppModule from '../module/app';

import EventCard from './EventCard';

export interface AppProps {
	state: Store.State;
	changeDStyle: (style: Store.DisplayStyle) => void;
}

const styles = {
	leftButton: {},
	rightButton: {},
};

type ClassNames = keyof typeof styles;

const AppComponent = withStyles(styles)<AppProps>(
	(props: AppProps & WithStyles<ClassNames>) => {
		const classes = props.classes;
		if (!props.state.zoom.isEmpty) {
			let appbar = (<AppBar position='static'>
				<Toolbar>
					<Input id='search' />
					<IconButton className={classes.leftButton} color='inherit' aria-label='Close'><CloseIcon/></IconButton>
				</Toolbar>
			</AppBar>);
			return (
				<div>
					{appbar}
					<EventCard info={props.state.zoom.get()} />
				</div>
			);
		}
		else {
			let appbar = (<AppBar position='static'>
				<Toolbar>
					<IconButton className={classes.leftButton} color='inherit' aria-label='Menu'><LeftIcon/></IconButton>
					<IconButton className={classes.rightButton} color='inherit' aria-label='Menu'><RightIcon/></IconButton>
					<Input id='search' />
					<Button color='inherit' onClick={() => props.changeDStyle(Store.DisplayStyle.X10)}>x10</Button>
					<Button color='inherit' onClick={() => props.changeDStyle(Store.DisplayStyle.X30)}>x30</Button>
					<Button color='inherit' onClick={() => props.changeDStyle(Store.DisplayStyle.All)}>All</Button>
				</Toolbar>
			</AppBar>);
			let row_size, col_size;
			if (props.state.dstyle == Store.DisplayStyle.X10) {
				row_size = 2;
				col_size = 5;
			}
			else if (props.state.dstyle = Store.DisplayStyle.X30) {
				row_size = 5;
				col_size = 6;
			}
			else {
				col_size = 6;
				// 9  -> 2
				// 10 -> 2
				// 11 -> 3
				row_size = (props.state.infos.length-1)/6 + 1;
			}
			let begin = props.state.page * props.state.dstyle;
			let tbl = new Array<JSX.Element>(col_size);
			for (var i = 0; i < col_size; ++i) {
				let row = new Array<JSX.Element>(row_size);
				for (var j = 0; j < row_size; ++j) {
					let idx = begin * props.state.dstyle + row_size * i + j;
					if (idx < props.state.infos.length)
						row[j] = (<EventCard info={props.state.infos[idx]} key={idx} />);
				}
				tbl[i] = <div className='cards-row' key={i}>{row}</div>;
			}
			return (
				<div>
					{appbar}
					<div className='cards'>
						{tbl}
					</div>
				</div>
			);
		}
	}
);

export default ReactRedux.connect(
	(state: Store.State) => ({state}),
	(dispatch: Redux.Dispatch<Action.T>) => ({
		changeDStyle: (style: Store.DisplayStyle) => {
			dispatch(AppModule.changeDisplayStyle(style));
		}
	})
)(AppComponent);
