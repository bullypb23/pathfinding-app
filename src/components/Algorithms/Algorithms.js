import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
	Section, AlgorithmsContainer, Checkbox, Label,
} from './Algorithms.styles';
import * as actions from '../../store/actions/gameConfig';
import algorithmName from '../../shared/common';

const Algorithms = ({
	algorithms, toggleAlgorithm,
}) => (
	<Section>
		{Object.keys(algorithms).map(key => (
			<AlgorithmsContainer key={key}>
				<Checkbox checked={algorithms[key]} type="checkbox" value={key} id={key} onChange={e => toggleAlgorithm(e.target.value)} />
				<Label htmlFor={key}>{algorithmName(key)}</Label>
			</AlgorithmsContainer>
		))}
	</Section>
);

const mapStateToProps = state => (
	{
		algorithms: state.gameConfig.algorithms,
	}
);

const mapDispatchToProps = dispatch => (
	{
		toggleAlgorithm: value => dispatch(actions.toggleAlgorithm(value)),
	}
);

Algorithms.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	algorithms: propTypes.object.isRequired,
	toggleAlgorithm: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Algorithms);
