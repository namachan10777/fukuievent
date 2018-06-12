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
	src: Store.CardSrc;
}

const styles = {
	title: {
		fontSize: 18,
		marginBottom: '2vh'
	},
	categoly: {
		fontSize: 13,
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
	},
	annot: {
		fontSize: 13,
		marginRight: '1vw',
		color: '#757575'
	}
};

type ClassNames = keyof typeof styles;

const EventCardComponent = withStyles(styles)<EventCardProps>(
	(props: EventCardProps & WithStyles<ClassNames>) => {
		const {classes} = props;
		let googleMapUrl =
			'https://maps.google.co.jp/maps?q='
			+ props.src.originalEventPlace;
			//+ props.info.position.latitude
			//+ ','
			//+ props.info.position.longitude;
		let decorate = (src: Store.Token[]) =>
			src.map((tkn, i) =>
				tkn.tokenType == Store.TokenType.Plain ?
					(<span key={tkn.text+i}>{tkn.text}</span>) :
					(<span className='highlighted-keyword' key={tkn.text+i}>{tkn.text}</span>));
		return (
			<Card className='card'>
				<CardContent>
					<Typography className={classes.title}>
						{decorate(props.src.title)}
					</Typography>
					<Typography className={classes.categoly} color='textSecondary'>
						{decorate(props.src.category)}
					</Typography>
					<Typography className={classes.description}>
						{decorate(props.src.description)}
					</Typography>
					<Typography className={classes.schedule_description}>
						{decorate(props.src.scheduleDescription)}
					</Typography>
					<Typography className={classes.phoneNumber}>
						<span className={classes.annot}>電話番号</span>{decorate(props.src.phoneNumber)}
					</Typography>
					<Typography className={classes.city}>
						<span className={classes.annot}>地域</span>{decorate(props.src.city)}
					</Typography>
					<Typography className={classes.eventPlace}>
						<span className={classes.annot}>場所</span>{decorate(props.src.eventPlace)}
					</Typography>
					<Button color='primary' href={googleMapUrl} target='_blank'>
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
