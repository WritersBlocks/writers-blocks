import Tokenizer from 'sentence-tokenizer';

export const tokenize = (text) => {
	const tokenizer = new Tokenizer();
	tokenizer.setEntry(text);

	try {
		return {
			sentences: tokenizer.getSentences(),
			words: tokenizer.getTokens(),
		}
	} catch(error) {
		return {
			sentences: 0,
			words: 0,
		};
	}
};
