import { select } from '@wordpress/data';

export const getWords = ( state ) =>
	state.problems.list.filter( ( { mode } ) => mode === 'syntax' );

export const getWordsByType = ( state, type ) =>
	state.problems.list.filter(
		( { mode, type: wordType } ) => mode === 'syntax' && type === wordType
	);

export const getProblems = ( state ) =>
	state.problems.list.filter( ( { mode } ) => mode === 'style' );

export const getProblem = ( state, id ) =>
	state.problems.list.find(
		( { annotationId: problemId } ) => problemId === id
	);

export const getAnnotations = ( state ) => state.annotations.list;

export const getAnnotation = ( state, id ) =>
	state.annotations.list.find( ( { annotationId } ) => annotationId === id );

export const getBlockProblems = ( state, blockId ) =>
	state.problems.list.filter(
		( { blockId: clientId } ) => clientId === blockId
	);

export const getProblemsByType = ( state, type ) =>
	state.problems.list.filter(
		( { type: problemType } ) => problemType === type
	);

export const getProblemsByValue = ( state, value, type = false ) =>
	state.problems.list.filter(
		( { value: problemValue, type: problemType } ) => problemValue === value && ( ! type || problemType === type )
	);

export const getReadability = ( state ) => state.readability.stats;

export const getUserSettings = ( state ) => state.user.settings;
