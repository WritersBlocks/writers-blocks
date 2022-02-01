/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

const { btoa } = window;

export function problems(state = { problems: [] }, action) {
	switch (action.type) {
		case 'UPDATE_PROBLEMS':
			return {
				...state,
				problems: [
					...(Array.isArray(action.problems) ? action.problems : [action.problems]).map((problem) => ({
						...problem,
						id: btoa(`${problem.blockId}-${problem.type}-${problem.index}-${problem.offset}`),
					})),
				],
			};
		case 'REMOVE_PROBLEM':
			return {
				...state,
				problems: state.problems.filter((problem) => problem.id !== action.name),
			};
		default:
			return state;
	}
}

export default combineReducers({
	problems,
});
