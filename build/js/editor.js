/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/sidebar.js":
/*!**************************************!*\
  !*** ./src/js/components/sidebar.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks */ "./src/js/hooks/index.js");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../parsers */ "./src/js/parsers/index.js");
/* harmony import */ var _reading_score__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../reading-score */ "./src/js/reading-score.js");










const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'core/quote', 'core/pullquote', 'core/verse', 'core/media-text', 'core/preformatted'];
const TYPES = ['simpler', 'adverbs', 'hedges', 'weasel', 'passive', 'readability-hard', 'readability-very-hard', 'so'];

const AccessPanel = () => {
  const blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select('core/block-editor').getBlocks());
  const content = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select('core/editor').getEditedPostAttribute('content'));
  const {
    score,
    sentences,
    words,
    characters,
    paragraphs,
    letters,
    polarity,
    readingTime
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (0,_reading_score__WEBPACK_IMPORTED_MODULE_8__.readingScore)(content), [content]);
  const contentBlocks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => blocks.filter(block => ALLOWED_BLOCKS.includes(block.name)), [blocks]);
  const blocksWithProblems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const blockData = contentBlocks.map(block => ({
      blockId: block.clientId,
      ...(block?.attributes?.content?.length ? {
        problems: (0,_parsers__WEBPACK_IMPORTED_MODULE_7__["default"])(block.attributes.content)
      } : {})
    }));
    return blockData.filter(block => block?.problems?.length);
  }, [contentBlocks]);
  const {
    adverbs,
    passive,
    simpler,
    weasels,
    hedges,
    readability
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => blocksWithProblems.reduce((acc, block) => {
    acc.adverbs = acc.adverbs.concat(block.problems.filter(_ref => {
      let {
        type
      } = _ref;
      return type === 'adverbs';
    }));
    acc.passive = acc.passive.concat(block.problems.filter(_ref2 => {
      let {
        type
      } = _ref2;
      return type === 'passive';
    }));
    acc.simpler = acc.simpler.concat(block.problems.filter(_ref3 => {
      let {
        type
      } = _ref3;
      return type === 'simpler';
    }));
    acc.weasels = acc.weasels.concat(block.problems.filter(_ref4 => {
      let {
        type
      } = _ref4;
      return type === 'weasels';
    }));
    acc.hedges = acc.hedges.concat(block.problems.filter(_ref5 => {
      let {
        type
      } = _ref5;
      return type === 'hedges';
    }));
    acc.readability = acc.readability.concat(block.problems.filter(_ref6 => {
      let {
        type
      } = _ref6;
      return type === 'readability';
    }));
    return acc;
  }, {
    adverbs: [],
    passive: [],
    simpler: [],
    weasels: [],
    hedges: [],
    readability: []
  }), [blocksWithProblems]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    TYPES.forEach(type => {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)("core/annotations").__experimentalRemoveAnnotationsBySource(`writers-blocks--${type}`);
    });

    if (blocksWithProblems.length) {
      (0,_hooks__WEBPACK_IMPORTED_MODULE_6__.addProblems)(blocksWithProblems);
      blocksWithProblems.forEach(_ref7 => {
        let {
          blockId,
          problems
        } = _ref7;
        problems.forEach(_ref8 => {
          let {
            type,
            level,
            index,
            offset
          } = _ref8;

          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/annotations').__experimentalAddAnnotation({
            source: `writers-blocks--${type}`,
            blockClientId: blockId,
            richTextIdentifier: 'content',
            range: {
              start: index,
              end: offset
            }
          });
        });
      });
    }
  }, [blocksWithProblems]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebar, {
    name: "syntax-highlighter",
    icon: "text",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Syntax Highlighter', 'syntax')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Readability', 'yext')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Grade ", score)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Polarity ", polarity))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Stats', 'yext'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Reading time:"), " ", readingTime >= 1 ? `${Math.round(readingTime)} minute${Math.round(readingTime) > 1 ? 's' : ''}` : 'Less than a minute')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Paragraphs:"), " ", paragraphs)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Sentences:"), " ", sentences)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Words:"), " ", words)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Characters:"), " ", characters)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Letters:"), " ", letters))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Suggestions', 'yext')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, adverbs.length, " adverbs")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, weasels.length, " weasel words")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, hedges.length, " hedge words")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, passive.length, " uses of passive voice.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, simpler.length, " phrases have simpler alternatives.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, readability.filter(_ref9 => {
    let {
      level
    } = _ref9;
    return level === 'suggestion';
  }).length, " of ", sentences, " are hard to read.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, readability.filter(_ref10 => {
    let {
      level
    } = _ref10;
    return level === 'warning';
  }).length, " of ", sentences, " are very hard to read.")))));
};
/**
 * Register Access Panel Plugin
 */


(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_4__.registerPlugin)('syntax-highlighter', {
  render: AccessPanel
});

/***/ }),

/***/ "./src/js/data/adverbs.js":
/*!********************************!*\
  !*** ./src/js/data/adverbs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (['absolutel', 'accidentall', 'additionall', 'allegedl', 'alternativel', 'angril', 'anxiousl', 'approximatel', 'awkwardl', 'badl', 'barel', 'beautifull', 'blindl', 'boldl', 'bravel', 'brightl', 'briskl', 'bristl', 'bubbl', 'busil', 'calml', 'carefull', 'carelessl', 'cautiousl', 'cheerfull', 'clearl', 'closel', 'coldl', 'completel', 'consequentl', 'correctl', 'courageousl', 'crinkl', 'cruell', 'crumbl', 'cuddl', 'currentl', 'daringl', 'deadl', 'definitel', 'deliberatel', 'doubtfull', 'dumbl', 'eagerl', 'earl', 'easil', 'elegantl', 'enormousl', 'enthusiasticall', 'equall', 'especiall', 'eventuall', 'exactl', 'exceedingl', 'exclusivel', 'extremel', 'fairl', 'faithfull', 'fatall', 'fiercel', 'finall', 'fondl', 'foolishl', 'fortunatel', 'frankl', 'franticall', 'generousl', 'gentl', 'giggl', 'gladl', 'gracefull', 'greedil', 'happil', 'hardl', 'hastil', 'healthil', 'heartil', 'helpfull', 'honestl', 'hourl', 'hungril', 'hurriedl', 'immediatel', 'impatientl', 'inadequatel', 'ingeniousl', 'innocentl', 'inquisitivel', 'interestingl', 'irritabl', 'jiggl', 'joyousl', 'justl', 'kindl', 'largel', 'latel', 'lazil', 'likel', 'literall', 'lonel', 'loosel', 'loudl', 'loudl', 'luckil', 'madl', 'man', 'mentall', 'mildl', 'mortall', 'mostl', 'mysteriousl', 'neatl', 'nervousl', 'noisil', 'normall', 'obedientl', 'occasionall', 'onl', 'openl', 'painfull', 'particularl', 'patientl', 'perfectl', 'politel', 'poorl', 'powerfull', 'presumabl', 'previousl', 'promptl', 'punctuall', 'quarterl', 'quickl', 'quietl', 'rapidl', 'rarel', 'reall', 'recentl', 'recklessl', 'regularl', 'relativel', 'reluctantl', 'remarkabl', 'repeatedl', 'rightfull', 'roughl', 'rudel', 'sadl', 'safel', 'selfishl', 'sensibl', 'seriousl', 'sharpl', 'shortl', 'shyl', 'significantl', 'silentl', 'simpl', 'sleepil', 'slowl', 'smartl', 'smell', 'smoothl', 'softl', 'solemnl', 'sparkl', 'speedil', 'stealthil', 'sternl', 'stupidl', 'substantiall', 'successfull', 'suddenl', 'surprisingl', 'suspiciousl', 'swiftl', 'tenderl', 'tensel', 'thoughtfull', 'tightl', 'timel', 'truthfull', 'unexpectedl', 'unfortunatel', 'usuall', 'ver', 'victoriousl', 'violentl', 'vivaciousl', 'warml', 'waverl', 'weakl', 'wearil', 'wildl', 'wisel', 'worldl', 'wrinkl']);

/***/ }),

/***/ "./src/js/data/hedges.js":
/*!*******************************!*\
  !*** ./src/js/data/hedges.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hedges__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hedges */ "./node_modules/hedges/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  exceptions: [],
  list: hedges__WEBPACK_IMPORTED_MODULE_0__.hedges
});

/***/ }),

/***/ "./src/js/data/passive.js":
/*!********************************!*\
  !*** ./src/js/data/passive.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  value: "awoken",
  replace: "awoke"
}, {
  value: "beaten",
  replace: "beat"
}, {
  value: "begun",
  replace: "began"
}, {
  value: "bent",
  replace: "bent"
}, {
  value: "bitten",
  replace: "bit"
}, {
  value: "bled",
  replace: "bled"
}, {
  value: "blown",
  replace: "blew"
}, {
  value: "broken",
  replace: "broke"
}, {
  value: "brought",
  replace: "brought"
}, {
  value: "built",
  replace: "built"
}, {
  value: "bought",
  replace: "bought"
}, {
  value: "caught",
  replace: "caught"
}, {
  value: "chosen",
  replace: "chose"
}, {
  value: "cut",
  replace: "cut"
}, {
  value: "dealt",
  replace: "dealt"
}, {
  value: "done",
  replace: "did"
}, {
  value: "drawn",
  replace: "drew"
}, {
  value: "driven",
  replace: "drove"
}, {
  value: "eaten",
  replace: "ate"
}, {
  value: "fed",
  replace: "fed"
}, {
  value: "felt",
  replace: "felt"
}, {
  value: "fought",
  replace: "fought"
}, {
  value: "found",
  replace: "found"
}, {
  value: "forbidden",
  replace: "forbade"
}, {
  value: "forgotten",
  replace: "forgot"
}, {
  value: "forgiven",
  replace: "forgave"
}, {
  value: "frozen",
  replace: "froze"
}, {
  value: "gotten",
  replace: "got"
}, {
  value: "given",
  replace: "gave"
}, {
  value: "ground",
  replace: "ground"
}, {
  value: "ground",
  replace: "ground, grinded"
}, {
  value: "hung",
  replace: "hung"
}, {
  value: "heard",
  replace: "heard"
}, {
  value: "hidden",
  replace: "hid"
}, {
  value: "hit",
  replace: "hit"
}, {
  value: "held",
  replace: "held"
}, {
  value: "hurt",
  replace: "hurt"
}, {
  value: "kept",
  replace: "kept"
}, {
  value: "known",
  replace: "knew"
}, {
  value: "laid",
  replace: "laid"
}, {
  value: "led",
  replace: "led"
}, {
  value: "left",
  replace: "left"
}, {
  value: "let",
  replace: "let"
}, {
  value: "lost",
  replace: "lost"
}, {
  value: "made",
  replace: "made"
}, {
  value: "meant",
  replace: "meant"
}, {
  value: "met",
  replace: "met"
}, {
  value: "paid",
  replace: "paid"
}, {
  value: "proven",
  replace: "proved"
}, {
  value: "put",
  replace: "put"
}, {
  value: "read",
  replace: "read"
}, {
  value: "ridden",
  replace: "rode"
}, {
  value: "rung",
  replace: "rang"
}, {
  value: "run",
  replace: "ran"
}, {
  value: "said",
  replace: "said"
}, {
  value: "seen",
  replace: "saw"
}, {
  value: "sold",
  replace: "sold"
}, {
  value: "sent",
  replace: "sent"
}, {
  value: "shaken",
  replace: "shook"
}, {
  value: "shaved",
  replace: "shaved"
}, {
  value: "shot",
  replace: "shot"
}, {
  value: "shown",
  replace: "showed"
}, {
  value: "shut",
  replace: "shut"
}, {
  value: "sung",
  replace: "sung"
}, {
  value: "sunk",
  replace: "sunk"
}, {
  value: "slain",
  replace: "slew"
}, {
  value: "slid",
  replace: "slid"
}, {
  value: "spoken",
  replace: "spoke"
}, {
  value: "spent",
  replace: "spent"
}, {
  value: "spun",
  replace: "spun"
}, {
  value: "split",
  replace: "split"
}, {
  value: "spread",
  replace: "spread"
}, {
  value: "stolen",
  replace: "stole"
}, {
  value: "struck",
  replace: "struck"
}, {
  value: "swept",
  replace: "swept"
}, {
  value: "swung",
  replace: "swung"
}, {
  value: "taken",
  replace: "took"
}, {
  value: "taught",
  replace: "taught"
}, {
  value: "torn",
  replace: "tore"
}, {
  value: "told",
  replace: "told"
}, {
  value: "thought",
  replace: "thought"
}, {
  value: "thrown",
  replace: "threw"
}, {
  value: "undergone",
  replace: "underwent"
}, {
  value: "understood",
  replace: "understood"
}, {
  value: "upset",
  replace: "upset"
}, {
  value: "woken",
  replace: "woke"
}, {
  value: "worn",
  replace: "wore"
}, {
  value: "won",
  replace: "won"
}, {
  value: "withdrawn",
  replace: "withdrew"
}, {
  value: "written",
  replace: "wrote"
}]);

/***/ }),

