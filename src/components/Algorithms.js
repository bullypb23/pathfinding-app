import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
	Section, AlgorithmsContainer, Checkbox, Label,
} from './Algorithms.styles';
import * as actions from '../store/actions/gameConfig';

const Algorithms = ({
	algorithms, toggleAlgorithm,
}) => (
	<Section>
		<AlgorithmsContainer>
			<Checkbox checked={algorithms.astar} type="checkbox" value="astar" id="astar" onChange={e => toggleAlgorithm(e.target.value)} />
			<Label htmlFor="astar">A* Search</Label>
		</AlgorithmsContainer>
		<AlgorithmsContainer>
			<Checkbox checked={algorithms.bfs} type="checkbox" value="bfs" id="bfs" onChange={e => toggleAlgorithm(e.target.value)} />
			<Label htmlFor="bfs">Breadth-first Search</Label>
		</AlgorithmsContainer>
		<AlgorithmsContainer>
			<Checkbox checked={algorithms.dijkstra} type="checkbox" value="dijkstra" id="dijkstra" onChange={e => toggleAlgorithm(e.target.value)} />
			<Label htmlFor="dijkstra">Dijkstra</Label>
		</AlgorithmsContainer>
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
