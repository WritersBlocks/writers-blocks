import { flow } from 'lodash';

import stripTags from "../utils/strip-tags";
import stripAstrals from '../utils/strip-astrals';
import stripHTMComments from '../utils/strip-html-comments';
import stripSpaces from '../utils/strip-spaces';
import stripHTMLEntities from '../utils/strip-html-entities';

export const strip = (text, { preserveWhiteSpace = true } = {}) => `${
	flow(
		stripHTMComments,
		stripAstrals,
		stripSpaces,
		stripHTMLEntities,
		stripTags,
	)(text, preserveWhiteSpace)
}\n`;
