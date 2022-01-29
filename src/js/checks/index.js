import adverbs from "./adverbs";
import passive from "./passive";
import readability from "./readability";
import so from "./so";

export default (text) => {
	return [
		...passive(text),
		...so(text),
		...adverbs(text),
		...readability(text),
	].filter(Boolean);
};