/***/ "./src/js/data/simpler.js":
/*!********************************!*\
  !*** ./src/js/data/simpler.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  value: "a number of",
  replace: "Many, some"
}, {
  value: "abundance",
  replace: "Enough, plenty"
}, {
  value: "accede to",
  replace: "Allow, agree to"
}, {
  value: "accelerate",
  replace: "Speed up"
}, {
  value: "accentuate",
  replace: "Stress"
}, {
  value: "accompany",
  replace: "Go with, with"
}, {
  value: "accomplish",
  replace: "Do"
}, {
  value: "accorded",
  replace: "Given"
}, {
  value: "accrue",
  replace: "Add, gain"
}, {
  value: "acquiesce",
  replace: "Agree"
}, {
  value: "acquire",
  replace: "Get"
}, {
  value: "additional",
  replace: "More, extra"
}, {
  value: "adjacent to",
  replace: "Next to"
}, {
  value: "adjustment",
  replace: "Change"
}, {
  value: "admissible",
  replace: "Allowed, accepted"
}, {
  value: "advantageous",
  replace: "Helpful"
}, {
  value: "adversely impact",
  replace: "Hurt"
}, {
  value: "advise",
  replace: "Tell"
}, {
  value: "aforementioned",
  replace: "Remove"
}, {
  value: "aggregate",
  replace: "Total, add"
}, {
  value: "aircraft",
  replace: "Plane"
}, {
  value: "all of",
  replace: "All"
}, {
  value: "alleviate",
  replace: "Ease, reduce"
}, {
  value: "allocate",
  replace: "Divide"
}, {
  value: "along the lines of",
  replace: "Like, as in"
}, {
  value: "already existing",
  replace: "Existing"
}, {
  value: "alternatively",
  replace: "Or"
}, {
  value: "ameliorate",
  replace: "Improve, help"
}, {
  value: "anticipate",
  replace: "Expect"
}, {
  value: "apparent",
  replace: "Clear, plain"
}, {
  value: "appreciable",
  replace: "Many"
}, {
  value: "as a means of",
  replace: "To"
}, {
  value: "as of yet",
  replace: "Yet"
}, {
  value: "as to",
  replace: "on, about"
}, {
  value: "as yet",
  replace: "Yet"
}, {
  value: "ascertain",
  replace: "Find out, learn"
}, {
  value: "assistance",
  replace: "Help"
}, {
  value: "at this time",
  replace: "Now"
}, {
  value: "attain",
  replace: "Meet"
}, {
  value: "attributable to",
  replace: "Because"
}, {
  value: "authorize",
  replace: "Allow, let"
}, {
  value: "because of the fact that",
  replace: "because"
}, {
  value: "belated",
  replace: "late"
}, {
  value: "benefit from",
  replace: "enjoy"
}, {
  value: "bestow",
  replace: "give, award"
}, {
  value: "by virtue of",
  replace: "by, under"
}, {
  value: "cease",
  replace: "stop"
}, {
  value: "close proximity",
  replace: "near"
}, {
  value: "commence",
  replace: "Begin or start"
}, {
  value: "comply with",
  replace: "follow"
}, {
  value: "concerning",
  replace: "about, on"
}, {
  value: "consequently",
  replace: "so"
}, {
  value: "consolidate",
  replace: "join, merge"
}, {
  value: "constitutes",
  replace: "is, forms, makes up"
}, {
  value: "demonstrate",
  replace: "prove, show"
}, {
  value: "depart",
  replace: "leave, go"
}, {
  value: "designate",
  replace: "choose, name"
}, {
  value: "discontinue",
  replace: "drop, stop"
}, {
  value: "due to the fact that",
  replace: "because, since"
}, {
  value: "each and every",
  replace: "Each"
}, {
  value: "economical",
  replace: "cheap"
}, {
  value: "eliminate",
  replace: "cut, drop, end"
}, {
  value: "elucidate",
  replace: "explain"
}, {
  value: "employ",
  replace: "use"
}, {
  value: "endeavor",
  replace: "try"
}, {
  value: "enumerate",
  replace: "count"
}, {
  value: "equitable",
  replace: "fair"
}, {
  value: "equivalent",
  replace: "equal"
}, {
  value: "evaluate",
  replace: "test, check"
}, {
  value: "evidenced",
  replace: "showed"
}, {
  value: "exclusively",
  replace: "only"
}, {
  value: "expedite",
  replace: "hurry"
}, {
  value: "expend",
  replace: "spend"
}, {
  value: "expiration",
  replace: "end"
}, {
  value: "facilitate",
  replace: "ease, help"
}, {
  value: "factual evidence",
  replace: "facts, evidence"
}, {
  value: "feasible",
  replace: "workable"
}, {
  value: "finalize",
  replace: "complete, finish"
}, {
  value: "first and foremost",
  replace: "first"
}, {
  value: "for the purpose of,",
  replace: "to"
}, {
  value: "forfeit",
  replace: "lose, give up"
}, {
  value: "formulate",
  replace: "plan"
}, {
  value: "honest truth",
  replace: "truth"
}, {
  value: "however",
  replace: "but, yet"
}, {
  value: "if and when",
  replace: "use either word; not both"
}, {
  value: "impacted",
  replace: "affected, harmed, changed"
}, {
  value: "implement",
  replace: "install, put in place; tool"
}, {
  value: "in a timely manner",
  replace: "on time"
}, {
  value: "in accordance with",
  replace: "by, under"
}, {
  value: "in addition",
  replace: "also, besides, too"
}, {
  value: "in all likelihood",
  replace: "probably"
}, {
  value: "in an effort to",
  replace: "to"
}, {
  value: "in between",
  replace: "between"
}, {
  value: "in excess of",
  replace: "more than"
}, {
  value: "in lieu of",
  replace: "instead"
}, {
  value: "in light of the fact that",
  replace: "because"
}, {
  value: "in many cases",
  replace: "often"
}, {
  value: "in order to",
  replace: "to"
}, {
  value: "in regard to",
  replace: "about, concerning, on"
}, {
  value: "in some instances ",
  replace: "sometimes"
}, {
  value: "in terms of",
  replace: "omit; for, as, with"
}, {
  value: "in the near future",
  replace: "soon"
}, {
  value: "in the process of",
  replace: "omit"
}, {
  value: "inception",
  replace: "start"
}, {
  value: "incumbent upon",
  replace: "must"
}, {
  value: "indicate",
  replace: "say, state, or show"
}, {
  value: "indication",
  replace: "sign"
}, {
  value: "initiate",
  replace: "start"
}, {
  value: "is applicable to",
  replace: "applies to"
}, {
  value: "is authorized to",
  replace: "may"
}, {
  value: "is responsible for",
  replace: "handles"
}, {
  value: "it is essential",
  replace: "must, need to"
}, {
  value: "magnitude",
  replace: "size"
}, {
  value: "maximum",
  replace: "greatest, largest, most"
}, {
  value: "methodology",
  replace: "method"
}, {
  value: "minimize",
  replace: "cut"
}, {
  value: "minimum",
  replace: "least, smallest, small"
}, {
  value: "modify",
  replace: "change"
}, {
  value: "monitor",
  replace: "check, watch, track"
}, {
  value: "multiple",
  replace: "many"
}, {
  value: "necessitate",
  replace: "cause, need"
}, {
  value: "nevertheless",
  replace: "still, besides, even so"
}, {
  value: "not certain",
  replace: "uncertain"
}, {
  value: "not many",
  replace: "few"
}, {
  value: "not often",
  replace: "rarely"
}, {
  value: "not unless",
  replace: "only if"
}, {
  value: "not unlike",
  replace: "similar, alike"
}, {
  value: "notwithstanding",
  replace: "in spite of, still"
}, {
  value: "null and void",
  replace: "use either null or void"
}, {
  value: "numerous",
  replace: "many"
}, {
  value: "objective",
  replace: "aim, goal"
}, {
  value: "obligate",
  replace: "bind, compel"
}, {
  value: "obtain",
  replace: "get"
}, {
  value: "on the contrary",
  replace: "but, so"
}, {
  value: "on the other hand",
  replace: "omit; but, so"
}, {
  value: "one particular",
  replace: "one"
}, {
  value: "optimum",
  replace: "best, greatest, most"
}, {
  value: "overall",
  replace: "omit"
}, {
  value: "owing to the fact that",
  replace: "because, since"
}, {
  value: "participate",
  replace: "take part"
}, {
  value: "particulars",
  replace: "details"
}, {
  value: "pass away",
  replace: "die"
}, {
  value: "pertaining to",
  replace: "about, of, on"
}, {
  value: "point in time",
  replace: "time, point, moment, now"
}, {
  value: "portion",
  replace: "part"
}, {
  value: "possess",
  replace: "have, own"
}, {
  value: "preclude",
  replace: "prevent"
}, {
  value: "previously",
  replace: "before"
}, {
  value: "prior to",
  replace: "before"
}, {
  value: "prioritize",
  replace: "rank, focus on"
}, {
  value: "procure",
  replace: "buy, get"
}, {
  value: "proficiency",
  replace: "skill"
}, {
  value: "provided that",
  replace: "if"
}, {
  value: "purchase",
  replace: "buy, sale"
}, {
  value: "put simply",
  replace: "omit"
}, {
  value: "readily apparent",
  replace: "clear"
}, {
  value: "refer back",
  replace: "refer"
}, {
  value: "regarding",
  replace: "about, of, on"
}, {
  value: "relocate",
  replace: "move"
}, {
  value: "remainder",
  replace: "rest"
}, {
  value: "remuneration",
  replace: "payment"
}, {
  value: "require",
  replace: "must, need"
}, {
  value: "requirement",
  replace: "need, rule"
}, {
  value: "reside",
  replace: "live"
}, {
  value: "residence",
  replace: "house"
}, {
  value: "retain",
  replace: "keep"
}, {
  value: "satisfy",
  replace: "meet, please"
}, {
  value: "shall",
  replace: "must, will"
}, {
  value: "should you wish",
  replace: "if you want"
}, {
  value: "similar to",
  replace: "like"
}, {
  value: "solicit",
  replace: "ask for, request"
}, {
  value: "span across",
  replace: "span, cross"
}, {
  value: "strategize",
  replace: "plan"
}, {
  value: "subsequent",
  replace: "later, next, after, then"
}, {
  value: "substantial",
  replace: "large, much"
}, {
  value: "successfully complete",
  replace: "complete, pass"
}, {
  value: "sufficient",
  replace: "enough"
}, {
  value: "terminate",
  replace: "end, stop"
}, {
  value: "the month of",
  replace: "omit"
}, {
  value: "therefore",
  replace: "thus, so"
}, {
  value: "time period",
  replace: "time, period"
}, {
  value: "took advantage of",
  replace: "preyed on"
}, {
  value: "transmit",
  replace: "send"
}, {
  value: "transpire",
  replace: "happen"
}, {
  value: "until such time as",
  replace: "until"
}, {
  value: "utilization",
  replace: "use"
}, {
  value: "utilize",
  replace: "use"
}, {
  value: "validate",
  replace: "confirm"
}, {
  value: "various different",
  replace: "various, different"
}, {
  value: "very",
  replace: "omit"
}, {
  value: "whether or not",
  replace: "whether"
}, {
  value: "with respect to",
  replace: "on, about"
}, {
  value: "with the exception of",
  replace: "except for"
}, {
  value: "witnessed",
  replace: "saw, seen"
}]);

/***/ }),

/***/ "./src/js/data/weasel.js":
/*!*******************************!*\
  !*** ./src/js/data/weasel.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var weasels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weasels */ "./node_modules/weasels/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  exceptions: ['many', 'few'],
  list: weasels__WEBPACK_IMPORTED_MODULE_0__.weasels
});

/***/ }),

/***/ "./src/js/hooks/index.js":
/*!*******************************!*\
  !*** ./src/js/hooks/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProblems": function() { return /* reexport safe */ _update__WEBPACK_IMPORTED_MODULE_0__.addProblems; }
/* harmony export */ });
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update */ "./src/js/hooks/update.js");



/***/ }),

/***/ "./src/js/hooks/update.js":
/*!********************************!*\
  !*** ./src/js/hooks/update.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProblems": function() { return /* binding */ addProblems; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store */ "./src/js/store/index.js");


function addProblems(problems) {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_1__.store).addProblems(problems);
}

/***/ }),

/***/ "./src/js/parsers/adverbs.js":
/*!***********************************!*\
  !*** ./src/js/parsers/adverbs.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ adverbs; }
/* harmony export */ });
/* harmony import */ var _data_adverbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/adverbs */ "./src/js/data/adverbs.js");

function adverbs(text) {
  const expression = new RegExp('\\b(' + _data_adverbs__WEBPACK_IMPORTED_MODULE_0__["default"].join('|') + ')(y)\\b', 'gi');
  const matches = [...text.matchAll(expression)];

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    const [value] = [...match].filter(Boolean);
    return {
      value,
      type: 'adverbs',
      level: 'warning',
      message: 'adverbs can weaken meaning',
      index: match.index,
      offset: value.length + match.index
    };
  });
}

/***/ }),

/***/ "./src/js/parsers/hedges.js":
/*!**********************************!*\
  !*** ./src/js/parsers/hedges.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ weasel; }
/* harmony export */ });
/* harmony import */ var _data_hedges__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/hedges */ "./src/js/data/hedges.js");

const expression = new RegExp('\\b(' + _data_hedges__WEBPACK_IMPORTED_MODULE_0__["default"].list.join('|') + ')\\b', 'gi');
function weasel(text) {
  const matches = [...text.matchAll(expression)];

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    const [value] = [...match].filter(Boolean);
    return {
      value,
      type: 'hedges',
      level: 'warning',
      message: `"${value}" is a hedge word`,
      index: match.index,
      offset: value.length + match.index,
      replacements: [{
        action: 'delete',
        value: ''
      }]
    };
  });
}
;

/***/ }),

/***/ "./src/js/parsers/index.js":
/*!*********************************!*\
  !*** ./src/js/parsers/index.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adverbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adverbs */ "./src/js/parsers/adverbs.js");
/* harmony import */ var _hedges__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hedges */ "./src/js/parsers/hedges.js");
/* harmony import */ var _passive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./passive */ "./src/js/parsers/passive.js");
/* harmony import */ var _readability__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./readability */ "./src/js/parsers/readability.js");
/* harmony import */ var _simpler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simpler */ "./src/js/parsers/simpler.js");
/* harmony import */ var _so__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./so */ "./src/js/parsers/so.js");
/* harmony import */ var _weasel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./weasel */ "./src/js/parsers/weasel.js");
/* harmony import */ var _utils_strip_tags__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/strip-tags */ "./src/js/utils/strip-tags.js");








/* harmony default export */ __webpack_exports__["default"] = (text => {
  const content = (0,_utils_strip_tags__WEBPACK_IMPORTED_MODULE_7__["default"])(text);
  return [...(0,_passive__WEBPACK_IMPORTED_MODULE_2__["default"])(content), ...(0,_so__WEBPACK_IMPORTED_MODULE_5__["default"])(content), ...(0,_adverbs__WEBPACK_IMPORTED_MODULE_0__["default"])(content), ...(0,_readability__WEBPACK_IMPORTED_MODULE_3__["default"])(content), ...(0,_simpler__WEBPACK_IMPORTED_MODULE_4__["default"])(content), ...(0,_hedges__WEBPACK_IMPORTED_MODULE_1__["default"])(content), ...(0,_weasel__WEBPACK_IMPORTED_MODULE_6__["default"])(content)].filter(Boolean);
});

/***/ }),

/***/ "./src/js/parsers/passive.js":
/*!***********************************!*\
  !*** ./src/js/parsers/passive.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ passive; }
/* harmony export */ });
/* harmony import */ var _data_passive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/passive */ "./src/js/data/passive.js");

const expression = new RegExp('\\b(am|are|were|being|is|been|was|be)\\b\\s*([\\w]+ed|' + _data_passive__WEBPACK_IMPORTED_MODULE_0__["default"].map(word => word.value).join('|') + ')\\b', 'gi');
function passive(text) {
  const matches = [...text.matchAll(expression)];

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    const [value] = [...match].filter(Boolean);
    const replacement = _data_passive__WEBPACK_IMPORTED_MODULE_0__["default"].find(_ref => {
      let {
        value: word
      } = _ref;
      return word === value;
    });
    return {
      value,
      type: 'passive',
      level: 'warning',
      message: `"${value}" may be passive voice`,
      index: match.index,
      offset: value.length + match.index,
      replacements: replacement?.replace ? replacement.replace.split(', ').map(value => ({
        value: value.toLocaleLowerCase(),
        action: 'replace'
      })) : []
    };
  });
}

/***/ }),

/***/ "./src/js/parsers/readability.js":
/*!***************************************!*\
  !*** ./src/js/parsers/readability.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reading_score__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reading-score */ "./src/js/reading-score.js");

/* harmony default export */ __webpack_exports__["default"] = (text => {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return !sentences ? [] : sentences.map(sentence => {
    const {
      score,
      words
    } = (0,_reading_score__WEBPACK_IMPORTED_MODULE_0__.readingScore)(sentence);
    const level = score > 9 && score <= 16 ? 'suggestion' : score > 16 ? 'warning' : null;
    return words > 14 && level ? {
      value: sentence,
      type: `readability-${level === 'warning' ? 'very-' : ''}hard`,
      level,
      message: `sentence is${level === 'warning' ? ' very' : ''} hard to read`,
      index: 0,
      offset: sentence.length
    } : null;
  }).filter(Boolean);
});

/***/ }),

/***/ "./src/js/parsers/simpler.js":
/*!***********************************!*\
  !*** ./src/js/parsers/simpler.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ simpler; }
/* harmony export */ });
/* harmony import */ var _data_simpler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/simpler */ "./src/js/data/simpler.js");

const expression = new RegExp('\\b(' + _data_simpler__WEBPACK_IMPORTED_MODULE_0__["default"].map(_ref => {
  let {
    value
  } = _ref;
  return value;
}).join('|') + ')\\b', 'gi');
function simpler(text) {
  const matches = [...text.matchAll(expression)];

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    const [value] = [...match].filter(Boolean);
    const replacement = _data_simpler__WEBPACK_IMPORTED_MODULE_0__["default"].find(_ref2 => {
      let {
        value: word
      } = _ref2;
      return word === value;
    });
    return {
      value,
      type: 'simpler',
      level: 'suggestion',
      message: `"${value}" has a simpler alternative`,
      index: match.index,
      offset: value.length + match.index,
      replacements: replacement?.replace ? replacement.replace.split(', ').map(value => ({
        value: value.toLocaleLowerCase(),
        action: 'replace'
      })) : []
    };
  });
}

/***/ }),

/***/ "./src/js/parsers/so.js":
/*!******************************!*\
  !*** ./src/js/parsers/so.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (text => {
  const expression = new RegExp(/^(\s)*so\b[\s\S]/gi);
  const matches = [...text.matchAll(expression)];

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    const [value] = [...match].filter(Boolean);
    return {
      value,
      type: 'so',
      level: 'suggestion',
      message: 'omit "So" from the beginning of sentences',
      index: match.index,
      offset: value.length + match.index,
      replacements: [{
        action: 'delete',
        value: ''
      }]
    };
  });
});

/***/ }),

/***/ "./src/js/parsers/weasel.js":
/*!**********************************!*\
  !*** ./src/js/parsers/weasel.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ weasel; }
/* harmony export */ });
/* harmony import */ var _data_weasel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/weasel */ "./src/js/data/weasel.js");

const expression = new RegExp('\\b(' + _data_weasel__WEBPACK_IMPORTED_MODULE_0__["default"].list.join('|') + ')\\b', 'gi');
function weasel(text) {
  const matches = [...text.matchAll(expression)];

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    const [value] = [...match].filter(Boolean);
    return {
      value,
      type: 'weasel',
      level: 'warning',
      message: `"${value}" is a weasel word`,
      index: match.index,
      offset: value.length + match.index,
      replacements: [{
        action: 'delete',
        value: ''
      }]
    };
  });
}
;

/***/ }),

/***/ "./src/js/reading-score.js":
/*!*********************************!*\
  !*** ./src/js/reading-score.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readingScore": function() { return /* binding */ readingScore; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/wordcount */ "@wordpress/wordcount");
/* harmony import */ var _wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reading-time/lib/reading-time */ "./node_modules/reading-time/lib/reading-time.js");
/* harmony import */ var reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var automated_readability__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! automated-readability */ "./node_modules/automated-readability/index.js");
/* harmony import */ var polarity__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! polarity */ "./node_modules/polarity/index.js");
/* harmony import */ var _utils_strip_astrals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/strip-astrals */ "./src/js/utils/strip-astrals.js");
/* harmony import */ var _utils_strip_html_comments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/strip-html-comments */ "./src/js/utils/strip-html-comments.js");
/* harmony import */ var _utils_strip_spaces__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/strip-spaces */ "./src/js/utils/strip-spaces.js");
/* harmony import */ var _utils_strip_tags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/strip-tags */ "./src/js/utils/strip-tags.js");
/* harmony import */ var _utils_strip_html_entities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/strip-html-entities */ "./src/js/utils/strip-html-entities.js");
/* harmony import */ var _tokenizer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tokenizer */ "./src/js/tokenizer.js");











/**
 * 
 * @param {string} text
 */

