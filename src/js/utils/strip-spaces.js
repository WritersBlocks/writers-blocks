/**
 * Replaces items matched in the regex with spaces.
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
export default function stripSpaces( text ) {
	return text.replace( /&nbsp;|&#160;/gi, ' ' );
}
