import {VFile} from 'vfile'
import {sort} from 'vfile-sort'
import {unified} from 'unified'
import retextEnglish from 'retext-english'
import retextEquality from 'retext-equality'
import retextProfanities from 'retext-profanities'
import retextSimplify from 'retext-simplify'
import retextReadability from 'retext-readability'
import retextIndefiniteArticle from 'retext-indefinite-article'
import retextSentenceSpacing from 'retext-sentence-spacing'
import retextRepeatedWords from 'retext-repeated-words'
import retextRedundantAcronyms from 'retext-redundant-acronyms'
import retextPassive from 'retext-passive'
import retextIntensify from 'retext-intensify'
import retextDiacritics from 'retext-diacritics'
import retextContractions from 'retext-contractions'
import remarkMessageControl from 'remark-message-control'

export function parse(value, config) {
    const options = splitOptions(config)
    return core(value, options.filter, makeText(options.text))
}

function makeText(options) {
  return unified()
    .use(retextEnglish)
    .use(retextEquality, options)
    .use(retextProfanities, options)
    .use(retextSimplify, options)
    .use(retextReadability, options)
    .use(retextIndefiniteArticle, options)
    .use(retextSentenceSpacing, options)
    .use(retextRepeatedWords, options)
    .use(retextRedundantAcronyms, options)
    .use(retextPassive, options)
    .use(retextIntensify, options)
    .use(retextDiacritics, options)
    .use(retextContractions, options)
}

function core(value, options, processor) {
  const file = new VFile(value)
  const tree = processor.use(filter, options).parse(file)

  processor.runSync(tree, file)

  sort(file)

  return file
}

function splitOptions(options) {
  let allow
  let deny
  let noBinary
  let sureness

  if (Array.isArray(options)) {
    allow = options
  } else if (options) {
    allow = options.allow
    deny = options.deny
    noBinary = options.noBinary
    sureness = options.profanitySureness
  }

  return {filter: {allow, deny}, text: {noBinary, sureness}}
}

function filter(options = {}) {
  if (options.allow && options.deny) {
    throw new Error(
      'Do not provide both allow and deny configuration parameters'
    )
  }

  return remarkMessageControl({
    name: 'alex',
    reset: Boolean(options.deny),
    enable: options.deny,
    disable: options.allow,
    source: ['retext-equality', 'retext-profanities']
  })
}