const readingScore = content => {
  const text = `${(0,lodash__WEBPACK_IMPORTED_MODULE_0__.flow)(_utils_strip_tags__WEBPACK_IMPORTED_MODULE_6__["default"], _utils_strip_html_comments__WEBPACK_IMPORTED_MODULE_4__["default"], _utils_strip_astrals__WEBPACK_IMPORTED_MODULE_3__["default"], _utils_strip_spaces__WEBPACK_IMPORTED_MODULE_5__["default"], _utils_strip_html_entities__WEBPACK_IMPORTED_MODULE_7__["default"])(content)}\n`;
  /**
   * Not very accurate at the moment.
   */

  const paragraphs = text.replace(/\n$/gm, '').split(/\n/g).filter(line => line.length);
  const {
    sentences,
    words
  } = (0,_tokenizer__WEBPACK_IMPORTED_MODULE_8__.tokenize)(paragraphs.join(' '));
  const wordCount = (0,_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__.count)(text, 'words');
  const characterCount = (0,_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__.count)(text, 'characters_including_spaces');
  const alphaNumericCharacters = text.match(/[a-zA-Z0-9]/g);
  const letters = text.match(/[a-zA-Z]/g)?.length || 0;
  const score = (0,automated_readability__WEBPACK_IMPORTED_MODULE_9__.automatedReadability)({
    sentence: sentences.length,
    word: wordCount,
    character: alphaNumericCharacters?.length || 0
  });
  const {
    polarity: polarityScore
  } = (0,polarity__WEBPACK_IMPORTED_MODULE_10__.polarity)(words);
  const {
    minutes
  } = reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_2___default()(text, {
    wordsPerMinute: 275
  });
  return {
    paragraphs: paragraphs.length,
    sentences: sentences.length,
    words: words.length,
    characters: characterCount,
    score: Math.round(score),
    letters,
    polarity: polarityScore,
    readingTime: minutes
  };
};

/***/ }),

/***/ "./src/js/store/actions.js":
/*!*********************************!*\
  !*** ./src/js/store/actions.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProblems": function() { return /* binding */ addProblems; },
/* harmony export */   "removeProblem": function() { return /* binding */ removeProblem; }
/* harmony export */ });
function addProblems(problems) {
  return {
    type: 'UPDATE_PROBLEMS',
    problems
  };
}
function removeProblem(name) {
  return {
    type: 'REMOVE_PROBLEM',
    name
  };
}

/***/ }),

/***/ "./src/js/store/index.js":
/*!*******************************!*\
  !*** ./src/js/store/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": function() { return /* binding */ store; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer */ "./src/js/store/reducer.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./src/js/store/selectors.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "./src/js/store/actions.js");

/**
 * Internal dependencies
 */




const STORE_NAME = 'writers-blocks/syntax';
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(STORE_NAME, {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_2__,
  actions: _actions__WEBPACK_IMPORTED_MODULE_3__
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);

/***/ }),

/***/ "./src/js/store/reducer.js":
/*!*********************************!*\
  !*** ./src/js/store/reducer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "problems": function() { return /* binding */ problems; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const {
  btoa
} = window;
function problems() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    problems: []
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_PROBLEMS':
      return { ...state,
        problems: [...(Array.isArray(action.problems) ? action.problems : [action.problems]).map(problem => ({ ...problem,
          id: btoa(`${problem.blockId}-${problem.type}-${problem.index}-${problem.offset}`)
        }))]
      };

    case 'REMOVE_PROBLEM':
      return { ...state,
        problems: state.problems.filter(problem => problem.id !== action.name)
      };

    default:
      return state;
  }
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
  problems
}));

/***/ }),

/***/ "./src/js/store/selectors.js":
/*!***********************************!*\
  !*** ./src/js/store/selectors.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getProblems": function() { return /* binding */ getProblems; },
/* harmony export */   "getProblem": function() { return /* binding */ getProblem; },
/* harmony export */   "getBlockProblems": function() { return /* binding */ getBlockProblems; }
/* harmony export */ });
const getProblems = state => state.problems.problems;
const getProblem = (state, id) => state.problems.problems.find(problem => problem.id === id);
const getBlockProblems = (state, blockId) => state.problems.problems.filter(problem => problem.blockId === blockId);

/***/ }),

/***/ "./src/js/tokenizer.js":
/*!*****************************!*\
  !*** ./src/js/tokenizer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tokenize": function() { return /* binding */ tokenize; }
/* harmony export */ });
/* harmony import */ var sentence_tokenizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sentence-tokenizer */ "./node_modules/sentence-tokenizer/lib/tokenizer.js");
/* harmony import */ var sentence_tokenizer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sentence_tokenizer__WEBPACK_IMPORTED_MODULE_0__);

const tokenize = text => {
  const tokenizer = new (sentence_tokenizer__WEBPACK_IMPORTED_MODULE_0___default())();
  tokenizer.setEntry(text);

  try {
    return {
      sentences: tokenizer.getSentences(),
      words: tokenizer.getTokens()
    };
  } catch (error) {
    return {
      sentences: 0,
      words: 0
    };
  }
};

/***/ }),

/***/ "./src/js/utils/strip-astrals.js":
/*!***************************************!*\
  !*** ./src/js/utils/strip-astrals.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripAstrals; }
/* harmony export */ });
/**
 * Replaces items matched in the regex with character.
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
function stripAstrals(text) {
  return text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, 'a');
}

/***/ }),

/***/ "./src/js/utils/strip-html-comments.js":
/*!*********************************************!*\
  !*** ./src/js/utils/strip-html-comments.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripHTMLComments; }
/* harmony export */ });
/**
 * Removes items matched in the regex.
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
function stripHTMLComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

/***/ }),

/***/ "./src/js/utils/strip-html-entities.js":
/*!*********************************************!*\
  !*** ./src/js/utils/strip-html-entities.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripHTMLEntities; }
/* harmony export */ });
/**
 * Replaces items matched in the regex with a single character.
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
function stripHTMLEntities(text) {
  return text.replace(/&\S+?;/g, 'a');
}

/***/ }),

/***/ "./src/js/utils/strip-spaces.js":
/*!**************************************!*\
  !*** ./src/js/utils/strip-spaces.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripSpaces; }
/* harmony export */ });
/**
 * Replaces items matched in the regex with spaces.
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
function stripSpaces(text) {
  return text.replace(/&nbsp;|&#160;/gi, ' ');
}

/***/ }),

/***/ "./src/js/utils/strip-tags.js":
/*!************************************!*\
  !*** ./src/js/utils/strip-tags.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripTags; }
/* harmony export */ });
/**
 * Replaces items matched in the regex with new line
 *
 * @param {string} text The string being counted.
 *
 * @return {string} The manipulated text.
 */
function stripTags(text) {
  return text.replace(/<\/?[a-z][^>]*?>/gi, '\n');
}

/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ (function(module) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/reading-time/lib/reading-time.js":
/*!*******************************************************!*\
  !*** ./node_modules/reading-time/lib/reading-time.js ***!
  \*******************************************************/
/***/ (function(module) {

"use strict";
/*!
 * reading-time
 * Copyright (c) Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */



/**
 * @typedef {import('reading-time').Options['wordBound']} WordBoundFunction
 */

/**
 * @param {number} number
 * @param {number[][]} arrayOfRanges
 */
function codeIsInRanges(number, arrayOfRanges) {
  return arrayOfRanges.some(([lowerBound, upperBound]) =>
    (lowerBound <= number) && (number <= upperBound)
  )
}

/**
 * @type {WordBoundFunction}
 */
function isCJK(c) {
  if ('string' !== typeof c) {
    return false
  }
  const charCode = c.charCodeAt(0)
  // Help wanted!
  // This should be good for most cases, but if you find it unsatisfactory
  // (e.g. some other language where each character should be standalone words),
  // contributions welcome!
  return codeIsInRanges(
    charCode,
    [
      // Hiragana (Katakana not included on purpose,
      // context: https://github.com/ngryman/reading-time/pull/35#issuecomment-853364526)
      // If you think Katakana should be included and have solid reasons, improvement is welcomed
      [0x3040, 0x309f],
      // CJK Unified ideographs
      [0x4e00, 0x9fff],
      // Hangul
      [0xac00, 0xd7a3],
      // CJK extensions
      [0x20000, 0x2ebe0]
    ]
  )
}

/**
 * @type {WordBoundFunction}
 */
function isAnsiWordBound(c) {
  return ' \n\r\t'.includes(c)
}

/**
 * @type {WordBoundFunction}
 */
function isPunctuation(c) {
  if ('string' !== typeof c) {
    return false
  }
  const charCode = c.charCodeAt(0)
  return codeIsInRanges(
    charCode,
    [
      [0x21, 0x2f],
      [0x3a, 0x40],
      [0x5b, 0x60],
      [0x7b, 0x7e],
      // CJK Symbols and Punctuation
      [0x3000, 0x303f],
      // Full-width ASCII punctuation variants
      [0xff00, 0xffef]
    ]
  )
}

/**
 * @type {import('reading-time').default}
 */
function readingTime(text, options = {}) {
  let words = 0, start = 0, end = text.length - 1

  // use provided value if available
  const wordsPerMinute = options.wordsPerMinute || 200

  // use provided function if available
  const isWordBound = options.wordBound || isAnsiWordBound

  // fetch bounds
  while (isWordBound(text[start])) start++
  while (isWordBound(text[end])) end--

  // Add a trailing word bound to make handling edges more convenient
  const normalizedText = `${text}\n`

  // calculate the number of words
  for (let i = start; i <= end; i++) {
    // A CJK character is a always word;
    // A non-word bound followed by a word bound / CJK is the end of a word.
    if (
      isCJK(normalizedText[i]) ||
      (!isWordBound(normalizedText[i]) &&
        (isWordBound(normalizedText[i + 1]) || isCJK(normalizedText[i + 1]))
      )
    ) {
      words++
    }
    // In case of CJK followed by punctuations, those characters have to be eaten as well
    if (isCJK(normalizedText[i])) {
      while (
        i <= end &&
        (isPunctuation(normalizedText[i + 1]) || isWordBound(normalizedText[i + 1]))
      ) {
        i++
      }
    }
  }

  // reading time stats
  const minutes = words / wordsPerMinute
  // Math.round used to resolve floating point funkyness
  //   http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
  const time = Math.round(minutes * 60 * 1000)
  const displayed = Math.ceil(minutes.toFixed(2))

  return {
    text: displayed + ' min read',
    minutes: minutes,
    time: time,
    words: words
  }
}

/**
 * Export
 */
module.exports = readingTime


/***/ }),

/***/ "./node_modules/sentence-tokenizer/lib/tokenizer.js":
/*!**********************************************************!*\
  !*** ./node_modules/sentence-tokenizer/lib/tokenizer.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-unused-vars
var debug = __webpack_require__(/*! debug */ "./node_modules/sentence-tokenizer/node_modules/debug/src/browser.js")('tokenizer');

function compact(str) {
  var res = str.trim();
  res = res.replace('  ', ' ');
  return res;
}

function Tokenizer(username, botname) {

  // // Maybe it is not useful
  // if (!(this instanceof Tokenizer)) {
  //   return new Tokenizer();
  // }

  this.username = username || 'Guy';
  this.entry = null;
  this.sentences = null;

  if (typeof botname == 'string') {
    this.botname = botname;
  }
  else {
    this.botname = 'ECTOR';
  }
}

Tokenizer.prototype = {
  setEntry : function (entry) {
    this.entry = compact(entry);
    this.sentences = null;
  },
  // Split the entry into sentences.
  getSentences : function () {
    // this.sentences = this.entry.split(/[\.!]\s/);
    if (!this.entry) return [];
    var words = this.entry.split(' ');
    var endingWords = words.filter(function(w) {
      return w.endsWith('.') || w.endsWith('!') || w.endsWith('?');
    });

    var self = this;
    var botnameRegExp = new RegExp("\\W?" + self.botname.normalize() + "\\W?");
    var usernameRegExp = new RegExp("\\W?" + self.username.normalize() + "\\W?");
    var lastSentence = words[0];
    self.sentences = [];
    words.reduce(function (prev, cur) {
      var curNormalized = cur.normalize();
      var curReplaced = cur;
      if (curNormalized.search(botnameRegExp) !== -1) {
        curReplaced = cur.replace(self.botname,"{yourname}");
      }
      else if (curNormalized.search(usernameRegExp) !== -1) {
        curReplaced = cur.replace(self.username,"{myname}");
      }

      if (endingWords.indexOf(prev) != -1) {
        self.sentences.push(compact(lastSentence));
        lastSentence = "";
      }
      lastSentence = lastSentence + " " + curReplaced;
      return cur;
    });
    self.sentences.push(compact(lastSentence));
    return this.sentences;
  },
  // Get the tokens of one sentence
  getTokens : function (sentenceIndex) {
    var s = 0;
    if(typeof sentenceIndex === 'number') s = sentenceIndex;
    return this.sentences[s].split(' ');
  }
};

module.exports = Tokenizer;

/***/ }),

/***/ "./node_modules/sentence-tokenizer/node_modules/debug/src/browser.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sentence-tokenizer/node_modules/debug/src/browser.js ***!
  \***************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/sentence-tokenizer/node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/sentence-tokenizer/node_modules/debug/src/common.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sentence-tokenizer/node_modules/debug/src/common.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/wordcount":
/*!***********************************!*\
  !*** external ["wp","wordcount"] ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["wordcount"];

/***/ }),

/***/ "./node_modules/afinn-165/index.js":
/*!*****************************************!*\
  !*** ./node_modules/afinn-165/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afinn165": function() { return /* binding */ afinn165; }
