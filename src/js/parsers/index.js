import adverbs from "./adverbs";
import hedges from "./hedges";
import passive from "./passive";
import readability from "./readability";
import simpler from "./simpler";
import weasel from "./weasel";
import sensitivity from "./sensitivity";
import fillers from "./fillers";
import cliches from './cliches';
import { strip } from '../utils/strip-text';

export default (text, { preserveWhiteSpace = true } = {}) => {
    const content = strip(text, { preserveWhiteSpace });

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
