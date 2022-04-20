import { parse as retext } from './retext';
import { strip } from '../utils/strip-text';

export const parse = ( text = '', {
	offset = 0,
	preserveWhiteSpace = true,
	dictionary = '',
	ignored: {
		passive = '',
		intensify = '',
		diacritics = '',
		equality = '',
		profanities = '',
		simplify = '',
		spell = '',
		assuming = '',
		cliche = '',
	} = {},
} = {} ) => {
	const content = strip( text, { preserveWhiteSpace } );
	const {
		tree: { messages },
		nodes,
	} = retext( content, {
		dictionary,
		ignored: {
			passive,
			intensify,
			diacritics,
			equality,
			profanities,
			simplify,
			spell,
			assuming,
			cliche,
		},
	} );

	return {
		nodes: ! nodes?.length ? [] : nodes,
		messages: ! messages?.length
			? []
			: messages.map( ( {
				actual: value,
				position: {
					start: { offset: start },
					end: { offset: end },
				} = {},
				message,
				fatal,
				source,
				expected,
			} ) => ( {
				value,
				type: source
					.replace( 'retext-', '' )
					.replace( '-', '_' ),
				level: fatal ? 'warning' : 'suggestion',
				message: `${ message.replaceAll( '`', '"' ).split( ', use' )[0].split( '; did' )[0] }.`,
				replacements: expected,
				index: start + offset,
				offset : end + offset,
			} ) ),
	};
};
