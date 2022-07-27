/**
 * Replaces items matched in the regex with a single character.
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
export default function stripHTMLEntities(text) {
	return text.replace(/&\S+?;/g, '');
}
