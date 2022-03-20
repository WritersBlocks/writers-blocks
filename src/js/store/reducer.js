/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { PROBLEM_TYPES_TO_LABEL } from '../constants';

const DEFAULT_USER_SETTINGS = {
	showProblems: true,
	suggestionsToShow: Object.keys( PROBLEM_TYPES_TO_LABEL ).reduce(
		( accumulator, type ) => {
			accumulator[ type ] = true;
			return accumulator;
		},
		{}
	),
	blocks: [],
};

export function readability( state = { stats: {} }, action ) {
	switch ( action.type ) {
		case 'UPDATE_READABILITY':
			return {
				...state,
				stats: action.stats,
			};
		default:
			return state;
	}
}

export function words( state = { list: [] }, action ) {
	switch ( action.type ) {
		case 'ADD_WORDS':
			return {
				...state,
				list: action.words,
			};
		default:
			return state;
	}
}

export function problems( state = { list: [] }, action ) {
	switch ( action.type ) {
		case 'ADD_PROBLEMS':
			return {
				...state,
				list: action.problems,
			};
		case 'REMOVE_PROBLEM':
			return {
				...state,
				list: state.list.filter(
					( problem ) => problem.id !== action.name
				),
			};
		case 'IGNORE_PROBLEM':
			const problem = state.list.find(
				( problem ) => problem.annotationId === action.name
			);

			return {
				...state,
				list: [
					...state.list.filter(
						( problem ) => problem.annotationId !== action.name
					),
					{
						...problem,
						state: 'ignored',
					},
				],
			};
		default:
			return state;
	}
}

export function user( state = { settings: DEFAULT_USER_SETTINGS }, action ) {
	switch ( action.type ) {
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

export default combineReducers( {
	words,
	problems,
	readability,
	user,
} );
