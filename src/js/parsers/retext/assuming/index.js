import { search } from 'nlcst-search';
import { toString } from 'nlcst-to-string';
import { quotation } from 'quotation';
import { findBefore } from 'unist-util-find-before';

import { difference } from 'lodash';

import assumingPhrases from './phrases';

const URL = 'https://github.com/davidhund/retext-assuming';
const MODULENAME = 'retext-assuming';
const PREFIX = 'Avoid';
const SUFFIX = "it's not helpful";
const FINEPREFIX = 'PASS:';
const FINESUFFIX = 'is probably fine';
const NEGATIVES = [
	'never',
	'not',
	"can't",
	'cannot',
	"don't",
	"couldn't",
	"shouldn't",
	"wouldn't",
];
const QUALIFIERS = ['that', 'very', 'too', 'so', 'quite', 'rather'];

export default function retextAssume(options) {
	// Options
	const opts = options || {};
	const phrases = opts.phrases || assumingPhrases;
	const ignore = opts.ignore || [];
	const verbose = opts.verbose || false;

	const list = phrases.filter((phrase) => {
		return ignore.indexOf(phrase) === -1;
	});

	return transformer;

	function transformer(tree, file) {
		search(tree, list, handleMatch);

		function handleMatch(match, position, parent, phrase) {
			// Make sure we're not actually meaning the *opposite*
			//   "You [cannot|cant'|don't|etc..] simply assume..." => pass
			const before = findBefore(parent, position, 'WordNode');

			if (before) {
				const beforeMatch = toString(before).toLowerCase();

				if (NEGATIVES.indexOf(beforeMatch) !== -1) {
					if (verbose) {
						const info = file.info(
							[
								FINEPREFIX,
								quotation(
									beforeMatch + ' ' + toString(match),
									'“',
									'”'
								),
								FINESUFFIX,
							].join(' '),
							{
								start: before.position.start,
								end: before.position.end,
							}
						);

						info.ruleId = 'no-' + phrase.replace(/\W+/g, '-');
						info.source = MODULENAME;
						info.url = URL;
					}

					return;
				}

				// Make one more exception for qualifiers:
				//   "It's not [that|very|too|so|quite|rather] simple" => pass
				if (QUALIFIERS.indexOf(beforeMatch) !== -1) {
					const negativeBeforeQualifier = findBefore(
						parent,
						before,
						function (e) {
							// @TODO:
							// try (indexOf(NEGATIVES) !== -1)
							// instead of hardcoded 'not'?
							return toString(e).toLowerCase() === 'not';
						}
					);

					if (negativeBeforeQualifier) {
						if (verbose) {
							const qualifierInfo = file.info(
								[
									FINEPREFIX,
									quotation(
										[
											toString(negativeBeforeQualifier),
											beforeMatch,
											toString(match),
										].join(' '),
										'“',
										'”'
									),
									FINESUFFIX,
								].join(' '),
								{
									start: before.position.start,
									end: before.position.end,
								}
							);

							qualifierInfo.ruleId =
								'no-' + phrase.replace(/\W+/g, '-');
							qualifierInfo.source = MODULENAME;
							qualifierInfo.url = URL;
						}

						return;
					}
				}
			}

			const value = toString(match);

			const message = file.message(
				[PREFIX, quotation(value, '“', '”') + ',', SUFFIX].join(' '),
				{
					start: match[0].position.start,
					end: match[match.length - 1].position.end,
				}
			);

			message.ruleId = 'no-' + phrase.replace(/\W+/g, '-');
			message.source = MODULENAME;
			message.url = URL;
			message.actual = value;
		}
	}
}
