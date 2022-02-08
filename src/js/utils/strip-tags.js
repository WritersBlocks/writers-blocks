/**
 * Replaces items matched in the regex with new line
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
// export default function stripTags(text, preserveWhiteSpace) {
// 	return text.split( /<\/?[a-z][^>]*?>/gi ).filter(Boolean).join(preserveWhiteSpace ? '' : ' ');
// }

export default function stripTags(text, preserveWhiteSpace) {
	return text
		.replaceAll( '</li><li>', ' ' )
		.replace( /<\/?[li][^>]*?>/gi, '' )
		.replace( /<\/?[br][^>]*?>/gi, ' ' )
		.split( /<\/?[a-z][^>]*?>/gi ).filter(Boolean).join(preserveWhiteSpace ? ' ' : '');
}