/* harmony export */ });
/** @type {Record<string, number>} */
const afinn165 = {
  abandon: -2,
  abandoned: -2,
  abandons: -2,
  abducted: -2,
  abduction: -2,
  abductions: -2,
  abhor: -3,
  abhorred: -3,
  abhorrent: -3,
  abhors: -3,
  abilities: 2,
  ability: 2,
  aboard: 1,
  aborted: -1,
  aborts: -1,
  absentee: -1,
  absentees: -1,
  absolve: 2,
  absolved: 2,
  absolves: 2,
  absolving: 2,
  absorbed: 1,
  abuse: -3,
  abused: -3,
  abuses: -3,
  abusing: -3,
  abusive: -3,
  accept: 1,
  acceptable: 1,
  acceptance: 1,
  accepted: 1,
  accepting: 1,
  accepts: 1,
  accessible: 1,
  accident: -2,
  accidental: -2,
  accidentally: -2,
  accidents: -2,
  acclaim: 2,
  acclaimed: 2,
  accolade: 2,
  accomplish: 2,
  accomplished: 2,
  accomplishes: 2,
  accomplishment: 2,
  accomplishments: 2,
  accusation: -2,
  accusations: -2,
  accuse: -2,
  accused: -2,
  accuses: -2,
  accusing: -2,
  ache: -2,
  achievable: 1,
  aching: -2,
  acquit: 2,
  acquits: 2,
  acquitted: 2,
  acquitting: 2,
  acrimonious: -3,
  active: 1,
  adequate: 1,
  admire: 3,
  admired: 3,
  admires: 3,
  admiring: 3,
  admit: -1,
  admits: -1,
  admitted: -1,
  admonish: -2,
  admonished: -2,
  adopt: 1,
  adopts: 1,
  adorable: 3,
  adoration: 3,
  adore: 3,
  adored: 3,
  adores: 3,
  adoring: 3,
  adoringly: 3,
  advanced: 1,
  advantage: 2,
  advantageous: 2,
  advantageously: 2,
  advantages: 2,
  adventure: 2,
  adventures: 2,
  adventurous: 2,
  adversary: -1,
  advisable: 1,
  affected: -1,
  affection: 3,
  affectionate: 3,
  affectionateness: 3,
  afflicted: -1,
  affordable: 2,
  affronted: -1,
  aficionados: 2,
  afraid: -2,
  aggravate: -2,
  aggravated: -2,
  aggravates: -2,
  aggravating: -2,
  aggression: -2,
  aggressions: -2,
  aggressive: -2,
  aggressiveness: -2,
  aghast: -2,
  agog: 2,
  agonise: -3,
  agonised: -3,
  agonises: -3,
  agonising: -3,
  agonize: -3,
  agonized: -3,
  agonizes: -3,
  agonizing: -3,
  agree: 1,
  agreeable: 2,
  agreed: 1,
  agreement: 1,
  agrees: 1,
  alarm: -2,
  alarmed: -2,
  alarmist: -2,
  alarmists: -2,
  alas: -1,
  alert: -1,
  alienation: -2,
  alive: 1,
  allegation: -2,
  allegations: -2,
  allergic: -2,
  allow: 1,
  ally: 2,
  alone: -2,
  altruistic: 2,
  amaze: 2,
  amazed: 2,
  amazes: 2,
  amazing: 4,
  ambitious: 2,
  ambivalent: -1,
  amicable: 2,
  amuse: 3,
  amused: 3,
  amusement: 3,
  amusements: 3,
  anger: -3,
  angered: -3,
  angers: -3,
  angry: -3,
  anguish: -3,
  anguished: -3,
  animosity: -2,
  annoy: -2,
  annoyance: -2,
  annoyed: -2,
  annoying: -2,
  annoys: -2,
  antagonistic: -2,
  anti: -1,
  anticipation: 1,
  anxiety: -2,
  anxious: -2,
  apathetic: -3,
  apathy: -3,
  apeshit: -3,
  apocalyptic: -2,
  apologise: -1,
  apologised: -1,
  apologises: -1,
  apologising: -1,
  apologize: -1,
  apologized: -1,
  apologizes: -1,
  apologizing: -1,
  apology: -1,
  appalled: -2,
  appalling: -2,
  appealing: 2,
  appease: 2,
  appeased: 2,
  appeases: 2,
  appeasing: 2,
  applaud: 2,
  applauded: 2,
  applauding: 2,
  applauds: 2,
  applause: 2,
  appreciate: 2,
  appreciated: 2,
  appreciates: 2,
  appreciating: 2,
  appreciation: 2,
  apprehensive: -2,
  appropriate: 2,
  appropriately: 2,
  approval: 2,
  approved: 2,
  approves: 2,
  ardent: 1,
  arrest: -2,
  arrested: -3,
  arrests: -2,
  arrogant: -2,
  arsehole: -4,
  ashame: -2,
  ashamed: -2,
  ass: -4,
  assassination: -3,
  assassinations: -3,
  assault: -2,
  assaults: -2,
  asset: 2,
  assets: 2,
  assfucking: -4,
  asshole: -4,
  astonished: 2,
  astound: 3,
  astounded: 3,
  astounding: 3,
  astoundingly: 3,
  astounds: 3,
  atrocious: -3,
  atrocity: -3,
  attack: -1,
  attacked: -1,
  attacking: -1,
  attacks: -1,
  attract: 1,
  attracted: 1,
  attracting: 2,
  attraction: 2,
  attractions: 2,
  attractive: 2,
  attractively: 2,
  attractiveness: 2,
  attracts: 1,
  audacious: 3,
  aura: 1,
  authority: 1,
  avenge: -2,
  avenged: -2,
  avenger: -2,
  avengers: -2,
  avenges: -2,
  avenging: -2,
  avert: -1,
  averted: -1,
  averts: -1,
  avid: 2,
  avoid: -1,
  avoided: -1,
  avoids: -1,
  await: -1,
  awaited: -1,
  awaits: -1,
  award: 3,
  awarded: 3,
  awards: 3,
  awesome: 4,
  awful: -3,
  awkward: -2,
  axe: -1,
  axed: -1,
  backed: 1,
  backing: 2,
  backs: 1,
  bad: -3,
  'bad luck': -2,
  badass: -3,
  badly: -3,
  badness: -3,
  bailout: -2,
  balanced: 1,
  bamboozle: -2,
  bamboozled: -2,
  bamboozles: -2,
  ban: -2,
  banish: -1,
  bankrupt: -3,
  bankruptcy: -3,
  bankster: -3,
  banned: -2,
  barbarian: -2,
  barbaric: -2,
  barbarous: -2,
  bargain: 2,
  barrier: -2,
  bastard: -5,
  bastards: -5,
  battle: -1,
  battled: -1,
  battles: -1,
  battling: -2,
  beaten: -2,
  beatific: 3,
  beating: -1,
  beauties: 3,
  beautiful: 3,
  beautifully: 3,
  beautify: 3,
  beauty: 3,
  befit: 2,
  befitting: 2,
  belittle: -2,
  belittled: -2,
  beloved: 3,
  benefactor: 2,
  benefactors: 2,
  benefit: 2,
  benefits: 2,
  benefitted: 2,
  benefitting: 2,
  benevolent: 3,
  bereave: -2,
  bereaved: -2,
  bereaves: -2,
  bereaving: -2,
  best: 3,
  'best damn': 4,
  betray: -3,
  betrayal: -3,
  betrayed: -3,
  betraying: -3,
  betrays: -3,
  better: 2,
  bias: -1,
  biased: -2,
  big: 1,
  bitch: -5,
  bitches: -5,
  bitter: -2,
  bitterest: -2,
  bitterly: -2,
  bizarre: -2,
  blackmail: -3,
  blackmailed: -3,
  blackmailing: -3,
  blackmails: -3,
  blah: -2,
  blame: -2,
  blamed: -2,
  blames: -2,
  blaming: -2,
  bless: 2,
  blesses: 2,
  blessing: 3,
  blessings: 3,
  blind: -1,
  bliss: 3,
  blissful: 3,
  blithe: 2,
  bloated: -1,
  block: -1,
  blockade: -2,
  blockbuster: 3,
  blocked: -1,
  blocking: -1,
  blocks: -1,
  bloody: -3,
  blurry: -2,
  boastful: -2,
  bold: 2,
  boldly: 2,
  bomb: -1,
  boost: 1,
  boosted: 1,
  boosting: 1,
  boosts: 1,
  bore: -2,
  bored: -2,
  boring: -3,
  bother: -2,
  bothered: -2,
  bothers: -2,
  bothersome: -2,
  boycott: -2,
  boycotted: -2,
  boycotting: -2,
  boycotts: -2,
  brainwashing: -3,
  brave: 2,
  braveness: 2,
  bravery: 2,
  bravura: 3,
  breach: -2,
  breached: -2,
  breaches: -2,
  breaching: -2,
  breakthrough: 3,
  breathtaking: 5,
  bribe: -3,
  bribed: -3,
  bribes: -3,
  bribing: -3,
  bright: 1,
  brightest: 2,
  brightness: 1,
  brilliant: 4,
  brilliance: 3,
  brilliances: 3,
  brisk: 2,
  broke: -1,
  broken: -1,
  brooding: -2,
  brutal: -3,
  brutally: -3,
  bullied: -2,
  bullshit: -4,
  bully: -2,
  bullying: -2,
  bummer: -2,
  buoyant: 2,
  burden: -2,
  burdened: -2,
  burdening: -2,
  burdens: -2,
  burglar: -2,
  burglary: -2,
  calm: 2,
  calmed: 2,
  calming: 2,
  calms: 2,
  "can't stand": -3,
  cancel: -1,
  cancelled: -1,
  cancelling: -1,
  cancels: -1,
  cancer: -1,
  capabilities: 1,
  capability: 1,
  capable: 1,
  captivated: 3,
  care: 2,
  carefree: 1,
  careful: 2,
  carefully: 2,
  carefulness: 2,
  careless: -2,
  cares: 2,
  caring: 2,
  'cashing in': -2,
  casualty: -2,
  catastrophe: -3,
  catastrophic: -4,
  cautious: -1,
  celebrate: 3,
  celebrated: 3,
  celebrates: 3,
  celebrating: 3,
  celebration: 3,
  celebrations: 3,
  censor: -2,
  censored: -2,
  censors: -2,
  certain: 1,
  chagrin: -2,
  chagrined: -2,
  challenge: -1,
  champion: 2,
  championed: 2,
  champions: 2,
  chance: 2,
  chances: 2,
  chaos: -2,
  chaotic: -2,
  charged: -3,
  charges: -2,
  charisma: 2,
  charitable: 2,
  charm: 3,
  charming: 3,
  charmingly: 3,
  charmless: -3,
  chastise: -3,
  chastised: -3,
  chastises: -3,
  chastising: -3,
  cheat: -3,
  cheated: -3,
  cheater: -3,
  cheaters: -3,
  cheating: -3,
  cheats: -3,
  cheer: 2,
  cheered: 2,
  cheerful: 2,
  cheerfully: 2,
  cheering: 2,
  cheerless: -2,
  cheers: 2,
  cheery: 3,
  cherish: 2,
  cherished: 2,
  cherishes: 2,
  cherishing: 2,
  chic: 2,
  chide: -3,
  chided: -3,
  chides: -3,
  chiding: -3,
  childish: -2,
  chilling: -1,
  choke: -2,
  choked: -2,
  chokes: -2,
  choking: -2,
  clarifies: 2,
  clarity: 2,
  clash: -2,
  classy: 3,
  clean: 2,
  cleaner: 2,
  clear: 1,
  cleared: 1,
  clearly: 1,
  clears: 1,
  clever: 2,
  clouded: -1,
  clueless: -2,
  cock: -5,
  cocksucker: -5,
  cocksuckers: -5,
  cocky: -2,
  coerced: -2,
  coercion: -2,
  collapse: -2,
  collapsed: -2,
  collapses: -2,
  collapsing: -2,
  collide: -1,
  collides: -1,
  colliding: -1,
  collision: -2,
  collisions: -2,
  colluding: -3,
  combat: -1,
  combats: -1,
  comedy: 1,
  comfort: 2,
  comfortable: 2,
  comfortably: 2,
  comforting: 2,
  comforts: 2,
  comic: 1,
  commend: 2,
  commended: 2,
  commit: 1,
  commitment: 2,
  commits: 1,
  committed: 1,
  committing: 1,
  compassion: 2,
  compassionate: 2,
  compelled: 1,
  competencies: 1,
  competent: 2,
  competitive: 2,
  complacent: -2,
  complain: -2,
  complained: -2,
  complaining: -2,
  complains: -2,
  complaint: -2,
  complaints: -2,
  complicating: -2,
  compliment: 2,
  complimented: 2,
  compliments: 2,
  comprehensive: 2,
  concerned: -2,
  conciliate: 2,
  conciliated: 2,
  conciliates: 2,
  conciliating: 2,
  condemn: -2,
  condemnation: -2,
  condemned: -2,
  condemns: -2,
  confidence: 2,
  confident: 2,
  confidently: 2,
  conflict: -2,
  conflicting: -2,
  conflictive: -2,
  conflicts: -2,
  confuse: -2,
  confused: -2,
  confusing: -2,
  congrats: 2,
  congratulate: 2,
  congratulation: 2,
  congratulations: 2,
  consent: 2,
  consents: 2,
  consolable: 2,
  conspiracy: -3,
  constipation: -2,
  constrained: -2,
  contagion: -2,
  contagions: -2,
  contagious: -1,
  contaminant: -2,
  contaminants: -2,
  contaminate: -2,
  contaminated: -2,
  contaminates: -2,
  contaminating: -2,
  contamination: -2,
  contaminations: -2,
  contempt: -2,
  contemptible: -2,
  contemptuous: -2,
  contemptuously: -2,
  contend: -1,
  contender: -1,
  contending: -1,
  contentious: -2,
  contestable: -2,
  controversial: -2,
  controversially: -2,
  controversies: -2,
  controversy: -2,
  convicted: -2,
  convince: 1,
  convinced: 1,
  convinces: 1,
  convivial: 2,
  cool: 1,
  'cool stuff': 3,
  cornered: -2,
  corpse: -1,
  corrupt: -3,
  corrupted: -3,
  corrupting: -3,
  corruption: -3,
  corrupts: -3,
  costly: -2,
  courage: 2,
  courageous: 2,
  courageously: 2,
  courageousness: 2,
  courteous: 2,
  courtesy: 2,
  'cover-up': -3,
  coward: -2,
  cowardly: -2,
  coziness: 2,
  cramp: -1,
  crap: -3,
  crappy: -3,
  crash: -2,
  crazier: -2,
  craziest: -2,
  crazy: -2,
  creative: 2,
  crestfallen: -2,
  cried: -2,
  cries: -2,
  crime: -3,
  crimes: -3,
  criminal: -3,
  criminals: -3,
  criminate: -3,
  criminated: -3,
  criminates: -3,
  crisis: -3,
  critic: -2,
  criticise: -2,
  criticised: -2,
  criticises: -2,
  criticising: -2,
  criticism: -2,
  criticize: -2,
  criticized: -2,
  criticizes: -2,
  criticizing: -2,
  critics: -2,
  critique: -2,
  crowding: -1,
  crude: -1,
  cruel: -3,
  cruelty: -3,
  crush: -1,
  crushed: -2,
  crushes: -1,
  crushing: -1,
  cry: -1,
  crying: -2,
  cunning: 2,
  cunt: -5,
  curious: 1,
  curse: -1,
  cut: -1,
  cutback: -2,
  cutbacks: -2,
  cute: 2,
  cuts: -1,
  cutting: -1,
  cynic: -2,
  cynical: -2,
  cynicism: -2,
  damage: -3,
  damaged: -3,
  damages: -3,
  damaging: -3,
  damn: -2,
  'damn cute': 3,
  'damn good': 4,
  damned: -4,
  damnit: -4,
  danger: -2,
  dangerous: -2,
  dangerously: -2,
  daredevil: 2,
  daring: 2,
  darkest: -2,
  darkness: -1,
  dauntless: 2,
  dazzling: 3,
  dead: -3,
  deadening: -2,
  deadlock: -2,
  deadly: -3,
  deafening: -1,
  dear: 2,
  dearly: 3,
  death: -2,
  deaths: -2,
  debonair: 2,
  debt: -2,
  deceit: -3,
  deceitful: -3,
  deceive: -3,
  deceived: -3,
  deceives: -3,
  deceiving: -3,
  deception: -3,
  deceptive: -3,
  decisive: 1,
  dedicated: 2,
  dedication: 2,
  defeat: -2,
  defeated: -2,
  defect: -3,
  defective: -3,
  defects: -3,
  defender: 2,
  defenders: 2,
  defenseless: -2,
  defer: -1,
  deferring: -1,
  defiant: -1,
  deficient: -2,
  deficiency: -2,
  deficiencies: -2,
  deficit: -2,
  deformed: -2,
  deformities: -2,
  deformity: -2,
  defraud: -3,
  defrauds: -3,
  deft: 2,
  defunct: -2,
  degrade: -2,
  degraded: -2,
  degrades: -2,
  dehumanize: -2,
  dehumanized: -2,
  dehumanizes: -2,
  dehumanizing: -2,
  deject: -2,
  dejected: -2,
  dejecting: -2,
  dejects: -2,
  delay: -1,
  delayed: -1,
  delectable: 3,
  delicious: 3,
  delight: 3,
  delighted: 3,
  delightful: 3,
  delightfully: 3,
  delighting: 3,
  delights: 3,
  demand: -1,
  demanded: -1,
  demanding: -1,
  demands: -1,
  demonstration: -1,
  demoralize: -2,
  demoralized: -2,
  demoralizes: -2,
  demoralizing: -2,
  denial: -2,
  denials: -2,
  denied: -2,
  denier: -2,
  deniers: -2,
  denies: -2,
  denounce: -2,
  denounces: -2,
  dent: -2,
  deny: -2,
  denying: -2,
  deplore: -3,
  deplored: -3,
  deplores: -3,
  deploring: -3,
  deport: -2,
  deported: -2,
  deporting: -2,
  deports: -2,
  deportation: -2,
  deportations: -2,
  depressed: -2,
  depressing: -2,
  deprivation: -3,
  derail: -2,
  derailed: -2,
  derails: -2,
  derelict: -2,
  deride: -2,
  derided: -2,
  derides: -2,
  deriding: -2,
  derision: -2,
  desirable: 2,
  desire: 1,
  desired: 2,
  desirous: 2,
  despair: -3,
  despairing: -3,
  despairs: -3,
  desperate: -3,
  desperately: -3,
  despondent: -3,
  destroy: -3,
  destroyed: -3,
  destroying: -3,
  destroys: -3,
  destruction: -3,
  destructive: -3,
  detached: -1,
  detain: -2,
  detained: -2,
  detention: -2,
  deteriorate: -2,
  deteriorated: -2,
  deteriorates: -2,
  deteriorating: -2,
  determined: 2,
  deterrent: -2,
  detract: -1,
  detracted: -1,
  detracts: -1,
  devastate: -2,
  devastated: -2,
  devastating: -2,
  devastation: -2,
  devastations: -2,
  devoted: 3,
  devotion: 2,
  devotional: 2,
  diamond: 1,
  dick: -4,
  dickhead: -4,
  die: -3,
  died: -3,
  difficult: -1,
  diffident: -2,
  dignity: 2,
  dilemma: -1,
  dilligence: 2,
  dipshit: -3,
  dire: -3,
  direful: -3,
  dirt: -2,
  dirtier: -2,
  dirtiest: -2,
  dirty: -2,
  disabilities: -2,
  disability: -2,
  disabling: -1,
  disadvantage: -2,
  disadvantaged: -2,
  disagree: -2,
  disagreeable: -2,
  disagreement: -2,
  disappear: -1,
  disappeared: -1,
  disappears: -1,
  disappoint: -2,
  disappointed: -2,
  disappointing: -2,
  disappointment: -2,
  disappointments: -2,
  disappoints: -2,
  disapproval: -2,
  disapprovals: -2,
  disapprove: -2,
  disapproved: -2,
  disapproves: -2,
  disapproving: -2,
  disaster: -2,
  disasters: -2,
  disastrous: -3,
  disbelieve: -2,
  discard: -1,
  discarded: -1,
  discarding: -1,
  discards: -1,
  discernment: 2,
  discomfort: -2,
  disconsolate: -2,
  disconsolation: -2,
  discontented: -2,
  discord: -2,
  discounted: -1,
  discouraged: -2,
  discredited: -2,
  discriminate: -2,
  discriminated: -2,
  discriminates: -2,
  discriminating: -2,
  discriminatory: -2,
  disdain: -2,
  disease: -1,
  diseases: -1,
  disgrace: -2,
  disgraced: -2,
  disguise: -1,
  disguised: -1,
  disguises: -1,
  disguising: -1,
  disgust: -3,
  disgusted: -3,
  disgustful: -3,
  disgusting: -3,
  disheartened: -2,
  dishonest: -2,
  disillusioned: -2,
  disinclined: -2,
  disjointed: -2,
  dislike: -2,
  disliked: -2,
  dislikes: -2,
  dismal: -2,
  dismayed: -2,
  dismissed: -2,
  disorder: -2,
  disorders: -2,
  disorganized: -2,
  disoriented: -2,
  disparage: -2,
  disparaged: -2,
  disparages: -2,
  disparaging: -2,
  displeased: -2,
  displeasure: -2,
  disproportionate: -2,
  dispute: -2,
  disputed: -2,
  disputes: -2,
  disputing: -2,
  disqualified: -2,
  disquiet: -2,
  disregard: -2,
  disregarded: -2,
  disregarding: -2,
  disregards: -2,
  disrespect: -2,
  disrespected: -2,
  disrupt: -2,
  disrupted: -2,
  disrupting: -2,
  disruption: -2,
  disruptions: -2,
  disruptive: -2,
  disrupts: -2,
  dissatisfied: -2,
  distasteful: -2,
  distinguished: 2,
  distort: -2,
  distorted: -2,
  distorting: -2,
  distorts: -2,
  distract: -2,
  distracted: -2,
  distraction: -2,
  distracts: -2,
  distress: -2,
  distressed: -2,
  distresses: -2,
  distressing: -2,
  distrust: -3,
  distrustful: -3,
  disturb: -2,
  disturbed: -2,
  disturbing: -2,
  disturbs: -2,
  dithering: -2,
  diverting: -1,
  dizzy: -1,
  dodging: -2,
  dodgy: -2,
  'does not work': -3,
  dolorous: -2,
  donate: 2,
  donated: 2,
  donates: 2,
  donating: 2,
  donation: 2,
  'dont like': -2,
  doom: -2,
  doomed: -2,
  doubt: -1,
  doubted: -1,
  doubtful: -1,
  doubting: -1,
  doubts: -1,
  douche: -3,
  douchebag: -3,
  dour: -2,
  downcast: -2,
  downer: -2,
  downhearted: -2,
  downside: -2,
  drag: -1,
  dragged: -1,
  drags: -1,
  drained: -2,
  dread: -2,
  dreaded: -2,
  dreadful: -3,
  dreading: -2,
  dream: 1,
  dreams: 1,
  dreary: -2,
  droopy: -2,
  drop: -1,
  dropped: -1,
  drown: -2,
  drowned: -2,
  drowns: -2,
  drudgery: -2,
  drunk: -2,
  dubious: -2,
  dud: -2,
  dull: -2,
  dumb: -3,
  dumbass: -3,
  dump: -1,
  dumped: -2,
  dumps: -1,
  dupe: -2,
  duped: -2,
  dupery: -2,
  durable: 2,
  dying: -3,
  dysfunction: -2,
  eager: 2,
  earnest: 2,
  ease: 2,
  easy: 1,
  ecstatic: 4,
  eerie: -2,
  eery: -2,
  effective: 2,
  effectively: 2,
  effectiveness: 2,
  effortlessly: 2,
  elated: 3,
  elation: 3,
  elegant: 2,
  elegantly: 2,
  embarrass: -2,
  embarrassed: -2,
  embarrasses: -2,
  embarrassing: -2,
  embarrassment: -2,
  embezzlement: -3,
  embittered: -2,
  embrace: 1,
  emergency: -2,
  empathetic: 2,
  empower: 2,
  empowerment: 2,
  emptiness: -1,
  empty: -1,
  enchanted: 2,
  encourage: 2,
  encouraged: 2,
  encouragement: 2,
  encourages: 2,
  encouraging: 2,
  endorse: 2,
  endorsed: 2,
  endorsement: 2,
  endorses: 2,
  enemies: -2,
  enemy: -2,
  energetic: 2,
  engage: 1,
  engages: 1,
  engrossed: 1,
  engrossing: 3,
  enjoy: 2,
  enjoyable: 2,
  enjoyed: 2,
  enjoying: 2,
  enjoys: 2,
  enlighten: 2,
  enlightened: 2,
  enlightening: 2,
  enlightens: 2,
  ennui: -2,
  enrage: -2,
  enraged: -2,
  enrages: -2,
  enraging: -2,
  enrapture: 3,
  enslave: -2,
  enslaved: -2,
  enslaves: -2,
  ensure: 1,
  ensuring: 1,
  enterprising: 1,
  entertaining: 2,
  enthral: 3,
  enthusiastic: 3,
  entitled: 1,
  entrusted: 2,
  envies: -1,
  envious: -2,
  'environment-friendly': 2,
  envy: -1,
  envying: -1,
  erroneous: -2,
  error: -2,
  errors: -2,
  escape: -1,
  escapes: -1,
  escaping: -1,
  esteem: 2,
  esteemed: 2,
  ethical: 2,
  euphoria: 3,
  euphoric: 4,
  evacuate: -1,
  evacuated: -1,
  evacuates: -1,
  evacuating: -1,
  evacuation: -1,
  evergreen: 2,
  evergreens: 2,
  evergreening: -3,
  eviction: -1,
  evil: -3,
  exacerbate: -2,
  exacerbated: -2,
  exacerbates: -2,
  exacerbating: -2,
  exaggerate: -2,
  exaggerated: -2,
  exaggerates: -2,
  exaggerating: -2,
  exasparate: -2,
  exasperated: -2,
  exasperates: -2,
  exasperating: -2,
  excellence: 3,
  excellent: 3,
  excite: 3,
  excited: 3,
  excitement: 3,
  exciting: 3,
  exclude: -1,
  excluded: -2,
  exclusion: -1,
  exclusive: 2,
  excruciatingly: -1,
  excuse: -1,
  exempt: -1,
  exhausted: -2,
  exhilarated: 3,
  exhilarates: 3,
  exhilarating: 3,
  exonerate: 2,
  exonerated: 2,
  exonerates: 2,
  exonerating: 2,
  expand: 1,
  expands: 1,
  expel: -2,
  expelled: -2,
  expelling: -2,
  expels: -2,
  expertly: 2,
  exploit: -2,
  exploited: -2,
  exploiting: -2,
  exploits: -2,
  exploration: 1,
  explorations: 1,
  expose: -1,
  exposed: -1,
  exposes: -1,
  exposing: -1,
  exquisite: 3,
  extend: 1,
  extends: 1,
  extremist: -2,
  extremists: -2,
  exuberant: 4,
  exultant: 3,
  exultantly: 3,
  fabulous: 4,
  fabulously: 4,
  fad: -2,
  fag: -3,
  faggot: -3,
  faggots: -3,
  fail: -2,
  failed: -2,
  failing: -2,
  fails: -2,
  failure: -2,
  failures: -2,
  fainthearted: -2,
  fair: 2,
  fairness: 2,
  faith: 1,
  faithful: 3,
  fake: -3,
  faker: -3,
  fakes: -3,
  faking: -3,
  fallen: -2,
  falling: -1,
  false: -1,
  falsely: -2,
  falsified: -3,
  falsify: -3,
  fame: 1,
  famine: -2,
  famous: 2,
  fan: 3,
  fantastic: 4,
  farce: -1,
  fascinate: 3,
  fascinated: 3,
  fascinates: 3,
  fascinating: 3,
  fascination: 3,
  fascist: -2,
  fascists: -2,
  fatal: -3,
  fatalities: -3,
  fatality: -3,
  fatigue: -2,
  fatigued: -2,
  fatigues: -2,
  fatiguing: -2,
  favor: 2,
  favorable: 2,
  favorably: 2,
  favored: 2,
  favorite: 2,
  favorited: 2,
  favorites: 2,
  favors: 2,
  favour: 2,
  favourable: 2,
  favourably: 2,
  favoured: 2,
  favourite: 2,
  favourited: 2,
  favourites: 2,
  favours: 2,
  fear: -2,
  fearful: -2,
  fearfully: -2,
  fearing: -2,
  fearless: 2,
  fearlessness: 2,
  fearsome: -2,
  'fed up': -3,
  feeble: -2,
  feeling: 1,
  felonies: -3,
  felony: -3,
  fertile: 2,
  fervent: 2,
  fervid: 2,
  festive: 2,
  fever: -2,
  fiasco: -3,
  fidgety: -2,
  fight: -1,
  fighting: -2,
  fine: 2,
  fines: -2,
  finest: 3,
  fire: -2,
  fired: -2,
  firing: -2,
  fit: 1,
  fitness: 1,
  filth: -2,
  filthy: -2,
  flagship: 2,
  flaw: -2,
  flawed: -3,
  flawless: 2,
  flawlessly: 2,
  flaws: -2,
  flees: -1,
  flop: -2,
  flops: -2,
  flu: -2,
  flustered: -2,
  focused: 2,
  fond: 2,
  fondness: 2,
  fool: -2,
  foolish: -2,
  fools: -2,
  forbid: -1,
  forbidden: -2,
  forbidding: -2,
  forced: -1,
  foreclosure: -2,
  foreclosures: -2,
  forefront: 1,
  forget: -1,
  forgetful: -2,
  forgettable: -1,
  forgive: 1,
  forgiving: 1,
  forgot: -1,
  forgotten: -1,
  fortune: 2,
  fortunate: 2,
  fortunately: 2,
  foul: -3,
  frantic: -1,
  fraud: -4,
  frauds: -4,
  fraudster: -4,
  fraudsters: -4,
  fraudulence: -4,
  fraudulent: -4,
  freak: -2,
  free: 1,
  freedom: 2,
  freedoms: 2,
  frenzy: -3,
  fresh: 1,
  friend: 1,
  friendliness: 2,
  friendly: 2,
  friendship: 2,
  fright: -2,
  frightened: -2,
  frightening: -3,
  frikin: -2,
  frisky: 2,
  frowning: -1,
  fruitless: -2,
  frustrate: -2,
  frustrated: -2,
  frustrates: -2,
  frustrating: -2,
  frustration: -2,
  ftw: 3,
  fuck: -4,
  fucked: -4,
  fucker: -4,
  fuckers: -4,
  fuckface: -4,
  fuckhead: -4,
  fuckin: -4,
  fucking: -4,
  'fucking amazing': 4,
  'fucking beautiful': 4,
  'fucking cute': 4,
  'fucking fantastic': 4,
  'fucking good': 4,
  'fucking great': 4,
  'fucking hot': 2,
  'fucking love': 4,
  'fucking loves': 4,
  'fucking perfect': 4,
  fucktard: -4,
  fud: -3,
  fuked: -4,
  fuking: -4,
  fulfill: 2,
  fulfilled: 2,
  fulfillment: 2,
  fulfills: 2,
  fuming: -2,
  fun: 4,
  funeral: -1,
  funerals: -1,
  funky: 2,
  funnier: 4,
  funny: 4,
  furious: -3,
  futile: -2,
  gag: -2,
  gagged: -2,
  gain: 2,
  gained: 2,
  gaining: 2,
  gains: 2,
  gallant: 3,
  gallantly: 3,
  gallantry: 3,
  'game-changing': 3,
  garbage: -1,
  gem: 3,
  generous: 2,
  generously: 2,
  genial: 3,
  ghastly: -2,
  ghost: -1,
  giddy: -2,
  gift: 2,
  glad: 3,
  glamorous: 3,
  glamourous: 3,
  glee: 3,
  gleeful: 3,
  gloom: -1,
  gloomy: -2,
  glorious: 2,
  glory: 2,
  glum: -2,
  god: 1,
  goddamn: -3,
  godsend: 4,
  gold: 2,
  good: 3,
  goodlooking: 3,
  goodmorning: 1,
  goodness: 3,
  goodwill: 3,
  goofiness: -2,
  goofy: -2,
  grace: 1,
  graceful: 2,
  gracious: 3,
  grand: 3,
  grant: 1,
  granted: 1,
  granting: 1,
  grants: 1,
  grateful: 3,
  gratification: 2,
  grave: -2,
  gray: -1,
  grisly: -2,
  gr8: 3,
  great: 3,
  greater: 3,
  greatest: 3,
  greed: -3,
  greedy: -2,
  'green wash': -3,
  'green washing': -3,
  greenwash: -3,
  greenwasher: -3,
  greenwashers: -3,
  greenwashing: -3,
  greet: 1,
  greeted: 1,
  greeting: 1,
  greetings: 2,
  greets: 1,
  grey: -1,
  grief: -2,
  grieved: -2,
  grim: -2,
  gripping: 2,
  groan: -2,
  groaned: -2,
  groaning: -2,
  groans: -2,
  gross: -2,
  growing: 1,
  growth: 2,
  growths: 2,
  gruesome: -3,
  guarantee: 1,
  guilt: -3,
  guilty: -3,
  gullibility: -2,
  gullible: -2,
  gun: -1,
  ha: 2,
  hacked: -1,
  haha: 3,
  hahaha: 3,
  hahahah: 3,
  hail: 2,
  hailed: 2,
  hallelujah: 3,
  handpicked: 1,
  handsome: 3,
  hapless: -2,
  haplessness: -2,
  happiest: 3,
  happiness: 3,
  happy: 3,
  harass: -3,
  harassed: -3,
  harasses: -3,
  harassing: -3,
  harassment: -3,
  hard: -1,
  hardier: 2,
  hardship: -2,
  hardy: 2,
  harm: -2,
  harmed: -2,
  harmful: -2,
  harming: -2,
  harmony: 2,
  harmonious: 2,
  harmoniously: 2,
  harms: -2,
  harried: -2,
  harsh: -2,
  harsher: -2,
  harshest: -2,
  harshly: -2,
  hate: -3,
  hated: -3,
  hater: -3,
  haters: -3,
  hates: -3,
  hating: -3,
  hatred: -3,
  haunt: -1,
  haunted: -2,
  haunting: 1,
  haunts: -1,
  havoc: -2,
  hazardous: -3,
  headache: -2,
  healthy: 2,
  heartbreaking: -3,
  heartbroken: -3,
  heartfelt: 3,
  heartless: -2,
  heartwarming: 3,
  heaven: 2,
  heavenly: 4,
  heavyhearted: -2,
  hehe: 2,
  hell: -4,
  hellish: -2,
  help: 2,
  helpful: 2,
  helping: 2,
  helpless: -2,
  helps: 2,
  hero: 2,
  heroes: 2,
  heroic: 3,
  hesitant: -2,
  hesitate: -2,
  hid: -1,
  hide: -1,
  hideous: -3,
  hides: -1,
  hiding: -1,
  highlight: 2,
  hilarious: 2,
  hinder: -2,
  hindrance: -2,
  hoax: -2,
  hollow: -1,
  homeless: -2,
  homesick: -2,
  homicide: -2,
  homicides: -2,
  honest: 2,
  honor: 2,
  honored: 2,
  honoring: 2,
  honour: 2,
  honoured: 2,
  honouring: 2,
  hooligan: -2,
  hooliganism: -2,
  hooligans: -2,
  hope: 2,
  hopeful: 2,
  hopefully: 2,
  hopeless: -2,
  hopelessness: -2,
  hopes: 2,
  hoping: 2,
  horrendous: -3,
  horrid: -3,
  horrible: -3,
  horrific: -3,
  horrified: -3,
  hospitalized: -2,
  hostile: -2,
  huckster: -2,
  hug: 2,
  huge: 1,
  hugs: 2,
  humane: 2,
  humble: 1,
  humbug: -2,
  humerous: 3,
  humiliated: -3,
  humiliation: -3,
  humor: 2,
  humorous: 2,
  humour: 2,
  humourous: 2,
  hunger: -2,
  hurrah: 5,
  hurt: -2,
  hurting: -2,
  hurts: -2,
  hypocritical: -2,
  hysteria: -3,
  hysterical: -3,
  hysterics: -3,
  icky: -3,
  idiocy: -3,
  idiot: -3,
  idiotic: -3,
  ignorance: -2,
  ignorant: -2,
  ignore: -1,
  ignored: -2,
  ignores: -1,
  ill: -2,
  'ill-fated': -2,
  illegal: -3,
  illegally: -3,
  illegitimate: -3,
  illiteracy: -2,
  illness: -2,
  illnesses: -2,
  illogical: -2,
  imaginative: 2,
  imbecile: -3,
  immobilized: -1,
  immortal: 2,
  immune: 1,
  impair: -2,
  impaired: -2,
  impairing: -2,
  impairment: -2,
  impairs: -2,
  impatient: -2,
  impeachment: -3,
  impeachments: -3,
  impede: -2,
  impeded: -2,
  impedes: -2,
  impeding: -2,
  impedingly: -2,
  imperfect: -2,
  importance: 2,
  important: 2,
  impose: -1,
  imposed: -1,
  imposes: -1,
  imposing: -1,
  imposter: -2,
  impotent: -2,
  impress: 3,
  impressed: 3,
  impresses: 3,
  impressive: 3,
  imprisoned: -2,
  imprisonment: -2,
  improper: -2,
  improperly: -2,
  improve: 2,
  improved: 2,
  improvement: 2,
  improves: 2,
  improving: 2,
  inability: -2,
  inaction: -2,
  inadequate: -2,
  inadvertently: -2,
  inappropriate: -2,
  incapable: -2,
  incapacitated: -2,
  incapacitates: -2,
  incapacitating: -2,
  incense: -2,
  incensed: -2,
  incenses: -2,
  incensing: -2,
  incoherent: -2,
  incompetence: -2,
  incompetent: -2,
  incomplete: -1,
  incomprehensible: -2,
  inconsiderate: -2,
  inconvenience: -2,
  inconvenient: -2,
  increase: 1,
  increased: 1,
  indecisive: -2,
  indestructible: 2,
  indicted: -2,
  indifference: -2,
  indifferent: -2,
  indignant: -2,
  indignation: -2,
  indoctrinate: -2,
  indoctrinated: -2,
  indoctrinates: -2,
  indoctrinating: -2,
  inediable: -2,
  inexorable: -3,
  inexcusable: -3,
  ineffective: -2,
  ineffectively: -2,
  ineffectual: -2,
  inefficiency: -2,
  inefficient: -2,
  inefficiently: -2,
  inept: -2,
  ineptitude: -2,
  infantile: -2,
  infantilized: -2,
  infatuated: 2,
  infatuation: 2,
  infect: -2,
  infected: -2,
  infecting: -2,
  infection: -2,
  infections: -2,
  infectious: -2,
  infects: -2,
  inferior: -2,
  infest: -2,
  infested: -2,
  infesting: -2,
  infests: -2,
  inflamed: -2,
  inflict: -2,
  inflicted: -2,
  inflicting: -2,
  inflicts: -2,
  influential: 2,
  infract: -2,
  infracted: -2,
  infracting: -2,
  infracts: -2,
  infringement: -2,
  infuriate: -2,
  infuriated: -2,
  infuriates: -2,
  infuriating: -2,
  inhibit: -1,
  inhuman: -2,
  injured: -2,
  injuries: -2,
  injury: -2,
  injustice: -2,
  innovate: 1,
  innovates: 1,
  innovation: 1,
  innovative: 2,
  inoperative: -2,
  inquisition: -2,
  inquisitive: 2,
  insane: -2,
  insanity: -2,
  insecure: -2,
  insensitive: -2,
  insensitivity: -2,
  insignificant: -2,
  insipid: -2,
  insolvent: -2,
  insomnia: -2,
  inspiration: 2,
  inspirational: 2,
  inspire: 2,
  inspired: 2,
  inspires: 2,
  inspiring: 3,
  insufficiency: -2,
  insufficient: -2,
  insufficiently: -2,
  insult: -2,
  insulted: -2,
  insulting: -2,
  insults: -2,
  intact: 2,
  integrity: 2,
  intelligent: 2,
  intense: 1,
  interest: 1,
  interested: 2,
  interesting: 2,
  interests: 1,
  interrogated: -2,
  interrupt: -2,
  interrupted: -2,
  interrupting: -2,
  interruption: -2,
  interrupts: -2,
  intimacy: 2,
  intimidate: -2,
  intimidated: -2,
  intimidates: -2,
  intimidating: -2,
  intimidation: -2,
  intransigence: -2,
  intransigency: -2,
  intricate: 2,
  intrigues: 1,
  invasion: -1,
  invincible: 2,
  invite: 1,
  inviting: 1,
  invulnerable: 2,
  irate: -3,
  ironic: -1,
  irony: -1,
  irrational: -1,
  irreparable: -2,
  irreproducible: -2,
  irresistible: 2,
  irresistibly: 2,
  irresolute: -2,
  irresponsible: -2,
  irresponsibly: -2,
  irreversible: -1,
  irreversibly: -1,
  irritate: -3,
  irritated: -3,
  irritates: -3,
  irritating: -3,
  isolated: -1,
  itchy: -2,
  jackass: -4,
  jackasses: -4,
  jailed: -2,
  jaunty: 2,
  jealous: -2,
  jealousy: -2,
  jeopardy: -2,
  jerk: -3,
  jesus: 1,
  jewel: 1,
  jewels: 1,
  jocular: 2,
  join: 1,
  joke: 2,
  jokes: 2,
  jolly: 2,
  jovial: 2,
  joy: 3,
  joyful: 3,
  joyfully: 3,
  joyless: -2,
  joyous: 3,
  jubilant: 3,
  jumpy: -1,
  justice: 2,
  justifiably: 2,
  justified: 2,
  keen: 1,
  kickback: -3,
  kickbacks: -3,
  kidnap: -2,
  kidnapped: -2,
  kidnapping: -2,
  kidnappings: -2,
  kidnaps: -2,
  kill: -3,
  killed: -3,
  killing: -3,
  kills: -3,
  kind: 2,
  'kind of': 0,
  kinder: 2,
  kindness: 2,
  kiss: 2,
  kudos: 3,
  lack: -2,
  lackadaisical: -2,
  lag: -1,
  lagged: -2,
  lagging: -2,
  lags: -2,
  lame: -2,
  landmark: 2,
  lapse: -1,
  lapsed: -1,
  laugh: 1,
  laughed: 1,
  laughing: 1,
  laughs: 1,
  laughting: 1,
  launched: 1,
  lawl: 3,
  lawsuit: -2,
  lawsuits: -2,
  lazy: -1,
  leadership: 1,
  leading: 2,
  leak: -1,
  leaked: -1,
  leave: -1,
  legal: 1,
  legally: 1,
  lenient: 1,
  lethal: -2,
  lethality: -2,
  lethargic: -2,
  lethargy: -2,
  liar: -3,
  liars: -3,
  libelous: -2,
  lied: -2,
  lifeless: -1,
  lifesaver: 4,
  lighthearted: 1,
  likable: 2,
  like: 2,
  likeable: 2,
  liked: 2,
  likers: 2,
  likes: 2,
  liking: 2,
  limitation: -1,
  limited: -1,
  limits: -1,
  litigation: -1,
  litigious: -2,
  lively: 2,
  livid: -2,
  lmao: 4,
  lmfao: 4,
  loathe: -3,
  loathed: -3,
  loathes: -3,
  loathing: -3,
  loathsome: -3,
  lobbied: -2,
  lobby: -2,
  lobbying: -2,
  lobbyist: -2,
  lobbyists: -2,
  lol: 3,
  lolol: 4,
  lololol: 4,
  lolololol: 4,
  lonely: -2,
  lonesome: -2,
  longing: -1,
  lool: 3,
  loom: -1,
  loomed: -1,
  looming: -1,
  looms: -1,
  loool: 3,
  looool: 3,
  loose: -3,
  looses: -3,
  loser: -3,
  losing: -3,
  loss: -3,
  losses: -3,
  lost: -3,
  lousy: -2,
  lovable: 3,
  love: 3,
  loved: 3,
  lovelies: 3,
  lovely: 3,
  loves: 3,
  loving: 2,
  'loving-kindness': 3,
  lowest: -1,
  loyal: 3,
  loyalty: 3,
  luck: 3,
  luckily: 3,
  lucky: 3,
  lucrative: 3,
  ludicrous: -3,
  lugubrious: -2,
  lunatic: -3,
  lunatics: -3,
  lurk: -1,
  lurking: -1,
  lurks: -1,
  luxury: 2,
  macabre: -2,
  mad: -3,
  maddening: -3,
  'made-up': -1,
  madly: -3,
  madness: -3,
  magnificent: 3,
  maladaption: -2,
  maldevelopment: -2,
  maltreatment: -2,
  mandatory: -1,
  manipulated: -1,
  manipulating: -1,
  manipulation: -1,
  manslaughter: -3,
  marvel: 3,
  marvelous: 3,
  marvels: 3,
  masterpiece: 4,
  masterpieces: 4,
  matter: 1,
  matters: 1,
  mature: 2,
  meaningful: 2,
  meaningless: -2,
  medal: 3,
  mediocrity: -3,
  meditative: 1,
  melancholy: -2,
  memorable: 1,
  memoriam: -2,
  menace: -2,
  menaced: -2,
  menaces: -2,
  mercy: 2,
  merry: 3,
  mesmerizing: 3,
  mess: -2,
  messed: -2,
  'messing up': -2,
  methodical: 2,
  methodically: 2,
  mindless: -2,
  miracle: 4,
  mirth: 3,
  mirthful: 3,
  mirthfully: 3,
  misbehave: -2,
  misbehaved: -2,
  misbehaves: -2,
  misbehaving: -2,
  misbranding: -3,
  miscast: -2,
  mischief: -1,
  mischiefs: -1,
  misclassified: -2,
  misclassifies: -2,
  misclassify: -2,
  misconduct: -2,
  misconducted: -2,
  misconducting: -2,
  misconducts: -2,
  miserable: -3,
  miserably: -3,
  misery: -2,
  misfire: -2,
  misfortune: -2,
  misgiving: -2,
  misinformation: -2,
  misinformed: -2,
  misinterpreted: -2,
  mislead: -3,
  misleaded: -3,
  misleading: -3,
  misleads: -3,
  misplace: -2,
  misplaced: -2,
  misplaces: -2,
  misplacing: -2,
  mispricing: -3,
  misread: -1,
  misreport: -2,
  misreported: -2,
  misreporting: -2,
  misreports: -2,
  misrepresent: -2,
  misrepresentation: -2,
  misrepresentations: -2,
  misrepresented: -2,
  misrepresenting: -2,
  misrepresents: -2,
  miss: -2,
  missed: -2,
  missing: -2,
  mistake: -2,
  mistaken: -2,
  mistakes: -2,
  mistaking: -2,
  misunderstand: -2,
  misunderstanding: -2,
  misunderstands: -2,
  misunderstood: -2,
  misuse: -2,
  misused: -2,
  misuses: -2,
  misusing: -2,
  moan: -2,
  moaned: -2,
  moaning: -2,
  moans: -2,
  mock: -2,
  mocked: -2,
  mocking: -2,
  mocks: -2,
  modernize: 2,
  modernized: 2,
  modernizes: 2,
  modernizing: 2,
  mongering: -2,
  monopolize: -2,
  monopolized: -2,
  monopolizes: -2,
  monopolizing: -2,
  monotone: -1,
  moody: -1,
  mope: -1,
  moping: -1,
  moron: -3,
  motherfucker: -5,
  motherfucking: -5,
  motivate: 1,
  motivated: 2,
  motivating: 2,
  motivation: 1,
  mourn: -2,
  mourned: -2,
  mournful: -2,
  mourning: -2,
  mourns: -2,
  muddy: -2,
  mumpish: -2,
  murder: -2,
  murderer: -2,
  murdering: -3,
  murderous: -3,
  murders: -2,
  murky: -2,
  myth: -1,
  n00b: -2,
  naive: -2,
  narcissism: -2,
  nasty: -3,
  natural: 1,
  naïve: -2,
  needy: -2,
  negative: -2,
  negativity: -2,
  neglect: -2,
  neglected: -2,
  neglecting: -2,
  neglects: -2,
  nerves: -1,
  nervous: -2,
  nervously: -2,
  nice: 3,
  nifty: 2,
  niggas: -5,
  nigger: -5,
  no: -1,
  'no fun': -3,
  noble: 2,
  noblest: 2,
  noisy: -1,
  'non-approved': -2,
  nonsense: -2,
  noob: -2,
  nosey: -2,
  'not good': -2,
  'not working': -3,
  notable: 2,
  noticeable: 2,
  notorious: -2,
  novel: 2,
  numb: -1,
  nurturing: 2,
  nuts: -3,
  obliterate: -2,
  obliterated: -2,
  obnoxious: -3,
  obscene: -2,
  obscenity: -2,
  obsessed: 2,
  obsolete: -2,
  obstacle: -2,
  obstacles: -2,
  obstinate: -2,
  obstruct: -2,
  obstructed: -2,
  obstructing: -2,
  obstruction: -2,
  obstructs: -2,
  odd: -2,
  offence: -2,
  offences: -2,
  offend: -2,
  offended: -2,
  offender: -2,
  offending: -2,
  offends: -2,
  offense: -2,
  offenses: -2,
  offensive: -2,
  offensively: -2,
  offline: -1,
  oks: 2,
  ominous: 3,
  'once-in-a-lifetime': 3,
  oops: -2,
  opportunities: 2,
  opportunity: 2,
  oppressed: -2,
  oppression: -2,
  oppressions: -2,
  oppressive: -2,
  optimism: 2,
  optimistic: 2,
  optionless: -2,
  ostracize: -2,
  ostracized: -2,
  ostracizes: -2,
  ouch: -2,
  outage: -2,
  outages: -2,
  outbreak: -2,
  outbreaks: -2,
  outcry: -2,
  outmaneuvered: -2,
  outnumbered: -2,
  outrage: -3,
  outraged: -3,
  outrageous: -3,
  outreach: 2,
  outstanding: 5,
  overjoyed: 4,
  overload: -1,
  overlooked: -1,
  overprotective: -2,
  overran: -2,
  overreact: -2,
  overreacted: -2,
  overreacting: -2,
  overreaction: -2,
  overreacts: -2,
  oversell: -2,
  overselling: -2,
  oversells: -2,
  oversight: -1,
  oversimplification: -2,
  oversimplified: -2,
  oversimplifies: -2,
  oversimplify: -2,
  oversold: -2,
  overstatement: -2,
  overstatements: -2,
  overweight: -1,
  overwrought: -3,
  oxymoron: -1,
  pain: -2,
  pained: -2,
  painful: -2,
  panic: -3,
  panicked: -3,
  panics: -3,
  paradise: 3,
  paradox: -1,
  pardon: 2,
  pardoned: 2,
  pardoning: 2,
  pardons: 2,
  parley: -1,
  passion: 1,
  passionate: 2,
  passive: -1,
  passively: -1,
  pathetic: -2,
  pay: -1,
  peace: 2,
  peaceful: 2,
  peacefully: 2,
  penalize: -2,
  penalized: -2,
  penalizes: -2,
  penalizing: -2,
  penalty: -2,
  pensive: -1,
  perfect: 3,
  perfected: 2,
  perfection: 3,
  perfectly: 3,
  perfects: 2,
  peril: -2,
  perjury: -3,
  perpetrated: -2,
  perpetrator: -2,
  perpetrators: -2,
  perplexed: -2,
  persecute: -2,
  persecuted: -2,
  persecutes: -2,
  persecuting: -2,
  perturbed: -2,
  pervert: -3,
  pesky: -2,
  pessimism: -2,
  pessimistic: -2,
  petrified: -2,
  philanthropy: 2,
  phobic: -2,
  picturesque: 2,
  pileup: -1,
  pillage: -2,
  pique: -2,
  piqued: -2,
  piss: -4,
  pissed: -4,
  pissing: -3,
  piteous: -2,
  pitied: -1,
  pity: -2,
  plague: -3,
  plagued: -3,
  plagues: -3,
  plaguing: -3,
  playful: 2,
  pleasant: 3,
  please: 1,
  pleased: 3,
  pleasurable: 3,
  pleasure: 3,
  plodding: -2,
  poignant: 2,
  pointless: -2,
  poised: -2,
  poison: -2,
  poisoned: -2,
  poisons: -2,
  polished: 2,
  polite: 2,
  politeness: 2,
  pollutant: -2,
  pollute: -2,
  polluted: -2,
  polluter: -2,
  polluters: -2,
  pollutes: -2,
  pollution: -2,
  poor: -2,
  poorer: -2,
  poorest: -2,
  poorly: -2,
  popular: 3,
  popularity: 3,
  positive: 2,
  positively: 2,
  possessive: -2,
  'post-traumatic': -2,
  postpone: -1,
  postponed: -1,
  postpones: -1,
  postponing: -1,
  poverty: -1,
  powerful: 2,
  powerless: -2,
  praise: 3,
  praised: 3,
  praises: 3,
  praising: 3,
  pray: 1,
  praying: 1,
  prays: 1,
  prblm: -2,
  prblms: -2,
  predatory: -2,
  prepared: 1,
  pressure: -1,
  pressured: -2,
  pretend: -1,
  pretending: -1,
  pretends: -1,
  pretty: 1,
  prevent: -1,
  prevented: -1,
  preventing: -1,
  prevents: -1,
  prick: -5,
  prison: -2,
  prisoner: -2,
  prisoners: -2,
  privileged: 2,
  proactive: 2,
  problem: -2,
  problems: -2,
  profit: 2,
  profitable: 2,
  profiteer: -2,
  profits: 2,
  progress: 2,
  prohibit: -1,
  prohibits: -1,
  prominent: 2,
  promise: 1,
  promised: 1,
  promises: 1,
  promote: 1,
  promoted: 1,
  promotes: 1,
  promoting: 1,
  promptly: 1,
  propaganda: -2,
  prosecute: -1,
  prosecuted: -2,
  prosecutes: -1,
  prosecution: -1,
  prospect: 1,
  prospects: 1,
  prosperity: 3,
  prosperous: 3,
  protect: 1,
  protected: 1,
  protects: 1,
  protest: -2,
  protesters: -2,
  protesting: -2,
  protests: -2,
  proud: 2,
  proudly: 2,
  provoke: -1,
  provoked: -1,
  provokes: -1,
  provoking: -1,
  prudence: 2,
  pseudoscience: -3,
  psychopathic: -2,
  punish: -2,
  punished: -2,
  punishes: -2,
  punishing: -2,
  punitive: -2,
  pure: 1,
  purest: 1,
  purposeful: 2,
  pushy: -1,
  puzzled: -2,
  quaking: -2,
  qualities: 2,
  quality: 2,
  questionable: -2,
  questioned: -1,
  questioning: -1,
  racism: -3,
  racist: -3,
  racists: -3,
  rage: -2,
  rageful: -2,
  rainy: -1,
  rant: -3,
  ranter: -3,
  ranters: -3,
  rants: -3,
  rape: -4,
  raped: -4,
  rapist: -4,
  rapture: 2,
  raptured: 2,
  raptures: 2,
  rapturous: 4,
  rash: -2,
  ratified: 2,
  reach: 1,
  reached: 1,
  reaches: 1,
  reaching: 1,
  reassure: 1,
  reassured: 1,
  reassures: 1,
  reassuring: 2,
  rebel: -2,
  rebellion: -2,
  rebels: -2,
  recession: -2,
  reckless: -2,
  recognition: 2,
  recommend: 2,
  recommended: 2,
  recommends: 2,
  redeemed: 2,
  refine: 1,
  refined: 1,
  refines: 1,
  refreshingly: 2,
  refuse: -2,
  refused: -2,
  refuses: -2,
  refusing: -2,
  regret: -2,
  regretful: -2,
  regrets: -2,
  regretted: -2,
  regretting: -2,
  reigning: 1,
  reject: -1,
  rejected: -1,
  rejecting: -1,
  rejection: -2,
  rejects: -1,
  rejoice: 4,
  rejoiced: 4,
  rejoices: 4,
  rejoicing: 4,
  relaxed: 2,
  relentless: -1,
  reliability: 2,
  reliable: 2,
  reliably: 2,
  reliant: 2,
  relieve: 1,
  relieved: 2,
  relieves: 1,
  relieving: 2,
  relishing: 2,
  remarkable: 2,
  remorse: -2,
  repellent: -2,
  repercussion: -2,
  repercussions: -2,
  reprimand: -2,
  reprimanded: -2,
  reprimanding: -2,
  reprimands: -2,
  repulse: -1,
  repulsed: -2,
  repulsive: -2,
  rescue: 2,
  rescued: 2,
  rescues: 2,
  resentful: -2,
  resign: -1,
  resigned: -1,
  resigning: -1,
  resigns: -1,
  resolute: 2,
  resolution: 2,
  resolve: 2,
  resolved: 2,
  resolves: 2,
  resolving: 2,
  respect: 2,
  respected: 2,
  respects: 2,
  responsibility: 1,
  responsible: 2,
  responsive: 2,
  restful: 2,
  restless: -2,
  restore: 1,
  restored: 1,
  restores: 1,
  restoring: 1,
  restrict: -2,
  restricted: -2,
  restricting: -2,
  restriction: -2,
  restrictive: -1,
  restricts: -2,
  retained: -1,
  retard: -2,
  retarded: -2,
  retreat: -1,
  revenge: -2,
  revengeful: -2,
  revered: 2,
  revive: 2,
  revives: 2,
  revolting: -2,
  reward: 2,
  rewarded: 2,
  rewarding: 2,
  rewards: 2,
  rich: 2,
  richly: 2,
  ridiculous: -3,
  rig: -1,
  rigged: -1,
  'right direction': 3,
  righteousness: 2,
  rightful: 2,
  rightfully: 2,
  rigorous: 3,
  rigorously: 3,
  riot: -2,
  riots: -2,
  rise: 1,
  rises: 1,
  risk: -2,
  risks: -2,
  risky: -2,
  riveting: 3,
  rob: -2,
  robber: -2,
  robed: -2,
  robing: -2,
  robs: -2,
  robust: 2,
  rofl: 4,
  roflcopter: 4,
  roflmao: 4,
  romance: 2,
  romantical: 2,
  romantically: 2,
  rose: 1,
  rotfl: 4,
  rotflmfao: 4,
  rotflol: 4,
  rotten: -3,
  rude: -2,
  ruin: -2,
  ruined: -2,
  ruining: -2,
  ruins: -2,
  sabotage: -2,
  sad: -2,
  sadden: -2,
  saddened: -2,
  sadly: -2,
  safe: 1,
  safely: 1,
  safer: 2,
  safety: 1,
  salient: 1,
  salute: 2,
  saluted: 2,
  salutes: 2,
  saluting: 2,
  salvation: 2,
  sappy: -1,
  sarcastic: -2,
  satisfied: 2,
  savange: -2,
  savanges: -2,
  save: 2,
  saved: 2,
  savings: 1,
  scam: -2,
  scams: -2,
  scandal: -3,
  scandalous: -3,
  scandals: -3,
  scapegoat: -2,
  scapegoats: -2,
  scare: -2,
  scared: -2,
  scar: -2,
  scars: -2,
  scary: -2,
  sceptical: -2,
  scold: -2,
  scoop: 3,
  scorn: -2,
  scornful: -2,
  scream: -2,
  screamed: -2,
  screaming: -2,
  screams: -2,
  screwed: -2,
  'screwed up': -3,
  scum: -3,
  scumbag: -4,
  seamless: 2,
  seamlessly: 2,
  secure: 2,
  secured: 2,
  secures: 2,
  sedition: -2,
  seditious: -2,
  seduced: -1,
  'self-abuse': -2,
  'self-confident': 2,
  'self-contradictory': -2,
  'self-deluded': -2,
  selfish: -3,
  selfishness: -3,
  sentence: -2,
  sentenced: -2,
  sentences: -2,
  sentencing: -2,
  serene: 2,
  settlement: 1,
  settlements: 1,
  severe: -2,
  severely: -2,
  sexist: -2,
  sexistic: -2,
  sexy: 3,
  shaky: -2,
  shame: -2,
  shamed: -2,
  shameful: -2,
  share: 1,
  shared: 1,
  shares: 1,
  shattered: -2,
  shit: -4,
  shithead: -4,
  shitty: -3,
  shock: -2,
  shocked: -2,
  shocking: -2,
  shocks: -2,
  shoody: -2,
  shoot: -1,
  'short-sighted': -2,
  'short-sightedness': -2,
  shortage: -2,
  shortages: -2,
  shrew: -4,
  shy: -1,
  sick: -2,
  sickness: -2,
  'side-effect': -2,
  'side-effects': -2,
  sigh: -2,
  significance: 1,
  significant: 1,
  silencing: -1,
  silly: -1,
  simplicity: 1,
  sin: -2,
  sincere: 2,
  sincerely: 2,
  sincerest: 2,
  sincerity: 2,
  sinful: -3,
  singleminded: -2,
  sinister: -2,
  sins: -2,
  skeptic: -2,
  skeptical: -2,
  skepticism: -2,
  skeptics: -2,
  slam: -2,
  slash: -2,
  slashed: -2,
  slashes: -2,
  slashing: -2,
  slave: -3,
  slavery: -3,
  slaves: -3,
  sleeplessness: -2,
  slick: 2,
  slicker: 2,
  slickest: 2,
  slip: -1,
  sloppy: -2,
  sluggish: -2,
  slumping: -1,
  slut: -5,
  smart: 1,
  smarter: 2,
  smartest: 2,
  smear: -2,
  smile: 2,
  smiled: 2,
  smiles: 2,
  smiling: 2,
  smog: -2,
  smuggle: -2,
  smuggled: -2,
  smuggling: -2,
  smuggles: -2,
  sneaky: -1,
  sneeze: -2,
  sneezed: -2,
  sneezes: -2,
  sneezing: -2,
  snub: -2,
  snubbed: -2,
  snubbing: -2,
  snubs: -2,
  sobering: 1,
  solemn: -1,
  solid: 2,
  solidarity: 2,
  solidified: 2,
  solidifies: 2,
  solidify: 2,
  solidifying: 2,
  solution: 1,
  solutions: 1,
  solve: 1,
  solved: 1,
  solves: 1,
  solving: 1,
  somber: -2,
  'some kind': 0,
  'son-of-a-bitch': -5,
  soothe: 3,
  soothed: 3,
  soothing: 3,
  sophisticated: 2,
  sore: -1,
  sorrow: -2,
  sorrowful: -2,
  sorry: -1,
  spacious: 1,
  spam: -2,
  spammer: -3,
  spammers: -3,
  spamming: -2,
  spark: 1,
  sparkle: 3,
  sparkles: 3,
  sparkling: 3,
  spearhead: 2,
  speculative: -2,
  spirit: 1,
  spirited: 2,
  spiritless: -2,
  spiteful: -2,
  splendid: 3,
  spoiled: -2,
  spoilt: -2,
  spotless: 2,
  sprightly: 2,
  squander: -2,
  squandered: -2,
  squandering: -2,
  squanders: -2,
  squelched: -1,
  stab: -2,
  stabbed: -2,
  stable: 2,
  stabs: -2,
  stall: -2,
  stalled: -2,
  stalling: -2,
  stamina: 2,
  stampede: -2,
  stank: -2,
  startled: -2,
  startling: 3,
  starve: -2,
  starved: -2,
  starves: -2,
  starving: -2,
  steadfast: 2,
  steal: -2,
  stealing: -2,
  steals: -2,
  stereotype: -2,
  stereotyped: -2,
  stifled: -1,
  stimulate: 1,
  stimulated: 1,
  stimulates: 1,
  stimulating: 2,
  stingy: -2,
  stink: -2,
  stinked: -2,
  stinker: -2,
  stinking: -2,
  stinks: -2,
  stinky: -2,
  stole: -2,
  stolen: -2,
  stop: -1,
  stopped: -1,
  stopping: -1,
  stops: -1,
  stout: 2,
  straight: 1,
  strange: -1,
  strangely: -1,
  strangled: -2,
  strength: 2,
  strengthen: 2,
  strengthened: 2,
  strengthening: 2,
  strengthens: 2,
  strengths: 2,
  stress: -1,
  stressed: -2,
  stressor: -2,
  stressors: -2,
  stricken: -2,
  strike: -1,
  strikers: -2,
  strikes: -1,
  strong: 2,
  stronger: 2,
  strongest: 2,
  struck: -1,
  struggle: -2,
  struggled: -2,
  struggles: -2,
  struggling: -2,
  stubborn: -2,
  stuck: -2,
  stunned: -2,
  stunning: 4,
  stupid: -2,
  stupidity: -3,
  stupidly: -2,
  suave: 2,
  subpoena: -2,
  substantial: 1,
  substantially: 1,
  subversive: -2,
  succeed: 3,
  succeeded: 3,
  succeeding: 3,
  succeeds: 3,
  success: 2,
  successful: 3,
  successfully: 3,
  suck: -3,
  sucks: -3,
  sue: -2,
  sued: -2,
  sueing: -2,
  sues: -2,
  suffer: -2,
  suffered: -2,
  sufferer: -2,
  sufferers: -2,
  suffering: -2,
  suffers: -2,
  suicidal: -2,
  suicide: -2,
  suicides: -2,
  suing: -2,
  suitable: 2,
  suited: 2,
  sulking: -2,
  sulky: -2,
  sullen: -2,
  sunshine: 2,
  super: 3,
  superb: 5,
  superior: 2,
  support: 2,
  supported: 2,
  supporter: 1,
  supporters: 1,
  supporting: 1,
  supportive: 2,
  supports: 2,
  supreme: 4,
  survived: 2,
  surviving: 2,
  survivor: 2,
  suspect: -1,
  suspected: -1,
  suspecting: -1,
  suspects: -1,
  suspend: -1,
  suspended: -1,
  suspicious: -2,
  sustainability: 1,
  sustainable: 2,
  sustainably: 2,
  swear: -2,
  swearing: -2,
  swears: -2,
  sweet: 2,
  sweeter: 3,
  sweetest: 3,
  swift: 2,
  swiftly: 2,
  swindle: -3,
  swindles: -3,
  swindling: -3,
  sympathetic: 2,
  sympathy: 2,
  taint: -2,
  tainted: -2,
  talent: 2,
  tard: -2,
  tarnish: -2,
  tarnished: -2,
  tarnishes: -2,
  tears: -2,
  tender: 2,
  tenderness: 2,
  tense: -2,
  tension: -1,
  terrible: -3,
  terribly: -3,
  terrific: 4,
  terrifically: 4,
  terrified: -3,
  terror: -3,
  terrorist: -2,
  terrorists: -2,
  terrorize: -3,
  terrorized: -3,
  terrorizes: -3,
  thank: 2,
  thankful: 2,
  thanks: 2,
  thorny: -2,
  thoughtful: 2,
  thoughtless: -2,
  threat: -2,
  threaten: -2,
  threatened: -2,
  threatening: -2,
  threatens: -2,
  threats: -2,
  thrilled: 5,
  thwart: -2,
  thwarted: -2,
  thwarting: -2,
  thwarts: -2,
  timid: -2,
  timorous: -2,
  tired: -2,
  tits: -2,
  tolerance: 2,
  tolerant: 2,
  toothless: -2,
  top: 2,
  tops: 2,
  torn: -2,
  torture: -4,
  tortured: -4,
  tortures: -4,
  torturing: -4,
  totalitarian: -2,
  totalitarianism: -2,
  tout: -2,
  touted: -2,
  touting: -2,
  touts: -2,
  toxic: -3,
  tragedies: -2,
  tragedy: -2,
  tragic: -2,
  tranquil: 2,
  transgress: -2,
  transgressed: -2,
  transgresses: -2,
  transgressing: -2,
  trap: -1,
  trapped: -2,
  traps: -1,
  trauma: -3,
  traumatic: -3,
  travesty: -2,
  treason: -3,
  treasonous: -3,
  treasure: 2,
  treasures: 2,
  trembling: -2,
  tremor: -2,
  tremors: -2,
  tremulous: -2,
  tribulation: -2,
  tribute: 2,
  tricked: -2,
  trickery: -2,
  triumph: 4,
  triumphant: 4,
  troll: -2,
  trouble: -2,
  troubled: -2,
  troubles: -2,
  troubling: -2,
  true: 2,
  trust: 1,
  trusted: 2,
  trusts: 1,
  tumor: -2,
  twat: -5,
  tyran: -3,
  tyrannic: -3,
  tyrannical: -3,
  tyrannically: -3,
  tyrans: -3,
  ubiquitous: 2,
  ugh: -2,
  ugliness: -3,
  ugly: -3,
  unable: -2,
  unacceptable: -2,
  unappeasable: -2,
  unappreciated: -2,
  unapproved: -2,
  unattractive: -2,
  unavailable: -1,
  unavailing: -2,
  unaware: -2,
  unbearable: -2,
  unbelievable: -1,
  unbelieving: -1,
  unbiased: 2,
  uncertain: -1,
  unclear: -1,
  uncomfortable: -2,
  unconcerned: -2,
  unconfirmed: -1,
  unconvinced: -1,
  uncredited: -1,
  undecided: -1,
  undercooked: -2,
  underestimate: -1,
  underestimated: -1,
  underestimates: -1,
  underestimating: -1,
  undermine: -2,
  undermined: -2,
  undermines: -2,
  undermining: -2,
  underperform: -2,
  underperformed: -2,
  underperforming: -2,
  underperforms: -2,
  undeserving: -2,
  undesirable: -2,
  uneasy: -2,
  unemployed: -1,
  unemployment: -2,
  unequal: -1,
  unequaled: 2,
  unethical: -2,
  uneventful: -2,
  unfair: -2,
  unfavorable: -2,
  unfit: -2,
  unfitted: -2,
  unfocused: -2,
  unforgivable: -3,
  unforgiving: -2,
  unfulfilled: -2,
  unfunny: -2,
  ungenerous: -2,
  ungrateful: -3,
  unhappy: -2,
  unhappiness: -2,
  unhealthy: -2,
  unhygienic: -2,
  unified: 1,
  unimaginative: -2,
  unimpressed: -2,
  uninspired: -2,
  unintelligent: -2,
  unintentional: -2,
  uninvolving: -2,
  united: 1,
  unjust: -2,
  unlikely: -1,
  unlovable: -2,
  unloved: -2,
  unmatched: 1,
  unmotivated: -2,
  unoriginal: -2,
  unparliamentary: -2,
  unpleasant: -2,
  unpleasantness: -2,
  unprofessional: -2,
  unravel: 1,
  unreleting: -2,
  unresearched: -2,
  unsafe: -2,
  unsatisfied: -2,
  unscientific: -2,
  unsecured: -2,
  unselfish: 2,
  unsettled: -1,
  unsold: -1,
  unsophisticated: -2,
  unsound: -2,
  unstable: -2,
  unstoppable: 2,
  unsuccessful: -2,
  unsuccessfully: -2,
  unsupported: -2,
  unsure: -1,
  untarnished: 2,
  untrue: -2,
  unwanted: -2,
  unworthy: -2,
  uplifting: 2,
  uproar: -3,
  upset: -2,
  upsets: -2,
  upsetting: -2,
  uptight: -2,
  urgent: -1,
  useful: 2,
  usefulness: 2,
  useless: -2,
  uselessness: -2,
  vague: -2,
  validate: 1,
  validated: 1,
  validates: 1,
  validating: 1,
  vapid: -2,
  verdict: -1,
  verdicts: -1,
  vested: 1,
  vexation: -2,
  vexing: -2,
  vibrant: 3,
  vicious: -2,
  victim: -3,
  victimization: -3,
  victimize: -3,
  victimized: -3,
  victimizes: -3,
  victimizing: -3,
  victims: -3,
  victor: 3,
  victors: 3,
  victory: 3,
  victories: 3,
  vigilant: 3,
  vigor: 3,
  vile: -3,
  vindicate: 2,
  vindicated: 2,
  vindicates: 2,
  vindicating: 2,
  violate: -2,
  violated: -2,
  violates: -2,
  violating: -2,
  violation: -2,
  violations: -2,
  violence: -3,
  'violence-related': -3,
  violent: -3,
  violently: -3,
  virtuous: 2,
  virulent: -2,
  vision: 1,
  visionary: 3,
  visioning: 1,
  visions: 1,
  vitality: 3,
  vitamin: 1,
  vitriolic: -3,
  vivacious: 3,
  vividly: 2,
  vociferous: -1,
  vomit: -3,
  vomited: -3,
  vomiting: -3,
  vomits: -3,
  vulnerability: -2,
  vulnerable: -2,
  walkout: -2,
  walkouts: -2,
  wanker: -3,
  want: 1,
  war: -2,
  warfare: -2,
  warm: 1,
  warmhearted: 2,
  warmness: 2,
  warmth: 2,
  warn: -2,
  warned: -2,
  warning: -3,
  warnings: -3,
  warns: -2,
  waste: -1,
  wasted: -2,
  wasting: -2,
  wavering: -1,
  weak: -2,
  weakened: -2,
  weakness: -2,
  weaknesses: -2,
  wealth: 3,
  wealthier: 2,
  wealthy: 2,
  weary: -2,
  weep: -2,
  weeping: -2,
  weird: -2,
  welcome: 2,
  welcomed: 2,
  welcomes: 2,
  'well-being': 2,
  'well-championed': 3,
  'well-developed': 2,
  'well-established': 2,
  'well-focused': 2,
  'well-groomed': 2,
  'well-proportioned': 2,
  whimsical: 1,
  whitewash: -3,
  whore: -4,
  wicked: -2,
  widowed: -1,
  willingness: 2,
  win: 4,
  winner: 4,
  winning: 4,
  wins: 4,
  winwin: 3,
  wisdom: 1,
  wish: 1,
  wishes: 1,
  wishing: 1,
  withdrawal: -3,
  wits: 2,
  woebegone: -2,
  woeful: -3,
  won: 3,
  wonderful: 4,
  wonderfully: 4,
  woo: 3,
  woohoo: 3,
  wooo: 4,
  woow: 4,
  worn: -1,
  worried: -3,
  worries: -3,
  worry: -3,
  worrying: -3,
  worse: -3,
  worsen: -3,
  worsened: -3,
  worsening: -3,
  worsens: -3,
  worshiped: 3,
  worst: -3,
  worth: 2,
  worthless: -2,
  worthy: 2,
  wow: 4,
  wowow: 4,
  wowww: 4,
  wrathful: -3,
  wreck: -2,
  wrenching: -2,
  wrong: -2,
  wrongdoing: -2,
  wrongdoings: -2,
  wronged: -2,
  wrongful: -2,
  wrongfully: -2,
  wrongly: -2,
  wtf: -4,
  wtff: -4,
  wtfff: -4,
  xo: 3,
  xoxo: 3,
  xoxoxo: 4,
  xoxoxoxo: 4,
  yeah: 1,
  yearning: 1,
  yeees: 2,
  yes: 1,
  youthful: 2,
  yucky: -2,
  yummy: 3,
  zealot: -2,
  zealots: -2,
  zealous: 2
}


