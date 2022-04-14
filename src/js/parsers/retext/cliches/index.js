import difference from 'array-differ';
import {toString} from 'nlcst-to-string';
import {quotation} from 'quotation';
import {search} from 'nlcst-search';
import list from './list';

/**
 * Attacher.
 *
 * @param {Retext} processor
 *   - Instance.
 * @param {Object?} [options]
 *   - Configuration.
 * @param {Array.<string>?} [options.ignore]
 *   - List of phrases to *not* warn about.
 * @return {Function} - `transformer`.
 */
export default function retextCliches(options) {
    var ignore = (options || {}).ignore || [];
    var phrases = difference(list, ignore);

    /**
     * Search `tree` for validations.
     *
     * @param {Node} tree - NLCST node.
     * @param {VFile} file - Virtual file.
     */
    function transformer(tree, file) {
        search(tree, phrases, function (match, position, parent, phrase) {
            var value = toString(match);
            var message = 'Warning: ' + quotation( value, '“', '”') + ' is a cliche';

            message = file.message(message, {
                start: match[0].position.start,
                end: match[match.length - 1].position.end,
            });

            message.cliche = phrase;
            message.source = 'retext-cliche';
            message.actual = value;
        });
    }

    return transformer;
}
