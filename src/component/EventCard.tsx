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
		height: '43vh',
	
	},
	namex10: {
		fontSize: 18
	},
	categoryx10: {
		fontSize: 14
	},
	event_placex10: {
		fontSize: 14
	},
	cityx10: {
		fontSize: 12
	},
	cardx30: {
		margin: 3,
		height: '16.5vh'
	},
	namex30: {
		fontSize: 13
	},
	categoryx30: {
		fontSize: 10
	}
};

type ClassNames = keyof typeof styles;

const EventCardComponent = withStyles(styles)<EventCardProps>(
	(props: EventCardProps & WithStyles<ClassNames>) => {
		const {classes} = props;
		let cardStyle = props.dstyle == Store.DisplayStyle.X10 ? classes.cardx10 : classes.cardx30;
		console.log(props.info);
		if (props.dstyle == Store.DisplayStyle.X10) {
			return (
				<div>
					<Card className={cardStyle}>
						<CardContent>
							<Typography className={classes.namex10}>
								{props.info.name}
							</Typography>
							<Typography className={classes.categoryx10} color='textSecondary'>
								{props.info.category}
							</Typography>
							<Typography className={classes.event_placex10}>
								{props.info.event_place}
							</Typography>
							<Typography className={classes.cityx10}>
								{props.info.city}
							</Typography>
						</CardContent>
					</Card>
				</div>
			);
		}
		else {
			return (
				<div>
					<Card className={cardStyle}>
						<CardContent>
							<Typography className={classes.namex30}>
								{props.info.name}
							</Typography>
							<Typography className={classes.categoryx30} color='textSecondary'>
								{props.info.category}
							</Typography>
						</CardContent>
					</Card>
				</div>
			);		
		}
	}
);

export default ReactRedux.connect(
	(state: Store.State) => ({
		dstyle: state.dstyle, 
		isZoom: !state.zoom.isEmpty
	}),
	(dispatch: Redux.Dispatch<Action.T>) => ({})
)(EventCardComponent);
