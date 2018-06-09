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
	info: Store.EventInfo;
}

const styles = {
	title: {
		fontSize: 18,
		marginBottom: '2vh'
	},
	categoly: {
		fontSize: 12,
		marginBottom: '2vh'
	},
	eventPlace: {
		fontSize: 14,
		marginBottom: '2vh'
	},
	city: {
		fontSize: 15,
		marginBottom: '2vh'
	},
	description: {
		fontSize: 14,
		marginBottom: '2vh'
	},
	schedule_description: {
		fontSize: 14,
		marginBottom: '2vh'
	},
	phoneNumber: {
		color: '#C2185B',
		marginBottom: '2vh'
	},
	openInMap: {
		marginRight: 0,
	},
	openInMapContainer: {
		marginRight: 0,
	}
};

type ClassNames = keyof typeof styles;

const EventCardComponent = withStyles(styles)<EventCardProps>(
	(props: EventCardProps & WithStyles<ClassNames>) => {
		const {classes} = props;
		let googleMapUrl =
			'https://maps.google.co.jp/maps?q='
			+ props.info.event_place
			//+ props.info.position.latitude
			//+ ','
			//+ props.info.position.longitude;
		return (
			<Card className='card'>
				<CardContent>
					<Typography className={classes.title}>
						{props.info.name}
					</Typography>
					<Typography className={classes.categoly} color='textSecondary'>
						{props.info.category}
					</Typography>
					<Typography className={classes.description}>
						{props.info.description}
					</Typography>
					<Typography className={classes.schedule_description}>
						{props.info.schedule_description}
					</Typography>
					<Typography className={classes.phoneNumber}>
						{props.info.contact_phone_number}
					</Typography>
					<Typography className={classes.city}>
						{props.info.city}
					</Typography>
					<Typography className={classes.eventPlace}>
						{props.info.event_place}
					</Typography>
					<Button color='primary'href={googleMapUrl}>
						地図で開く
					</Button>
				</CardContent>
			</Card>
		);
	}
);

export default ReactRedux.connect(
	(state: Store.State) => ({
		dstyle: state.dstyle, 
	}),
	(dispatch: Redux.Dispatch<Action.T>) => ({})
)(EventCardComponent);