/***/ }),

/***/ "./node_modules/automated-readability/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/automated-readability/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "automatedReadability": function() { return /* binding */ automatedReadability; }
/* harmony export */ });
var characterWeight = 4.71
var sentenceWeight = 0.5
var base = 21.43

/**
 * @typedef {Object.<string, number>} AutomatedReadabilityCounts
 * @property {number} sentence
 * @property {number} word
 * @property {number} character
 */

/**
 * Given an object containing the number of words (`word`), the number of sentences (`sentence`), and the number of characters  (`character`) in a document, returns the grade level associated with the document.
 *
 * @param {AutomatedReadabilityCounts} counts
 * @return {number}
 */
function automatedReadability(counts) {
  if (!counts || !counts.sentence || !counts.word || !counts.character) {
    return Number.NaN
  }

  return (
    characterWeight * (counts.character / counts.word) +
    sentenceWeight * (counts.word / counts.sentence) -
    base
  )
}


/***/ }),

/***/ "./node_modules/hedges/index.js":
/*!**************************************!*\
  !*** ./node_modules/hedges/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hedges": function() { return /* binding */ hedges; }
/* harmony export */ });
var hedges = [
  'a bit',
  'about',
  'actually',
  'allege',
  'alleged',
  'almost',
  'almost never',
  'always',
  'and all that',
  'and so forth',
  'apparent',
  'apparently',
  'appear',
  'appear to be',
  'appeared',
  'appears',
  'approximately',
  'around',
  'assume',
  'assumed',
  'assumes',
  'assumption',
  'at least',
  'basically',
  'be sure',
  'believe',
  'believed',
  'believes',
  'bunch',
  'can',
  'certain',
  'certainly',
  'clear',
  'clearly',
  'conceivably',
  'consider',
  'considered',
  'considers',
  'consistent with',
  'could',
  'couple',
  'definite',
  'definitely',
  'diagnostic',
  "don't know",
  'doubt',
  'doubtful',
  'effectively',
  'estimate',
  'estimated',
  'estimates',
  'et cetera',
  'evidently',
  'fairly',
  'few',
  'find',
  'finds',
  'found',
  'frequently',
  'generally',
  'guess',
  'guessed',
  'guesses',
  'hopefully',
  "if i'm understanding you correctly",
  'improbable',
  'in general',
  'in my mind',
  'in my opinion',
  'in my understanding',
  'in my view',
  'inconclusive',
  'indicate',
  'kind of',
  'largely',
  'like',
  'likely',
  'little',
  'look like',
  'looks like',
  'mainly',
  'many',
  'may',
  'maybe',
  'might',
  'more or less',
  'most',
  'mostly',
  'much',
  'must',
  'my impression',
  'my thinking is',
  'my understanding is',
  'necessarily',
  'occasionally',
  'often',
  'overall',
  'partially',
  'perhaps',
  'possibility',
  'possible',
  'possibly',
  'practically',
  'presumable',
  'presumably',
  'pretty',
  'probability',
  'probable',
  'probably',
  'quite',
  'quite clearly',
  'rare',
  'rarely',
  'rather',
  'read',
  'really',
  'roughly',
  'say',
  'says',
  'seem',
  'seemed',
  'seems',
  'seldom',
  'several',
  'should',
  'so far',
  'some',
  'somebody',
  'somehow',
  'someone',
  'something',
  'something or other',
  'sometimes',
  'somewhat',
  'somewhere',
  'sort of',
  'speculate',
  'speculated',
  'speculates',
  'suggest',
  'suggested',
  'suggestive',
  'suggests',
  'suppose',
  'supposed',
  'supposedly',
  'supposes',
  'surely',
  'tend',
  'their impression',
  'think',
  'thinks',
  'thought',
  'understand',
  'understands',
  'understood',
  'unlikely',
  'unsure',
  'usually',
  'virtually',
  'will',
  'would'
]


