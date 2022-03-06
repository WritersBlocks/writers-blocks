export function addAnnotations( annotations ) {
	return {
		type: 'ADD_ANNOTATIONS',
		annotations,
	};
}

export function addProblem( problem ) {
	return {
		type: 'ADD_PROBLEM',
		problem,
	};
}

export function addProblems( problems ) {
	return {
		type: 'ADD_PROBLEMS',
		problems,
	};
}

export function removeProblem( name ) {
	return {
		type: 'REMOVE_PROBLEM',
		name,
	};
}

export function ignoreProblem( name ) {
	return {
		type: 'IGNORE_PROBLEM',
		name,
	};
}

export function updateReadability( stats ) {
	return {
		type: 'UPDATE_READABILITY',
		stats,
	};
}

export function updateUserSettings( settings ) {
	return {
		type: 'UPDATE_USER_SETTINGS',
		settings,
	};
}
