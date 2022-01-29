/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/checks/adverbs.js":
/*!**********************************!*\
  !*** ./src/js/checks/adverbs.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_adverbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/adverbs */ "./src/js/data/adverbs.js");

/* harmony default export */ __webpack_exports__["default"] = (text => {
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
});

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
/* harmony import */ var _so__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./so */ "./src/js/checks/so.js");




/* harmony default export */ __webpack_exports__["default"] = (text => {
  return [...(0,_passive__WEBPACK_IMPORTED_MODULE_1__["default"])(text), ...(0,_so__WEBPACK_IMPORTED_MODULE_3__["default"])(text), ...(0,_adverbs__WEBPACK_IMPORTED_MODULE_0__["default"])(text), ...(0,_readability__WEBPACK_IMPORTED_MODULE_2__["default"])(text)].filter(Boolean);
});

/***/ }),

/***/ "./src/js/checks/passive.js":
/*!**********************************!*\
  !*** ./src/js/checks/passive.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_passive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/passive */ "./src/js/data/passive.js");

const expression = new RegExp('\\b(am|are|were|being|is|been|was|be)\\b\\s*([\\w]+ed|' + _data_passive__WEBPACK_IMPORTED_MODULE_0__["default"].map(word => word.value).join('|') + ')\\b', 'gi');
/* harmony default export */ __webpack_exports__["default"] = (text => {
  const matches = [...text.matchAll(expression)];

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    const [value] = [...match].filter(Boolean);
    return {
      value,
      type: 'passive',
      level: 'warning',
      index: match.index,
      offset: value.length + match.index
    };
  });
});

/***/ }),

/***/ "./src/js/checks/readability.js":
/*!**************************************!*\
  !*** ./src/js/checks/readability.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (text => {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return !sentences ? [] : sentences.map(sentence => {
    const words = text.match(/\w+/g)?.length || 0;
    const characters = text.match(/[a-zA-Z0-9]/g)?.length || 0;
    const score = 4.71 * (characters / words) + 0.5 * (words / 1) - 21.43;
    const level = score > 9 && score <= 16 ? 'suggestion' : score > 16 ? 'warning' : null;
    return words > 14 && level ? {
      type: 'readability',
      message: `sentence is${level === 'warning' ? ' very' : ''} hard to read`,
      level,
      score
    } : {
      characters,
      words,
      score
    };
  });
});

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
      replacements: ''
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







const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'core/quote', 'core/pullquote', 'core/verse', 'core/media-text', 'core/preformatted'];

const AccessPanel = _ref => {
  let {
    contentBlocks
  } = _ref;
  const [problems, setProblems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/block-editor');
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    problems.forEach(block => {
      const {
        attributes: {
          className
        },
        clientId,
        readability,
        warnings
      } = block;

      if (!className || !className.includes('has-problems')) {
        const problem = warnings.length ? 'has-problems--syntax' : 'has-problems--readability';
        updateBlockAttributes(clientId, {
          className: `has-problems has-problems--${problem}`
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