import { parse } from './retext';
import { strip } from '../utils/strip-text';

export default ( text, {
	preserveWhiteSpace = true,
	dictionary,
	ignored: {
		passive = '',
		intensify = '',
		diacritics = '',
		equality = '',
		profanities = '',
		simplify = '',
		spell = '',
	} = {},
} = {} ) => {
	const content = strip( text, { preserveWhiteSpace } );
	const {
		tree: { messages },
		nodes,
	} = parse( content, {
		dictionary,
		ignored: {
			passive,
			intensify,
			diacritics,
			equality,
			profanities,
			simplify,
			spell,
		},
	} );

	return {
		nodes: ! nodes?.length ? [] : nodes,
		messages: ! messages?.length
			? []
			: messages.map( ( match ) => {
					const {
						actual: value,
						position: {
							start: { offset: index },
							end: { offset },
						},
						message,
						fatal,
						source,
						expected,
					} = match;

					return {
						value,
						type: source
							.replace( 'retext-', '' )
							.replace( '-', '_' ),
						level: fatal ? 'warning' : 'suggestion',
						message: `${ message.replaceAll( '`', '"' ).split( ', use' )[0].split( '; did' )[0] }.`,
						replacements: expected,
						index,
						offset,
					};
			  } ),
	};
};