/***/ }),

/***/ "./node_modules/polarity/emoji.js":
/*!****************************************!*\
  !*** ./node_modules/polarity/emoji.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emoji": function() { return /* binding */ emoji; }
/* harmony export */ });
var emoji = {
  '💯': 3,
  ':100:': 3,
  '😠': -3,
  ':angry:': -3,
  '😧': -3,
  ':anguished:': -3,
  '😲': 2,
  ':astonished:': 2,
  '🖤': 3,
  ':black_heart:': 3,
  '💙': 3,
  ':blue_heart:': 3,
  '😊': 2,
  ':blush:': 2,
  '💔': -3,
  ':broken_heart:': -3,
  '👏': 3,
  ':clap:': 3,
  '🤡': 0,
  ':clown_face:': 0,
  '😰': -2,
  ':cold_sweat:': -2,
  '😖': -2,
  ':confounded:': -2,
  '😕': -2,
  ':confused:': -2,
  '🤠': 2,
  ':cowboy_hat_face:': 2,
  '🤞': 2,
  ':crossed_fingers:': 2,
  '😢': -2,
  ':cry:': -2,
  '😿': -2,
  ':crying_cat_face:': -2,
  '💘': 3,
  ':cupid:': 3,
  '😞': -2,
  ':disappointed:': -2,
  '😥': -1,
  ':disappointed_relieved:': -1,
  '😵': -1,
  ':dizzy_face:': -1,
  '🤤': 0,
  ':drooling_face:': 0,
  '😑': 0,
  ':expressionless:': 0,
  '🤕': -2,
  ':face_with_head_bandage:': -2,
  '🤒': -1,
  ':face_with_thermometer:': -1,
  '😨': -2,
  ':fearful:': -2,
  '😳': -2,
  ':flushed:': -2,
  '😦': -1,
  ':frowning:': -1,
  '☹️': -2,
  ':frowning_face:': -2,
  '🖕': -4,
  ':middle_finger:': -4,
  '👻': -1,
  ':ghost:': -1,
  '💝': 3,
  ':gift_heart:': 3,
  '💚': 3,
  ':green_heart:': 3,
  '😬': -2,
  ':grimacing:': -2,
  '😁': 2,
  ':grin:': 2,
  '😀': 2,
  ':grinning:': 2,
  '🤝': 1,
  ':handshake:': 1,
  '❤️': 3,
  ':heart:': 3,
  '😍': 3,
  ':heart_eyes:': 3,
  '😻': 3,
  ':heart_eyes_cat:': 3,
  '💓': 3,
  ':heartbeat:': 3,
  '💗': 3,
  ':heartpulse:': 3,
  '🤗': 2,
  ':hugs:': 2,
  '😯': -1,
  ':hushed:': -1,
  '👿': -4,
  ':imp:': -4,
  '😇': 3,
  ':innocent:': 3,
  '😂': 3,
  ':joy:': 3,
  '😹': 3,
  ':joy_cat:': 3,
  '💋': 2,
  ':kiss:': 2,
  '😗': 2,
  ':kissing:': 2,
  '😽': 2,
  ':kissing_cat:': 2,
  '😚': 2,
  ':kissing_closed_eyes:': 2,
  '😘': 3,
  ':kissing_heart:': 3,
  '😙': 2,
  ':kissing_smiling_eyes:': 2,
  '😆': 1,
  ':laughing:': 1,
  '👄': 2,
  ':lips:': 2,
  '🤥': -2,
  ':lying_face:': -2,
  '😷': -1,
  ':mask:': -1,
  '🤑': 0,
  ':money_mouth_face:': 0,
  '🤢': -2,
  ':nauseated_face:': -2,
  '🤓': -1,
  ':nerd_face:': -1,
  '😐': 0,
  ':neutral_face:': 0,
  '😶': 0,
  ':no_mouth:': 0,
  '👌': 2,
  ':ok_hand:': 2,
  '😮': -2,
  ':open_mouth:': -2,
  '😔': -1,
  ':pensive:': -1,
  '😣': -2,
  ':persevere:': -2,
  '😾': -4,
  ':pouting_cat:': -4,
  '🙏': 1,
  ':pray:': 1,
  '👊': -1,
  ':fist_oncoming:': -1,
  '💜': 3,
  ':purple_heart:': 3,
  '😡': -4,
  ':rage:': -4,
  '🙌': 4,
  ':raised_hands:': 4,
  '☺️': 2,
  ':relaxed:': 2,
  '😌': 2,
  ':relieved:': 2,
  '💞': 3,
  ':revolving_hearts:': 3,
  '🤣': 4,
  ':rofl:': 4,
  '🙄': -1,
  ':roll_eyes:': -1,
  '😱': -3,
  ':scream:': -3,
  '🙀': -3,
  ':scream_cat:': -3,
  '💩': -3,
  ':hankey:': -3,
  '💀': -2,
  ':skull:': -2,
  '☠️': -2,
  ':skull_and_crossbones:': -2,
  '😴': 0,
  ':sleeping:': 0,
  '😪': 0,
  ':sleepy:': 0,
  '🙁': -1,
  ':slightly_frowning_face:': -1,
  '🙂': 1,
  ':slightly_smiling_face:': 1,
  '😄': 2,
  ':smile:': 2,
  '😸': 2,
  ':smile_cat:': 2,
  '😃': 2,
  ':smiley:': 2,
  '😺': 2,
  ':smiley_cat:': 2,
  '😈': -3,
  ':smiling_imp:': -3,
  '😏': 2,
  ':smirk:': 2,
  '😼': 2,
  ':smirk_cat:': 2,
  '🤧': -2,
  ':sneezing_face:': -2,
  '😭': -3,
  ':sob:': -3,
  '💖': 3,
  ':sparkling_heart:': 3,
  '😛': 1,
  ':stuck_out_tongue:': 1,
  '😝': 0,
  ':stuck_out_tongue_closed_eyes:': 0,
  '😜': -1,
  ':stuck_out_tongue_winking_eye:': -1,
  '😎': 1,
  ':sunglasses:': 1,
  '😓': -1,
  ':sweat:': -1,
  '😅': 2,
  ':sweat_smile:': 2,
  '🤔': -1,
  ':thinking:': -1,
  '👎': -2,
  ':-1:': -2,
  '👍': 2,
  ':+1:': 2,
  '😫': -2,
  ':tired_face:': -2,
  '😤': 0,
  ':triumph:': 0,
  '💕': 3,
  ':two_hearts:': 3,
  '😒': -2,
  ':unamused:': -2,
  '🙃': 0,
  ':upside_down_face:': 0,
  '✌️': 2,
  ':v:': 2,
  '😩': -2,
  ':weary:': -2,
  '😉': 3,
  ':wink:': 3,
  '😟': -3,
  ':worried:': -3,
  '💛': 3,
  ':yellow_heart:': 3,
  '😋': 3,
  ':yum:': 3,
  '🤐': -1,
  ':zipper_mouth_face:': -1
}


