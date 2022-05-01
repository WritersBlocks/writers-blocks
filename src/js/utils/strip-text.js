import { flow } from 'lodash';

import stripTags from './strip-tags';
import stripAstrals from './strip-astrals';
import stripHTMComments from './strip-html-comments';
import stripSpaces from './strip-spaces';
import stripHTMLEntities from './strip-html-entities';
import stripNonBreakingSpaces from './strip-non-breaking-spaces';

export const strip = ( text, { preserveWhiteSpace = true } = {} ) =>
	text
		? `${ flow(
				stripHTMComments,
				stripAstrals,
				stripNonBreakingSpaces,
				stripSpaces,
				stripHTMLEntities,
				stripTags
		  )( text, preserveWhiteSpace ) }\n`
		: '';
