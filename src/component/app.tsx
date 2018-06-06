import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';

export interface AppProps {
}


const styles = {
};

type ClassNames = keyof typeof styles;

export const App = withStyles(styles)<AppProps>(
	(props: AppProps & WithStyles<ClassNames>) => {
		const classes = props.classes;
		return (
			<div>Hello React</div>
		);
	}
);