/***/ }),

/***/ "./node_modules/polarity/index.js":
/*!****************************************!*\
  !*** ./node_modules/polarity/index.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "polarities": function() { return /* binding */ polarities; },
/* harmony export */   "polarity": function() { return /* binding */ polarity; },
/* harmony export */   "inject": function() { return /* binding */ inject; }
/* harmony export */ });
/* harmony import */ var afinn_165__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! afinn-165 */ "./node_modules/afinn-165/index.js");
/* harmony import */ var _emoji_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emoji.js */ "./node_modules/polarity/emoji.js");
/**
 * @typedef {Object} Polarity
 * @property {number} polarity
 * @property {number} positivity
 * @property {number} negativity
 * @property {Array.<string>} positive
 * @property {Array.<string>} negative
 *
 * @typedef {Object.<string, number>} Inject
 */




var polarities = {}

var own = {}.hasOwnProperty

inject(afinn_165__WEBPACK_IMPORTED_MODULE_0__.afinn165)
inject(_emoji_js__WEBPACK_IMPORTED_MODULE_1__.emoji)

/**
 * Get a polarity result from given values, optionally with one time injections.
 *
 * @param {Array.<string>} values
 * @param {Inject} inject
 * @returns {Polarity}
 */
function polarity(values, inject) {
  var words = values || []
  var index = words.length === 0 ? 1 : words.length
  var positivity = 0
  var negativity = 0
  /** @type {Array.<string>} */
  var positive = []
  /** @type {Array.<string>} */
  var negative = []
  /** @type {string} */
  var value
  /** @type {number} */
  var weight

  while (index--) {
    value = words[index]
    weight = getPolarity(value, inject)

    if (!weight) {
      continue
    }

    if (weight > 0) {
      positive.push(value)
      positivity += weight
    } else {
      negative.push(value)
      negativity += weight
    }
  }

  return {
    polarity: positivity + negativity,
    positivity,
    negativity,
    positive,
    negative
  }
}

