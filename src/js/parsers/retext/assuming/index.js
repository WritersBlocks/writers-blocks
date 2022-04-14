import {search} from 'nlcst-search';
import {toString} from 'nlcst-to-string';
import {quotation} from 'quotation';
import {findBefore} from 'unist-util-find-before';

import {difference} from 'lodash';

import assumingPhrases from './phrases';

var URL = 'https://github.com/davidhund/retext-assuming';
var MODULENAME = 'retext-assuming';
var PREFIX = 'Avoid';
var SUFFIX = 'it\'s not helpful';
var FINEPREFIX = 'PASS:';
var FINESUFFIX = 'is probably fine';
var NEGATIVES = ['never', 'not', 'can\'t', 'cannot', 'don\'t', 'couldn\'t', 'shouldn\'t', 'wouldn\'t'];
var QUALIFIERS = ['that', 'very', 'too', 'so', 'quite', 'rather'];

export default function retextAssume(options) {

    // Options
    var opts = options || {};
    var phrases = opts.phrases || assumingPhrases;
    var ignore = opts.ignore || [];
    var verbose = opts.verbose || false;

    var list = phrases.filter((phrase) => {
        return ignore.indexOf(phrase) === -1;
    });

    return transformer;

    function transformer(tree, file) {
        search(tree, list, handleMatch);

        function handleMatch(match, position, parent, phrase) {
            // Make sure we're not actually meaning the *opposite*
            //   "You [cannot|cant'|don't|etc..] simply assume..." => pass
            var before = findBefore(parent, position, 'WordNode');

            if (before) {
                var beforeMatch = toString(before).toLowerCase();

                if (NEGATIVES.indexOf(beforeMatch) !== -1) {
                    if (verbose) {
                        var info = file.info([
                            FINEPREFIX,
                            quotation(beforeMatch + ' ' + toString(match), '“', '”'),
                            FINESUFFIX
                        ].join(' '), {
                            start: before.position.start,
                            end: before.position.end
                        });

                        info.ruleId = 'no-' + phrase.replace(/\W+/g, '-');
                        info.source = MODULENAME;
                        info.url = URL;
                    }

                    return;
                }

                // Make one more exception for qualifiers:
                //   "It's not [that|very|too|so|quite|rather] simple" => pass
                if (QUALIFIERS.indexOf(beforeMatch) !== -1) {
                    var negativeBeforeQualifier = findBefore(parent, before, function (e) {
                        // @TODO:
                        // try (indexOf(NEGATIVES) !== -1)
                        // instead of hardcoded 'not'?
                        return toString(e).toLowerCase() === 'not';
                    });

                    if (negativeBeforeQualifier) {
                        if (verbose) {
                            var qualifierInfo = file.info([
                                FINEPREFIX,
                                quotation([
                                    toString(negativeBeforeQualifier),
                                    beforeMatch,
                                    toString(match)
                                ].join(' '), '“', '”'),
                                FINESUFFIX
                            ].join(' '), {
                                start: before.position.start,
                                end: before.position.end
                            });

                            qualifierInfo.ruleId = 'no-' + phrase.replace(/\W+/g, '-');
                            qualifierInfo.source = MODULENAME;
                            qualifierInfo.url = URL;
                        }

                        return;
                    }
                }
            }

            var value = toString(match);

            var message = file.message([
                PREFIX,
                quotation(value, '“', '”') + ',',
                SUFFIX
            ].join(' '),
                {
                    start: match[0].position.start,
                    end: match[match.length - 1].position.end,
                });

            message.ruleId = 'no-' + phrase.replace(/\W+/g, '-');
            message.source = MODULENAME;
            message.url = URL;
            message.actual = value;
        }
    }
}