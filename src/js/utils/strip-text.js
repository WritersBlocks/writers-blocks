import { flow } from 'lodash';

import stripTags from "./strip-tags";
import stripAstrals from './strip-astrals';
import stripHTMComments from './strip-html-comments';
import stripSpaces from './strip-spaces';
import stripHTMLEntities from './strip-html-entities';

export const strip = (text, { preserveWhiteSpace = true } = {}) => text ? `${
	flow(
		stripHTMComments,
		stripAstrals,
		stripSpaces,
		stripHTMLEntities,
		stripTags,
	)(text, preserveWhiteSpace)
}\n` : '';
