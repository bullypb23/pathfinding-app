const ALGORITHMS = {
	ASTAR: 'astar',
	BFS: 'bfs',
	DIJKSTRA: 'dijkstra',
};

export default function algorithmName(al) {
	let alName;
	if (al === ALGORITHMS.ASTAR) {
		alName = 'A* algorithm';
	} else if (al === ALGORITHMS.BFS) {
		alName = 'Breadth-first Search';
	} else if (al === ALGORITHMS.DIJKSTRA) {
		alName = 'Dijkstra';
	}
	return alName;
}
