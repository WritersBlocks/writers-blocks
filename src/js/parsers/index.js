import { flow } from 'lodash';
import adverbs from "./adverbs";
import hedges from "./hedges";
import passive from "./passive";
import readability from "./readability";
import simpler from "./simpler";
import weasel from "./weasel";
import sensitivity from "./sensitivity";
import fillers from "./fillers";
import cliches from './cliches';

import stripTags from "../utils/strip-tags";
import stripAstrals from '../utils/strip-astrals';
import stripHTMComments from '../utils/strip-html-comments';
import stripSpaces from '../utils/strip-spaces';
import stripHTMLEntities from '../utils/strip-html-entities';

export default (text, { preserveWhiteSpace = true } = {}) => {
    const content = `${
        flow(
			stripHTMComments,
            stripAstrals,
            stripSpaces,
            stripHTMLEntities,
            stripTags,
        )(text, preserveWhiteSpace)
    }\n`;

	return [
		...passive(content),
		...adverbs(content),
		...readability(content),
		...simpler(content),
		...hedges(content),
		...weasel(content),
		...sensitivity(content),
		...fillers(content),
		...cliches(content),
	].filter(Boolean);
};
