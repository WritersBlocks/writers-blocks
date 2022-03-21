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
	const {
		tree: { messages },
		nodes,
	} = parse( content );

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
						message: `${ message.replaceAll( '`', '"' ) }.`,
						replacements: expected,
						index,
						offset,
					};
			  } ),
	};
};
