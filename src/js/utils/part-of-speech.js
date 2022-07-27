const tags = {
	JJ: 'adjective',
	JJR: 'adjective',
	JJS: 'adjective',
	NN: 'noun',
	NNS: 'noun',
	NNP: 'noun',
	NNPS: 'noun',
	RB: 'adverb',
	RBR: 'adverb',
	RBS: 'adverb',
	WRB: 'adverb',
	VB: 'verb',
	VBD: 'verb',
	VBG: 'verb',
	VBN: 'verb',
	VBP: 'verb',
	VBZ: 'verb',
	CC: 'conjunction',
};

export const getPartOfSpeech = (tag) => {
	return tags[tag] || tag;
};
