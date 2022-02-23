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
	'simpler',
	'adverb',
	'hedge',
	'weasel',
	'passive',
	'readability-hard',
	'readability-very-hard',
	'so',
	'filler',
	'cliche',
	'equality',
	'profanity',
];

export const PROBLEM_TYPES_TO_LABEL = {
	simpler: {
		label: __('Simpler Words', 'writers-blocks'),
		help: (number) => `${number} simpler words`,
	},
	adverb: {
		label: __('Adverbs', 'writers-blocks'),
		help: (number) => `${number} adverbs`,
	},
	hedge: {
		label: __('Hedge Words', 'writers-blocks'),
		help: (number) => `${number} hedge words`,
	},
	weasel: {
		label: __('Weasel Words', 'writers-blocks'),
		help: (number) => `${number} weasel words`,
	},
	passive: {
		label: __('Passive Voice', 'writers-blocks'),
		help: (number) => `${number} uses of passive voice`,
	},
	readability: {
		label: __('Readability', 'writers-blocks'),
		help: (number) => `${number} difficult to read sentences`,
		source: [
			'readability-hard',
			'readability-very-hard',
		],
	},
	filler: {
		label: __('Filler Words', 'writers-blocks'),
		help: (number) => `${number} filler words`,
	},
	cliche: {
		label: __('Cliché Phrases', 'writers-blocks'),
		help: (number) => `${number} cliché phrases`,
	},
	equality: {
		label: __('Inclusive Language', 'writers-blocks'),
		help: (number) => `${number} uses of non-inclusive language`,
	},
	profanity: {
		label: __('Profanity', 'writers-blocks'),
		help: (number) => `${number} uses of profanity`,
	},
};

export const DEFAULT_STATE = {
	isHighlighted: true,
	isBlurred: false,
	...Object.keys( PROBLEM_TYPES_TO_LABEL ).map( ( type ) => ( {
		[ type ]: true,
	} ) ),
};
