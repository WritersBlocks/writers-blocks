export function addProblems(problems) {
	return {
		type: 'UPDATE_PROBLEMS',
		problems,
	};
}

export function removeProblem(name) {
	return {
		type: 'REMOVE_PROBLEM',
		name,
	};
}
