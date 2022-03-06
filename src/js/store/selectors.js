import { select } from '@wordpress/data';

const { btoa } = window;

export const getProblems = ( state ) => state.problems.list;

export const getProblem = ( state, id ) =>
	state.problems.list.find(
		( { annotationId: problemId } ) => problemId === id
	);

export const getAnnotations = ( state ) => state.annotations.list;

export const getAnnotation = ( state, id ) =>
	state.annotations.list.find( ( { annotationId } ) => annotationId === id );

export const getIgnoredAnnotations = ( state ) => {
	const annotations = state?.annotations?.list;

	if ( ! annotations?.length ) {
		const { wb_ignored } =
			select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};

		if ( ! wb_ignored ) {
			return [];
		}

		return wb_ignored;
	}

	return annotations
		.filter( ( annotation ) => annotation.state === 'ignored' )
		.map( ( { type, index, offset, value } ) =>
			btoa( `${ type }_${ index }_${ offset }_${ value }` )
		);
};

export const getBlockProblems = ( state, blockId ) =>
	state.problems.list.filter( ( { blockId } ) => blockId === blockId );

export const getProblemsByType = ( state, type ) =>
	state.problems.list.filter( ( { type } ) => type === type );

export const getReadability = ( state ) => state.readability.stats;

export const getUserSettings = ( state ) => state.user.settings;
