import adverbs from "./adverbs";
import hedges from "./hedges";
import passive from "./passive";
import readability from "./readability";
import simpler from "./simpler";
import so from "./so";
import weasel from "./weasel";
import stripTags from "../utils/strip-tags";

export default (text) => {
	const content = stripTags(text);

	return [
		...passive(content),
		...so(content),
		...adverbs(content),
		...readability(content),
		...simpler(content),
		...hedges(content),
		...weasel(content),
	].filter(Boolean);
};
