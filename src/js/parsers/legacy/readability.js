import { readingScore } from '../../utils/reading-score';
import { tokenize } from '../../utils/tokenizer';

export default ( text ) => {
	const paragraphs = text
		.replace( /\n$/gm, '' )
		.split( /\n/g )
		.filter( ( line ) => line.length );
	const { sentences } = tokenize( paragraphs.join( ' ' ) );

	return ! sentences
		? []
		: sentences
				.map( ( sentence, index ) => {
					const { score, words } = readingScore( sentence );
					const level =
						score > 9 && score <= 16
							? 'suggestion'
							: score > 16
							? 'warning'
							: null;
					const start =
						index === 0
							? 0
							: sentences.reduce(
									(
										accumulator,
										currentValue,
										currentIndex
									) => {
										return currentIndex < index
											? accumulator +
													currentValue.length +
													1
											: accumulator;
									},
									0
							  );
					let end = sentences.reduce(
						( accumulator, currentValue, currentIndex ) =>
							currentIndex <= index
								? accumulator + currentValue.length
								: accumulator,
						0
					);

					if ( index - 1 > 0 ) {
						end += index - 1;
					}

					const response =
						words > 14 && level
							? {
									value: sentence,
									type: `readability-${
										level === 'warning' ? 'very-' : ''
									}hard`,
									level,
									message: `This sentence is${
										level === 'warning' ? ' very' : ''
									} hard to read.`,
									index: start,
									offset: end,
							  }
							: null;

					return response;
				} )
				.filter( Boolean );
};
