/**
 * Replaces items matched in the regex with character.
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
export default function stripAstrals( text ) {
	return text.replace( /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, 'a' );
}
