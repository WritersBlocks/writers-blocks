import { flow } from 'lodash';
import adverbs from "./adverbs";
import hedges from "./hedges";
import passive from "./passive";
import readability from "./readability";
import simpler from "./simpler";
import so from "./so";
import weasel from "./weasel";
import sensitivity from "./sensitivity";
import fillers from "./fillers";
import cliches from './cliches';

import stripTags from "../utils/strip-tags";
import stripAstrals from '../utils/strip-astrals';
import stripHTMComments from '../utils/strip-html-comments';
import stripSpaces from '../utils/strip-spaces';
import stripHTMLEntities from '../utils/strip-html-entities';

export default (text) => {
    const content = `${
        flow(
            stripTags,
            stripHTMComments,
            stripAstrals,
            stripSpaces,
            stripHTMLEntities,
        )(text)
    }\n`;
	const stripped = content.split(' ').filter(Boolean).join(' ');

	return [
		...passive(stripped),
		...so(stripped),
		...adverbs(stripped),
		...readability(stripped),
		...simpler(stripped),
		...hedges(stripped),
		...weasel(stripped),
		...sensitivity(stripped),
		...fillers(stripped),
		...cliches(stripped),
	].filter(Boolean);
};
