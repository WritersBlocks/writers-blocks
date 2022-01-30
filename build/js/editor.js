/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/checks/adverbs.js":
/*!**********************************!*\
  !*** ./src/js/checks/adverbs.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/js/checks/index.js":
/*!********************************!*\
  !*** ./src/js/checks/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adverbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adverbs */ "./src/js/checks/adverbs.js");
/* harmony import */ var _passive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./passive */ "./src/js/checks/passive.js");
/* harmony import */ var _readability__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./readability */ "./src/js/checks/readability.js");
/* harmony import */ var _simpler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./simpler */ "./src/js/checks/simpler.js");
/* harmony import */ var _so__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./so */ "./src/js/checks/so.js");





/* harmony default export */ __webpack_exports__["default"] = (text => {
  return [...(0,_passive__WEBPACK_IMPORTED_MODULE_1__["default"])(text), ...(0,_so__WEBPACK_IMPORTED_MODULE_4__["default"])(text), ...(0,_adverbs__WEBPACK_IMPORTED_MODULE_0__["default"])(text), ...(0,_readability__WEBPACK_IMPORTED_MODULE_2__["default"])(text), ...(0,_simpler__WEBPACK_IMPORTED_MODULE_3__["default"])(text)].filter(Boolean);
});

/***/ }),

/***/ "./src/js/checks/passive.js":
/*!**********************************!*\
  !*** ./src/js/checks/passive.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/js/checks/readability.js":
/*!**************************************!*\
  !*** ./src/js/checks/readability.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_reading_score__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/reading-score */ "./src/js/utils/reading-score.js");

/* harmony default export */ __webpack_exports__["default"] = (text => {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return !sentences ? [] : sentences.map(sentence => {
    const {
      score,
      words
    } = (0,_utils_reading_score__WEBPACK_IMPORTED_MODULE_0__.readingScore)(sentence);
    const level = score > 9 && score <= 16 ? 'suggestion' : score > 16 ? 'warning' : null;
    return words > 14 && level ? {
      value: sentence,
      type: 'readability',
      level,
      message: `sentence is${level === 'warning' ? ' very' : ''} hard to read`,
      index: 0,
      offset: sentence.length
    } : null;
  }).filter(Boolean);
});

/***/ }),

/***/ "./src/js/checks/simpler.js":
/*!**********************************!*\
  !*** ./src/js/checks/simpler.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/js/checks/so.js":
/*!*****************************!*\
  !*** ./src/js/checks/so.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/js/components/sidebar.js":
/*!**************************************!*\
  !*** ./src/js/components/sidebar.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _checks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../checks */ "./src/js/checks/index.js");
/* harmony import */ var _utils_reading_score__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/reading-score */ "./src/js/utils/reading-score.js");








const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'core/quote', 'core/pullquote', 'core/verse', 'core/media-text', 'core/preformatted'];

const AccessPanel = _ref => {
  let {
    contentBlocks
  } = _ref;
  const [problems, setProblems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/block-editor');
  const content = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getEditedPostAttribute('content'));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const blockData = contentBlocks.map(block => ({ ...block,
      ...(block?.attributes?.content?.length ? {
        warnings: (0,_checks__WEBPACK_IMPORTED_MODULE_5__["default"])(block.attributes.content)
      } : {})
    }));
    const problems = blockData.filter(block => {
      return block?.warnings?.length;
    });
    setProblems(problems);
  }, [contentBlocks]);
  console.log(problems);
  console.log((0,_utils_reading_score__WEBPACK_IMPORTED_MODULE_6__.readingScore)(content));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    problems.forEach(block => {
      const {
        attributes: {
          className
        },
        clientId,
        warnings
      } = block;
      const classes = warnings.map(warning => `has-problems--${warning.type}-${warning.level}`).join(' ');

      if (!className || !className.includes('has-problems')) {
        updateBlockAttributes(clientId, {
          className: `has-problems ${classes}`
        });
      }
    });
  }, [problems]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebarMoreMenuItem, {
    target: "syntax-highlighter",
    icon: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Syntax Highlighter', 'syntax')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebar, {
    name: "syntax-highlighter",
    icon: "text",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Syntax Highlighter', 'syntax')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "syntax-highlighter__readability components-panel__body is-opened",
    id: "syntax-highlighter_readability"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "syntax-highlighter__problems components-panel__body is-opened",
    id: "syntax-highlighter_problems"
  })));
};
/**
 * Register Access Panel Plugin
 */


(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)('syntax-highlighter', {
  render: (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.withSelect)(select => {
    const {
      getBlocks
    } = select('core/block-editor');
    return {
      contentBlocks: getBlocks().filter(block => ALLOWED_BLOCKS.includes(block.name))
    };
  })(AccessPanel)
});

/***/ }),

