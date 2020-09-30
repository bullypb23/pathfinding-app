/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as actions from '../../store/actions/game';
import Level from '../Level/Level';
import {
	Wrapper, Heading, Container, Paragraph,
} from './Levels.styles';

const Levels = ({ levels, handleAlgorithmReplay, history }) => {
	const handleReplay = (name, info, levelNum) => {
		handleAlgorithmReplay(name, info, levelNum);
		history.push('/replay');
	};

	return (
		<Wrapper>
			<Heading>All played levels</Heading>
			<Container>
				{Object.keys(levels).map(level => (
					<Level
						key={level}
						number={+level}
						algorithms={levels[level]}
						handleAlgorithmReplay={handleReplay}
					/>
				))}
				{Object.keys(levels).length === 0 ? <Paragraph>There is no played levels.</Paragraph> : null}
			</Container>
		</Wrapper>
	);
};

Levels.propTypes = {
	levels: propTypes.object.isRequired,
	handleAlgorithmReplay: propTypes.func.isRequired,
	history: propTypes.object.isRequired,
};

const mapStateToProps = state => (
	{
		levels: state.game.levels,
	}
);

const mapDispatchToProps = dispatch => (
	{
		handleAlgorithmReplay: (name, info, levelNum) => dispatch(actions.handleAlgorithmReplay(name, info, levelNum)),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(Levels);
