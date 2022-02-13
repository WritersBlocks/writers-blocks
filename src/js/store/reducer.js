/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

import { PROBLEM_TYPES_TO_LABEL } from '../constants';

const { btoa } = window;

const DEFAULT_USER_SETTINGS = {
	showProblems: true,
	suggestionsToShow: Object.keys(PROBLEM_TYPES_TO_LABEL).reduce((accumulator, type) => {
		accumulator[type] = true;
		return accumulator;
	}, {}),
	blocks: [],
};

export function readability(state = { stats: {} }, action) {
	switch (action.type) {
		case 'UPDATE_READABILITY':
			return {
				...state,
				stats: action.stats,
			};
		default:
			return state;
	}
}

export function problems(state = { list: [] }, action) {
	switch (action.type) {
		case 'ADD_PROBLEM':
			const id = btoa(`${action.problem.blockId}-${action.problem.type}-${action.problem.index}-${action.problem.offset}`);

			if (state.list.find((p) => p.id === id)) {
				return state;
			}

			return {
				...state,
				list: [...state.list, { ...action.problem, id }],
			};
		case 'ADD_PROBLEMS':
			return {
				...state,
				list: action.problems.map((problem) => ({
					...problem,
					id: btoa(`${problem.blockId}-${problem.type}-${problem.index}-${problem.offset}`),
				})),
			};
		case 'REMOVE_PROBLEM':
			return {
				...state,
				list: state.list.filter((problem) => problem.id !== action.name),
			};
		default:
			return state;
	}
}

export function user(state = { settings: DEFAULT_USER_SETTINGS }, action) {
	switch (action.type) {
		case 'UPDATE_USER_SETTINGS':
			return {
				...state,
				settings: {
					...state.settings,
					...action.settings,
				},
			};
		default:
			return state;
	}
}

export default combineReducers({
	problems,
	readability,
	user,
});