/**
 * Inject values on the `polarities` object.
 *
 * @param {Inject} values
 */
function inject(values) {
  /** @type {string} */
  var value

  for (value in values) {
    if (own.call(values, value)) {
      polarities[value] = values[value]
    }
  }
}

/**
 * Get the polarity of a word.
 *
 * @param {string} value
 * @param {Inject} inject
 */
function getPolarity(value, inject) {
  if (own.call(polarities, value)) {
    return polarities[value]
  }

  if (inject && own.call(inject, value)) {
    return inject[value]
  }

  return 0
}


/***/ }),

/***/ "./node_modules/weasels/index.js":
/*!***************************************!*\
  !*** ./node_modules/weasels/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "weasels": function() { return /* binding */ weasels; }
/* harmony export */ });
var weasels = [
  'a lot',
  'about',
  'acts',
  'again',
  'all',
  'almost',
  'already',
  'also',
  'anyway',
  'appeared',
  'appears',
  'are a number',
  'arguably',
  'back',
  'be able to',
  'began',
  'believed',
  'better',
  'bit',
  'clearly',
  'close',
  'combats',
  'completely',
  'considered',
  'could',
  'decided',
  'down',
  'effective',
  'efficient',
  'enough',
  'even',
  'ever',
  'exceedingly',
  'excellent',
  'expert',
  'experts',
  'extremely',
  'fairly',
  'far',
  'felt',
  'few',
  'gains',
  'heard',
  'helps',
  'huge',
  'improved',
  'interestingly',
  'is a number',
  'is like',
  'just',
  'knew',
  'largely',
  'like',
  'linked to',
  'literally',
  'looked',
  'looks',
  'lots',
  'many',
  'might',
  'most',
  'mostly',
  'not rocket science',
  'noticed',
  'often',
  'only',
  'outside the box',
  'over',
  'own',
  'pretty',
  'probably',
  'quite',
  'rather',
  'real',
  'realised',
  'realized',
  'really',
  'recognised',
  'recognized',
  'relatively',
  'remarkably',
  'reportedly',
  'saw',
  'seemed',
  'seems',
  'several',
  'significantly',
  'smelled',
  'so',
  'some',
  'somehow',
  'sort',
  'started',
  'still',
  'substantially',
  'supports',
  'supposed',
  'surprisingly',
  'that',
  'then',
  'thought',
  'tiny',
  'touched',
  'understood',
  'up',
  'useful',
  'various',
  'vast',
  'very',
  'virtually',
  'wanted',
  'watched',
  'well',
  'wished',
  'wondered',
  'works'
]


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./src/js/editor.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/sidebar */ "./src/js/components/sidebar.js");
 // import './hoc/add-classes';
// import './format-types/highlight';
// import './hooks/subscribe';
}();
/******/ })()
;
//# sourceMappingURL=editor.js.map