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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';

import SearchBar from 'material-ui-search-bar';

import * as Store from '../store';
import * as Action from '../actions';
import * as AppModule from '../module/app';

export interface EventCardProps {
	dstyle: Store.DisplayStyle;
	isZoom: boolean;
	info: Store.EventInfo;
}

const styles = {
	cardx10: {
		margin: 3,
		height: '45vh'
	},
	cardx30: {
		margin: 3,
		height: '18vh'
	}
};

type ClassNames = keyof typeof styles;

const EventCardComponent = withStyles(styles)<EventCardProps>(
	(props: EventCardProps & WithStyles<ClassNames>) => {
		const {classes} = props;
		let cardStyle = props.dstyle == Store.DisplayStyle.X10 ? classes.cardx10 : classes.cardx30;
		return (
			<div>
				<Card className={cardStyle}>
					<CardContent>
					</CardContent>
					<CardActions>
					</CardActions>
				</Card>
			</div>
		);
	}
);

export default ReactRedux.connect(
	(state: Store.State) => ({
		dstyle: state.dstyle, 
		isZoom: !state.zoom.isEmpty
	}),
	(dispatch: Redux.Dispatch<Action.T>) => ({})
)(EventCardComponent);