/***/ "./src/js/data/adverbs.js":
/*!********************************!*\
  !*** ./src/js/data/adverbs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (['absolutel', 'accidentall', 'additionall', 'allegedl', 'alternativel', 'angril', 'anxiousl', 'approximatel', 'awkwardl', 'badl', 'barel', 'beautifull', 'blindl', 'boldl', 'bravel', 'brightl', 'briskl', 'bristl', 'bubbl', 'busil', 'calml', 'carefull', 'carelessl', 'cautiousl', 'cheerfull', 'clearl', 'closel', 'coldl', 'completel', 'consequentl', 'correctl', 'courageousl', 'crinkl', 'cruell', 'crumbl', 'cuddl', 'currentl', 'dail', 'daringl', 'deadl', 'definitel', 'deliberatel', 'doubtfull', 'dumbl', 'eagerl', 'earl', 'easil', 'elegantl', 'enormousl', 'enthusiasticall', 'equall', 'especiall', 'eventuall', 'exactl', 'exceedingl', 'exclusivel', 'extremel', 'fairl', 'faithfull', 'fatall', 'fiercel', 'finall', 'fondl', 'foolishl', 'fortunatel', 'frankl', 'franticall', 'generousl', 'gentl', 'giggl', 'gladl', 'gracefull', 'greedil', 'happil', 'hardl', 'hastil', 'healthil', 'heartil', 'honestl', 'hourl', 'hungril', 'hurriedl', 'immediatel', 'impatientl', 'inadequatel', 'ingeniousl', 'innocentl', 'inquisitivel', 'interestingl', 'irritabl', 'jiggl', 'joyousl', 'justl', 'kindl', 'largel', 'latel', 'lazil', 'likel', 'literall', 'lonel', 'loosel', 'loudl', 'loudl', 'luckil', 'madl', 'man', 'mentall', 'mildl', 'monthl', 'mortall', 'mostl', 'mysteriousl', 'neatl', 'nervousl', 'nightl', 'noisil', 'normall', 'obedientl', 'occasionall', 'onl', 'openl', 'painfull', 'particularl', 'patientl', 'perfectl', 'politel', 'poorl', 'powerfull', 'presumabl', 'previousl', 'promptl', 'punctuall', 'quarterl', 'quickl', 'quietl', 'rapidl', 'rarel', 'reall', 'recentl', 'recklessl', 'regularl', 'relativel', 'reluctantl', 'remarkabl', 'repeatedl', 'rightfull', 'roughl', 'rudel', 'sadl', 'safel', 'selfishl', 'sensibl', 'seriousl', 'sharpl', 'shortl', 'shyl', 'significantl', 'silentl', 'simpl', 'sleepil', 'slowl', 'smartl', 'smell', 'smoothl', 'softl', 'solemnl', 'sparkl', 'speedil', 'stealthil', 'sternl', 'stupidl', 'substantiall', 'successfull', 'suddenl', 'surprisingl', 'suspiciousl', 'swiftl', 'tenderl', 'tensel', 'thoughtfull', 'tightl', 'timel', 'truthfull', 'unexpectedl', 'unfortunatel', 'usuall', 'ver', 'victoriousl', 'violentl', 'vivaciousl', 'warml', 'waverl', 'weakl', 'wearil', 'weekl', 'wildl', 'wisel', 'worldl', 'wrinkl', 'yearl']);

/***/ }),

/***/ "./src/js/data/passive.js":
/*!********************************!*\
  !*** ./src/js/data/passive.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/js/utils/reading-score.js":
/*!***************************************!*\
  !*** ./src/js/utils/reading-score.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony import */ var _strip_astrals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./strip-astrals */ "./src/js/utils/strip-astrals.js");
/* harmony import */ var _strip_html_comments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./strip-html-comments */ "./src/js/utils/strip-html-comments.js");
/* harmony import */ var _strip_spaces__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./strip-spaces */ "./src/js/utils/strip-spaces.js");
/* harmony import */ var _strip_tags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./strip-tags */ "./src/js/utils/strip-tags.js");
/* harmony import */ var _strip_html_entities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./strip-html-entities */ "./src/js/utils/strip-html-entities.js");








/**
 * 
 * @param {string} text
 */

const readingScore = content => {
  const text = `${(0,lodash__WEBPACK_IMPORTED_MODULE_0__.flow)(_strip_tags__WEBPACK_IMPORTED_MODULE_6__["default"], _strip_html_comments__WEBPACK_IMPORTED_MODULE_4__["default"], _strip_astrals__WEBPACK_IMPORTED_MODULE_3__["default"], _strip_spaces__WEBPACK_IMPORTED_MODULE_5__["default"], _strip_html_entities__WEBPACK_IMPORTED_MODULE_7__["default"])(content)}\n`;
  const paragraphs = text.replace(/\n$/gm, '').split(/\n/g).filter(line => line.length).length;
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g)?.length || 0;
  const words = (0,_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__.count)(text, 'words');
  const characters = (0,_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__.count)(text, 'characters_including_spaces');
  const alphaNumericCharacters = text.match(/[a-zA-Z0-9]/g)?.length || 0;
  const letters = text.match(/[a-zA-Z]/g)?.length || 0;
  const score = 4.71 * (alphaNumericCharacters / words) + 0.5 * (words / sentences) - 21.43;
  const {
    time
  } = reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_2___default()(text, {
    wordsPerMinute: 275
  });
  return {
    paragraphs,
    sentences,
    words,
    characters,
    score: Math.round(score),
    letters,
    readingTime: time
  };
};

/***/ }),

/***/ "./src/js/utils/strip-astrals.js":
/*!***************************************!*\
  !*** ./src/js/utils/strip-astrals.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./node_modules/reading-time/lib/reading-time.js":
/*!*******************************************************!*\
  !*** ./node_modules/reading-time/lib/reading-time.js ***!
  \*******************************************************/
/***/ (function(module) {

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

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/wordcount":
/*!***********************************!*\
  !*** external ["wp","wordcount"] ***!
  \***********************************/
/***/ (function(module) {

module.exports = window["wp"]["wordcount"];

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./src/js/editor.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/sidebar */ "./src/js/components/sidebar.js");

}();
/******/ })()
;
//# sourceMappingURL=editor.js.map