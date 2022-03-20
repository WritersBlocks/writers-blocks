import { __ } from '@wordpress/i18n';

export const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/quote',
	'core/pullquote',
	'core/verse',
	'core/media-text',
	'core/preformatted',
];

export const BLOCK_TYPE_CONTENT_ATTRIBUTE = {
	'core/paragraph': 'content',
	'core/list': 'values',
	'core/quote': 'value',
};

export const PROBLEM_TYPES = [
	'simplify',
	'intensify',
	'passive',
	'readability',
	'indefinite_article',
	'equality',
	'profanities',
	'contractions',
	'repeated_words',
	'redundant_acronyms',
	'diacritics',
	'sentence_spacing',
];

export const SYNTAX_TYPES = [
	'noun',
	'adjective',
	'adverb',
	'verb',
];

export const PROBLEM_TYPES_TO_LABEL = {
	simplify: {
		label: __( 'Simplify', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may need to be simplified.`
			: 'No words need to be simplified. Bravo.',
	},
	intensify: {
		label: __( 'Intensify', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may lessen${ number > 1 ? '' : 's' } impact.`
			: 'No vague language in sight. Awesome job!',
	},
	passive: {
		label: __( 'Passive Voice', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may use passive voice.`
			: 'No passive voice to report.',
	},
	readability: {
		label: __( 'Readability', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } sentence${ number > 1 ? 's' : '' } may be difficult to read.`
			: 'Not a single sentence is difficult to read. Great job.',
	},
	equality: {
		label: __( 'Equality', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may be insensitive.`
			: 'No words are insensitive. Well done.',
	},
	profanities: {
		label: __( 'Profanity', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may be profane.`
			: 'No profanity to be found.',
	},
	'redundant_acronyms': {
		label: __( 'Redundant Acronyms', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } acronym${ number > 1 ? 's' : '' } may be redundant.`
			: 'Acronyms are on point.',
	},
	contractions: {
		label: __( 'Contractions', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may use improper an contraction.`
			: 'Contractions are looking good.',
	},
	'repeated_words': {
		label: __( 'Repeated Words', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may be repeated.`
			: 'No repeated words to be found.',
	},
	diacritics: {
		label: __( 'Diacritics', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } word${ number > 1 ? 's' : '' } may use improper accents.`
			: 'No improper accents here.',
	},
	'indefinite_article': {
		label: __( 'Indefinite Articles', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } indefinite article${ number > 1 ? 's' : '' } may have improper usage.`
			: 'All indefinite articles are correct.',
	},
	'sentence_spacing': {
		label: __( 'Sentence Spacing', 'writers-blocks' ),
		help: ( number ) => number > 0
			? `${ number } sentence${ number > 1 ? 's' : '' } may have improper spacing.`
			: 'All sentences are properly spaced.',
	},
};

export const DEFAULT_STATE = {
	isHighlighted: true,
	isBlurred: false,
	...Object.keys( PROBLEM_TYPES_TO_LABEL ).map( ( type ) => ( {
		[ type ]: true,
	} ) ),
};
