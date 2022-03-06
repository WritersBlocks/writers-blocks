// import adverbs from "./adverbs";
// import hedges from "./hedges";
// import passive from "./passive";
// import readability from "./readability";
// import simpler from "./simpler";
// import weasel from "./weasel";
import { parse } from './retext';
// import sensitivity from "./sensitivity";
// import fillers from "./fillers";
// import cliches from './cliches';
import { strip } from '../utils/strip-text';

export default ( text, { preserveWhiteSpace = true } = {} ) => {
	const content = strip( text, { preserveWhiteSpace } );
	const { messages } = parse( content );

	if ( ! messages.length ) {
		return [];
	}

	return messages.map( ( match ) => {
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
			type: source.replace( 'retext-', '' ),
			level: fatal ? 'warning' : 'suggestion',
			message: `${ message
				.split( ', use' )[ 0 ]
				.replaceAll( '`', '"' ) }.`,
			replacements: expected,
			index,
			offset,
		};
	} );

	// return [
	// ...passive(content),
	// ...adverbs(content),
	// ...readability(content),
	// ...simpler(content),
	// ...hedges(content),
	// ...weasel(content),
	// ...sensitivity(content),
	// ...fillers(content),
	// ...cliches(content),
	// ].filter(Boolean);
};
