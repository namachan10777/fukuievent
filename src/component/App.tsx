import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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

const theme = createMuiTheme ({
	palette: {
		primary: {
			light: '#C8E6C9',
			main: '#4CAF50',
			dark: '#388E3C',
			contrastText: '#FFFFFF'
		},
		secondary: {
			light: '#FFCCBC',
			main: '#FF5722',
			dark: '#E64A19',
			contrastText: '#FFFFFF'
		}
	}
});

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
			let appbar = (<AppBar position='fixed'>
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
			let appbar = (<AppBar position='fixed'>
				<Toolbar>
					<IconButton className={classes.leftButton} color='inherit' aria-label='Menu'><LeftIcon/></IconButton>
					<IconButton className={classes.rightButton} color='inherit' aria-label='Menu'><RightIcon/></IconButton>
					<Input id='search' />
					<Button color='inherit' onClick={() => props.changeDStyle(Store.DisplayStyle.X10)}>x10</Button>
					<Button color='inherit' onClick={() => props.changeDStyle(Store.DisplayStyle.X30)}>x30</Button>
					<Button color='inherit' onClick={() => props.changeDStyle(Store.DisplayStyle.All)}>All</Button>
				</Toolbar>
			</AppBar>);
			let begin = props.state.dstyle * props.state.page;
			let end   = begin + props.state.dstyle;
			let tbl = props
					.state
					.infos
					.slice(begin, end)
					.map(info => (<EventCard info={info} key={info.id} />));
			return (
				<MuiThemeProvider theme={theme}>
					{appbar}
					<div className='cards'>
						{tbl}
					</div>
				</MuiThemeProvider>
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
