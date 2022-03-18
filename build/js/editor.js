/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/array-iterate/index.js":
/*!*********************************************!*\
  !*** ./node_modules/array-iterate/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";


module.exports = iterate

var own = {}.hasOwnProperty

function iterate(values, callback, context) {
  var index = -1
  var result

  if (!values) {
    throw new Error('Iterate requires that |this| not be ' + values)
  }

  if (!own.call(values, 'length')) {
    throw new Error('Iterate requires that |this| has a `length`')
  }

  if (typeof callback !== 'function') {
    throw new Error('`callback` must be a function')
  }

  // The length might change, so we do not cache it.
  while (++index < values.length) {
    // Skip missing values.
    if (!(index in values)) {
      continue
    }

    result = callback.call(context, values[index], index, values)

    // If `callback` returns a `number`, move `index` over to `number`.
    if (typeof result === 'number') {
      // Make sure that negative numbers do not break the loop.
      if (result < 0) {
        index = 0
      }

      index = result - 1
    }
  }
}


/***/ }),

/***/ "./src/js/components/editor-toolbar-button.js":
/*!****************************************************!*\
  !*** ./src/js/components/editor-toolbar-button.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorToolbarButton": function() { return /* binding */ EditorToolbarButton; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _decorators_gutenberg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../decorators/gutenberg */ "./src/js/decorators/gutenberg.js");


/**
 * External dependencies
 */





const {
  WB_SETTINGS: {
    settings: DEFAULT_SETTINGS
  }
} = window;
const EditorToolbarButton = props => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_SETTINGS);
  const siteSettings = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select('core').getEntityRecord('root', 'site');
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (siteSettings) {
      const {
        writers_blocks: settings
      } = siteSettings;
      setSettings(settings);
    }
  }, [siteSettings]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-toolbar__control', {
      'is-pressed': settings.editing_mode === '1'
    }),
    id: "writers-blocks-toolbar-button",
    icon: "edit",
    label: "Edit",
    onClick: () => {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core').saveEntityRecord('root', 'site', {
        writers_blocks: { ...settings,
          editing_mode: settings.editing_mode === '1' ? '0' : '1'
        }
      });

      if (settings.editing_mode === '1') {
        (0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_4__.removeAnnotations)();
      } else {
        const blockProblems = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('writers-blocks/editor').getProblems();
        (0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_4__.addAnnotations)(blockProblems);
      }
    }
  });
};

/***/ }),

/***/ "./src/js/components/panel/plugin.js":
/*!*******************************************!*\
  !*** ./src/js/components/panel/plugin.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PluginPanel": function() { return /* binding */ PluginPanel; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./src/js/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store */ "./src/js/store/index.js");









const {
  WB_SETTINGS: {
    settings: SHOWN_ANNOTATION_TYPES
  }
} = window;
const PluginPanel = () => {
  const [suggestions, setSuggestions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(SHOWN_ANNOTATION_TYPES);
  const siteSettings = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core').getEntityRecord('root', 'site');
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (siteSettings) {
      const {
        writers_blocks
      } = siteSettings;
      setSuggestions(writers_blocks);
    }
  }, [siteSettings]);
  const {
    readingTime,
    score,
    polarity
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getReadability());
  const problems = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const currentProblems = select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getProblems();
    return Object.keys(_constants__WEBPACK_IMPORTED_MODULE_5__.PROBLEM_TYPES_TO_LABEL).reduce((acc, key) => {
      acc[key] = currentProblems.filter(_ref => {
        let {
          type
        } = _ref;
        return type === key;
      });
      return acc;
    }, {});
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebar, {
    name: "writers-blocks",
    icon: "text",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Writer's Blocks", 'writers-blocks')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Readability', 'writers-blocks')
  }, readingTime && score && polarity ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Reading time"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    style: {
      margin: 0
    }
  }, (readingTime || 0) >= 1 ? `${Math.round(readingTime)} minute${Math.round(readingTime || 0) > 1 ? 's' : ''}` : 'Less than a minute')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Grade"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    style: {
      margin: 0
    }
  }, score || 0)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Polarity"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    style: {
      margin: 0
    }
  }, polarity || 0))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Suggestions', 'writers-blocks')
  }, suggestions ? Object.keys(_constants__WEBPACK_IMPORTED_MODULE_5__.PROBLEM_TYPES_TO_LABEL).map(type => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
    key: type
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: _constants__WEBPACK_IMPORTED_MODULE_5__.PROBLEM_TYPES_TO_LABEL[type].label,
    help: _constants__WEBPACK_IMPORTED_MODULE_5__.PROBLEM_TYPES_TO_LABEL[type].help(problems[type].length),
    checked: suggestions[type] ? suggestions[type] === '1' : true,
    onChange: checked => {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core').saveEntityRecord('root', 'site', {
        writers_blocks: { ...suggestions,
          [type]: checked ? '1' : '0'
        }
      }).then(_ref2 => {
        let {
          writers_blocks
        } = _ref2;
        setSuggestions(writers_blocks);
      });
      console.log({
        checked,
        type
      });

      if (checked) {
        const problems = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)(_store__WEBPACK_IMPORTED_MODULE_6__.store).getProblemsByType(type);
        problems.forEach(_ref3 => {
          let {
            blockId,
            blockName,
            type,
            index,
            offset
          } = _ref3;

          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/annotations').__experimentalAddAnnotation({
            source: `writers-blocks--${type}`,
            blockClientId: blockId,
            richTextIdentifier: _constants__WEBPACK_IMPORTED_MODULE_5__.BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
            range: {
              start: index,
              end: offset
            }
          });
        });
      } else {
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/annotations').__experimentalRemoveAnnotationsBySource(`writers-blocks--${type}`);
      }

      if (type === 'readability' && checked) {
        const problems = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)(_store__WEBPACK_IMPORTED_MODULE_6__.store).getProblems();
        problems.filter(_ref4 => {
          let {
            type
          } = _ref4;
          return type !== 'readability' && suggestions[type] === '1';
        }).forEach(_ref5 => {
          let {
            blockId,
            blockName,
            type,
            index,
            offset
          } = _ref5;

          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/annotations').__experimentalAddAnnotation({
            source: `writers-blocks--${type}`,
            blockClientId: blockId,
            richTextIdentifier: _constants__WEBPACK_IMPORTED_MODULE_5__.BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
            range: {
              start: index,
              end: offset
            }
          });
        });
      }
    }
  }))) : null));
};

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALLOWED_BLOCKS": function() { return /* binding */ ALLOWED_BLOCKS; },
/* harmony export */   "BLOCK_TYPE_CONTENT_ATTRIBUTE": function() { return /* binding */ BLOCK_TYPE_CONTENT_ATTRIBUTE; },
/* harmony export */   "PROBLEM_TYPES": function() { return /* binding */ PROBLEM_TYPES; },
/* harmony export */   "PROBLEM_TYPES_TO_LABEL": function() { return /* binding */ PROBLEM_TYPES_TO_LABEL; },
/* harmony export */   "DEFAULT_STATE": function() { return /* binding */ DEFAULT_STATE; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'core/quote', 'core/pullquote', 'core/verse', 'core/media-text', 'core/preformatted'];
const BLOCK_TYPE_CONTENT_ATTRIBUTE = {
  'core/paragraph': 'content',
  'core/list': 'values',
  'core/quote': 'value'
};
const PROBLEM_TYPES = ['simplify', 'intensify', 'passive', 'readability', 'indefinite_article', 'equality', 'profanities', 'contractions', 'repeated_words', 'redundant_acronyms', 'diacritics', 'sentence_spacing'];
const PROBLEM_TYPES_TO_LABEL = {
  simplify: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Overly-Complex Words', 'writers-blocks'),
    help: number => number > 0 ? `${number} word${number > 1 ? 's' : ''} may need to be simplified.` : 'No words need to be simplified. Bravo.'
  },
  intensify: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vague Words', 'writers-blocks'),
    help: number => number > 0 ? `${number} word${number > 1 ? 's' : ''} may lessen${number > 1 ? '' : 's'} impact.` : 'No vague language in sight. Awesome job!'
  },
  passive: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Passive Voice', 'writers-blocks'),
    help: number => number > 0 ? `${number} word${number > 1 ? 's' : ''} may use passive voice.` : 'No passive voice to report.'
  },
  readability: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Readability', 'writers-blocks'),
    help: number => number > 0 ? `${number} sentence${number > 1 ? 's' : ''} may be difficult to read.` : 'Not a single sentence is difficult to read. Great job.'
  },
  equality: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Equality', 'writers-blocks'),
    help: number => number > 0 ? `${number} word${number > 1 ? 's' : ''} may be insensitive.` : 'No words are insensitive. Well done.'
  },
  profanities: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Profanity', 'writers-blocks'),
    help: number => number > 0 ? `${number} word${number > 1 ? 's' : ''} may be profane.` : 'No profanity to be found.'
  },
  'redundant_acronyms': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Redundant Acronyms', 'writers-blocks'),
    help: number => number > 0 ? `${number} acronym${number > 1 ? 's' : ''} may be redundant.` : 'Acronyms are on point.'
  },
  contractions: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Contractions', 'writers-blocks'),
    help: number => number > 0 ? `${number} contraction${number > 1 ? 's' : ''} may .` : 'Contractions are looking good.'
  },
  'repeated_words': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Repeated Words', 'writers-blocks'),
    help: number => number > 0 ? `${number} word${number > 1 ? 's' : ''} may be repeated.` : 'No repeated words to be found.'
  },
  diacritics: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Accents', 'writers-blocks'),
    help: number => number > 0 ? `${number} word${number > 1 ? 's' : ''} may use improper accents.` : 'No improper accents here.'
  },
  'indefinite_article': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Indefinite Articles', 'writers-blocks'),
    help: number => number > 0 ? `${number} indefinite article${number > 1 ? 's' : ''} may have improper usage.` : 'All indefinite articles are correct.'
  },
  'sentence_spacing': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sentence Spacing', 'writers-blocks'),
    help: number => number > 0 ? `${number} sentence${number > 1 ? 's' : ''} may have improper spacing.` : 'All sentences are properly spaced.'
  }
};
const DEFAULT_STATE = {
  isHighlighted: true,
  isBlurred: false,
  ...Object.keys(PROBLEM_TYPES_TO_LABEL).map(type => ({
    [type]: true
  }))
};

/***/ }),

/***/ "./src/js/decorators/gutenberg.js":
/*!****************************************!*\
  !*** ./src/js/decorators/gutenberg.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAnnotationAvailable": function() { return /* binding */ isAnnotationAvailable; },
/* harmony export */   "getQueueLength": function() { return /* binding */ getQueueLength; },
/* harmony export */   "addBlockToQueue": function() { return /* binding */ addBlockToQueue; },
/* harmony export */   "getAnnotatableTextFromBlock": function() { return /* binding */ getAnnotatableTextFromBlock; },
/* harmony export */   "removeAnnotations": function() { return /* binding */ removeAnnotations; },
/* harmony export */   "getAnnotatableText": function() { return /* binding */ getAnnotatableText; },
/* harmony export */   "addAnnotations": function() { return /* binding */ addAnnotations; },
/* harmony export */   "scheduleAnnotations": function() { return /* binding */ scheduleAnnotations; }
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_annotations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/annotations */ "@wordpress/annotations");
/* harmony import */ var _wordpress_annotations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_annotations__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parsers */ "./src/js/parsers/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./src/js/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants */ "./src/js/constants.js");
/**
 * External dependencies
 */


 // The WP annotations package isn't loaded by default so force loading it.


/**
 * Internal depenedencies
 */




const {
  WB_SETTINGS: {
    settings: SHOWN_ANNOTATION_TYPES
  },
  btoa
} = window;
let isUpdatingProblems = false;
let queue = [];
function isAnnotationAvailable() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/block-editor') && typeof (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/block-editor').getBlocks === 'function' && (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/annotations') && typeof (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/annotations').__experimentalAddAnnotation === 'function';
}
const getQueueLength = () => queue.length;
const addBlockToQueue = block => {
  if (block) {
    queue = [// remove all scheduled annotations for this block
    ...queue.filter(block => block.clientId !== block.clientId), block];
  }
};
const getAnnotatableTextFromBlock = block => {
  const {
    clientId: blockId,
    name: blockName,
    attributes: blockAttributes
  } = block;
  const isAllowed = _constants__WEBPACK_IMPORTED_MODULE_5__.ALLOWED_BLOCKS.includes(blockName);
  const attribute = _constants__WEBPACK_IMPORTED_MODULE_5__.BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName];

  if (!isAllowed) {
    return [];
  }

  const problems = (0,_parsers__WEBPACK_IMPORTED_MODULE_3__["default"])(blockAttributes[attribute], {
    preserveWhiteSpace: blockName !== 'core/list'
  });

  if (!problems.length) {
    return [];
  }

  return problems.map(problem => ({
    blockId,
    blockName,
    blockAttributes,
    annotationId: (0,uuid__WEBPACK_IMPORTED_MODULE_6__["default"])(),
    id: btoa(`${problem.type}_${problem.index}_${problem.offset}_${problem.value}`),
    ...problem
  }));
};
const removeAnnotations = function () {
  let blockId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  const annotations = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/annotations').__experimentalGetAnnotations().filter(annotation => blockId ? annotation.blockClientId === blockId :  true && _constants__WEBPACK_IMPORTED_MODULE_5__.PROBLEM_TYPES.map(type => `writers-blocks--${type}`).includes(annotation.source));

  annotations.forEach(annotation => {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/annotations').__experimentalRemoveAnnotation(annotation.id);
  });
};
const getAnnotatableText = blocks => {
  const allowedBlocks = blocks.filter(block => _constants__WEBPACK_IMPORTED_MODULE_5__.ALLOWED_BLOCKS.includes(block.name));
  return allowedBlocks.flatMap(getAnnotatableTextFromBlock);
};
const addAnnotations = function (blockProblems) {
  let {
    clientId = null,
    ignore = []
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (clientId) {
    removeAnnotations(clientId);
  }

  const annotations = blockProblems.filter(problem => problem.state !== 'ignored' && !ignore.includes(problem.id));
  const readabilityAnnotations = annotations.filter(problem => problem.type.includes('readability'));
  readabilityAnnotations.forEach(annotation => {
    const {
      blockId,
      blockName,
      annotationId,
      type,
      index,
      offset
    } = annotation;
    const [name] = type.split('-');

    if (SHOWN_ANNOTATION_TYPES[name] ? SHOWN_ANNOTATION_TYPES[name] === '1' : true) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/annotations').__experimentalAddAnnotation({
        source: `writers-blocks--${type}`,
        blockClientId: blockId,
        richTextIdentifier: _constants__WEBPACK_IMPORTED_MODULE_5__.BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
        range: {
          start: index,
          end: offset
        },
        id: annotationId
      });
    }
  });
  annotations.filter(annotation => !annotation.type.includes('readability')).forEach(annotation => {
    const {
      blockId,
      blockName,
      annotationId,
      type,
      index,
      offset
    } = annotation;
    const [name] = type.split('-');

    if (SHOWN_ANNOTATION_TYPES[name] ? SHOWN_ANNOTATION_TYPES[name] === '1' : true) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/annotations').__experimentalAddAnnotation({
        source: `writers-blocks--${type}`,
        blockClientId: blockId,
        richTextIdentifier: _constants__WEBPACK_IMPORTED_MODULE_5__.BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
        range: {
          start: index,
          end: offset
        },
        id: annotationId
      });
    }
  });
};
const scheduleAnnotations = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)(() => {
  if (isUpdatingProblems) {
    return;
  }

  isUpdatingProblems = true;
  const block = queue.shift();

  if (!block) {
    isUpdatingProblems = false;
    return;
  }

  const blockProblems = getAnnotatableTextFromBlock(block);

  if (blockProblems.length) {
    const {
      clientId
    } = block;
    const problems = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)(_store__WEBPACK_IMPORTED_MODULE_4__.store).getProblems();
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store).addProblems([...problems.filter(problem => problem.blockId !== clientId), ...blockProblems]);
    addAnnotations(blockProblems, {
      clientId
    });
  }

  isUpdatingProblems = false;

  if (queue.length) {
    scheduleAnnotations();
  }
}, 500);

/***/ }),

/***/ "./src/js/parsers/index.js":
/*!*********************************!*\
  !*** ./src/js/parsers/index.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _retext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retext */ "./src/js/parsers/retext/index.js");
/* harmony import */ var _utils_strip_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/strip-text */ "./src/js/utils/strip-text.js");
// import adverbs from "./adverbs";
// import hedges from "./hedges";
// import passive from "./passive";
// import readability from "./readability";
// import simpler from "./simpler";
// import weasel from "./weasel";
 // import sensitivity from "./sensitivity";
// import fillers from "./fillers";
// import cliches from './cliches';


/* harmony default export */ __webpack_exports__["default"] = (function (text) {
  let {
    preserveWhiteSpace = true
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const content = (0,_utils_strip_text__WEBPACK_IMPORTED_MODULE_1__.strip)(text, {
    preserveWhiteSpace
  });
  const {
    messages
  } = (0,_retext__WEBPACK_IMPORTED_MODULE_0__.parse)(content);

  if (!messages.length) {
    return [];
  }

  return messages.map(match => {
    const {
      actual: value,
      position: {
        start: {
          offset: index
        },
        end: {
          offset
        }
      },
      message,
      fatal,
      source,
      expected
    } = match;
    return {
      value,
      type: source.replace('retext-', '').replace('-', '_'),
      level: fatal ? 'warning' : 'suggestion',
      message: `${message.split(', use')[0].replaceAll('`', '"')}.`,
      replacements: expected,
      index,
      offset
    };
  }); // return [
  // ...passive(content),
  // ...adverbs(content),
  // ...readability(content),
  // ...simpler(content),
  // ...hedges(content),
  // ...weasel(content),
  // ...sensitivity(content),
  // ...fillers(content),
  // ...cliches(content),
  // ].filter(Boolean);
});

/***/ }),

/***/ "./src/js/parsers/retext/index.js":
/*!****************************************!*\
  !*** ./src/js/parsers/retext/index.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": function() { return /* binding */ parse; }
/* harmony export */ });
/* harmony import */ var vfile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vfile */ "./node_modules/vfile/lib/index.js");
/* harmony import */ var vfile_sort__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vfile-sort */ "./node_modules/vfile-sort/index.js");
/* harmony import */ var unified__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unified */ "./node_modules/unified/lib/index.js");
/* harmony import */ var retext_english__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! retext-english */ "./node_modules/retext-english/index.js");
/* harmony import */ var retext_equality__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! retext-equality */ "./node_modules/retext-equality/index.js");
/* harmony import */ var retext_profanities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! retext-profanities */ "./node_modules/retext-profanities/index.js");
/* harmony import */ var retext_simplify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! retext-simplify */ "./node_modules/retext-simplify/index.js");
/* harmony import */ var retext_readability__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! retext-readability */ "./node_modules/retext-readability/index.js");
/* harmony import */ var retext_indefinite_article__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! retext-indefinite-article */ "./node_modules/retext-indefinite-article/lib/index.js");
/* harmony import */ var retext_sentence_spacing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! retext-sentence-spacing */ "./node_modules/retext-sentence-spacing/index.js");
/* harmony import */ var retext_repeated_words__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! retext-repeated-words */ "./node_modules/retext-repeated-words/index.js");
/* harmony import */ var retext_redundant_acronyms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! retext-redundant-acronyms */ "./node_modules/retext-redundant-acronyms/index.js");
/* harmony import */ var retext_passive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! retext-passive */ "./node_modules/retext-passive/index.js");
/* harmony import */ var retext_intensify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! retext-intensify */ "./node_modules/retext-intensify/index.js");
/* harmony import */ var retext_diacritics__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! retext-diacritics */ "./node_modules/retext-diacritics/index.js");
/* harmony import */ var retext_contractions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! retext-contractions */ "./node_modules/retext-contractions/index.js");
/* harmony import */ var remark_message_control__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! remark-message-control */ "./node_modules/remark-message-control/index.js");

















function parse(value, config) {
  const options = splitOptions(config);
  return core(value, options.filter, makeText(options.text));
}

function makeText(options) {
  return (0,unified__WEBPACK_IMPORTED_MODULE_0__.unified)().use(retext_english__WEBPACK_IMPORTED_MODULE_1__["default"]).use(retext_equality__WEBPACK_IMPORTED_MODULE_2__["default"], options).use(retext_profanities__WEBPACK_IMPORTED_MODULE_3__["default"], options).use(retext_simplify__WEBPACK_IMPORTED_MODULE_4__["default"], options).use(retext_readability__WEBPACK_IMPORTED_MODULE_5__["default"], options).use(retext_indefinite_article__WEBPACK_IMPORTED_MODULE_6__["default"], options).use(retext_sentence_spacing__WEBPACK_IMPORTED_MODULE_7__["default"], options).use(retext_repeated_words__WEBPACK_IMPORTED_MODULE_8__["default"], options).use(retext_redundant_acronyms__WEBPACK_IMPORTED_MODULE_9__["default"], options).use(retext_passive__WEBPACK_IMPORTED_MODULE_10__["default"], options).use(retext_intensify__WEBPACK_IMPORTED_MODULE_11__["default"], options).use(retext_diacritics__WEBPACK_IMPORTED_MODULE_12__["default"], options).use(retext_contractions__WEBPACK_IMPORTED_MODULE_13__["default"], options);
}

function core(value, options, processor) {
  const file = new vfile__WEBPACK_IMPORTED_MODULE_14__.VFile(value);
  const tree = processor.use(filter, options).parse(file);
  processor.runSync(tree, file);
  (0,vfile_sort__WEBPACK_IMPORTED_MODULE_15__.sort)(file);
  return file;
}

function splitOptions(options) {
  let allow;
  let deny;
  let noBinary;
  let sureness;

  if (Array.isArray(options)) {
    allow = options;
  } else if (options) {
    allow = options.allow;
    deny = options.deny;
    noBinary = options.noBinary;
    sureness = options.profanitySureness;
  }

  return {
    filter: {
      allow,
      deny
    },
    text: {
      noBinary,
      sureness
    }
  };
}

function filter() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (options.allow && options.deny) {
    throw new Error('Do not provide both allow and deny configuration parameters');
  }

  return (0,remark_message_control__WEBPACK_IMPORTED_MODULE_16__["default"])({
    name: 'alex',
    reset: Boolean(options.deny),
    enable: options.deny,
    disable: options.allow,
    source: ['retext-equality', 'retext-profanities']
  });
}

/***/ }),

/***/ "./src/js/store/actions.js":
/*!*********************************!*\
  !*** ./src/js/store/actions.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAnnotations": function() { return /* binding */ addAnnotations; },
/* harmony export */   "addProblem": function() { return /* binding */ addProblem; },
/* harmony export */   "addProblems": function() { return /* binding */ addProblems; },
/* harmony export */   "removeProblem": function() { return /* binding */ removeProblem; },
/* harmony export */   "ignoreProblem": function() { return /* binding */ ignoreProblem; },
/* harmony export */   "updateReadability": function() { return /* binding */ updateReadability; },
/* harmony export */   "updateUserSettings": function() { return /* binding */ updateUserSettings; }
/* harmony export */ });
function addAnnotations(annotations) {
  return {
    type: 'ADD_ANNOTATIONS',
    annotations
  };
}
function addProblem(problem) {
  return {
    type: 'ADD_PROBLEM',
    problem
  };
}
function addProblems(problems) {
  return {
    type: 'ADD_PROBLEMS',
    problems
  };
}
function removeProblem(name) {
  return {
    type: 'REMOVE_PROBLEM',
    name
  };
}
function ignoreProblem(name) {
  return {
    type: 'IGNORE_PROBLEM',
    name
  };
}
function updateReadability(stats) {
  return {
    type: 'UPDATE_READABILITY',
    stats
  };
}
function updateUserSettings(settings) {
  return {
    type: 'UPDATE_USER_SETTINGS',
    settings
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




const STORE_NAME = 'writers-blocks/editor';
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
/* harmony export */   "readability": function() { return /* binding */ readability; },
/* harmony export */   "problems": function() { return /* binding */ problems; },
/* harmony export */   "user": function() { return /* binding */ user; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/js/constants.js");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */


const DEFAULT_USER_SETTINGS = {
  showProblems: true,
  suggestionsToShow: Object.keys(_constants__WEBPACK_IMPORTED_MODULE_1__.PROBLEM_TYPES_TO_LABEL).reduce((accumulator, type) => {
    accumulator[type] = true;
    return accumulator;
  }, {}),
  blocks: []
};
function readability() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    stats: {}
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_READABILITY':
      return { ...state,
        stats: action.stats
      };

    default:
      return state;
  }
}
function problems() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    list: []
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_PROBLEMS':
      return { ...state,
        list: action.problems
      };

    case 'REMOVE_PROBLEM':
      return { ...state,
        list: state.list.filter(problem => problem.id !== action.name)
      };

    case 'IGNORE_PROBLEM':
      const problem = state.list.find(problem => problem.annotationId === action.name);
      return { ...state,
        list: [...state.list.filter(problem => problem.annotationId !== action.name), { ...problem,
          state: 'ignored'
        }]
      };

    default:
      return state;
  }
}
function user() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    settings: DEFAULT_USER_SETTINGS
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_USER_SETTINGS':
      return { ...state,
        settings: { ...state.settings,
          ...action.settings
        }
      };

    default:
      return state;
  }
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
  problems,
  readability,
  user
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
/* harmony export */   "getAnnotations": function() { return /* binding */ getAnnotations; },
/* harmony export */   "getAnnotation": function() { return /* binding */ getAnnotation; },
/* harmony export */   "getIgnoredAnnotations": function() { return /* binding */ getIgnoredAnnotations; },
/* harmony export */   "getBlockProblems": function() { return /* binding */ getBlockProblems; },
/* harmony export */   "getProblemsByType": function() { return /* binding */ getProblemsByType; },
/* harmony export */   "getReadability": function() { return /* binding */ getReadability; },
/* harmony export */   "getUserSettings": function() { return /* binding */ getUserSettings; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

const {
  btoa
} = window;
const getProblems = state => state.problems.list;
const getProblem = (state, id) => state.problems.list.find(_ref => {
  let {
    annotationId: problemId
  } = _ref;
  return problemId === id;
});
const getAnnotations = state => state.annotations.list;
const getAnnotation = (state, id) => state.annotations.list.find(_ref2 => {
  let {
    annotationId
  } = _ref2;
  return annotationId === id;
});
const getIgnoredAnnotations = state => {
  const annotations = state?.annotations?.list;

  if (!annotations?.length) {
    const {
      wb_ignored
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').getEditedPostAttribute('meta') || {};

    if (!wb_ignored) {
      return [];
    }

    return wb_ignored;
  }

  return annotations.filter(annotation => annotation.state === 'ignored').map(_ref3 => {
    let {
      type,
      index,
      offset,
      value
    } = _ref3;
    return btoa(`${type}_${index}_${offset}_${value}`);
  });
};
const getBlockProblems = (state, blockId) => state.problems.list.filter(_ref4 => {
  let {
    blockId: clientId
  } = _ref4;
  return clientId === blockId;
});
const getProblemsByType = (state, type) => state.problems.list.filter(_ref5 => {
  let {
    type: problemType
  } = _ref5;
  return problemType === type;
});
const getReadability = state => state.readability.stats;
const getUserSettings = state => state.user.settings;

/***/ }),

/***/ "./src/js/subscribers/annotations.js":
/*!*******************************************!*\
  !*** ./src/js/subscribers/annotations.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_reading_score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/reading-score */ "./src/js/utils/reading-score.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./src/js/store/index.js");
/* harmony import */ var _decorators_gutenberg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../decorators/gutenberg */ "./src/js/decorators/gutenberg.js");
/**
 * External dependencies
 */



/**
 * Internal depenedencies
 */




let _content = '';
const scheduleReadingScoreUpdate = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.debounce)(content => {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store).updateReadability((0,_utils_reading_score__WEBPACK_IMPORTED_MODULE_3__.readingScore)(content));
}, 500);
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
    const content = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor').getEditedPostAttribute('content');
    const strippedContent = typeof content === 'string' ? content.replace(/<!--(.*?)-->/g, '') : '';
    const problems = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)(_store__WEBPACK_IMPORTED_MODULE_4__.store).getProblems();

    if (!strippedContent || strippedContent === _content && problems.length) {
      return;
    }

    scheduleReadingScoreUpdate(content);

    if (!(0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_5__.isAnnotationAvailable)()) {
      return;
    }

    const blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();

    if (!problems.length && blocks.length) {
      const blockProblems = (0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_5__.getAnnotatableText)(blocks);

      if (blockProblems.length) {
        const ignoredAnnotations = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)(_store__WEBPACK_IMPORTED_MODULE_4__.store).getIgnoredAnnotations();
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store).addProblems(blockProblems);
        (0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_5__.addAnnotations)(blockProblems, {
          ignore: ignoredAnnotations
        });
      }
    }

    const selectedBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getSelectedBlock();

    if (selectedBlock) {
      (0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_5__.addBlockToQueue)(selectedBlock);
    }

    if ((0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_5__.getQueueLength)() > 0) {
      (0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_5__.scheduleAnnotations)();
    }

    _content = strippedContent;
  });
});

/***/ }),

/***/ "./src/js/subscribers/index.js":
/*!*************************************!*\
  !*** ./src/js/subscribers/index.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotations */ "./src/js/subscribers/annotations.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar */ "./src/js/subscribers/toolbar.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip */ "./src/js/subscribers/tooltip.js");




/***/ }),

/***/ "./src/js/subscribers/toolbar.js":
/*!***************************************!*\
  !*** ./src/js/subscribers/toolbar.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _decorators_gutenberg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../decorators/gutenberg */ "./src/js/decorators/gutenberg.js");
/* harmony import */ var _components_editor_toolbar_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/editor-toolbar-button */ "./src/js/components/editor-toolbar-button.js");





 // domReady(() => {
// 	subscribe( () => {
// 		const toolbar = document.querySelector('.edit-post-header-toolbar__left');
//         const toolbarButton = document.querySelector('#writers-blocks-toolbar-button');
// 		if (!isAnnotationAvailable() || !toolbar || toolbarButton) {
// 			return;
// 		}
//         const { writers_blocks } = select('core').getEntityRecord('root', 'site') || {};
//         const { editing_mode } = writers_blocks || DEFAULT_SETTINGS;
//         toolbar.appendChild(placeholder);
//         render(
// <ToolbarButton
//     className={ classnames( 'components-toolbar__control', { 'is-pressed': editing_mode } ) }
//     id="writers-blocks-toolbar-button"
//     icon='edit'
//     label='Edit'
//     onClick={ () => {
//         dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
//             writers_blocks: {
//                 ...writers_blocks,
//                 editing_mode: editing_mode === "1" ? "0" : "1",
//             }
//         } ).then(({ writers_blocks }) => {
//             console.log(writers_blocks);
//         });
//     } }
// />,
//             placeholder
//         );
//     });
// });

(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
  const quickpostbutton = document.querySelector('#createwithrani-quick-post-button-wrapper'); // If the Quick Post Button already exists, skip render

  if (quickpostbutton || !(0,_decorators_gutenberg__WEBPACK_IMPORTED_MODULE_3__.isAnnotationAvailable)()) {
    return;
  }

  _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
    const editorToolbar = document.querySelector('.edit-post-header-toolbar__left'); // If toolbar doesn't exist, we can't continue

    if (!editorToolbar) {
      return;
    }

    const buttonWrapper = document.createElement('div');
    buttonWrapper.id = 'createwithrani-quick-post-button-wrapper';
    buttonWrapper.style.cssText = 'display:flex;';
    editorToolbar.appendChild(buttonWrapper);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_editor_toolbar_button__WEBPACK_IMPORTED_MODULE_4__.EditorToolbarButton, null), document.getElementById('createwithrani-quick-post-button-wrapper'));
  });
});

/***/ }),

/***/ "./src/js/subscribers/tooltip.js":
/*!***************************************!*\
  !*** ./src/js/subscribers/tooltip.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store */ "./src/js/store/index.js");


/**
 * WordPress depenedencies
 */





/**
 * Internal depenedencies
 */
// import { BLOCK_TYPE_CONTENT_ATTRIBUTE } from '../constants';

 // import { strip } from '../utils/strip-text';

const {
  btoa
} = window;
/**
 *
 * @param {*} element
 * @return
 */

const getPopoverPosition = element => element.getBoundingClientRect();
/**
 *
 * @param {*} param0
 * @return
 */


const Tooltip = _ref => {
  let {
    isShown,
    target,
    annotationId
  } = _ref;
  const [ignoredAnnotations, setIgnoredAnnotations] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    wb_ignored
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core/editor').getEditedPostAttribute('meta') || {});
  const selectedAnnotation = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('writers-blocks/editor').getProblem(annotationId));
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/editor');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (wb_ignored) {
      setIgnoredAnnotations(wb_ignored);
    }
  }, [wb_ignored]);
  const {
    // blockId,
    // blockName,
    index,
    offset,
    message,
    type,
    value // replacements: [ { action, value } = {} ] = [ {} ],

  } = selectedAnnotation || {};
  const [title] = type?.split('-') || []; // const { attributes } = useSelect(
  // 	( select ) => select( 'core/block-editor' ).getBlock( blockId ) || {},
  // );
  // const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

  return isShown && message ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
    className: `writers-blocks-annotation-popover is-type-${type}`,
    position: "top center",
    getAnchorRect: () => getPopoverPosition(target)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, message), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Flex, {
    justify: "end"
  },  true ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "tertiary",
    onClick: () => {
      console.log((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_store__WEBPACK_IMPORTED_MODULE_5__.store).getProblem(annotationId));
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Inspect', 'writers-blocks')) : 0, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "secondary",
    onClick: () => {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store).ignoreProblem(annotationId);

      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/annotations').__experimentalRemoveAnnotation(annotationId);

      editPost({
        meta: {
          wb_ignored: [...ignoredAnnotations, btoa(`${type}_${index}_${offset}_${value}`)]
        }
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ignore', 'writers-blocks')))) : null;
};

(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.subscribe)(() => {
  _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3___default()(() => {
    const editorWrapper = document.querySelector('.edit-post-visual-editor');
    const isTyping = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').isTyping();

    if (!editorWrapper) {
      return;
    }

    let popoverWrapper = document.getElementById('writers-blocks-popover-wrapper');
    const selectedAnnotation = document.querySelector('.wp-block.is-selected mark[class*="annotation-text-writers-blocks"][data-rich-text-format-boundary="true"]');

    if (!selectedAnnotation && !popoverWrapper) {
      return;
    }

    if (!popoverWrapper) {
      popoverWrapper = document.createElement('div');
      popoverWrapper.id = 'writers-blocks-popover-wrapper';
      editorWrapper.prepend(popoverWrapper);
    }

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
      isShown: !!selectedAnnotation && !isTyping,
      target: selectedAnnotation,
      annotationId: selectedAnnotation?.id?.replace('annotation-text-', '')
    }), document.getElementById('writers-blocks-popover-wrapper'));
  });
});

/***/ }),

/***/ "./src/js/utils/reading-score.js":
/*!***************************************!*\
  !*** ./src/js/utils/reading-score.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readingScore": function() { return /* binding */ readingScore; }
/* harmony export */ });
/* harmony import */ var reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reading-time/lib/reading-time */ "./node_modules/reading-time/lib/reading-time.js");
/* harmony import */ var reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var automated_readability__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! automated-readability */ "./node_modules/automated-readability/index.js");
/* harmony import */ var polarity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! polarity */ "./node_modules/polarity/index.js");
/* harmony import */ var _wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/wordcount */ "@wordpress/wordcount");
/* harmony import */ var _wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _strip_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./strip-text */ "./src/js/utils/strip-text.js");
/* harmony import */ var _tokenizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokenizer */ "./src/js/utils/tokenizer.js");
/**
 */



/**
 */


/**
 * Internal dependencies
 */



/**
 *
 * @param {string} content
 */

const readingScore = content => {
  const text = (0,_strip_text__WEBPACK_IMPORTED_MODULE_2__.strip)(content);
  const paragraphs = text.replace(/\n$/gm, '').split(/\n/g).filter(line => line.length);
  const {
    sentences
  } = (0,_tokenizer__WEBPACK_IMPORTED_MODULE_3__.tokenize)(paragraphs.join(' '));
  const words = sentences.reduce((accumulator, sentence) => {
    const {
      words
    } = (0,_tokenizer__WEBPACK_IMPORTED_MODULE_3__.tokenize)(sentence);
    accumulator.push(...words);
    return accumulator;
  }, []);
  const wordCount = (0,_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__.count)(text, 'words');
  const characterCount = (0,_wordpress_wordcount__WEBPACK_IMPORTED_MODULE_1__.count)(text, 'characters_including_spaces');
  const alphaNumericCharacters = text.match(/[a-zA-Z0-9]/g);
  const letters = text.match(/[a-zA-Z]/g)?.length || 0;
  const score = (0,automated_readability__WEBPACK_IMPORTED_MODULE_4__.automatedReadability)({
    sentence: sentences.length,
    word: wordCount,
    character: alphaNumericCharacters?.length || 0
  });
  const {
    polarity: polarityScore
  } = (0,polarity__WEBPACK_IMPORTED_MODULE_5__.polarity)(words);
  const {
    minutes
  } = reading_time_lib_reading_time__WEBPACK_IMPORTED_MODULE_0___default()(text, {
    wordsPerMinute: 250
  });
  return {
    paragraphs: paragraphs.length,
    sentences: sentences.length,
    words: wordCount,
    characters: characterCount,
    score: Math.round(score),
    letters,
    polarity: polarityScore,
    readingTime: minutes
  };
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
  return text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
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
  return text.replace(/&\S+?;/g, '');
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
  return text.replace(/[\n\r\t]+/g, ' ');
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
 * @param {string} text               The string being counted.
 *
 * @param          preserveWhiteSpace
 * @return {string} The manipulated text.
 */
// export default function stripTags(text, preserveWhiteSpace) {
// 	return text.split( /<\/?[a-z][^>]*?>/gi ).filter(Boolean).join(preserveWhiteSpace ? '' : ' ');
// }
function stripTags(text, preserveWhiteSpace) {
  return text.replaceAll('</li><li>', ' ').replace(/<\/?[li][^>]*?>/gi, '').replace(/<\/?[br][^>]*?>/gi, ' ').split(/<\/?[a-z][^>]*?>/gi).filter(Boolean).join(preserveWhiteSpace ? ' ' : '');
}

/***/ }),

/***/ "./src/js/utils/strip-text.js":
/*!************************************!*\
  !*** ./src/js/utils/strip-text.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "strip": function() { return /* binding */ strip; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _strip_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strip-tags */ "./src/js/utils/strip-tags.js");
/* harmony import */ var _strip_astrals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./strip-astrals */ "./src/js/utils/strip-astrals.js");
/* harmony import */ var _strip_html_comments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./strip-html-comments */ "./src/js/utils/strip-html-comments.js");
/* harmony import */ var _strip_spaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./strip-spaces */ "./src/js/utils/strip-spaces.js");
/* harmony import */ var _strip_html_entities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./strip-html-entities */ "./src/js/utils/strip-html-entities.js");






const strip = function (text) {
  let {
    preserveWhiteSpace = true
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return text ? `${(0,lodash__WEBPACK_IMPORTED_MODULE_0__.flow)(_strip_html_comments__WEBPACK_IMPORTED_MODULE_3__["default"], _strip_astrals__WEBPACK_IMPORTED_MODULE_2__["default"], _strip_spaces__WEBPACK_IMPORTED_MODULE_4__["default"], _strip_html_entities__WEBPACK_IMPORTED_MODULE_5__["default"], _strip_tags__WEBPACK_IMPORTED_MODULE_1__["default"])(text, preserveWhiteSpace)}\n` : '';
};

/***/ }),

/***/ "./src/js/utils/tokenizer.js":
/*!***********************************!*\
  !*** ./src/js/utils/tokenizer.js ***!
  \***********************************/
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

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/extend/index.js":
/*!**************************************!*\
  !*** ./node_modules/extend/index.js ***!
  \**************************************/
/***/ (function(module) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),

/***/ "./node_modules/format/format.js":
/*!***************************************!*\
  !*** ./node_modules/format/format.js ***!
  \***************************************/
/***/ (function(module) {

//
// format - printf-like string formatting for JavaScript
// github.com/samsonjs/format
// @_sjs
//
// Copyright 2010 - 2013 Sami Samhuri <sami@samhuri.net>
//
// MIT License
// http://sjs.mit-license.org
//

;(function() {

  //// Export the API
  var namespace;

  // CommonJS / Node module
  if (true) {
    namespace = module.exports = format;
  }

  // Browsers and other environments
  else {}

  namespace.format = format;
  namespace.vsprintf = vsprintf;

  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    namespace.printf = printf;
  }

  function printf(/* ... */) {
    console.log(format.apply(null, arguments));
  }

  function vsprintf(fmt, replacements) {
    return format.apply(null, [fmt].concat(replacements));
  }

  function format(fmt) {
    var argIndex = 1 // skip initial format argument
      , args = [].slice.call(arguments)
      , i = 0
      , n = fmt.length
      , result = ''
      , c
      , escaped = false
      , arg
      , tmp
      , leadingZero = false
      , precision
      , nextArg = function() { return args[argIndex++]; }
      , slurpNumber = function() {
          var digits = '';
          while (/\d/.test(fmt[i])) {
            digits += fmt[i++];
            c = fmt[i];
          }
          return digits.length > 0 ? parseInt(digits) : null;
        }
      ;
    for (; i < n; ++i) {
      c = fmt[i];
      if (escaped) {
        escaped = false;
        if (c == '.') {
          leadingZero = false;
          c = fmt[++i];
        }
        else if (c == '0' && fmt[i + 1] == '.') {
          leadingZero = true;
          i += 2;
          c = fmt[i];
        }
        else {
          leadingZero = true;
        }
        precision = slurpNumber();
        switch (c) {
        case 'b': // number in binary
          result += parseInt(nextArg(), 10).toString(2);
          break;
        case 'c': // character
          arg = nextArg();
          if (typeof arg === 'string' || arg instanceof String)
            result += arg;
          else
            result += String.fromCharCode(parseInt(arg, 10));
          break;
        case 'd': // number in decimal
          result += parseInt(nextArg(), 10);
          break;
        case 'f': // floating point number
          tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
          result += leadingZero ? tmp : tmp.replace(/^0/, '');
          break;
        case 'j': // JSON
          result += JSON.stringify(nextArg());
          break;
        case 'o': // number in octal
          result += '0' + parseInt(nextArg(), 10).toString(8);
          break;
        case 's': // string
          result += nextArg();
          break;
        case 'x': // lowercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16);
          break;
        case 'X': // uppercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
          break;
        default:
          result += c;
          break;
        }
      } else if (c === '%') {
        escaped = true;
      } else {
        result += c;
      }
    }
    return result;
  }

}());


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

/***/ "./node_modules/normalize-strings/index.js":
/*!*************************************************!*\
  !*** ./node_modules/normalize-strings/index.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function(global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return factory(global, global.document);
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
} (typeof window !== 'undefined' ? window : this, function (window, document) {
  var charmap = __webpack_require__(/*! ./charmap.json */ "./node_modules/normalize-strings/charmap.json");
  var regex = null;
  var current_charmap;
  var old_charmap;

  function normalize(str, custom_charmap) {
    old_charmap = current_charmap;
    current_charmap = custom_charmap || charmap;

    regex = (regex && old_charmap === current_charmap) ? regex : buildRegExp(current_charmap);

    return str.replace(regex, function(charToReplace) {
      return current_charmap[charToReplace.charCodeAt(0)] || charToReplace;
    });
  }

  function buildRegExp(charmap){
     return new RegExp('[' + Object.keys(charmap).map(function(code) {return String.fromCharCode(code); }).join(' ') + ']', 'g');
   }

  return normalize;
}));


/***/ }),

/***/ "./node_modules/number-to-words/numberToWords.min.js":
/*!***********************************************************!*\
  !*** ./node_modules/number-to-words/numberToWords.min.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Number-To-Words util
 * @version v1.2.4
 * @link https://github.com/marlun78/number-to-words
 * @author Martin Eneqvist (https://github.com/marlun78)
 * @contributors Aleksey Pilyugin (https://github.com/pilyugin),Jeremiah Hall (https://github.com/jeremiahrhall),Adriano Melo (https://github.com/adrianomelo),dmrzn (https://github.com/dmrzn)
 * @license MIT
 */
!function(){"use strict";var e="object"==typeof self&&self.self===self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g&&__webpack_require__.g||this,t=9007199254740991;function f(e){return!("number"!=typeof e||e!=e||e===1/0||e===-1/0)}function l(e){return"number"==typeof e&&Math.abs(e)<=t}var n=/(hundred|thousand|(m|b|tr|quadr)illion)$/,r=/teen$/,o=/y$/,i=/(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/,s={zero:"zeroth",one:"first",two:"second",three:"third",four:"fourth",five:"fifth",six:"sixth",seven:"seventh",eight:"eighth",nine:"ninth",ten:"tenth",eleven:"eleventh",twelve:"twelfth"};function h(e){return n.test(e)||r.test(e)?e+"th":o.test(e)?e.replace(o,"ieth"):i.test(e)?e.replace(i,a):e}function a(e,t){return s[t]}var u=10,d=100,p=1e3,v=1e6,b=1e9,y=1e12,c=1e15,g=9007199254740992,m=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],w=["zero","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];function x(e,t){var n,r=parseInt(e,10);if(!f(r))throw new TypeError("Not a finite number: "+e+" ("+typeof e+")");if(!l(r))throw new RangeError("Input is not a safe number, it’s either too large or too small.");return n=function e(t){var n,r,o=arguments[1];if(0===t)return o?o.join(" ").replace(/,$/,""):"zero";o||(o=[]);t<0&&(o.push("minus"),t=Math.abs(t));t<20?(n=0,r=m[t]):t<d?(n=t%u,r=w[Math.floor(t/u)],n&&(r+="-"+m[n],n=0)):t<p?(n=t%d,r=e(Math.floor(t/d))+" hundred"):t<v?(n=t%p,r=e(Math.floor(t/p))+" thousand,"):t<b?(n=t%v,r=e(Math.floor(t/v))+" million,"):t<y?(n=t%b,r=e(Math.floor(t/b))+" billion,"):t<c?(n=t%y,r=e(Math.floor(t/y))+" trillion,"):t<=g&&(n=t%c,r=e(Math.floor(t/c))+" quadrillion,");o.push(r);return e(n,o)}(r),t?h(n):n}var M={toOrdinal:function(e){var t=parseInt(e,10);if(!f(t))throw new TypeError("Not a finite number: "+e+" ("+typeof e+")");if(!l(t))throw new RangeError("Input is not a safe number, it’s either too large or too small.");var n=String(t),r=Math.abs(t%100),o=11<=r&&r<=13,i=n.charAt(n.length-1);return n+(o?"th":"1"===i?"st":"2"===i?"nd":"3"===i?"rd":"th")},toWords:x,toWordsOrdinal:function(e){return h(x(e))}}; true?( true&&module.exports&&(exports=module.exports=M),exports.numberToWords=M):0}();

/***/ }),

/***/ "./node_modules/parse-english/node_modules/nlcst-to-string/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/parse-english/node_modules/nlcst-to-string/index.js ***!
  \**************************************************************************/
/***/ (function(module) {

"use strict";


module.exports = nlcstToString

// Stringify one nlcst node or list of nodes.
function nlcstToString(node, separator) {
  var sep = separator || ''
  var values
  var length
  var children

  if (!node || (!('length' in node) && !node.type)) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (typeof node.value === 'string') {
    return node.value
  }

  children = 'length' in node ? node : node.children
  length = children.length

  // Shortcut: This is pretty common, and a small performance win.
  if (length === 1 && 'value' in children[0]) {
    return children[0].value
  }

  values = []

  while (length--) {
    values[length] = nlcstToString(children[length], sep)
  }

  return values.join(sep)
}


/***/ }),

/***/ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/parse-latin/node_modules/nlcst-to-string/index.js ***!
  \************************************************************************/
/***/ (function(module) {

"use strict";


module.exports = nlcstToString

// Stringify one nlcst node or list of nodes.
function nlcstToString(node, separator) {
  var sep = separator || ''
  var values
  var length
  var children

  if (!node || (!('length' in node) && !node.type)) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (typeof node.value === 'string') {
    return node.value
  }

  children = 'length' in node ? node : node.children
  length = children.length

  // Shortcut: This is pretty common, and a small performance win.
  if (length === 1 && 'value' in children[0]) {
    return children[0].value
  }

  values = []

  while (length--) {
    values[length] = nlcstToString(children[length], sep)
  }

  return values.join(sep)
}


/***/ }),

/***/ "./node_modules/pluralize/pluralize.js":
/*!*********************************************!*\
  !*** ./node_modules/pluralize/pluralize.js ***!
  \*********************************************/
/***/ (function(module) {

/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (true) {
    // Node.
    module.exports = pluralize();
  } else {}
})(this, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Lower cased words. E.g. "hello".
    if (word === word.toLowerCase()) return token.toLowerCase();

    // Upper cased words. E.g. "WHISKY".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word      The word to pluralize
   * @param  {number}  count     How many of the word exist
   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['passerby', 'passersby']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'aircraft',
    'alcohol',
    'ammo',
    'analytics',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'firmware',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'hardware',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'mud',
    'manga',
    'news',
    'only',
    'personnel',
    'pike',
    'plankton',
    'pliers',
    'police',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'software',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transportation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    /pok[eé]mon$/i,
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});


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

/***/ "./node_modules/unified/node_modules/is-buffer/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/unified/node_modules/is-buffer/index.js ***!
  \**************************************************************/
/***/ (function(module) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/unist-util-modify-children/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/unist-util-modify-children/index.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var iterate = __webpack_require__(/*! array-iterate */ "./node_modules/array-iterate/index.js")

module.exports = modifierFactory

// Turn `callback` into a child-modifier accepting a parent.  See
// `array-iterate` for more info.
function modifierFactory(callback) {
  return iteratorFactory(wrapperFactory(callback))
}

// Turn `callback` into a `iterator' accepting a parent.
function iteratorFactory(callback) {
  return iterator

  function iterator(parent) {
    var children = parent && parent.children

    if (!children) {
      throw new Error('Missing children in `parent` for `modifier`')
    }

    iterate(children, callback, parent)
  }
}

// Pass the context as the third argument to `callback`.
function wrapperFactory(callback) {
  return wrapper

  function wrapper(value, index) {
    return callback(value, index, this)
  }
}


/***/ }),

/***/ "./node_modules/unist-util-visit-children/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/unist-util-visit-children/index.js ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";


module.exports = visitChildren

function visitChildren(callback) {
  return visitor

  // Visit `parent`, invoking `callback` for each child.
  function visitor(parent) {
    var index = -1
    var children = parent && parent.children

    if (!children) {
      throw new Error('Missing children in `parent` for `visitor`')
    }

    while (++index in children) {
      callback(children[index], index, parent)
    }
  }
}


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rng; }
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ __webpack_exports__["default"] = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ __webpack_exports__["default"] = (validate);

/***/ }),

/***/ "./node_modules/vfile/node_modules/is-buffer/index.js":
/*!************************************************************!*\
  !*** ./node_modules/vfile/node_modules/is-buffer/index.js ***!
  \************************************************************/
/***/ (function(module) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/annotations":
/*!*************************************!*\
  !*** external ["wp","annotations"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["annotations"];

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

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["domReady"];

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

/***/ "./node_modules/bail/index.js":
/*!************************************!*\
  !*** ./node_modules/bail/index.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bail": function() { return /* binding */ bail; }
/* harmony export */ });
/**
 * Throw a given error.
 *
 * @param {Error|null|undefined} [error]
 *   Maybe error.
 * @returns {asserts error is null|undefined}
 */
function bail(error) {
  if (error) {
    throw error
  }
}


/***/ }),

/***/ "./node_modules/coleman-liau/index.js":
/*!********************************************!*\
  !*** ./node_modules/coleman-liau/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colemanLiau": function() { return /* binding */ colemanLiau; }
/* harmony export */ });
var letterWeight = 0.0588
var sentenceWeight = 0.296
var base = 15.8
var percentage = 100

/**
 * @typedef {Object.<string, number>} ColemanLiauCounts
 * @propert {number} sentence
 * @propert {number} word
 * @propert {number} letter
 */

/**
 * Given an object containing the number of words (`word`), the number of sentences (`sentence`), and the number of letters  (`letter`) in a document, returns the grade level associated with the document.
 *
 * @param {ColemanLiauCounts} counts
 * @returns {number}
 */
function colemanLiau(counts) {
  if (!counts || !counts.sentence || !counts.word || !counts.letter) {
    return Number.NaN
  }

  return (
    letterWeight * ((counts.letter / counts.word) * percentage) -
    sentenceWeight * ((counts.sentence / counts.word) * percentage) -
    base
  )
}


/***/ }),

/***/ "./node_modules/cuss/index.js":
/*!************************************!*\
  !*** ./node_modules/cuss/index.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cuss": function() { return /* binding */ cuss; }
/* harmony export */ });
const cuss = {
  abbo: 1,
  abeed: 2,
  abid: 1,
  abo: 1,
  abortion: 1,
  abuse: 1,
  addict: 1,
  addicts: 1,
  adult: 0,
  africa: 0,
  african: 0,
  africoon: 2,
  alla: 1,
  allah: 0,
  'alligator bait': 2,
  alligatorbait: 2,
  amateur: 0,
  american: 0,
  anal: 1,
  analannie: 2,
  analsex: 1,
  angie: 0,
  angry: 0,
  anus: 1,
  arab: 0,
  arabs: 0,
  arabush: 2,
  arabushs: 2,
  areola: 1,
  argie: 2,
  armo: 2,
  armos: 2,
  aroused: 0,
  arse: 2,
  arsehole: 2,
  asian: 0,
  ass: 2,
  assassin: 0,
  assassinate: 0,
  assassination: 0,
  assault: 0,
  assbagger: 2,
  assblaster: 2,
  assclown: 2,
  asscowboy: 2,
  asses: 2,
  assfuck: 2,
  assfucker: 2,
  asshat: 2,
  asshole: 2,
  assholes: 2,
  asshore: 2,
  assjockey: 2,
  asskiss: 2,
  asskisser: 2,
  assklown: 2,
  asslick: 2,
  asslicker: 2,
  asslover: 2,
  assman: 2,
  assmonkey: 2,
  assmunch: 2,
  assmuncher: 2,
  asspacker: 2,
  asspirate: 2,
  asspuppies: 2,
  assranger: 2,
  asswhore: 2,
  asswipe: 2,
  athletesfoot: 1,
  attack: 0,
  australian: 0,
  babe: 1,
  babies: 0,
  backdoor: 0,
  backdoorman: 2,
  backseat: 0,
  badfuck: 2,
  balllicker: 2,
  balls: 1,
  ballsack: 1,
  banana: 0,
  bananas: 0,
  banging: 1,
  baptist: 0,
  barelylegal: 2,
  barf: 2,
  barface: 2,
  barfface: 2,
  bast: 0,
  bastard: 1,
  bazongas: 2,
  bazooms: 2,
  beanbag: 2,
  beanbags: 2,
  beaner: 2,
  beaners: 2,
  beaney: 2,
  beaneys: 2,
  beast: 0,
  beastality: 1,
  beastial: 1,
  beastiality: 1,
  beatoff: 2,
  beatyourmeat: 2,
  beaver: 0,
  bestial: 1,
  bestiality: 1,
  bi: 0,
  biatch: 2,
  bible: 0,
  bicurious: 1,
  bigass: 2,
  bigbastard: 2,
  bigbutt: 2,
  bigger: 0,
  bisexual: 0,
  bitch: 1,
  bitcher: 2,
  bitches: 1,
  bitchez: 2,
  bitchin: 2,
  bitching: 2,
  bitchslap: 2,
  bitchy: 2,
  biteme: 2,
  black: 0,
  blackman: 1,
  blackout: 0,
  blacks: 1,
  blind: 0,
  blow: 0,
  blowjob: 2,
  bluegum: 2,
  bluegums: 2,
  boang: 2,
  boche: 2,
  boches: 2,
  bogan: 2,
  bohunk: 2,
  bollick: 2,
  bollock: 2,
  bollocks: 2,
  bomb: 0,
  bombers: 0,
  bombing: 0,
  bombs: 0,
  bomd: 0,
  bondage: 1,
  boner: 2,
  bong: 2,
  boob: 1,
  boobies: 2,
  boobs: 1,
  booby: 2,
  boody: 2,
  boom: 0,
  boong: 2,
  boonga: 2,
  boongas: 2,
  boongs: 2,
  boonie: 2,
  boonies: 2,
  bootlip: 2,
  bootlips: 2,
  booty: 2,
  bootycall: 2,
  bosch: 0,
  bosche: 2,
  bosches: 2,
  boschs: 2,
  'bounty bar': 1,
  'bounty bars': 1,
  bountybar: 1,
  bra: 0,
  brea5t: 2,
  breast: 0,
  breastjob: 2,
  breastlover: 2,
  breastman: 2,
  brothel: 1,
  brownie: 0,
  brownies: 0,
  buddhahead: 2,
  buddhaheads: 2,
  buffies: 2,
  buffy: 0,
  bugger: 2,
  buggered: 2,
  buggery: 2,
  bule: 2,
  bules: 2,
  bullcrap: 2,
  bulldike: 2,
  bulldyke: 2,
  bullshit: 2,
  bumblefuck: 2,
  bumfuck: 2,
  bung: 2,
  bunga: 2,
  bungas: 2,
  bunghole: 2,
  buried: 0,
  burn: 0,
  'burr head': 2,
  'burr heads': 2,
  burrhead: 2,
  burrheads: 2,
  butchbabes: 2,
  butchdike: 2,
  butchdyke: 2,
  butt: 0,
  buttbang: 2,
  buttface: 2,
  buttfuck: 2,
  buttfucker: 2,
  buttfuckers: 2,
  butthead: 2,
  buttman: 2,
  buttmunch: 2,
  buttmuncher: 2,
  buttpirate: 2,
  buttplug: 1,
  buttstain: 2,
  byatch: 2,
  cacker: 2,
  'camel jockey': 2,
  'camel jockeys': 2,
  cameljockey: 2,
  cameltoe: 2,
  canadian: 0,
  cancer: 0,
  carpetmuncher: 2,
  carruth: 2,
  catholic: 0,
  catholics: 0,
  cemetery: 0,
  chav: 2,
  'cheese eating surrender monkey': 2,
  'cheese eating surrender monkies': 2,
  'cheeseeating surrender monkey': 2,
  'cheeseeating surrender monkies': 2,
  cheesehead: 2,
  cheeseheads: 2,
  cherrypopper: 2,
  chickslick: 2,
  childrens: 0,
  chin: 0,
  'china swede': 2,
  'china swedes': 2,
  chinaman: 2,
  chinamen: 2,
  chinaswede: 2,
  chinaswedes: 2,
  chinese: 0,
  'ching chong': 2,
  'ching chongs': 2,
  chingchong: 2,
  chingchongs: 2,
  chink: 2,
  chinks: 2,
  chinky: 2,
  choad: 2,
  chode: 2,
  chonkies: 2,
  chonky: 2,
  chonkys: 2,
  christ: 0,
  'christ killer': 2,
  'christ killers': 2,
  christian: 0,
  chug: 2,
  chugs: 2,
  chunger: 2,
  chungers: 2,
  chunkies: 2,
  chunky: 2,
  chunkys: 2,
  church: 0,
  cigarette: 0,
  cigs: 0,
  clamdigger: 2,
  clamdiver: 2,
  clansman: 2,
  clansmen: 2,
  clanswoman: 2,
  clanswomen: 2,
  clit: 1,
  clitoris: 1,
  clogwog: 2,
  cocaine: 1,
  cock: 1,
  cockblock: 2,
  cockblocker: 2,
  cockcowboy: 2,
  cockfight: 2,
  cockhead: 2,
  cockknob: 2,
  cocklicker: 2,
  cocklover: 2,
  cocknob: 2,
  cockqueen: 2,
  cockrider: 2,
  cocksman: 2,
  cocksmith: 2,
  cocksmoker: 2,
  cocksucer: 2,
  cocksuck: 2,
  cocksucked: 2,
  cocksucker: 2,
  cocksucking: 2,
  cocktail: 0,
  cocktease: 2,
  cocky: 2,
  coconut: 0,
  coconuts: 0,
  cohee: 2,
  coitus: 1,
  color: 0,
  colored: 0,
  coloured: 0,
  commie: 2,
  communist: 0,
  condom: 1,
  conservative: 0,
  conspiracy: 0,
  coolie: 2,
  coolies: 2,
  cooly: 2,
  coon: 2,
  'coon ass': 2,
  'coon asses': 2,
  coonass: 2,
  coonasses: 2,
  coondog: 2,
  coons: 2,
  copulate: 1,
  cornhole: 2,
  corruption: 0,
  cra5h: 1,
  crabs: 0,
  crack: 1,
  cracka: 2,
  cracker: 1,
  crackpipe: 1,
  crackwhore: 2,
  crap: 2,
  crapola: 2,
  crapper: 2,
  crappy: 2,
  crash: 0,
  creamy: 0,
  crime: 0,
  crimes: 0,
  criminal: 0,
  criminals: 0,
  crotch: 1,
  crotchjockey: 2,
  crotchmonkey: 2,
  crotchrot: 2,
  cum: 2,
  cumbubble: 2,
  cumfest: 2,
  cumjockey: 2,
  cumm: 2,
  cummer: 2,
  cumming: 2,
  cummings: 1,
  cumquat: 2,
  cumqueen: 2,
  cumshot: 2,
  cunilingus: 1,
  cunillingus: 1,
  cunn: 2,
  cunnilingus: 1,
  cunntt: 2,
  cunt: 2,
  cunteyed: 2,
  cuntfuck: 2,
  cuntfucker: 2,
  cuntlick: 2,
  cuntlicker: 2,
  cuntlicking: 2,
  cuntsucker: 2,
  'curry muncher': 2,
  'curry munchers': 2,
  currymuncher: 2,
  currymunchers: 2,
  cushi: 2,
  cushis: 2,
  cybersex: 1,
  cyberslimer: 2,
  dago: 2,
  dagos: 2,
  dahmer: 2,
  dammit: 2,
  damn: 1,
  damnation: 1,
  damnit: 2,
  darkey: 2,
  darkeys: 2,
  darkie: 2,
  darkies: 2,
  darky: 2,
  datnigga: 2,
  dead: 0,
  deapthroat: 2,
  death: 0,
  deepthroat: 2,
  defecate: 1,
  dego: 2,
  degos: 2,
  demon: 1,
  deposit: 0,
  desire: 0,
  destroy: 0,
  deth: 0,
  devil: 1,
  devilworshipper: 1,
  'diaper head': 2,
  'diaper heads': 2,
  diaperhead: 2,
  diaperheads: 2,
  dick: 1,
  dickbrain: 2,
  dickforbrains: 2,
  dickhead: 2,
  dickless: 2,
  dicklick: 2,
  dicklicker: 2,
  dickman: 2,
  dickwad: 2,
  dickweed: 2,
  diddle: 2,
  die: 0,
  died: 0,
  dies: 0,
  dike: 1,
  dildo: 1,
  dingleberry: 2,
  dink: 2,
  dinks: 2,
  dipshit: 2,
  dipstick: 2,
  dirty: 0,
  disease: 0,
  diseases: 0,
  disturbed: 0,
  dive: 0,
  dix: 2,
  dixiedike: 2,
  dixiedyke: 2,
  doggiestyle: 2,
  doggystyle: 2,
  dong: 2,
  doodoo: 2,
  doom: 0,
  dope: 2,
  'dot head': 2,
  'dot heads': 2,
  dothead: 2,
  dotheads: 2,
  dragqueen: 2,
  dragqween: 2,
  dripdick: 2,
  drug: 1,
  drunk: 1,
  drunken: 1,
  dumb: 2,
  dumbass: 2,
  dumbbitch: 2,
  dumbfuck: 2,
  'dune coon': 2,
  'dune coons': 2,
  dyefly: 2,
  dyke: 1,
  easyslut: 2,
  eatballs: 2,
  eatme: 2,
  eatpussy: 2,
  ecstacy: 0,
  'eight ball': 2,
  'eight balls': 2,
  ejaculate: 1,
  ejaculated: 1,
  ejaculating: 1,
  ejaculation: 1,
  enema: 1,
  enemy: 0,
  erect: 0,
  erection: 1,
  ero: 2,
  escort: 0,
  esqua: 2,
  ethiopian: 0,
  ethnic: 0,
  european: 0,
  evl: 2,
  excrement: 1,
  execute: 0,
  executed: 0,
  execution: 0,
  executioner: 0,
  exkwew: 2,
  explosion: 0,
  facefucker: 2,
  faeces: 2,
  fag: 1,
  fagging: 2,
  faggot: 2,
  fagot: 2,
  failed: 0,
  failure: 0,
  fairies: 0,
  fairy: 0,
  faith: 0,
  fannyfucker: 2,
  fart: 1,
  farted: 1,
  farting: 1,
  farty: 2,
  fastfuck: 2,
  fat: 0,
  fatah: 2,
  fatass: 2,
  fatfuck: 2,
  fatfucker: 2,
  fatso: 2,
  fckcum: 2,
  fear: 0,
  feces: 1,
  felatio: 1,
  felch: 2,
  felcher: 2,
  felching: 2,
  fellatio: 2,
  feltch: 2,
  feltcher: 2,
  feltching: 2,
  fetish: 1,
  fight: 0,
  filipina: 0,
  filipino: 0,
  fingerfood: 1,
  fingerfuck: 2,
  fingerfucked: 2,
  fingerfucker: 2,
  fingerfuckers: 2,
  fingerfucking: 2,
  fire: 0,
  firing: 0,
  fister: 2,
  fistfuck: 2,
  fistfucked: 2,
  fistfucker: 2,
  fistfucking: 2,
  fisting: 2,
  flange: 2,
  flasher: 1,
  flatulence: 1,
  floo: 2,
  flydie: 2,
  flydye: 2,
  fok: 2,
  fondle: 1,
  footaction: 1,
  footfuck: 2,
  footfucker: 2,
  footlicker: 2,
  footstar: 2,
  fore: 0,
  foreskin: 1,
  forni: 2,
  fornicate: 1,
  foursome: 1,
  fourtwenty: 1,
  fraud: 0,
  freakfuck: 2,
  freakyfucker: 2,
  freefuck: 2,
  fruitcake: 1,
  fu: 2,
  fubar: 2,
  fuc: 2,
  fucck: 2,
  fuck: 2,
  fucka: 2,
  fuckable: 2,
  fuckbag: 2,
  fuckbook: 2,
  fuckbuddy: 2,
  fucked: 2,
  fuckedup: 2,
  fucker: 2,
  fuckers: 2,
  fuckface: 2,
  fuckfest: 2,
  fuckfreak: 2,
  fuckfriend: 2,
  fuckhead: 2,
  fuckher: 2,
  fuckin: 2,
  fuckina: 2,
  fucking: 2,
  fuckingbitch: 2,
  fuckinnuts: 2,
  fuckinright: 2,
  fuckit: 2,
  fuckknob: 2,
  fuckme: 2,
  fuckmehard: 2,
  fuckmonkey: 2,
  fuckoff: 2,
  fuckpig: 2,
  fucks: 2,
  fucktard: 2,
  fuckwhore: 2,
  fuckyou: 2,
  fudgepacker: 2,
  fugly: 2,
  fuk: 2,
  fuks: 2,
  funeral: 0,
  funfuck: 2,
  fungus: 0,
  fuuck: 2,
  gable: 1,
  gables: 2,
  gangbang: 2,
  gangbanged: 2,
  gangbanger: 2,
  gangsta: 2,
  'gator bait': 2,
  gatorbait: 2,
  gay: 0,
  gaymuthafuckinwhore: 2,
  gaysex: 2,
  geez: 2,
  geezer: 2,
  geni: 2,
  genital: 1,
  german: 0,
  getiton: 2,
  gin: 0,
  ginzo: 2,
  ginzos: 2,
  gipp: 2,
  gippo: 2,
  gippos: 2,
  gipps: 2,
  girls: 0,
  givehead: 2,
  glazeddonut: 2,
  gob: 1,
  god: 1,
  godammit: 2,
  goddamit: 2,
  goddammit: 2,
  goddamn: 2,
  goddamned: 2,
  goddamnes: 2,
  goddamnit: 2,
  goddamnmuthafucker: 2,
  goldenshower: 2,
  golliwog: 2,
  golliwogs: 2,
  gonorrehea: 2,
  gonzagas: 1,
  gook: 2,
  'gook eye': 2,
  'gook eyes': 2,
  gookeye: 2,
  gookeyes: 2,
  gookies: 2,
  gooks: 2,
  gooky: 2,
  gora: 2,
  goras: 2,
  gotohell: 2,
  goy: 1,
  goyim: 1,
  greaseball: 2,
  greaseballs: 2,
  greaser: 2,
  greasers: 2,
  gringo: 2,
  gringos: 2,
  groe: 1,
  groid: 2,
  groids: 2,
  gross: 1,
  grostulation: 1,
  gub: 1,
  gubba: 2,
  gubbas: 2,
  gubs: 2,
  guinea: 1,
  guineas: 1,
  guizi: 1,
  gummer: 2,
  gun: 0,
  gwailo: 2,
  gwailos: 2,
  gweilo: 2,
  gweilos: 2,
  gyopo: 2,
  gyopos: 2,
  gyp: 2,
  gyped: 2,
  gypo: 2,
  gypos: 2,
  gypp: 2,
  gypped: 2,
  gyppie: 2,
  gyppies: 2,
  gyppo: 2,
  gyppos: 2,
  gyppy: 2,
  gyppys: 2,
  gypsies: 2,
  gypsy: 2,
  gypsys: 2,
  hadji: 2,
  hadjis: 2,
  hairyback: 2,
  hairybacks: 2,
  haji: 2,
  hajis: 2,
  hajji: 2,
  hajjis: 2,
  'half breed': 2,
  'half caste': 2,
  halfbreed: 2,
  halfcaste: 2,
  hamas: 1,
  handjob: 2,
  haole: 2,
  haoles: 2,
  hapa: 2,
  harder: 0,
  hardon: 2,
  harem: 0,
  headfuck: 2,
  headlights: 0,
  hebe: 2,
  hebephila: 1,
  hebephile: 1,
  hebephiles: 1,
  hebephilia: 1,
  hebephilic: 1,
  hebes: 2,
  heeb: 2,
  heebs: 2,
  hell: 0,
  henhouse: 0,
  heroin: 1,
  herpes: 1,
  heterosexual: 0,
  hijack: 0,
  hijacker: 0,
  hijacking: 0,
  hillbillies: 2,
  hillbilly: 2,
  hindoo: 2,
  hiscock: 2,
  hitler: 1,
  hitlerism: 2,
  hitlerist: 2,
  hiv: 1,
  ho: 2,
  hobo: 2,
  hodgie: 2,
  hoes: 2,
  hole: 0,
  holestuffer: 2,
  homicide: 1,
  homo: 2,
  homobangers: 2,
  homosexual: 1,
  honger: 2,
  honk: 0,
  honkers: 2,
  honkey: 2,
  honkeys: 2,
  honkie: 2,
  honkies: 2,
  honky: 2,
  hook: 0,
  hooker: 2,
  hookers: 2,
  hooters: 2,
  hore: 2,
  hori: 2,
  horis: 2,
  hork: 2,
  horn: 0,
  horney: 2,
  horniest: 2,
  horny: 1,
  horseshit: 2,
  hosejob: 2,
  hoser: 2,
  hostage: 0,
  hotdamn: 2,
  hotpussy: 2,
  hottotrot: 2,
  hummer: 0,
  hun: 0,
  huns: 0,
  husky: 0,
  hussy: 2,
  hustler: 0,
  hymen: 1,
  hymie: 2,
  hymies: 2,
  iblowu: 2,
  idiot: 2,
  ike: 1,
  ikes: 1,
  ikey: 1,
  ikeymo: 2,
  ikeymos: 2,
  ikwe: 2,
  illegal: 0,
  illegals: 1,
  incest: 1,
  indon: 2,
  indons: 2,
  injun: 2,
  injuns: 2,
  insest: 2,
  intercourse: 1,
  interracial: 1,
  intheass: 2,
  inthebuff: 2,
  israel: 0,
  israeli: 0,
  israels: 0,
  italiano: 1,
  itch: 0,
  jackass: 2,
  jackoff: 2,
  jackshit: 2,
  jacktheripper: 2,
  jade: 0,
  jap: 2,
  japanese: 0,
  japcrap: 2,
  japie: 2,
  japies: 2,
  japs: 2,
  jebus: 2,
  jeez: 2,
  jerkoff: 2,
  jerries: 1,
  jerry: 0,
  jesus: 1,
  jesuschrist: 1,
  jew: 0,
  jewboy: 2,
  jewed: 2,
  jewess: 2,
  jewish: 0,
  jig: 2,
  jiga: 2,
  jigaboo: 2,
  jigaboos: 2,
  jigarooni: 2,
  jigaroonis: 2,
  jigg: 2,
  jigga: 2,
  jiggabo: 2,
  jiggabos: 2,
  jiggas: 2,
  jigger: 2,
  jiggers: 2,
  jiggs: 2,
  jiggy: 2,
  jigs: 2,
  jihad: 1,
  jijjiboo: 2,
  jijjiboos: 2,
  jimfish: 2,
  jism: 2,
  jiz: 2,
  jizim: 2,
  jizjuice: 2,
  jizm: 2,
  jizz: 2,
  jizzim: 2,
  jizzum: 2,
  joint: 0,
  juggalo: 2,
  jugs: 0,
  'jungle bunnies': 2,
  'jungle bunny': 2,
  junglebunny: 2,
  kacap: 2,
  kacapas: 2,
  kacaps: 2,
  kaffer: 2,
  kaffir: 2,
  kaffre: 2,
  kafir: 2,
  kanake: 2,
  katsap: 2,
  katsaps: 2,
  khokhol: 2,
  khokhols: 2,
  kid: 0,
  kigger: 2,
  kike: 2,
  kikes: 2,
  kill: 0,
  killed: 0,
  killer: 0,
  killing: 0,
  kills: 0,
  kimchi: 0,
  kimchis: 2,
  kink: 1,
  kinky: 1,
  kissass: 2,
  kkk: 2,
  klansman: 2,
  klansmen: 2,
  klanswoman: 2,
  klanswomen: 2,
  knife: 0,
  knockers: 1,
  kock: 1,
  kondum: 2,
  koon: 2,
  kotex: 1,
  krap: 2,
  krappy: 2,
  kraut: 1,
  krauts: 2,
  kuffar: 2,
  kum: 2,
  kumbubble: 2,
  kumbullbe: 2,
  kummer: 2,
  kumming: 2,
  kumquat: 2,
  kums: 2,
  kunilingus: 2,
  kunnilingus: 2,
  kunt: 2,
  kushi: 2,
  kushis: 2,
  kwa: 2,
  'kwai lo': 2,
  'kwai los': 2,
  ky: 1,
  kyke: 2,
  kykes: 2,
  kyopo: 2,
  kyopos: 2,
  lactate: 1,
  laid: 0,
  lapdance: 1,
  latin: 0,
  lebo: 2,
  lebos: 2,
  lesbain: 2,
  lesbayn: 2,
  lesbian: 0,
  lesbin: 2,
  lesbo: 2,
  lez: 2,
  lezbe: 2,
  lezbefriends: 2,
  lezbo: 2,
  lezz: 2,
  lezzo: 2,
  liberal: 0,
  libido: 1,
  licker: 1,
  lickme: 2,
  lies: 0,
  limey: 2,
  limpdick: 2,
  limy: 2,
  lingerie: 0,
  liquor: 1,
  livesex: 2,
  loadedgun: 2,
  lolita: 1,
  looser: 2,
  loser: 2,
  lotion: 0,
  lovebone: 2,
  lovegoo: 2,
  lovegun: 2,
  lovejuice: 2,
  lovemuscle: 2,
  lovepistol: 2,
  loverocket: 2,
  lowlife: 2,
  lsd: 1,
  lubejob: 2,
  lubra: 2,
  lucifer: 0,
  luckycammeltoe: 2,
  lugan: 2,
  lugans: 2,
  lynch: 1,
  mabuno: 2,
  mabunos: 2,
  macaca: 2,
  macacas: 2,
  mad: 0,
  mafia: 1,
  magicwand: 2,
  mahbuno: 2,
  mahbunos: 2,
  mams: 2,
  manhater: 2,
  manpaste: 2,
  marijuana: 1,
  mastabate: 2,
  mastabater: 2,
  masterbate: 2,
  masterblaster: 2,
  mastrabator: 2,
  masturbate: 2,
  masturbating: 2,
  mattressprincess: 2,
  'mau mau': 2,
  'mau maus': 2,
  maumau: 2,
  maumaus: 2,
  meatbeatter: 2,
  meatrack: 2,
  meth: 1,
  mexican: 0,
  mgger: 2,
  mggor: 2,
  mick: 1,
  mickeyfinn: 2,
  mideast: 0,
  milf: 2,
  minority: 0,
  mockey: 2,
  mockie: 2,
  mocky: 2,
  mofo: 2,
  moky: 2,
  moles: 0,
  molest: 1,
  molestation: 1,
  molester: 1,
  molestor: 1,
  moneyshot: 2,
  'moon cricket': 2,
  'moon crickets': 2,
  mooncricket: 2,
  mooncrickets: 2,
  mormon: 0,
  moron: 2,
  moskal: 2,
  moskals: 2,
  moslem: 2,
  mosshead: 2,
  mothafuck: 2,
  mothafucka: 2,
  mothafuckaz: 2,
  mothafucked: 2,
  mothafucker: 2,
  mothafuckin: 2,
  mothafucking: 2,
  mothafuckings: 2,
  motherfuck: 2,
  motherfucked: 2,
  motherfucker: 2,
  motherfuckin: 2,
  motherfucking: 2,
  motherfuckings: 2,
  motherlovebone: 2,
  muff: 2,
  muffdive: 2,
  muffdiver: 2,
  muffindiver: 2,
  mufflikcer: 2,
  mulatto: 2,
  muncher: 2,
  munt: 2,
  murder: 1,
  murderer: 1,
  muslim: 0,
  mzungu: 2,
  mzungus: 2,
  naked: 0,
  narcotic: 1,
  nasty: 0,
  nastybitch: 2,
  nastyho: 2,
  nastyslut: 2,
  nastywhore: 2,
  nazi: 1,
  necro: 1,
  negres: 2,
  negress: 2,
  negro: 2,
  negroes: 2,
  negroid: 2,
  negros: 2,
  nig: 2,
  nigar: 2,
  nigars: 2,
  niger: 0,
  nigerian: 1,
  nigerians: 1,
  nigers: 2,
  nigette: 2,
  nigettes: 2,
  nigg: 2,
  nigga: 2,
  niggah: 2,
  niggahs: 2,
  niggar: 2,
  niggaracci: 2,
  niggard: 2,
  niggarded: 2,
  niggarding: 2,
  niggardliness: 2,
  niggardlinesss: 2,
  niggardly: 0,
  niggards: 2,
  niggars: 2,
  niggas: 2,
  niggaz: 2,
  nigger: 2,
  niggerhead: 2,
  niggerhole: 2,
  niggers: 2,
  niggle: 2,
  niggled: 2,
  niggles: 2,
  niggling: 2,
  nigglings: 2,
  niggor: 2,
  niggress: 2,
  niggresses: 2,
  nigguh: 2,
  nigguhs: 2,
  niggur: 2,
  niggurs: 2,
  niglet: 2,
  nignog: 2,
  nigor: 2,
  nigors: 2,
  nigr: 2,
  nigra: 2,
  nigras: 2,
  nigre: 2,
  nigres: 2,
  nigress: 2,
  nigs: 2,
  nip: 2,
  nipple: 1,
  nipplering: 1,
  nittit: 2,
  nlgger: 2,
  nlggor: 2,
  nofuckingway: 2,
  nook: 1,
  nookey: 2,
  nookie: 2,
  noonan: 2,
  nooner: 1,
  nude: 1,
  nudger: 2,
  nuke: 1,
  nutfucker: 2,
  nymph: 1,
  ontherag: 2,
  oral: 1,
  oreo: 0,
  oreos: 0,
  orga: 2,
  orgasim: 2,
  orgasm: 1,
  orgies: 1,
  orgy: 1,
  osama: 0,
  paddy: 1,
  paederastic: 1,
  paederasts: 1,
  paederasty: 1,
  paki: 2,
  pakis: 2,
  palesimian: 2,
  palestinian: 0,
  'pancake face': 2,
  'pancake faces': 2,
  pansies: 2,
  pansy: 2,
  panti: 2,
  panties: 0,
  payo: 2,
  pearlnecklace: 1,
  peck: 1,
  pecker: 1,
  peckerwood: 2,
  pederastic: 1,
  pederasts: 1,
  pederasty: 1,
  pedo: 2,
  pedophile: 1,
  pedophiles: 1,
  pedophilia: 1,
  pedophilic: 1,
  pee: 1,
  peehole: 2,
  peepee: 2,
  peepshow: 1,
  peepshpw: 2,
  pendy: 1,
  penetration: 1,
  peni5: 2,
  penile: 1,
  penis: 1,
  penises: 1,
  penthouse: 0,
  period: 0,
  perv: 2,
  phonesex: 1,
  phuk: 2,
  phuked: 2,
  phuking: 2,
  phukked: 2,
  phukking: 2,
  phungky: 2,
  phuq: 2,
  pi55: 2,
  picaninny: 2,
  piccaninny: 2,
  pickaninnies: 2,
  pickaninny: 2,
  piefke: 2,
  piefkes: 2,
  piker: 2,
  pikey: 2,
  piky: 2,
  pimp: 2,
  pimped: 2,
  pimper: 2,
  pimpjuic: 2,
  pimpjuice: 2,
  pimpsimp: 2,
  pindick: 2,
  piss: 2,
  pissed: 2,
  pisser: 2,
  pisses: 2,
  pisshead: 2,
  pissin: 2,
  pissing: 2,
  pissoff: 2,
  pistol: 1,
  pixie: 1,
  pixy: 1,
  playboy: 1,
  playgirl: 1,
  pocha: 2,
  pochas: 2,
  pocho: 2,
  pochos: 2,
  pocketpool: 2,
  pohm: 2,
  pohms: 2,
  polack: 2,
  polacks: 2,
  pollock: 2,
  pollocks: 2,
  pom: 2,
  pommie: 2,
  'pommie grant': 2,
  'pommie grants': 2,
  pommies: 2,
  pommy: 2,
  poms: 2,
  poo: 2,
  poon: 2,
  poontang: 2,
  poop: 2,
  pooper: 2,
  pooperscooper: 2,
  pooping: 2,
  poorwhitetrash: 2,
  popimp: 2,
  'porch monkey': 2,
  'porch monkies': 2,
  porchmonkey: 2,
  porn: 1,
  pornflick: 1,
  pornking: 2,
  porno: 1,
  pornography: 1,
  pornprincess: 2,
  pot: 0,
  poverty: 0,
  'prairie nigger': 2,
  'prairie niggers': 2,
  premature: 0,
  pric: 2,
  prick: 2,
  prickhead: 2,
  primetime: 0,
  propaganda: 0,
  pros: 0,
  prostitute: 1,
  protestant: 1,
  pu55i: 2,
  pu55y: 2,
  pube: 1,
  pubic: 1,
  pubiclice: 2,
  pud: 2,
  pudboy: 2,
  pudd: 2,
  puddboy: 2,
  puke: 2,
  puntang: 2,
  purinapricness: 2,
  puss: 2,
  pussie: 2,
  pussies: 2,
  pussy: 1,
  pussycat: 1,
  pussyeater: 2,
  pussyfucker: 2,
  pussylicker: 2,
  pussylips: 2,
  pussylover: 2,
  pussypounder: 2,
  pusy: 2,
  quashie: 2,
  que: 0,
  queef: 2,
  queer: 1,
  quickie: 2,
  quim: 2,
  ra8s: 2,
  rabbi: 0,
  racial: 0,
  racist: 1,
  radical: 1,
  radicals: 1,
  raghead: 2,
  ragheads: 2,
  randy: 1,
  rape: 1,
  raped: 1,
  raper: 2,
  rapist: 1,
  rearend: 2,
  rearentry: 2,
  rectum: 1,
  redleg: 2,
  redlegs: 2,
  redlight: 0,
  redneck: 2,
  rednecks: 2,
  redskin: 2,
  redskins: 2,
  reefer: 2,
  reestie: 2,
  refugee: 0,
  reject: 0,
  remains: 0,
  rentafuck: 2,
  republican: 0,
  rere: 2,
  retard: 2,
  retarded: 2,
  ribbed: 1,
  rigger: 2,
  rimjob: 2,
  rimming: 2,
  roach: 0,
  robber: 0,
  'round eyes': 2,
  roundeye: 2,
  rump: 0,
  russki: 2,
  russkie: 2,
  sadis: 2,
  sadom: 2,
  sambo: 2,
  sambos: 2,
  samckdaddy: 2,
  'sand nigger': 2,
  'sand niggers': 2,
  sandm: 2,
  sandnigger: 2,
  satan: 1,
  scag: 1,
  scallywag: 2,
  scat: 1,
  schlong: 2,
  schvartse: 2,
  schvartsen: 2,
  schwartze: 2,
  schwartzen: 2,
  screw: 1,
  screwyou: 2,
  scrotum: 1,
  scum: 1,
  semen: 1,
  seppo: 2,
  seppos: 2,
  septic: 1,
  septics: 1,
  servant: 0,
  sex: 1,
  sexed: 2,
  sexfarm: 2,
  sexhound: 2,
  sexhouse: 1,
  sexing: 2,
  sexkitten: 2,
  sexpot: 2,
  sexslave: 2,
  sextogo: 2,
  sextoy: 1,
  sextoys: 1,
  sexual: 1,
  sexually: 1,
  sexwhore: 2,
  sexy: 1,
  sexymoma: 2,
  sexyslim: 2,
  shag: 1,
  shaggin: 2,
  shagging: 2,
  shat: 2,
  shav: 2,
  shawtypimp: 2,
  sheeney: 2,
  shhit: 2,
  shiksa: 2,
  shinola: 1,
  shit: 1,
  shitcan: 2,
  shitdick: 2,
  shite: 2,
  shiteater: 2,
  shited: 2,
  shitface: 2,
  shitfaced: 2,
  shitfit: 2,
  shitforbrains: 2,
  shitfuck: 2,
  shitfucker: 2,
  shitfull: 2,
  shithapens: 2,
  shithappens: 2,
  shithead: 2,
  shithouse: 2,
  shiting: 2,
  shitlist: 2,
  shitola: 2,
  shitoutofluck: 2,
  shits: 2,
  shitstain: 2,
  shitted: 2,
  shitter: 2,
  shitting: 2,
  shitty: 2,
  shoot: 0,
  shooting: 0,
  shortfuck: 2,
  showtime: 0,
  shylock: 2,
  shylocks: 2,
  sick: 0,
  sissy: 2,
  sixsixsix: 2,
  sixtynine: 2,
  sixtyniner: 2,
  skank: 2,
  skankbitch: 2,
  skankfuck: 2,
  skankwhore: 2,
  skanky: 2,
  skankybitch: 2,
  skankywhore: 2,
  skinflute: 2,
  skum: 2,
  skumbag: 2,
  skwa: 2,
  skwe: 2,
  slant: 0,
  slanteye: 2,
  slanty: 2,
  slapper: 2,
  slaughter: 1,
  slav: 0,
  slave: 2,
  slavedriver: 2,
  sleezebag: 2,
  sleezeball: 2,
  slideitin: 2,
  slime: 0,
  slimeball: 2,
  slimebucket: 2,
  slope: 0,
  slopehead: 2,
  slopeheads: 2,
  sloper: 2,
  slopers: 2,
  slopes: 0,
  slopey: 2,
  slopeys: 2,
  slopies: 2,
  slopy: 2,
  slut: 2,
  sluts: 2,
  slutt: 2,
  slutting: 2,
  slutty: 2,
  slutwear: 2,
  slutwhore: 2,
  smack: 1,
  smackthemonkey: 2,
  smut: 2,
  snatch: 1,
  snatchpatch: 2,
  snigger: 0,
  sniggered: 0,
  sniggering: 0,
  sniggers: 1,
  sniper: 0,
  snot: 0,
  snowback: 2,
  snownigger: 2,
  sob: 0,
  sodom: 1,
  sodomise: 2,
  sodomite: 1,
  sodomize: 2,
  sodomy: 2,
  sonofabitch: 2,
  sonofbitch: 2,
  sooties: 2,
  sooty: 2,
  sos: 0,
  soviet: 0,
  spa: 0,
  spade: 1,
  spades: 1,
  spaghettibender: 2,
  spaghettinigger: 2,
  spank: 1,
  spankthemonkey: 2,
  spearchucker: 2,
  spearchuckers: 2,
  sperm: 1,
  spermacide: 2,
  spermbag: 2,
  spermhearder: 2,
  spermherder: 2,
  spic: 2,
  spick: 2,
  spicks: 2,
  spics: 2,
  spig: 2,
  spigotty: 2,
  spik: 2,
  spit: 2,
  spitter: 2,
  splittail: 2,
  spooge: 2,
  spreadeagle: 2,
  spunk: 2,
  spunky: 2,
  sqeh: 2,
  squa: 2,
  squarehead: 2,
  squareheads: 2,
  squaw: 2,
  squinty: 2,
  stagg: 1,
  stiffy: 1,
  strapon: 1,
  stringer: 2,
  stripclub: 2,
  stroke: 0,
  stroking: 1,
  stuinties: 2,
  stupid: 2,
  stupidfuck: 2,
  stupidfucker: 2,
  suck: 1,
  suckdick: 2,
  sucker: 2,
  suckme: 2,
  suckmyass: 2,
  suckmydick: 2,
  suckmytit: 2,
  suckoff: 2,
  suicide: 1,
  swallow: 1,
  swallower: 2,
  swalow: 2,
  'swamp guinea': 2,
  'swamp guineas': 2,
  swastika: 1,
  sweetness: 0,
  syphilis: 1,
  taboo: 0,
  tacohead: 2,
  tacoheads: 2,
  taff: 2,
  tampon: 0,
  tang: 2,
  tantra: 1,
  'tar babies': 2,
  'tar baby': 2,
  tarbaby: 2,
  tard: 2,
  teat: 1,
  terror: 0,
  terrorist: 1,
  teste: 2,
  testicle: 1,
  testicles: 1,
  thicklip: 2,
  thicklips: 2,
  thirdeye: 2,
  thirdleg: 2,
  threesome: 1,
  threeway: 2,
  'timber nigger': 2,
  'timber niggers': 2,
  timbernigger: 2,
  tinker: 2,
  tinkers: 2,
  tinkle: 1,
  tit: 1,
  titbitnipply: 2,
  titfuck: 2,
  titfucker: 2,
  titfuckin: 2,
  titjob: 2,
  titlicker: 2,
  titlover: 2,
  tits: 1,
  tittie: 2,
  titties: 2,
  titty: 2,
  tnt: 1,
  toilet: 0,
  tongethruster: 2,
  tongue: 0,
  tonguethrust: 2,
  tonguetramp: 2,
  tortur: 2,
  torture: 1,
  tosser: 2,
  'towel head': 2,
  'towel heads': 2,
  towelhead: 2,
  trailertrash: 2,
  tramp: 1,
  trannie: 2,
  tranny: 2,
  transexual: 0,
  transsexual: 0,
  transvestite: 2,
  trap: 1,
  triplex: 2,
  trisexual: 1,
  trojan: 0,
  trots: 1,
  tuckahoe: 2,
  tunneloflove: 2,
  turd: 1,
  turnon: 2,
  twat: 2,
  twink: 2,
  twinkie: 2,
  twobitwhore: 2,
  uck: 2,
  uk: 0,
  ukrop: 2,
  'uncle tom': 2,
  unfuckable: 2,
  upskirt: 2,
  uptheass: 2,
  upthebutt: 2,
  urinary: 0,
  urinate: 0,
  urine: 0,
  usama: 2,
  uterus: 1,
  vagina: 1,
  vaginal: 1,
  vatican: 0,
  vibr: 2,
  vibrater: 2,
  vibrator: 1,
  vietcong: 0,
  violence: 0,
  virgin: 0,
  virginbreaker: 2,
  vomit: 2,
  vulva: 1,
  wab: 2,
  wank: 2,
  wanker: 2,
  wanking: 2,
  waysted: 2,
  weapon: 0,
  weenie: 2,
  weewee: 2,
  welcher: 2,
  welfare: 2,
  wetb: 2,
  wetback: 2,
  wetbacks: 2,
  wetspot: 2,
  whacker: 2,
  whash: 2,
  whigger: 2,
  whiggers: 2,
  whiskey: 0,
  whiskeydick: 2,
  whiskydick: 2,
  whit: 1,
  'white trash': 2,
  whitenigger: 2,
  whites: 1,
  whitetrash: 2,
  whitey: 2,
  whiteys: 2,
  whities: 2,
  whiz: 2,
  whop: 2,
  whore: 2,
  whorefucker: 2,
  whorehouse: 2,
  wigga: 2,
  wiggas: 2,
  wigger: 2,
  wiggers: 2,
  willie: 2,
  williewanker: 2,
  willy: 1,
  wn: 2,
  wog: 2,
  wogs: 2,
  womens: 0,
  wop: 2,
  wtf: 2,
  wuss: 2,
  wuzzie: 2,
  xkwe: 2,
  xtc: 1,
  xxx: 1,
  yank: 2,
  yankee: 1,
  yankees: 1,
  yanks: 2,
  yarpie: 2,
  yarpies: 2,
  yellowman: 2,
  yid: 2,
  yids: 2,
  zigabo: 2,
  zigabos: 2,
  zipperhead: 2,
  zipperheads: 2
}


/***/ }),

/***/ "./node_modules/dale-chall-formula/index.js":
/*!**************************************************!*\
  !*** ./node_modules/dale-chall-formula/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "daleChallFormula": function() { return /* binding */ daleChallFormula; },
/* harmony export */   "daleChallGradeLevel": function() { return /* binding */ daleChallGradeLevel; }
/* harmony export */ });
var difficultWordWeight = 0.1579
var wordWeight = 0.0496
var difficultWordThreshold = 0.05
var percentage = 100
var adjustment = 3.6365

// Grade map associated with the scores.
var gradeMap = {
  4: [0, 4],
  5: [5, 6],
  6: [7, 8],
  7: [9, 10],
  8: [11, 12],
  9: [13, 15],
  10: [16, Number.POSITIVE_INFINITY],
  NaN: [Number.NaN, Number.NaN]
}

/**
 * @typedef {Object.<string, number>} DaleChallFormulaCounts
 * @property {number} sentence
 * @property {number} word
 * @property {number} difficultWord
 */

/**
 * Given the number of words (`word`), the number of sentences (`sentence`), and the number of unique unfamiliar words in a document (`difficultWord`), returns the score associated with the document.
 *
 * @param {DaleChallFormulaCounts} counts
 * @returns {number}
 */
function daleChallFormula(counts) {
  /** @type {number} */
  var percentageOfDifficultWords
  /** @type {number} */
  var score

  if (!counts || !counts.sentence || !counts.word) {
    return Number.NaN
  }

  percentageOfDifficultWords = (counts.difficultWord || 0) / counts.word

  score =
    difficultWordWeight * percentageOfDifficultWords * percentage +
    (wordWeight * counts.word) / counts.sentence

  if (percentageOfDifficultWords > difficultWordThreshold) {
    score += adjustment
  }

  return score
}

/**
 * Mapping between a dale-chall score and a U.S. grade level.
 *
 * @param {number} score
 * @returns {[number, number]}
 */
function daleChallGradeLevel(score) {
  var floored = Math.floor(score)

  if (floored < 5) {
    floored = 4
  } else if (floored > 9) {
    floored = 10
  }

  // eslint-ignore-next-line capitalized-comments
  // type-coverage:ignore-next-line
  return gradeMap[floored].concat()
}


/***/ }),

/***/ "./node_modules/dale-chall/index.js":
/*!******************************************!*\
  !*** ./node_modules/dale-chall/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "daleChall": function() { return /* binding */ daleChall; }
/* harmony export */ });
var daleChall = [
  'a',
  'able',
  'aboard',
  'about',
  'above',
  'absent',
  'accept',
  'accident',
  'account',
  'ache',
  'aching',
  'acorn',
  'acre',
  'across',
  'act',
  'acts',
  'add',
  'address',
  'admire',
  'adventure',
  'afar',
  'afraid',
  'after',
  'afternoon',
  'afterward',
  'afterwards',
  'again',
  'against',
  'age',
  'aged',
  'ago',
  'agree',
  'ah',
  'ahead',
  'aid',
  'aim',
  'air',
  'airfield',
  'airplane',
  'airport',
  'airship',
  'airy',
  'alarm',
  'alike',
  'alive',
  'all',
  'alley',
  'alligator',
  'allow',
  'almost',
  'alone',
  'along',
  'aloud',
  'already',
  'also',
  'always',
  'am',
  'america',
  'american',
  'among',
  'amount',
  'an',
  'and',
  'angel',
  'anger',
  'angry',
  'animal',
  'another',
  'answer',
  'ant',
  'any',
  'anybody',
  'anyhow',
  'anyone',
  'anything',
  'anyway',
  'anywhere',
  'apart',
  'apartment',
  'ape',
  'apiece',
  'appear',
  'apple',
  'april',
  'apron',
  'are',
  "aren't",
  'arise',
  'arithmetic',
  'arm',
  'armful',
  'army',
  'arose',
  'around',
  'arrange',
  'arrive',
  'arrived',
  'arrow',
  'art',
  'artist',
  'as',
  'ash',
  'ashes',
  'aside',
  'ask',
  'asleep',
  'at',
  'ate',
  'attack',
  'attend',
  'attention',
  'august',
  'aunt',
  'author',
  'auto',
  'automobile',
  'autumn',
  'avenue',
  'awake',
  'awaken',
  'away',
  'awful',
  'awfully',
  'awhile',
  'ax',
  'axe',
  'baa',
  'babe',
  'babies',
  'back',
  'background',
  'backward',
  'backwards',
  'bacon',
  'bad',
  'badge',
  'badly',
  'bag',
  'bake',
  'baker',
  'bakery',
  'baking',
  'ball',
  'balloon',
  'banana',
  'band',
  'bandage',
  'bang',
  'banjo',
  'bank',
  'banker',
  'bar',
  'barber',
  'bare',
  'barefoot',
  'barely',
  'bark',
  'barn',
  'barrel',
  'base',
  'baseball',
  'basement',
  'basket',
  'bat',
  'batch',
  'bath',
  'bathe',
  'bathing',
  'bathroom',
  'bathtub',
  'battle',
  'battleship',
  'bay',
  'be',
  'beach',
  'bead',
  'beam',
  'bean',
  'bear',
  'beard',
  'beast',
  'beat',
  'beating',
  'beautiful',
  'beautify',
  'beauty',
  'became',
  'because',
  'become',
  'becoming',
  'bed',
  'bedbug',
  'bedroom',
  'bedspread',
  'bedtime',
  'bee',
  'beech',
  'beef',
  'beefsteak',
  'beehive',
  'been',
  'beer',
  'beet',
  'before',
  'beg',
  'began',
  'beggar',
  'begged',
  'begin',
  'beginning',
  'begun',
  'behave',
  'behind',
  'being',
  'believe',
  'bell',
  'belong',
  'below',
  'belt',
  'bench',
  'bend',
  'beneath',
  'bent',
  'berries',
  'berry',
  'beside',
  'besides',
  'best',
  'bet',
  'better',
  'between',
  'bib',
  'bible',
  'bicycle',
  'bid',
  'big',
  'bigger',
  'bill',
  'billboard',
  'bin',
  'bind',
  'bird',
  'birth',
  'birthday',
  'biscuit',
  'bit',
  'bite',
  'biting',
  'bitter',
  'black',
  'blackberry',
  'blackbird',
  'blackboard',
  'blackness',
  'blacksmith',
  'blame',
  'blank',
  'blanket',
  'blast',
  'blaze',
  'bleed',
  'bless',
  'blessing',
  'blew',
  'blind',
  'blindfold',
  'blinds',
  'block',
  'blood',
  'bloom',
  'blossom',
  'blot',
  'blow',
  'blue',
  'blueberry',
  'bluebird',
  'blush',
  'board',
  'boast',
  'boat',
  'bob',
  'bobwhite',
  'bodies',
  'body',
  'boil',
  'boiler',
  'bold',
  'bone',
  'bonnet',
  'boo',
  'book',
  'bookcase',
  'bookkeeper',
  'boom',
  'boot',
  'born',
  'borrow',
  'boss',
  'both',
  'bother',
  'bottle',
  'bottom',
  'bought',
  'bounce',
  'bow',
  'bow-wow',
  'bowl',
  'box',
  'boxcar',
  'boxer',
  'boxes',
  'boy',
  'boyhood',
  'bracelet',
  'brain',
  'brake',
  'bran',
  'branch',
  'brass',
  'brave',
  'bread',
  'break',
  'breakfast',
  'breast',
  'breath',
  'breathe',
  'breeze',
  'brick',
  'bride',
  'bridge',
  'bright',
  'brightness',
  'bring',
  'broad',
  'broadcast',
  'broke',
  'broken',
  'brook',
  'broom',
  'brother',
  'brought',
  'brown',
  'brush',
  'bubble',
  'bucket',
  'buckle',
  'bud',
  'buffalo',
  'bug',
  'buggy',
  'build',
  'building',
  'built',
  'bulb',
  'bull',
  'bullet',
  'bum',
  'bumblebee',
  'bump',
  'bun',
  'bunch',
  'bundle',
  'bunny',
  'burn',
  'burst',
  'bury',
  'bus',
  'bush',
  'bushel',
  'business',
  'busy',
  'but',
  'butcher',
  'butt',
  'butter',
  'buttercup',
  'butterfly',
  'buttermilk',
  'butterscotch',
  'button',
  'buttonhole',
  'buy',
  'buzz',
  'by',
  'bye',
  'cab',
  'cabbage',
  'cabin',
  'cabinet',
  'cackle',
  'cage',
  'cake',
  'calendar',
  'calf',
  'call',
  'caller',
  'calling',
  'came',
  'camel',
  'camp',
  'campfire',
  'can',
  "can't",
  'canal',
  'canary',
  'candle',
  'candlestick',
  'candy',
  'cane',
  'cannon',
  'cannot',
  'canoe',
  'canyon',
  'cap',
  'cape',
  'capital',
  'captain',
  'car',
  'card',
  'cardboard',
  'care',
  'careful',
  'careless',
  'carelessness',
  'carload',
  'carpenter',
  'carpet',
  'carriage',
  'carrot',
  'carry',
  'cart',
  'carve',
  'case',
  'cash',
  'cashier',
  'castle',
  'cat',
  'catbird',
  'catch',
  'catcher',
  'caterpillar',
  'catfish',
  'catsup',
  'cattle',
  'caught',
  'cause',
  'cave',
  'ceiling',
  'cell',
  'cellar',
  'cent',
  'center',
  'cereal',
  'certain',
  'certainly',
  'chain',
  'chair',
  'chalk',
  'champion',
  'chance',
  'change',
  'chap',
  'charge',
  'charm',
  'chart',
  'chase',
  'chatter',
  'cheap',
  'cheat',
  'check',
  'checkers',
  'cheek',
  'cheer',
  'cheese',
  'cherry',
  'chest',
  'chew',
  'chick',
  'chicken',
  'chief',
  'child',
  'childhood',
  'children',
  'chill',
  'chilly',
  'chimney',
  'chin',
  'china',
  'chip',
  'chipmunk',
  'chocolate',
  'choice',
  'choose',
  'chop',
  'chorus',
  'chose',
  'chosen',
  'christen',
  'christmas',
  'church',
  'churn',
  'cigarette',
  'circle',
  'circus',
  'citizen',
  'city',
  'clang',
  'clap',
  'class',
  'classmate',
  'classroom',
  'claw',
  'clay',
  'clean',
  'cleaner',
  'clear',
  'clerk',
  'clever',
  'click',
  'cliff',
  'climb',
  'clip',
  'cloak',
  'clock',
  'close',
  'closet',
  'cloth',
  'clothes',
  'clothing',
  'cloud',
  'cloudy',
  'clover',
  'clown',
  'club',
  'cluck',
  'clump',
  'coach',
  'coal',
  'coast',
  'coat',
  'cob',
  'cobbler',
  'cocoa',
  'coconut',
  'cocoon',
  'cod',
  'codfish',
  'coffee',
  'coffeepot',
  'coin',
  'cold',
  'collar',
  'college',
  'color',
  'colored',
  'colt',
  'column',
  'comb',
  'come',
  'comfort',
  'comic',
  'coming',
  'company',
  'compare',
  'conductor',
  'cone',
  'connect',
  'coo',
  'cook',
  'cooked',
  'cookie',
  'cookies',
  'cooking',
  'cool',
  'cooler',
  'coop',
  'copper',
  'copy',
  'cord',
  'cork',
  'corn',
  'corner',
  'correct',
  'cost',
  'cot',
  'cottage',
  'cotton',
  'couch',
  'cough',
  'could',
  "couldn't",
  'count',
  'counter',
  'country',
  'county',
  'course',
  'court',
  'cousin',
  'cover',
  'cow',
  'coward',
  'cowardly',
  'cowboy',
  'cozy',
  'crab',
  'crack',
  'cracker',
  'cradle',
  'cramps',
  'cranberry',
  'crank',
  'cranky',
  'crash',
  'crawl',
  'crazy',
  'cream',
  'creamy',
  'creek',
  'creep',
  'crept',
  'cried',
  'cries',
  'croak',
  'crook',
  'crooked',
  'crop',
  'cross',
  'cross-eyed',
  'crossing',
  'crow',
  'crowd',
  'crowded',
  'crown',
  'cruel',
  'crumb',
  'crumble',
  'crush',
  'crust',
  'cry',
  'cub',
  'cuff',
  'cup',
  'cupboard',
  'cupful',
  'cure',
  'curl',
  'curly',
  'curtain',
  'curve',
  'cushion',
  'custard',
  'customer',
  'cut',
  'cute',
  'cutting',
  'dab',
  'dad',
  'daddy',
  'daily',
  'dairy',
  'daisy',
  'dam',
  'damage',
  'dame',
  'damp',
  'dance',
  'dancer',
  'dancing',
  'dandy',
  'danger',
  'dangerous',
  'dare',
  'dark',
  'darkness',
  'darling',
  'darn',
  'dart',
  'dash',
  'date',
  'daughter',
  'dawn',
  'day',
  'daybreak',
  'daytime',
  'dead',
  'deaf',
  'deal',
  'dear',
  'death',
  'december',
  'decide',
  'deck',
  'deed',
  'deep',
  'deer',
  'defeat',
  'defend',
  'defense',
  'delight',
  'den',
  'dentist',
  'depend',
  'deposit',
  'describe',
  'desert',
  'deserve',
  'desire',
  'desk',
  'destroy',
  'devil',
  'dew',
  'diamond',
  'did',
  "didn't",
  'die',
  'died',
  'dies',
  'difference',
  'different',
  'dig',
  'dim',
  'dime',
  'dine',
  'ding-dong',
  'dinner',
  'dip',
  'direct',
  'direction',
  'dirt',
  'dirty',
  'discover',
  'dish',
  'dislike',
  'dismiss',
  'ditch',
  'dive',
  'diver',
  'divide',
  'do',
  'dock',
  'doctor',
  'does',
  "doesn't",
  'dog',
  'doll',
  'dollar',
  'dolly',
  "don't",
  'done',
  'donkey',
  'door',
  'doorbell',
  'doorknob',
  'doorstep',
  'dope',
  'dot',
  'double',
  'dough',
  'dove',
  'down',
  'downstairs',
  'downtown',
  'dozen',
  'drag',
  'drain',
  'drank',
  'draw',
  'drawer',
  'drawing',
  'dream',
  'dress',
  'dresser',
  'dressmaker',
  'drew',
  'dried',
  'drift',
  'drill',
  'drink',
  'drip',
  'drive',
  'driven',
  'driver',
  'drop',
  'drove',
  'drown',
  'drowsy',
  'drub',
  'drum',
  'drunk',
  'dry',
  'duck',
  'due',
  'dug',
  'dull',
  'dumb',
  'dump',
  'during',
  'dust',
  'dusty',
  'duty',
  'dwarf',
  'dwell',
  'dwelt',
  'dying',
  'each',
  'eager',
  'eagle',
  'ear',
  'early',
  'earn',
  'earth',
  'east',
  'eastern',
  'easy',
  'eat',
  'eaten',
  'edge',
  'egg',
  'eh',
  'eight',
  'eighteen',
  'eighth',
  'eighty',
  'either',
  'elbow',
  'elder',
  'eldest',
  'electric',
  'electricity',
  'elephant',
  'eleven',
  'elf',
  'elm',
  'else',
  'elsewhere',
  'empty',
  'end',
  'ending',
  'enemy',
  'engine',
  'engineer',
  'english',
  'enjoy',
  'enough',
  'enter',
  'envelope',
  'equal',
  'erase',
  'eraser',
  'errand',
  'escape',
  'eve',
  'even',
  'evening',
  'ever',
  'every',
  'everybody',
  'everyday',
  'everyone',
  'everything',
  'everywhere',
  'evil',
  'exact',
  'except',
  'exchange',
  'excited',
  'exciting',
  'excuse',
  'exit',
  'expect',
  'explain',
  'extra',
  'eye',
  'eyebrow',
  'fable',
  'face',
  'facing',
  'fact',
  'factory',
  'fail',
  'faint',
  'fair',
  'fairy',
  'faith',
  'fake',
  'fall',
  'false',
  'family',
  'fan',
  'fancy',
  'far',
  'far-off',
  'faraway',
  'fare',
  'farm',
  'farmer',
  'farming',
  'farther',
  'fashion',
  'fast',
  'fasten',
  'fat',
  'father',
  'fault',
  'favor',
  'favorite',
  'fear',
  'feast',
  'feather',
  'february',
  'fed',
  'feed',
  'feel',
  'feet',
  'fell',
  'fellow',
  'felt',
  'fence',
  'fever',
  'few',
  'fib',
  'fiddle',
  'field',
  'fife',
  'fifteen',
  'fifth',
  'fifty',
  'fig',
  'fight',
  'figure',
  'file',
  'fill',
  'film',
  'finally',
  'find',
  'fine',
  'finger',
  'finish',
  'fire',
  'firearm',
  'firecracker',
  'fireplace',
  'fireworks',
  'firing',
  'first',
  'fish',
  'fisherman',
  'fist',
  'fit',
  'fits',
  'five',
  'fix',
  'flag',
  'flake',
  'flame',
  'flap',
  'flash',
  'flashlight',
  'flat',
  'flea',
  'flesh',
  'flew',
  'flies',
  'flight',
  'flip',
  'flip-flop',
  'float',
  'flock',
  'flood',
  'floor',
  'flop',
  'flour',
  'flow',
  'flower',
  'flowery',
  'flutter',
  'fly',
  'foam',
  'fog',
  'foggy',
  'fold',
  'folks',
  'follow',
  'following',
  'fond',
  'food',
  'fool',
  'foolish',
  'foot',
  'football',
  'footprint',
  'for',
  'forehead',
  'forest',
  'forget',
  'forgive',
  'forgot',
  'forgotten',
  'fork',
  'form',
  'fort',
  'forth',
  'fortune',
  'forty',
  'forward',
  'fought',
  'found',
  'fountain',
  'four',
  'fourteen',
  'fourth',
  'fox',
  'frame',
  'free',
  'freedom',
  'freeze',
  'freight',
  'french',
  'fresh',
  'fret',
  'friday',
  'fried',
  'friend',
  'friendly',
  'friendship',
  'frighten',
  'frog',
  'from',
  'front',
  'frost',
  'frown',
  'froze',
  'fruit',
  'fry',
  'fudge',
  'fuel',
  'full',
  'fully',
  'fun',
  'funny',
  'fur',
  'furniture',
  'further',
  'fuzzy',
  'gain',
  'gallon',
  'gallop',
  'game',
  'gang',
  'garage',
  'garbage',
  'garden',
  'gas',
  'gasoline',
  'gate',
  'gather',
  'gave',
  'gay',
  'gear',
  'geese',
  'general',
  'gentle',
  'gentleman',
  'gentlemen',
  'geography',
  'get',
  'getting',
  'giant',
  'gift',
  'gingerbread',
  'girl',
  'give',
  'given',
  'giving',
  'glad',
  'gladly',
  'glance',
  'glass',
  'glasses',
  'gleam',
  'glide',
  'glory',
  'glove',
  'glow',
  'glue',
  'go',
  'goal',
  'goat',
  'gobble',
  'god',
  'godmother',
  'goes',
  'going',
  'gold',
  'golden',
  'goldfish',
  'golf',
  'gone',
  'good',
  'good-by',
  'good-bye',
  'good-looking',
  'goodbye',
  'goodness',
  'goods',
  'goody',
  'goose',
  'gooseberry',
  'got',
  'govern',
  'government',
  'gown',
  'grab',
  'gracious',
  'grade',
  'grain',
  'grand',
  'grandchild',
  'grandchildren',
  'granddaughter',
  'grandfather',
  'grandma',
  'grandmother',
  'grandpa',
  'grandson',
  'grandstand',
  'grape',
  'grapefruit',
  'grapes',
  'grass',
  'grasshopper',
  'grateful',
  'grave',
  'gravel',
  'graveyard',
  'gravy',
  'gray',
  'graze',
  'grease',
  'great',
  'green',
  'greet',
  'grew',
  'grind',
  'groan',
  'grocery',
  'ground',
  'group',
  'grove',
  'grow',
  'guard',
  'guess',
  'guest',
  'guide',
  'gulf',
  'gum',
  'gun',
  'gunpowder',
  'guy',
  'ha',
  'habit',
  'had',
  "hadn't",
  'hail',
  'hair',
  'haircut',
  'hairpin',
  'half',
  'hall',
  'halt',
  'ham',
  'hammer',
  'hand',
  'handful',
  'handkerchief',
  'handle',
  'handwriting',
  'hang',
  'happen',
  'happily',
  'happiness',
  'happy',
  'harbor',
  'hard',
  'hardly',
  'hardship',
  'hardware',
  'hare',
  'hark',
  'harm',
  'harness',
  'harp',
  'harvest',
  'has',
  "hasn't",
  'haste',
  'hasten',
  'hasty',
  'hat',
  'hatch',
  'hatchet',
  'hate',
  'haul',
  'have',
  "haven't",
  'having',
  'hawk',
  'hay',
  'hayfield',
  'haystack',
  'he',
  "he'd",
  "he'll",
  "he's",
  'head',
  'headache',
  'heal',
  'health',
  'healthy',
  'heap',
  'hear',
  'heard',
  'hearing',
  'heart',
  'heat',
  'heater',
  'heaven',
  'heavy',
  'heel',
  'height',
  'held',
  'hell',
  'hello',
  'helmet',
  'help',
  'helper',
  'helpful',
  'hem',
  'hen',
  'henhouse',
  'her',
  'herd',
  'here',
  "here's",
  'hero',
  'hers',
  'herself',
  'hey',
  'hickory',
  'hid',
  'hidden',
  'hide',
  'high',
  'highway',
  'hill',
  'hillside',
  'hilltop',
  'hilly',
  'him',
  'himself',
  'hind',
  'hint',
  'hip',
  'hire',
  'his',
  'hiss',
  'history',
  'hit',
  'hitch',
  'hive',
  'ho',
  'hoe',
  'hog',
  'hold',
  'holder',
  'hole',
  'holiday',
  'hollow',
  'holy',
  'home',
  'homely',
  'homesick',
  'honest',
  'honey',
  'honeybee',
  'honeymoon',
  'honk',
  'honor',
  'hood',
  'hoof',
  'hook',
  'hoop',
  'hop',
  'hope',
  'hopeful',
  'hopeless',
  'horn',
  'horse',
  'horseback',
  'horseshoe',
  'hose',
  'hospital',
  'host',
  'hot',
  'hotel',
  'hound',
  'hour',
  'house',
  'housetop',
  'housewife',
  'housework',
  'how',
  'however',
  'howl',
  'hug',
  'huge',
  'hum',
  'humble',
  'hump',
  'hundred',
  'hung',
  'hunger',
  'hungry',
  'hunk',
  'hunt',
  'hunter',
  'hurrah',
  'hurried',
  'hurry',
  'hurt',
  'husband',
  'hush',
  'hut',
  'hymn',
  'i',
  "i'd",
  "i'll",
  "i'm",
  "i've",
  'ice',
  'icy',
  'idea',
  'ideal',
  'if',
  'ill',
  'important',
  'impossible',
  'improve',
  'in',
  'inch',
  'inches',
  'income',
  'indeed',
  'indian',
  'indoors',
  'ink',
  'inn',
  'insect',
  'inside',
  'instant',
  'instead',
  'insult',
  'intend',
  'interested',
  'interesting',
  'into',
  'invite',
  'iron',
  'is',
  'island',
  "isn't",
  'it',
  "it's",
  'its',
  'itself',
  'ivory',
  'ivy',
  'jacket',
  'jacks',
  'jail',
  'jam',
  'january',
  'jar',
  'jaw',
  'jay',
  'jelly',
  'jellyfish',
  'jerk',
  'jig',
  'job',
  'jockey',
  'join',
  'joke',
  'joking',
  'jolly',
  'journey',
  'joy',
  'joyful',
  'joyous',
  'judge',
  'jug',
  'juice',
  'juicy',
  'july',
  'jump',
  'june',
  'junior',
  'junk',
  'just',
  'keen',
  'keep',
  'kept',
  'kettle',
  'key',
  'kick',
  'kid',
  'kill',
  'killed',
  'kind',
  'kindly',
  'kindness',
  'king',
  'kingdom',
  'kiss',
  'kitchen',
  'kite',
  'kitten',
  'kitty',
  'knee',
  'kneel',
  'knew',
  'knife',
  'knit',
  'knives',
  'knob',
  'knock',
  'knot',
  'know',
  'known',
  'lace',
  'lad',
  'ladder',
  'ladies',
  'lady',
  'laid',
  'lake',
  'lamb',
  'lame',
  'lamp',
  'land',
  'lane',
  'language',
  'lantern',
  'lap',
  'lard',
  'large',
  'lash',
  'lass',
  'last',
  'late',
  'laugh',
  'laundry',
  'law',
  'lawn',
  'lawyer',
  'lay',
  'lazy',
  'lead',
  'leader',
  'leaf',
  'leak',
  'lean',
  'leap',
  'learn',
  'learned',
  'least',
  'leather',
  'leave',
  'leaving',
  'led',
  'left',
  'leg',
  'lemon',
  'lemonade',
  'lend',
  'length',
  'less',
  'lesson',
  'let',
  "let's",
  'letter',
  'letting',
  'lettuce',
  'level',
  'liberty',
  'library',
  'lice',
  'lick',
  'lid',
  'lie',
  'life',
  'lift',
  'light',
  'lightness',
  'lightning',
  'like',
  'likely',
  'liking',
  'lily',
  'limb',
  'lime',
  'limp',
  'line',
  'linen',
  'lion',
  'lip',
  'list',
  'listen',
  'lit',
  'little',
  'live',
  'lively',
  'liver',
  'lives',
  'living',
  'lizard',
  'load',
  'loaf',
  'loan',
  'loaves',
  'lock',
  'locomotive',
  'log',
  'lone',
  'lonely',
  'lonesome',
  'long',
  'look',
  'lookout',
  'loop',
  'loose',
  'lord',
  'lose',
  'loser',
  'loss',
  'lost',
  'lot',
  'loud',
  'love',
  'lovely',
  'lover',
  'low',
  'luck',
  'lucky',
  'lumber',
  'lump',
  'lunch',
  'lying',
  'ma',
  'machine',
  'machinery',
  'mad',
  'made',
  'magazine',
  'magic',
  'maid',
  'mail',
  'mailbox',
  'mailman',
  'major',
  'make',
  'making',
  'male',
  'mama',
  'mamma',
  'man',
  'manager',
  'mane',
  'manger',
  'many',
  'map',
  'maple',
  'marble',
  'march',
  'mare',
  'mark',
  'market',
  'marriage',
  'married',
  'marry',
  'mask',
  'mast',
  'master',
  'mat',
  'match',
  'matter',
  'mattress',
  'may',
  'maybe',
  'mayor',
  'maypole',
  'me',
  'meadow',
  'meal',
  'mean',
  'means',
  'meant',
  'measure',
  'meat',
  'medicine',
  'meet',
  'meeting',
  'melt',
  'member',
  'men',
  'mend',
  'meow',
  'merry',
  'mess',
  'message',
  'met',
  'metal',
  'mew',
  'mice',
  'middle',
  'midnight',
  'might',
  'mighty',
  'mile',
  'miler',
  'milk',
  'milkman',
  'mill',
  'million',
  'mind',
  'mine',
  'miner',
  'mint',
  'minute',
  'mirror',
  'mischief',
  'miss',
  'misspell',
  'mistake',
  'misty',
  'mitt',
  'mitten',
  'mix',
  'moment',
  'monday',
  'money',
  'monkey',
  'month',
  'moo',
  'moon',
  'moonlight',
  'moose',
  'mop',
  'more',
  'morning',
  'morrow',
  'moss',
  'most',
  'mostly',
  'mother',
  'motor',
  'mount',
  'mountain',
  'mouse',
  'mouth',
  'move',
  'movie',
  'movies',
  'moving',
  'mow',
  'mr.',
  'mrs.',
  'much',
  'mud',
  'muddy',
  'mug',
  'mule',
  'multiply',
  'murder',
  'music',
  'must',
  'my',
  'myself',
  'nail',
  'name',
  'nap',
  'napkin',
  'narrow',
  'nasty',
  'naughty',
  'navy',
  'near',
  'nearby',
  'nearly',
  'neat',
  'neck',
  'necktie',
  'need',
  'needle',
  "needn't",
  'negro',
  'neighbor',
  'neighborhood',
  'neither',
  'nerve',
  'nest',
  'net',
  'never',
  'nevermore',
  'new',
  'news',
  'newspaper',
  'next',
  'nibble',
  'nice',
  'nickel',
  'night',
  'nightgown',
  'nine',
  'nineteen',
  'ninety',
  'no',
  'nobody',
  'nod',
  'noise',
  'noisy',
  'none',
  'noon',
  'nor',
  'north',
  'northern',
  'nose',
  'not',
  'note',
  'nothing',
  'notice',
  'november',
  'now',
  'nowhere',
  'number',
  'nurse',
  'nut',
  "o'clock",
  'oak',
  'oar',
  'oatmeal',
  'oats',
  'obey',
  'ocean',
  'october',
  'odd',
  'of',
  'off',
  'offer',
  'office',
  'officer',
  'often',
  'oh',
  'oil',
  'old',
  'old-fashioned',
  'on',
  'once',
  'one',
  'onion',
  'only',
  'onward',
  'open',
  'or',
  'orange',
  'orchard',
  'order',
  'ore',
  'organ',
  'other',
  'otherwise',
  'ouch',
  'ought',
  'our',
  'ours',
  'ourselves',
  'out',
  'outdoors',
  'outfit',
  'outlaw',
  'outline',
  'outside',
  'outward',
  'oven',
  'over',
  'overalls',
  'overcoat',
  'overeat',
  'overhead',
  'overhear',
  'overnight',
  'overturn',
  'owe',
  'owing',
  'owl',
  'own',
  'owner',
  'ox',
  'pa',
  'pace',
  'pack',
  'package',
  'pad',
  'page',
  'paid',
  'pail',
  'pain',
  'painful',
  'paint',
  'painter',
  'painting',
  'pair',
  'pal',
  'palace',
  'pale',
  'pan',
  'pancake',
  'pane',
  'pansy',
  'pants',
  'papa',
  'paper',
  'parade',
  'pardon',
  'parent',
  'park',
  'part',
  'partly',
  'partner',
  'party',
  'pass',
  'passenger',
  'past',
  'paste',
  'pasture',
  'pat',
  'patch',
  'path',
  'patter',
  'pave',
  'pavement',
  'paw',
  'pay',
  'payment',
  'pea',
  'peace',
  'peaceful',
  'peach',
  'peaches',
  'peak',
  'peanut',
  'pear',
  'pearl',
  'peas',
  'peck',
  'peek',
  'peel',
  'peep',
  'peg',
  'pen',
  'pencil',
  'penny',
  'people',
  'pepper',
  'peppermint',
  'perfume',
  'perhaps',
  'person',
  'pet',
  'phone',
  'piano',
  'pick',
  'pickle',
  'picnic',
  'picture',
  'pie',
  'piece',
  'pig',
  'pigeon',
  'piggy',
  'pile',
  'pill',
  'pillow',
  'pin',
  'pine',
  'pineapple',
  'pink',
  'pint',
  'pipe',
  'pistol',
  'pit',
  'pitch',
  'pitcher',
  'pity',
  'place',
  'plain',
  'plan',
  'plane',
  'plant',
  'plate',
  'platform',
  'platter',
  'play',
  'player',
  'playground',
  'playhouse',
  'playmate',
  'plaything',
  'pleasant',
  'please',
  'pleasure',
  'plenty',
  'plow',
  'plug',
  'plum',
  'pocket',
  'pocketbook',
  'poem',
  'point',
  'poison',
  'poke',
  'pole',
  'police',
  'policeman',
  'polish',
  'polite',
  'pond',
  'ponies',
  'pony',
  'pool',
  'poor',
  'pop',
  'popcorn',
  'popped',
  'porch',
  'pork',
  'possible',
  'post',
  'postage',
  'postman',
  'pot',
  'potato',
  'potatoes',
  'pound',
  'pour',
  'powder',
  'power',
  'powerful',
  'praise',
  'pray',
  'prayer',
  'prepare',
  'present',
  'pretty',
  'price',
  'prick',
  'prince',
  'princess',
  'print',
  'prison',
  'prize',
  'promise',
  'proper',
  'protect',
  'proud',
  'prove',
  'prune',
  'public',
  'puddle',
  'puff',
  'pull',
  'pump',
  'pumpkin',
  'punch',
  'punish',
  'pup',
  'pupil',
  'puppy',
  'pure',
  'purple',
  'purse',
  'push',
  'puss',
  'pussy',
  'pussycat',
  'put',
  'putting',
  'puzzle',
  'quack',
  'quart',
  'quarter',
  'queen',
  'queer',
  'question',
  'quick',
  'quickly',
  'quiet',
  'quilt',
  'quit',
  'quite',
  'rabbit',
  'race',
  'rack',
  'radio',
  'radish',
  'rag',
  'rail',
  'railroad',
  'railway',
  'rain',
  'rainbow',
  'rainy',
  'raise',
  'raisin',
  'rake',
  'ram',
  'ran',
  'ranch',
  'rang',
  'rap',
  'rapidly',
  'rat',
  'rate',
  'rather',
  'rattle',
  'raw',
  'ray',
  'reach',
  'read',
  'reader',
  'reading',
  'ready',
  'real',
  'really',
  'reap',
  'rear',
  'reason',
  'rebuild',
  'receive',
  'recess',
  'record',
  'red',
  'redbird',
  'redbreast',
  'refuse',
  'reindeer',
  'rejoice',
  'remain',
  'remember',
  'remind',
  'remove',
  'rent',
  'repair',
  'repay',
  'repeat',
  'report',
  'rest',
  'return',
  'review',
  'reward',
  'rib',
  'ribbon',
  'rice',
  'rich',
  'rid',
  'riddle',
  'ride',
  'rider',
  'riding',
  'right',
  'rim',
  'ring',
  'rip',
  'ripe',
  'rise',
  'rising',
  'river',
  'road',
  'roadside',
  'roar',
  'roast',
  'rob',
  'robber',
  'robe',
  'robin',
  'rock',
  'rocket',
  'rocky',
  'rode',
  'roll',
  'roller',
  'roof',
  'room',
  'rooster',
  'root',
  'rope',
  'rose',
  'rosebud',
  'rot',
  'rotten',
  'rough',
  'round',
  'route',
  'row',
  'rowboat',
  'royal',
  'rub',
  'rubbed',
  'rubber',
  'rubbish',
  'rug',
  'rule',
  'ruler',
  'rumble',
  'run',
  'rung',
  'runner',
  'running',
  'rush',
  'rust',
  'rusty',
  'rye',
  'sack',
  'sad',
  'saddle',
  'sadness',
  'safe',
  'safety',
  'said',
  'sail',
  'sailboat',
  'sailor',
  'saint',
  'salad',
  'sale',
  'salt',
  'same',
  'sand',
  'sandwich',
  'sandy',
  'sang',
  'sank',
  'sap',
  'sash',
  'sat',
  'satin',
  'satisfactory',
  'saturday',
  'sausage',
  'savage',
  'save',
  'savings',
  'saw',
  'say',
  'scab',
  'scales',
  'scare',
  'scarf',
  'school',
  'schoolboy',
  'schoolhouse',
  'schoolmaster',
  'schoolroom',
  'scorch',
  'score',
  'scrap',
  'scrape',
  'scratch',
  'scream',
  'screen',
  'screw',
  'scrub',
  'sea',
  'seal',
  'seam',
  'search',
  'season',
  'seat',
  'second',
  'secret',
  'see',
  'seed',
  'seeing',
  'seek',
  'seem',
  'seen',
  'seesaw',
  'select',
  'self',
  'selfish',
  'sell',
  'send',
  'sense',
  'sent',
  'sentence',
  'separate',
  'september',
  'servant',
  'serve',
  'service',
  'set',
  'setting',
  'settle',
  'settlement',
  'seven',
  'seventeen',
  'seventh',
  'seventy',
  'several',
  'sew',
  'shade',
  'shadow',
  'shady',
  'shake',
  'shaker',
  'shaking',
  'shall',
  'shame',
  "shan't",
  'shape',
  'share',
  'sharp',
  'shave',
  'she',
  "she'd",
  "she'll",
  "she's",
  'shear',
  'shears',
  'shed',
  'sheep',
  'sheet',
  'shelf',
  'shell',
  'shepherd',
  'shine',
  'shining',
  'shiny',
  'ship',
  'shirt',
  'shock',
  'shoe',
  'shoemaker',
  'shone',
  'shook',
  'shoot',
  'shop',
  'shopping',
  'shore',
  'short',
  'shot',
  'should',
  'shoulder',
  "shouldn't",
  'shout',
  'shovel',
  'show',
  'shower',
  'shut',
  'shy',
  'sick',
  'sickness',
  'side',
  'sidewalk',
  'sideways',
  'sigh',
  'sight',
  'sign',
  'silence',
  'silent',
  'silk',
  'sill',
  'silly',
  'silver',
  'simple',
  'sin',
  'since',
  'sing',
  'singer',
  'single',
  'sink',
  'sip',
  'sir',
  'sis',
  'sissy',
  'sister',
  'sit',
  'sitting',
  'six',
  'sixteen',
  'sixth',
  'sixty',
  'size',
  'skate',
  'skater',
  'ski',
  'skin',
  'skip',
  'skirt',
  'sky',
  'slam',
  'slap',
  'slate',
  'slave',
  'sled',
  'sleep',
  'sleepy',
  'sleeve',
  'sleigh',
  'slept',
  'slice',
  'slid',
  'slide',
  'sling',
  'slip',
  'slipped',
  'slipper',
  'slippery',
  'slit',
  'slow',
  'slowly',
  'sly',
  'smack',
  'small',
  'smart',
  'smell',
  'smile',
  'smoke',
  'smooth',
  'snail',
  'snake',
  'snap',
  'snapping',
  'sneeze',
  'snow',
  'snowball',
  'snowflake',
  'snowy',
  'snuff',
  'snug',
  'so',
  'soak',
  'soap',
  'sob',
  'socks',
  'sod',
  'soda',
  'sofa',
  'soft',
  'soil',
  'sold',
  'soldier',
  'sole',
  'some',
  'somebody',
  'somehow',
  'someone',
  'something',
  'sometime',
  'sometimes',
  'somewhere',
  'son',
  'song',
  'soon',
  'sore',
  'sorrow',
  'sorry',
  'sort',
  'soul',
  'sound',
  'soup',
  'sour',
  'south',
  'southern',
  'space',
  'spade',
  'spank',
  'sparrow',
  'speak',
  'speaker',
  'spear',
  'speech',
  'speed',
  'spell',
  'spelling',
  'spend',
  'spent',
  'spider',
  'spike',
  'spill',
  'spin',
  'spinach',
  'spirit',
  'spit',
  'splash',
  'spoil',
  'spoke',
  'spook',
  'spoon',
  'sport',
  'spot',
  'spread',
  'spring',
  'springtime',
  'sprinkle',
  'square',
  'squash',
  'squeak',
  'squeeze',
  'squirrel',
  'stable',
  'stack',
  'stage',
  'stair',
  'stall',
  'stamp',
  'stand',
  'star',
  'stare',
  'start',
  'starve',
  'state',
  'states',
  'station',
  'stay',
  'steak',
  'steal',
  'steam',
  'steamboat',
  'steamer',
  'steel',
  'steep',
  'steeple',
  'steer',
  'stem',
  'step',
  'stepping',
  'stick',
  'sticky',
  'stiff',
  'still',
  'stillness',
  'sting',
  'stir',
  'stitch',
  'stock',
  'stocking',
  'stole',
  'stone',
  'stood',
  'stool',
  'stoop',
  'stop',
  'stopped',
  'stopping',
  'store',
  'stories',
  'stork',
  'storm',
  'stormy',
  'story',
  'stove',
  'straight',
  'strange',
  'stranger',
  'strap',
  'straw',
  'strawberry',
  'stream',
  'street',
  'stretch',
  'string',
  'strip',
  'stripes',
  'strong',
  'stuck',
  'study',
  'stuff',
  'stump',
  'stung',
  'subject',
  'such',
  'suck',
  'sudden',
  'suffer',
  'sugar',
  'suit',
  'sum',
  'summer',
  'sun',
  'sunday',
  'sunflower',
  'sung',
  'sunk',
  'sunlight',
  'sunny',
  'sunrise',
  'sunset',
  'sunshine',
  'supper',
  'suppose',
  'sure',
  'surely',
  'surface',
  'surprise',
  'swallow',
  'swam',
  'swamp',
  'swan',
  'swat',
  'swear',
  'sweat',
  'sweater',
  'sweep',
  'sweet',
  'sweetheart',
  'sweetness',
  'swell',
  'swept',
  'swift',
  'swim',
  'swimming',
  'swing',
  'switch',
  'sword',
  'swore',
  'table',
  'tablecloth',
  'tablespoon',
  'tablet',
  'tack',
  'tag',
  'tail',
  'tailor',
  'take',
  'taken',
  'taking',
  'tale',
  'talk',
  'talker',
  'tall',
  'tame',
  'tan',
  'tank',
  'tap',
  'tape',
  'tar',
  'tardy',
  'task',
  'taste',
  'taught',
  'tax',
  'tea',
  'teach',
  'teacher',
  'team',
  'tear',
  'tease',
  'teaspoon',
  'teeth',
  'telephone',
  'tell',
  'temper',
  'ten',
  'tennis',
  'tent',
  'term',
  'terrible',
  'test',
  'than',
  'thank',
  'thankful',
  'thanks',
  'thanksgiving',
  'that',
  "that's",
  'the',
  'theater',
  'thee',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  "they'd",
  "they'll",
  "they're",
  "they've",
  'thick',
  'thief',
  'thimble',
  'thin',
  'thing',
  'think',
  'third',
  'thirsty',
  'thirteen',
  'thirty',
  'this',
  'thorn',
  'those',
  'though',
  'thought',
  'thousand',
  'thread',
  'three',
  'threw',
  'throat',
  'throne',
  'through',
  'throw',
  'thrown',
  'thumb',
  'thunder',
  'thursday',
  'thy',
  'tick',
  'ticket',
  'tickle',
  'tie',
  'tiger',
  'tight',
  'till',
  'time',
  'tin',
  'tinkle',
  'tiny',
  'tip',
  'tiptoe',
  'tire',
  'tired',
  'title',
  'to',
  'toad',
  'toadstool',
  'toast',
  'tobacco',
  'today',
  'toe',
  'together',
  'toilet',
  'told',
  'tomato',
  'tomorrow',
  'ton',
  'tone',
  'tongue',
  'tonight',
  'too',
  'took',
  'tool',
  'toot',
  'tooth',
  'toothbrush',
  'toothpick',
  'top',
  'tore',
  'torn',
  'toss',
  'touch',
  'tow',
  'toward',
  'towards',
  'towel',
  'tower',
  'town',
  'toy',
  'trace',
  'track',
  'trade',
  'train',
  'tramp',
  'trap',
  'tray',
  'treasure',
  'treat',
  'tree',
  'trick',
  'tricycle',
  'tried',
  'trim',
  'trip',
  'trolley',
  'trouble',
  'truck',
  'true',
  'truly',
  'trunk',
  'trust',
  'truth',
  'try',
  'tub',
  'tuesday',
  'tug',
  'tulip',
  'tumble',
  'tune',
  'tunnel',
  'turkey',
  'turn',
  'turtle',
  'twelve',
  'twenty',
  'twice',
  'twig',
  'twin',
  'two',
  'ugly',
  'umbrella',
  'uncle',
  'under',
  'understand',
  'underwear',
  'undress',
  'unfair',
  'unfinished',
  'unfold',
  'unfriendly',
  'unhappy',
  'unhurt',
  'uniform',
  'united',
  'unkind',
  'unknown',
  'unless',
  'unpleasant',
  'until',
  'unwilling',
  'up',
  'upon',
  'upper',
  'upset',
  'upside',
  'upstairs',
  'uptown',
  'upward',
  'us',
  'use',
  'used',
  'useful',
  'valentine',
  'valley',
  'valuable',
  'value',
  'vase',
  'vegetable',
  'velvet',
  'very',
  'vessel',
  'victory',
  'view',
  'village',
  'vine',
  'violet',
  'visit',
  'visitor',
  'voice',
  'vote',
  'wag',
  'wagon',
  'waist',
  'wait',
  'wake',
  'waken',
  'walk',
  'wall',
  'walnut',
  'want',
  'war',
  'warm',
  'warn',
  'was',
  'wash',
  'washer',
  'washtub',
  "wasn't",
  'waste',
  'watch',
  'watchman',
  'water',
  'watermelon',
  'waterproof',
  'wave',
  'wax',
  'way',
  'wayside',
  'we',
  "we'd",
  "we'll",
  "we're",
  "we've",
  'weak',
  'weaken',
  'weakness',
  'wealth',
  'weapon',
  'wear',
  'weary',
  'weather',
  'weave',
  'web',
  'wedding',
  'wednesday',
  'wee',
  'weed',
  'week',
  'weep',
  'weigh',
  'welcome',
  'well',
  'went',
  'were',
  'west',
  'western',
  'wet',
  'whale',
  'what',
  "what's",
  'wheat',
  'wheel',
  'when',
  'whenever',
  'where',
  'which',
  'while',
  'whip',
  'whipped',
  'whirl',
  'whiskey',
  'whisky',
  'whisper',
  'whistle',
  'white',
  'who',
  "who'd",
  "who'll",
  "who's",
  'whole',
  'whom',
  'whose',
  'why',
  'wicked',
  'wide',
  'wife',
  'wiggle',
  'wild',
  'wildcat',
  'will',
  'willing',
  'willow',
  'win',
  'wind',
  'windmill',
  'window',
  'windy',
  'wine',
  'wing',
  'wink',
  'winner',
  'winter',
  'wipe',
  'wire',
  'wise',
  'wish',
  'wit',
  'witch',
  'with',
  'without',
  'woke',
  'wolf',
  'woman',
  'women',
  'won',
  "won't",
  'wonder',
  'wonderful',
  'wood',
  'wooden',
  'woodpecker',
  'woods',
  'wool',
  'woolen',
  'word',
  'wore',
  'work',
  'worker',
  'workman',
  'world',
  'worm',
  'worn',
  'worry',
  'worse',
  'worst',
  'worth',
  'would',
  "wouldn't",
  'wound',
  'wove',
  'wrap',
  'wrapped',
  'wreck',
  'wren',
  'wring',
  'write',
  'writing',
  'written',
  'wrong',
  'wrote',
  'wrung',
  'yard',
  'yarn',
  'year',
  'yell',
  'yellow',
  'yes',
  'yesterday',
  'yet',
  'yolk',
  'yonder',
  'you',
  "you'd",
  "you'll",
  "you're",
  "you've",
  'young',
  'youngster',
  'your',
  'yours',
  'yourself',
  'yourselves',
  'youth'
]


/***/ }),

/***/ "./node_modules/fillers/index.js":
/*!***************************************!*\
  !*** ./node_modules/fillers/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillers": function() { return /* binding */ fillers; }
/* harmony export */ });
var fillers = [
  'absolutely',
  'actual',
  'actually',
  'amazing',
  'anyway',
  'apparently',
  'approximately',
  'badly',
  'basically',
  'begin',
  'certainly',
  'clearly',
  'completely',
  'definitely',
  'easily',
  'effectively',
  'entirely',
  'especially',
  'essentially',
  'exactly',
  'extremely',
  'fairly',
  'frankly',
  'frequently',
  'fully',
  'generally',
  'hardly',
  'heavily',
  'highly',
  'hopefully',
  'just',
  'largely',
  'like',
  'literally',
  'maybe',
  'might',
  'most',
  'mostly',
  'much',
  'necessarily',
  'nicely',
  'obviously',
  'ok',
  'okay',
  'particularly',
  'perhaps',
  'possibly',
  'practically',
  'precisely',
  'primarily',
  'probably',
  'quite',
  'rather',
  'real',
  'really',
  'relatively',
  'right',
  'seriously',
  'significantly',
  'simply',
  'slightly',
  'so',
  'specifically',
  'start',
  'strongly',
  'stuff',
  'surely',
  'things',
  'too',
  'totally',
  'truly',
  'try',
  'typically',
  'ultimately',
  'usually',
  'very',
  'virtually',
  'well',
  'whatever',
  'whenever',
  'wherever',
  'whoever',
  'widely'
]


/***/ }),

/***/ "./node_modules/flesch/index.js":
/*!**************************************!*\
  !*** ./node_modules/flesch/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flesch": function() { return /* binding */ flesch; }
/* harmony export */ });
var sentenceWeight = 1.015
var wordWeight = 84.6
var base = 206.835

/**
 * @typedef {Object.<string, number>} FleschCounts
 * @property {number} sentence
 * @property {number} word
 * @property {number} syllable
 */

/**
 * Given an object containing the number of words (`word`), the number of sentences (`sentence`), and the number of syllables  (`syllable`) in a document, returns the reading ease associated with the document.
 *
 * Returned values are 120 (every sentence consisting of only two one-syllable words), or lower (including negative values).
 *
 * The values have the following semantics:
 *
 * |     Score    | Semantics                                           |
 * | :----------: | :-------------------------------------------------- |
 * | 90.0 – 100.0 | Easily understood by an average 11-year-old student |
 * |  60.0 – 70.0 | Easily understood by 13- to 15-year-old students    |
 * |  0.0 – 30.0  | Best understood by university graduates             |
 *
 * Therefore we can use the following formula to approximate the average age a student would understand a document at, given score `score`:
 *
 * ```js
 * var age = 20 - Math.floor(score / 10)
 * ```
 *
 * @param {FleschCounts} counts
 * @returns {number}
 */
function flesch(counts) {
  if (!counts || !counts.sentence || !counts.word || !counts.syllable) {
    return Number.NaN
  }

  return (
    base -
    sentenceWeight * (counts.word / counts.sentence) -
    wordWeight * (counts.syllable / counts.word)
  )
}


/***/ }),

/***/ "./node_modules/gunning-fog/index.js":
/*!*******************************************!*\
  !*** ./node_modules/gunning-fog/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gunningFog": function() { return /* binding */ gunningFog; }
/* harmony export */ });
var complexWordWeight = 100
var weight = 0.4

/**
 * @typedef {Object.<string, number>} GunningFogCounts
 * @property {number} sentence
 * @property {number} word
 */

/**
 * Given an object containing the number of words (`word`), the number of sentences (`sentence`), and the number of complex (excluding jargon, proper nouns, compound words) polysillabic (three or more syllables) words (`complexPolysillabicWord`) in a document, returns the grade level associated with the document.
 *
 * @param {GunningFogCounts} counts
 * @returns {number}
 */
function gunningFog(counts) {
  if (!counts || !counts.sentence || !counts.word) {
    return Number.NaN
  }

  return (
    weight *
    (counts.word / counts.sentence +
      complexWordWeight * ((counts.complexPolysillabicWord || 0) / counts.word))
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

/***/ "./node_modules/match-casing/index.js":
/*!********************************************!*\
  !*** ./node_modules/match-casing/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matchCasing": function() { return /* binding */ matchCasing; }
/* harmony export */ });
/**
 * Transform the case in `value` (`string`) to match that of `base` (`string`).
 *
 * @param {string} value
 * @param {string} base
 * @returns {string}
 */
function matchCasing(value, base) {
  let index = -1
  let cap = false

  if (base.toUpperCase() === base) {
    return value.toUpperCase()
  }

  if (base.toLowerCase() === base) {
    return value.toLowerCase()
  }

  while (++index < base.length) {
    const char = base.charAt(index)

    if (char.toUpperCase() !== char.toLowerCase()) {
      const rest = base.slice(index + 1)
      cap = char === char.toUpperCase() && rest === rest.toLowerCase()
      break
    }
  }

  if (cap) {
    index = -1

    while (++index < value.length) {
      const char = value.charAt(index).toUpperCase()

      if (char !== char.toLowerCase()) {
        return (
          value.slice(0, index) + char + value.slice(index + 1).toLowerCase()
        )
      }
    }
  }

  return value
}


/***/ }),

/***/ "./node_modules/mdast-comment-marker/index.js":
/*!****************************************************!*\
  !*** ./node_modules/mdast-comment-marker/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commentMarker": function() { return /* binding */ commentMarker; }
/* harmony export */ });
/**
 * @typedef {string|number|boolean} MarkerParameterValue
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Content} Content
 * @typedef {import('mdast').HTML} HTML
 * @typedef {import('mdast-util-mdx-expression').MDXFlowExpression} MDXFlowExpression
 * @typedef {import('mdast-util-mdx-expression').MDXTextExpression} MDXTextExpression
 * @typedef {Root|Content} Node
 * @typedef {Object.<string, MarkerParameterValue>} MarkerParameters
 *
 * @typedef Mdx1CommentNode
 * @property {'comment'} type
 * @property {string} value
 *
 * @typedef Marker
 * @property {string} name
 * @property {string} attributes
 * @property {MarkerParameters|null} parameters
 * @property {HTML|Mdx1CommentNode|MDXFlowExpression|MDXTextExpression} node
 */

const commentExpression = /\s*([a-zA-Z\d-]+)(\s+([\s\S]*))?\s*/
const esCommentExpression = new RegExp(
  '(\\s*\\/\\*' + commentExpression.source + '\\*\\/\\s*)'
)
const markerExpression = new RegExp(
  '(\\s*<!--' + commentExpression.source + '-->\\s*)'
)

/**
 * Parse a comment marker.
 * @param {unknown} value
 * @returns {Marker|null}
 */
function commentMarker(value) {
  if (
    isNode(value) &&
    (value.type === 'html' ||
      // @ts-expect-error: MDX@1
      value.type === 'comment' ||
      value.type === 'mdxFlowExpression' ||
      value.type === 'mdxTextExpression')
  ) {
    let offset = 2
    /** @type {RegExpMatchArray|null|undefined} */
    let match

    // @ts-expect-error: MDX@1
    if (value.type === 'comment') {
      // @ts-expect-error: MDX@1
      match = value.value.match(commentExpression)
      offset = 1
    } else if (value.type === 'html') {
      match = value.value.match(markerExpression)
    } else if (
      value.type === 'mdxFlowExpression' ||
      value.type === 'mdxTextExpression'
    ) {
      match = value.value.match(esCommentExpression)
    }

    if (match && match[0].length === value.value.length) {
      const parameters = parseParameters(match[offset + 1] || '')

      if (parameters) {
        return {
          name: match[offset],
          attributes: (match[offset + 2] || '').trim(),
          parameters,
          node: value
        }
      }
    }
  }

  return null
}

/**
 * Parse `value` into an object.
 *
 * @param {string} value
 * @returns {MarkerParameters|null}
 */
function parseParameters(value) {
  /** @type {MarkerParameters} */
  const parameters = {}

  return value
    .replace(
      /\s+([-\w]+)(?:=(?:"((?:\\[\s\S]|[^"])+)"|'((?:\\[\s\S]|[^'])+)'|((?:\\[\s\S]|[^"'\s])+)))?/gi,
      replacer
    )
    .replace(/\s+/g, '')
    ? null
    : parameters

  /**
   * @param {string} _
   * @param {string} $1
   * @param {string} $2
   * @param {string} $3
   * @param {string} $4
   */
  // eslint-disable-next-line max-params
  function replacer(_, $1, $2, $3, $4) {
    /** @type {MarkerParameterValue} */
    let value = $2 || $3 || $4 || ''

    if (value === 'true' || value === '') {
      value = true
    } else if (value === 'false') {
      value = false
    } else if (!Number.isNaN(Number(value))) {
      value = Number(value)
    }

    parameters[$1] = value

    return ''
  }
}

/**
 * @param {unknown} value
 * @returns {value is Node}
 */
function isNode(value) {
  return Boolean(value && typeof value === 'object' && 'type' in value)
}


/***/ }),

/***/ "./node_modules/nlcst-is-literal/index.js":
/*!************************************************!*\
  !*** ./node_modules/nlcst-is-literal/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isLiteral": function() { return /* binding */ isLiteral; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/**
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Content} Content
 * @typedef {Root|Content} Node
 * @typedef {Extract<Node, UnistParent>} Parent
 */



const single = [
  '-', // Hyphen-minus
  '–', // En dash
  '—', // Em dash
  ':', // Colon
  ';' // Semi-colon
]

/**
 * Pair delimiters.
 * From common sense, and WikiPedia:
 * <https://en.wikipedia.org/wiki/Quotation_mark>.
 *
 * @type {Record<string, string[]>}
 */
const pairs = {
  ',': [','],
  '-': ['-'],
  '–': ['–'],
  '—': ['—'],
  '"': ['"'],
  "'": ["'"],
  '‘': ['’'],
  '‚': ['’'],
  '’': ['’', '‚'],
  '“': ['”'],
  '”': ['”'],
  '„': ['”', '“'],
  '«': ['»'],
  '»': ['«'],
  '‹': ['›'],
  '›': ['‹'],
  '(': [')'],
  '[': [']'],
  '{': ['}'],
  '⟨': ['⟩'],
  '「': ['」']
}

const open = Object.keys(pairs)

/**
 * Check if the node in `parent` at `position` is enclosed by matching
 * delimiters.
 *
 * @param {Parent} parent
 * @param {number} index
 * @returns {boolean}
 */
function isLiteral(parent, index) {
  if (!(parent && parent.children)) {
    throw new Error('Parent must be a node')
  }

  if (index !== null && typeof index === 'object' && 'type' in index) {
    index = parent.children.indexOf(index)

    if (index === -1) {
      throw new Error('Node must be a child of `parent`')
    }
  }

  if (typeof index !== 'number' || Number.isNaN(index)) {
    throw new TypeError('Index must be a number')
  }

  return Boolean(
    (!containsWord(parent, -1, index) &&
      siblingDelimiter(parent, index, 1, single)) ||
      (!containsWord(parent, index, parent.children.length) &&
        siblingDelimiter(parent, index, -1, single)) ||
      isWrapped(parent, index)
  )
}

/**
 * Check if the node in `parent` at `position` is enclosed by matching
 * delimiters.
 * @param {Parent} parent
 * @param {number} position
 * @returns {Node|void}
 */
function isWrapped(parent, position) {
  const previous = siblingDelimiter(parent, position, -1, open)

  if (previous) {
    return siblingDelimiter(parent, position, 1, pairs[(0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__.toString)(previous)])
  }
}

/**
 * Find the previous or next delimiter before or after `position` in `parent`.
 * Returns the delimiter node when found.
 *
 * @param {Parent} parent
 * @param {number} position
 * @param {number} step
 * @param {Array.<string>} delimiters
 * @returns {Node|void}
 */
function siblingDelimiter(parent, position, step, delimiters) {
  let index = position + step

  while (index > -1 && index < parent.children.length) {
    const sibling = parent.children[index]

    if (sibling.type === 'WordNode' || sibling.type === 'SourceNode') {
      return
    }

    if (sibling.type !== 'WhiteSpaceNode') {
      return delimiters.includes((0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__.toString)(sibling)) ? sibling : undefined
    }

    index += step
  }
}

/**
 * Check if parent contains word-nodes between `start` and `end` (both
 * excluding).
 * @param {Parent} parent
 * @param {number} start
 * @param {number} end
 * @returns {boolean|void}
 */
function containsWord(parent, start, end) {
  while (++start < end) {
    if (parent.children[start].type === 'WordNode') {
      return true
    }
  }
}


/***/ }),

/***/ "./node_modules/nlcst-normalize/index.js":
/*!***********************************************!*\
  !*** ./node_modules/nlcst-normalize/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalize": function() { return /* binding */ normalize; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Content} Content
 * @typedef {Root|Content} Node
 *
 * @typedef {Object} NormalizeOptions
 * @property {boolean} [allowDashes=false]
 * @property {boolean} [allowApostrophes=false]
 */



/**
 * @param {string|Node|Array.<Content>} node
 * @param {NormalizeOptions} [options={}]
 */
function normalize(node, options) {
  let value = (typeof node === 'string' ? node : (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__.toString)(node))
    .toLowerCase()
    .replace(/’/g, "'")

  if (!options || !options.allowDashes) {
    value = value.replace(/-/g, '')
  }

  if (!options || !options.allowApostrophes) {
    value = value.replace(/'/g, '')
  }

  return value
}


/***/ }),

/***/ "./node_modules/nlcst-search/index.js":
/*!********************************************!*\
  !*** ./node_modules/nlcst-search/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "search": function() { return /* binding */ search; }
/* harmony export */ });
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var nlcst_normalize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nlcst-normalize */ "./node_modules/nlcst-normalize/index.js");
/* harmony import */ var nlcst_is_literal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-is-literal */ "./node_modules/nlcst-is-literal/index.js");
/**
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Word} Word
 * @typedef {import('nlcst').Content} Content
 * @typedef {Root|Content} Node
 * @typedef {Extract<Node, UnistParent>} Parent
 * @typedef {import('nlcst-normalize').NormalizeOptions} NormalizeOptions
 *
 * @typedef {boolean} AllowApostrophes
 * @typedef {NormalizeOptions & {allowLiterals?: boolean}} SearchOptions
 *
 * @typedef {Array.<string>} PhrasesList
 * @typedef {Object.<string, unknown>} PhrasesMap
 *
 * @typedef {(nodes: Content[], index: number, parent: Parent, pattern: string) => void} Handler
 */





const own = {}.hasOwnProperty

/**
 * @param {Node} tree
 * @param {PhrasesList|PhrasesMap} phrases
 * @param {Handler} handler
 * @param {AllowApostrophes|SearchOptions} [options=false]
 */
function search(tree, phrases, handler, options) {
  /** @type {Object.<string, Array.<string>>} */
  const byWord = {'*': []}
  let index = -1
  /** @type {string} */
  let key
  /** @type {SearchOptions} */
  let config

  if (typeof options === 'boolean') {
    config = options ? {allowApostrophes: true} : {}
  } else {
    config = options || {}
  }

  if (!tree || !tree.type) {
    throw new Error('Expected node')
  }

  if (typeof phrases !== 'object') {
    throw new TypeError('Expected object for phrases')
  }

  if (Array.isArray(phrases)) {
    while (++index < phrases.length) {
      handlePhrase(phrases[index])
    }
  } else {
    for (key in phrases) {
      if (own.call(phrases, key)) {
        handlePhrase(key)
      }
    }
  }

  // Search the tree.
  (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(tree, 'WordNode', (node, position, parent_) => {
    const parent = /** @type {Parent} */ (parent_)

    if (
      !parent ||
      position === null ||
      (!config.allowLiterals && (0,nlcst_is_literal__WEBPACK_IMPORTED_MODULE_1__.isLiteral)(parent, position))
    ) {
      return
    }

    const word = (0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_2__.normalize)(node, config)
    const phrases = byWord['*'].concat(
      own.call(byWord, word) ? byWord[word] : []
    )
    let index = -1

    while (++index < phrases.length) {
      const result = test(phrases[index], position, parent)

      if (result) {
        handler(result, position, parent, phrases[index])
      }
    }
  })

  /**
   * Test a phrase.
   *
   * @param {string} phrase
   * @param {number} position
   * @param {Parent} parent
   */
  function test(phrase, position, parent) {
    const siblings = parent.children
    const start = position
    const expressions = phrase.split(' ').slice(1)
    let index = -1

    // Move one position forward.
    position++

    // Iterate over `expressions`.
    while (++index < expressions.length) {
      // Allow joining white-space.
      while (position < siblings.length) {
        if (siblings[position].type !== 'WhiteSpaceNode') break
        position++
      }

      // Exit if there are no nodes left, if the current node is not a word, or
      // if the current word does not match the search for value.
      if (
        !siblings[position] ||
        siblings[position].type !== 'WordNode' ||
        (expressions[index] !== '*' &&
          (0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_2__.normalize)(expressions[index], config) !==
            (0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_2__.normalize)(siblings[position], config))
      ) {
        return
      }

      position++
    }

    return siblings.slice(start, position)
  }

  /**
   * Handle a phrase.
   *
   * @param {string} phrase
   */
  function handlePhrase(phrase) {
    const firstWord = (0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_2__.normalize)(phrase.split(' ', 1)[0], config)

    if (own.call(byWord, firstWord)) {
      byWord[firstWord].push(phrase)
    } else {
      byWord[firstWord] = [phrase]
    }
  }
}


/***/ }),

/***/ "./node_modules/nlcst-to-string/index.js":
/*!***********************************************!*\
  !*** ./node_modules/nlcst-to-string/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toString": function() { return /* binding */ toString; }
/* harmony export */ });
/**
 * @typedef {import('nlcst').Content} Content
 * @typedef {import('nlcst').Root} Root
 */

/**
 * Stringify one nlcst node or list of nodes.
 *
 * @param {Root|Content|Content[]} node
 * @param {string} [separator='']
 * @returns {string}
 */
function toString(node, separator = '') {
  let index = -1

  if (!node || (!Array.isArray(node) && !node.type)) {
    throw new Error('Expected node, not `' + node + '`')
  }

  // @ts-expect-error Looks like a literal.
  if (typeof node.value === 'string') return node.value

  /** @type {Array.<Content|Root>} */
  // @ts-expect-error Looks like a list of nodes or parent.
  const children = (Array.isArray(node) ? node : node.children) || []

  // Shortcut: This is pretty common, and a small performance win.
  if (children.length === 1 && 'value' in children[0]) {
    return children[0].value
  }

  /** @type {Array.<string>} */
  const values = []

  while (++index < children.length) {
    values[index] = toString(children[index], separator)
  }

  return values.join(separator)
}


/***/ }),

/***/ "./node_modules/parse-english/index.js":
/*!*********************************************!*\
  !*** ./node_modules/parse-english/index.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParseEnglish": function() { return /* binding */ ParseEnglish; }
/* harmony export */ });
/* harmony import */ var parse_latin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! parse-latin */ "./node_modules/parse-latin/lib/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-english/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_visit_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-visit-children */ "./node_modules/unist-util-visit-children/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");





// Transform English natural language into an NLCST-tree.
class ParseEnglish extends parse_latin__WEBPACK_IMPORTED_MODULE_3__.ParseLatin {}

// Add modifiers to `parser`.
ParseEnglish.prototype.tokenizeSentencePlugins = [
  unist_util_visit_children__WEBPACK_IMPORTED_MODULE_1__(mergeEnglishElisionExceptions)
].concat(ParseEnglish.prototype.tokenizeSentencePlugins)

ParseEnglish.prototype.tokenizeParagraphPlugins = [
  unist_util_modify_children__WEBPACK_IMPORTED_MODULE_2__(mergeEnglishPrefixExceptions)
].concat(ParseEnglish.prototype.tokenizeParagraphPlugins)

// Match a blacklisted (case-insensitive) abbreviation which when followed by a
// full-stop does not depict a sentence terminal marker.
var abbreviations = new RegExp(
  '^(' +
    // Business Abbreviations: Incorporation, Limited company.
    'inc|ltd|' +
    // English unit abbreviations:
    // -   Note that *Metric abbreviations* do not use full stops.
    // -   Note that some common plurals are included, although units should not
    //     be pluralised.
    //
    // barrel, cubic, dozen, fluid (ounce), foot, gallon, grain, gross,
    // inch, karat / knot, pound, mile, ounce, pint, quart, square,
    // tablespoon, teaspoon, yard.
    'bbls?|cu|doz|fl|ft|gal|gr|gro|in|kt|lbs?|mi|oz|pt|qt|sq|tbsp|' +
    'tsp|yds?|' +
    // Abbreviations of time references:
    // seconds, minutes, hours, Monday, Tuesday, *, Wednesday, Thursday, *,
    // Friday, Saturday, Sunday, January, Februari, March, April, June, July,
    // August, September, *, October, November, December.
    'sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar|' +
    'apr|jun|jul|aug|sep|sept|oct|nov|dec' +
    ')$'
  // Note: There's no `i` flag here because the value to test against should be
  // all lowercase!
)

// Match a blacklisted (case-sensitive) abbreviation which when followed by a
// full-stop does not depict a sentence terminal marker.
var abbreviationsSensitive = new RegExp(
  '^(' +
    // Social:
    // Mister, Mistress, Mistress, woman, Mademoiselle, Madame, Monsieur,
    // Misters, Mesdames, Junior, Senior, *.
    'Mr|Mrs|Miss|Ms|Mss|Mses|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr|' +
    // Rank and academic:
    // Doctor, Magister, Attorney, Profesor, Honourable, Reverend, Father,
    // Monsignor, Sister, Brother, Saint, President, Superintendent,
    // Representative, Senator.
    'Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen|' +
    // Rank and military:
    // Governor, Ambassador, Treasurer, Secretary, Admiral, Brigadier, General,
    // Commander, Colonel, Captain, Lieutenant, Major, Sergeant, Petty Officer,
    // Warrant Officer, Purple Heart.
    'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph|' +
    // Common geographical abbreviations:
    // Avenue, Boulevard, Mountain, Road, Building, National, *, Route, *,
    // County, Park, Square, Drive, Port or Point, Street or State, Fort,
    // Peninsula, Territory, Highway, Freeway, Parkway.
    'Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St|' +
    'Ft|Pen|Terr|Hwy|Fwy|Pkwy|' +
    // American state abbreviations:
    // Alabama, Arizona, Arkansas, California, *, Colorado, *,
    // Connecticut, Delaware, Florida, Georgia, Idaho, *, Illinois, Indiana,
    // Iowa, Kansas, *, Kentucky, *, Louisiana, Maine, Maryland, Massachusetts,
    // Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, *, Nevada,
    // Mexico, Dakota, Oklahoma, *, Oregon, Pennsylvania, *, *, Tennessee,
    // Texas, Utah, Vermont, Virginia, Washington, Wisconsin, *, Wyoming.
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind|' +
    'Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb|' +
    'Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va|' +
    'Wash|Wis|Wisc|Wyo|' +
    // Canadian province abbreviations:
    // Alberta, Manitoba, Ontario, Quebec, *, Saskatchewan, Yukon Territory.
    'Alta|Man|Ont|Qu\u00E9|Que|Sask|Yuk|' +
    // English county abbreviations:
    // Bedfordshire, Berkshire, Buckinghamshire, Cambridgeshire, Cheshire,
    // Cornwall, Cumberland, Derbyshire, *, Devon, Dorset, Durham,
    // Gloucestershire, Hampshire, Herefordshire, *, Hertfordshire,
    // Huntingdonshire, Lancashire, Leicestershire, Lincolnshire, Middlesex,
    // *, *, Norfolk, Northamptonshire, Northumberland, *, Nottinghamshire,
    // Oxfordshire, Rutland, Shropshire, Somerset, Staffordshire, *, Suffolk,
    // Surrey, Sussex, *, Warwickshire, *, *, Westmorland, Wiltshire,
    // Worcestershire, Yorkshire.
    'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|' +
    'Glos|Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|' +
    'Norf|Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
    'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks' +
    ')$'
)

// Match a blacklisted word which when followed by an apostrophe depicts
// elision.
var elisionPrefix = new RegExp(
  '^(' +
    // Includes: - o' > of; - ol' > old.
    'o|ol' +
    ')$'
)

// Match a blacklisted word which when preceded by an apostrophe depicts
// elision.
var elisionAffix = new RegExp(
  '^(' +
    // Includes: 'im > him; 'er > her; 'em > them. 'cause > because.
    'im|er|em|cause|' +
    // Includes: 'twas > it was; 'tis > it is; 'twere > it were.
    'twas|tis|twere|' +
    // Matches groups of year, optionally followed by an `s`.
    '\\d\\ds?' +
    ')$'
)

// Match one apostrophe.
var apostrophe = /^['\u2019]$/

// Merge a sentence into its next sentence, when the sentence ends with a
// certain word.
function mergeEnglishPrefixExceptions(sentence, index, paragraph) {
  var children = sentence.children
  var period = children[children.length - 1]
  var word = children[children.length - 2]
  var value
  var next

  if (period && nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(period) === '.' && word && word.type === 'WordNode') {
    value = nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(word)

    if (
      abbreviations.test(lower(value)) ||
      abbreviationsSensitive.test(value)
    ) {
      // Merge period into abbreviation.
      word.children.push(period)
      children.pop()

      if (period.position && word.position) {
        word.position.end = period.position.end
      }

      // Merge sentences.
      next = paragraph.children[index + 1]

      if (next) {
        sentence.children = children.concat(next.children)

        paragraph.children.splice(index + 1, 1)

        // Update position.
        if (next.position && sentence.position) {
          sentence.position.end = next.position.end
        }

        // Next, iterate over the current node again.
        return index - 1
      }
    }
  }
}

// Merge an apostrophe depicting elision into its surrounding word.
function mergeEnglishElisionExceptions(child, index, sentence) {
  var siblings
  var sibling
  var other
  var length
  var value

  if (child.type !== 'PunctuationNode' && child.type !== 'SymbolNode') {
    return
  }

  siblings = sentence.children
  length = siblings.length
  value = nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(child)

  // Match abbreviation of `with`, `w/`
  if (value === '/') {
    sibling = siblings[index - 1]

    if (sibling && lower(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(sibling)) === 'w') {
      // Remove the slash from the sentence.
      siblings.splice(index, 1)

      // Append the slash into the children of the previous node.
      sibling.children.push(child)

      // Update position.
      if (sibling.position && child.position) {
        sibling.position.end = child.position.end
      }
    }
  } else if (apostrophe.test(value)) {
    // If two preceding (the first white space and the second a word), and one
    // following (white space) nodes exist...
    sibling = siblings[index - 1]

    if (
      index > 2 &&
      index < length - 1 &&
      sibling.type === 'WordNode' &&
      siblings[index - 2].type === 'WhiteSpaceNode' &&
      siblings[index + 1].type === 'WhiteSpaceNode' &&
      elisionPrefix.test(lower(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(sibling)))
    ) {
      // Remove the apostrophe from the sentence.
      siblings.splice(index, 1)

      // Append the apostrophe into the children of node.
      sibling.children.push(child)

      // Update position.
      if (sibling.position && child.position) {
        sibling.position.end = child.position.end
      }

      return
    }

    // If a following word exists, and the preceding node is not a word...
    if (
      index !== length - 1 &&
      siblings[index + 1].type === 'WordNode' &&
      (index === 0 || siblings[index - 1].type !== 'WordNode')
    ) {
      sibling = siblings[index + 1]
      value = lower(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(sibling))

      if (elisionAffix.test(value)) {
        // Remove the apostrophe from the sentence.
        siblings.splice(index, 1)

        // Prepend the apostrophe into the children of node.
        sibling.children = [child].concat(sibling.children)

        // Update position.
        if (sibling.position && child.position) {
          sibling.position.start = child.position.start
        }
        // If both preceded and followed by an apostrophe, and the word is
        // `n`...
      } else if (
        value === 'n' &&
        index < length - 2 &&
        apostrophe.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(siblings[index + 2]))
      ) {
        other = siblings[index + 2]

        // Remove the apostrophe from the sentence.
        siblings.splice(index, 1)
        siblings.splice(index + 1, 1)

        // Prepend the preceding apostrophe and append the into the following
        // apostrophe into the children of node.
        sibling.children = [child].concat(sibling.children, other)

        // Update position.
        if (sibling.position) {
          if (child.position) {
            sibling.position.start = child.position.start
          }

          if (other.position) {
            sibling.position.end = other.position.end
          }
        }
      }
    }
  }
}

function lower(value) {
  return value.toLowerCase()
}


/***/ }),

/***/ "./node_modules/parse-latin/lib/expressions.js":
/*!*****************************************************!*\
  !*** ./node_modules/parse-latin/lib/expressions.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "affixSymbol": function() { return /* binding */ affixSymbol; },
/* harmony export */   "newLine": function() { return /* binding */ newLine; },
/* harmony export */   "newLineMulti": function() { return /* binding */ newLineMulti; },
/* harmony export */   "terminalMarker": function() { return /* binding */ terminalMarker; },
/* harmony export */   "wordSymbolInner": function() { return /* binding */ wordSymbolInner; },
/* harmony export */   "numerical": function() { return /* binding */ numerical; },
/* harmony export */   "digitStart": function() { return /* binding */ digitStart; },
/* harmony export */   "lowerInitial": function() { return /* binding */ lowerInitial; },
/* harmony export */   "surrogates": function() { return /* binding */ surrogates; },
/* harmony export */   "punctuation": function() { return /* binding */ punctuation; },
/* harmony export */   "word": function() { return /* binding */ word; },
/* harmony export */   "whiteSpace": function() { return /* binding */ whiteSpace; }
/* harmony export */ });
// This module is generated by `script/build-expressions.js`.
var affixSymbol = /^([!"').?\u00BB\u0F3B\u0F3D\u169C\u2019\u201D\u2026\u203A\u203D\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63\]}])\1*$/
var newLine = /^[ \t]*((\r?\n|\r)[\t ]*)+$/
var newLineMulti = /^[ \t]*((\r?\n|\r)[\t ]*){2,}$/
var terminalMarker = /^([!.?\u2026\u203D]+)$/
var wordSymbolInner = /^([&'\-.:=?@\u00AD\u00B7\u2010\u2011\u2019\u2027]|_+)$/
var numerical = /^(?:[\d\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D58-\u0D5E\u0D66-\u0D78\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE48\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDD30-\uDD39\uDE60-\uDE7E\uDF1D-\uDF26\uDF51-\uDF54\uDFC5-\uDFCB]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2\uDD50-\uDD59]|\uD807[\uDC50-\uDC6C\uDD50-\uDD59\uDDA0-\uDDA9\uDFC0-\uDFD4]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD81B[\uDE80-\uDE96]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDFCE-\uDFFF]|\uD838[\uDD40-\uDD49\uDEF0-\uDEF9]|\uD83A[\uDCC7-\uDCCF\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9])+$/
var digitStart = /^\d/
var lowerInitial = /^(?:[a-z\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7BB\uA7BD\uA7BF\uA7C3\uA7C8\uA7CA\uA7F6\uA7FA\uAB30-\uAB5A\uAB60-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43])/
var surrogates = /[\uD800-\uDFFF]/
var punctuation = /[!"'-),-/:;?[-\]_{}\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u201F\u2022-\u2027\u2032-\u203A\u203C-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/
var word = /[\dA-Za-z\u00AA\u00B2\u00B3\u00B5\u00B9\u00BA\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u08D3-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D63\u0D66-\u0D78\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u17F0-\u17F9\u180B-\u180D\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1AC0\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u20D0-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA672\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA827\uA82C\uA830-\uA835\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE6\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD27\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC52-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF3B]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]|\uDB40[\uDD00-\uDDEF]/
var whiteSpace = /[\t-\r \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/


/***/ }),

/***/ "./node_modules/parse-latin/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/parse-latin/lib/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParseLatin": function() { return /* binding */ ParseLatin; }
/* harmony export */ });
/* harmony import */ var _plugin_merge_initial_word_symbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugin/merge-initial-word-symbol.js */ "./node_modules/parse-latin/lib/plugin/merge-initial-word-symbol.js");
/* harmony import */ var _plugin_merge_final_word_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugin/merge-final-word-symbol.js */ "./node_modules/parse-latin/lib/plugin/merge-final-word-symbol.js");
/* harmony import */ var _plugin_merge_inner_word_symbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plugin/merge-inner-word-symbol.js */ "./node_modules/parse-latin/lib/plugin/merge-inner-word-symbol.js");
/* harmony import */ var _plugin_merge_inner_word_slash_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plugin/merge-inner-word-slash.js */ "./node_modules/parse-latin/lib/plugin/merge-inner-word-slash.js");
/* harmony import */ var _plugin_merge_initialisms_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugin/merge-initialisms.js */ "./node_modules/parse-latin/lib/plugin/merge-initialisms.js");
/* harmony import */ var _plugin_merge_words_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plugin/merge-words.js */ "./node_modules/parse-latin/lib/plugin/merge-words.js");
/* harmony import */ var _plugin_patch_position_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plugin/patch-position.js */ "./node_modules/parse-latin/lib/plugin/patch-position.js");
/* harmony import */ var _plugin_merge_non_word_sentences_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plugin/merge-non-word-sentences.js */ "./node_modules/parse-latin/lib/plugin/merge-non-word-sentences.js");
/* harmony import */ var _plugin_merge_affix_symbol_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plugin/merge-affix-symbol.js */ "./node_modules/parse-latin/lib/plugin/merge-affix-symbol.js");
/* harmony import */ var _plugin_merge_initial_lower_case_letter_sentences_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plugin/merge-initial-lower-case-letter-sentences.js */ "./node_modules/parse-latin/lib/plugin/merge-initial-lower-case-letter-sentences.js");
/* harmony import */ var _plugin_merge_initial_digit_sentences_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./plugin/merge-initial-digit-sentences.js */ "./node_modules/parse-latin/lib/plugin/merge-initial-digit-sentences.js");
/* harmony import */ var _plugin_merge_prefix_exceptions_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./plugin/merge-prefix-exceptions.js */ "./node_modules/parse-latin/lib/plugin/merge-prefix-exceptions.js");
/* harmony import */ var _plugin_merge_affix_exceptions_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./plugin/merge-affix-exceptions.js */ "./node_modules/parse-latin/lib/plugin/merge-affix-exceptions.js");
/* harmony import */ var _plugin_merge_remaining_full_stops_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./plugin/merge-remaining-full-stops.js */ "./node_modules/parse-latin/lib/plugin/merge-remaining-full-stops.js");
/* harmony import */ var _plugin_make_initial_white_space_siblings_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./plugin/make-initial-white-space-siblings.js */ "./node_modules/parse-latin/lib/plugin/make-initial-white-space-siblings.js");
/* harmony import */ var _plugin_make_final_white_space_siblings_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./plugin/make-final-white-space-siblings.js */ "./node_modules/parse-latin/lib/plugin/make-final-white-space-siblings.js");
/* harmony import */ var _plugin_break_implicit_sentences_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./plugin/break-implicit-sentences.js */ "./node_modules/parse-latin/lib/plugin/break-implicit-sentences.js");
/* harmony import */ var _plugin_remove_empty_nodes_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./plugin/remove-empty-nodes.js */ "./node_modules/parse-latin/lib/plugin/remove-empty-nodes.js");
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser.js */ "./node_modules/parse-latin/lib/parser.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expressions.js */ "./node_modules/parse-latin/lib/expressions.js");





















// PARSE LATIN

// Transform Latin-script natural language into an NLCST-tree.
class ParseLatin {
  constructor(doc, file) {
    var value = file || doc
    this.doc = value ? String(value) : null
  }

  // Run transform plugins for `key` on `nodes`.
  run(key, nodes) {
    var wareKey = key + 'Plugins'
    var plugins = this[wareKey]
    var index = -1

    if (plugins) {
      while (plugins[++index]) {
        plugins[index](nodes)
      }
    }

    return nodes
  }

  // Easy access to the document parser. This additionally supports retext-style
  // invocation: where an instance is created for each file, and the file is given
  // on construction.
  parse(value) {
    return this.tokenizeRoot(value || this.doc)
  }

  // Transform a `value` into a list of `NLCSTNode`s.
  tokenize(value) {
    var parser = this
    var tokens = []
    var index = 0
    var offset = 0
    var line = 1
    var column = 1
    var character
    var queue
    var previous
    var left
    var right
    var eater

    if (value === null || value === undefined) {
      value = ''
    } else if (value instanceof String) {
      value = value.toString()
    }

    if (typeof value !== 'string') {
      // Return the given nodes if this is either an empty array, or an array with
      // a node as a first child.
      if ('length' in value && (!value[0] || value[0].type)) {
        return value
      }

      throw new Error(
        "Illegal invocation: '" +
          value +
          "' is not a valid argument for 'ParseLatin'"
      )
    }

    if (!value) {
      return tokens
    }

    // Eat mechanism to use.
    eater = this.position ? eat : noPositionEat

    previous = ''
    queue = ''

    while (index < value.length) {
      character = value.charAt(index)

      if (_expressions_js__WEBPACK_IMPORTED_MODULE_0__.whiteSpace.test(character)) {
        right = 'WhiteSpace'
      } else if (_expressions_js__WEBPACK_IMPORTED_MODULE_0__.punctuation.test(character)) {
        right = 'Punctuation'
      } else if (_expressions_js__WEBPACK_IMPORTED_MODULE_0__.word.test(character)) {
        right = 'Word'
      } else {
        right = 'Symbol'
      }

      tick()

      previous = character
      character = ''
      left = right
      right = null

      index++
    }

    tick()

    return tokens

    // Check one character.
    function tick() {
      if (
        left === right &&
        (left === 'Word' ||
          left === 'WhiteSpace' ||
          character === previous ||
          _expressions_js__WEBPACK_IMPORTED_MODULE_0__.surrogates.test(character))
      ) {
        queue += character
      } else {
        // Flush the previous queue.
        if (queue) {
          parser['tokenize' + left](queue, eater)
        }

        queue = character
      }
    }

    // Remove `subvalue` from `value`.
    // Expects `subvalue` to be at the start from `value`, and applies no
    // validation.
    function eat(subvalue) {
      var pos = position()

      update(subvalue)

      return apply

      // Add the given arguments, add `position` to the returned node, and return
      // the node.
      function apply(...input) {
        return pos(add(...input))
      }
    }

    // Remove `subvalue` from `value`.
    // Does not patch positional information.
    function noPositionEat() {
      return add
    }

    // Add mechanism.
    function add(node, parent) {
      if (parent) {
        parent.children.push(node)
      } else {
        tokens.push(node)
      }

      return node
    }

    // Mark position and patch `node.position`.
    function position() {
      var before = now()

      // Add the position to a node.
      function patch(node) {
        node.position = new Position(before)

        return node
      }

      return patch
    }

    // Update line and column based on `value`.
    function update(subvalue) {
      var character = -1
      var lastIndex = -1

      offset += subvalue.length

      while (++character < subvalue.length) {
        if (subvalue.charAt(character) === '\n') {
          lastIndex = character
          line++
        }
      }

      if (lastIndex < 0) {
        column += subvalue.length
      } else {
        column = subvalue.length - lastIndex
      }
    }

    // Store position information for a node.
    function Position(start) {
      this.start = start
      this.end = now()
    }

    // Get the current position.
    function now() {
      return {line, column, offset}
    }
  }
}

// Default position.
ParseLatin.prototype.position = true

// Create text nodes.
ParseLatin.prototype.tokenizeSymbol = createTextFactory('Symbol')
ParseLatin.prototype.tokenizeWhiteSpace = createTextFactory('WhiteSpace')
ParseLatin.prototype.tokenizePunctuation = createTextFactory('Punctuation')
ParseLatin.prototype.tokenizeSource = createTextFactory('Source')
ParseLatin.prototype.tokenizeText = createTextFactory('Text')

// Inject `plugins` to modifiy the result of the method at `key` on the operated
// on context.
ParseLatin.prototype.use = useFactory(function (context, key, plugins) {
  context[key] = context[key].concat(plugins)
})

// Inject `plugins` to modifiy the result of the method at `key` on the operated
// on context, before any other.
ParseLatin.prototype.useFirst = useFactory(function (context, key, plugins) {
  context[key] = plugins.concat(context[key])
})

// PARENT NODES
//
// All these nodes are `pluggable`: they come with a `use` method which accepts
// a plugin (`function(NLCSTNode)`).
// Every time one of these methods are called, the plugin is invoked with the
// node, allowing for easy modification.
//
// In fact, the internal transformation from `tokenize` (a list of words, white
// space, punctuation, and symbols) to `tokenizeRoot` (an NLCST tree), is also
// implemented through this mechanism.

// Create a `WordNode` with its children set to a single `TextNode`, its value
// set to the given `value`.
pluggable(ParseLatin, 'tokenizeWord', function (value, eat) {
  var add = (eat || noopEat)('')
  var parent = {type: 'WordNode', children: []}

  this.tokenizeText(value, eat, parent)

  return add(parent)
})

// Create a `SentenceNode` with its children set to `Node`s, their values set
// to the tokenized given `value`.
//
// Unless plugins add new nodes, the sentence is populated by `WordNode`s,
// `SymbolNode`s, `PunctuationNode`s, and `WhiteSpaceNode`s.
pluggable(
  ParseLatin,
  'tokenizeSentence',
  (0,_parser_js__WEBPACK_IMPORTED_MODULE_1__.parserFactory)({type: 'SentenceNode', tokenizer: 'tokenize'})
)

// Create a `ParagraphNode` with its children set to `Node`s, their values set
// to the tokenized given `value`.
//
// Unless plugins add new nodes, the paragraph is populated by `SentenceNode`s
// and `WhiteSpaceNode`s.
pluggable(
  ParseLatin,
  'tokenizeParagraph',
  (0,_parser_js__WEBPACK_IMPORTED_MODULE_1__.parserFactory)({
    type: 'ParagraphNode',
    delimiter: _expressions_js__WEBPACK_IMPORTED_MODULE_0__.terminalMarker,
    delimiterType: 'PunctuationNode',
    tokenizer: 'tokenizeSentence'
  })
)

// Create a `RootNode` with its children set to `Node`s, their values set to the
// tokenized given `value`.
pluggable(
  ParseLatin,
  'tokenizeRoot',
  (0,_parser_js__WEBPACK_IMPORTED_MODULE_1__.parserFactory)({
    type: 'RootNode',
    delimiter: _expressions_js__WEBPACK_IMPORTED_MODULE_0__.newLine,
    delimiterType: 'WhiteSpaceNode',
    tokenizer: 'tokenizeParagraph'
  })
)

// PLUGINS

ParseLatin.prototype.use('tokenizeSentence', [
  _plugin_merge_initial_word_symbol_js__WEBPACK_IMPORTED_MODULE_2__.mergeInitialWordSymbol,
  _plugin_merge_final_word_symbol_js__WEBPACK_IMPORTED_MODULE_3__.mergeFinalWordSymbol,
  _plugin_merge_inner_word_symbol_js__WEBPACK_IMPORTED_MODULE_4__.mergeInnerWordSymbol,
  _plugin_merge_inner_word_slash_js__WEBPACK_IMPORTED_MODULE_5__.mergeInnerWordSlash,
  _plugin_merge_initialisms_js__WEBPACK_IMPORTED_MODULE_6__.mergeInitialisms,
  _plugin_merge_words_js__WEBPACK_IMPORTED_MODULE_7__.mergeWords,
  _plugin_patch_position_js__WEBPACK_IMPORTED_MODULE_8__.patchPosition
])

ParseLatin.prototype.use('tokenizeParagraph', [
  _plugin_merge_non_word_sentences_js__WEBPACK_IMPORTED_MODULE_9__.mergeNonWordSentences,
  _plugin_merge_affix_symbol_js__WEBPACK_IMPORTED_MODULE_10__.mergeAffixSymbol,
  _plugin_merge_initial_lower_case_letter_sentences_js__WEBPACK_IMPORTED_MODULE_11__.mergeInitialLowerCaseLetterSentences,
  _plugin_merge_initial_digit_sentences_js__WEBPACK_IMPORTED_MODULE_12__.mergeInitialDigitSentences,
  _plugin_merge_prefix_exceptions_js__WEBPACK_IMPORTED_MODULE_13__.mergePrefixExceptions,
  _plugin_merge_affix_exceptions_js__WEBPACK_IMPORTED_MODULE_14__.mergeAffixExceptions,
  _plugin_merge_remaining_full_stops_js__WEBPACK_IMPORTED_MODULE_15__.mergeRemainingFullStops,
  _plugin_make_initial_white_space_siblings_js__WEBPACK_IMPORTED_MODULE_16__.makeInitialWhiteSpaceSiblings,
  _plugin_make_final_white_space_siblings_js__WEBPACK_IMPORTED_MODULE_17__.makeFinalWhiteSpaceSiblings,
  _plugin_break_implicit_sentences_js__WEBPACK_IMPORTED_MODULE_18__.breakImplicitSentences,
  _plugin_remove_empty_nodes_js__WEBPACK_IMPORTED_MODULE_19__.removeEmptyNodes,
  _plugin_patch_position_js__WEBPACK_IMPORTED_MODULE_8__.patchPosition
])

ParseLatin.prototype.use('tokenizeRoot', [
  _plugin_make_initial_white_space_siblings_js__WEBPACK_IMPORTED_MODULE_16__.makeInitialWhiteSpaceSiblings,
  _plugin_make_final_white_space_siblings_js__WEBPACK_IMPORTED_MODULE_17__.makeFinalWhiteSpaceSiblings,
  _plugin_remove_empty_nodes_js__WEBPACK_IMPORTED_MODULE_19__.removeEmptyNodes,
  _plugin_patch_position_js__WEBPACK_IMPORTED_MODULE_8__.patchPosition
])

// TEXT NODES

// Factory to create a `Text`.
function createTextFactory(type) {
  type += 'Node'

  return createText

  // Construct a `Text` from a bound `type`
  function createText(value, eat, parent) {
    if (value === null || value === undefined) {
      value = ''
    }

    return (eat || noopEat)(value)({type, value: String(value)}, parent)
  }
}

// Make a method “pluggable”.
function pluggable(Constructor, key, callback) {
  // Set a pluggable version of `callback` on `Constructor`.
  Constructor.prototype[key] = function (...input) {
    return this.run(key, callback.apply(this, input))
  }
}

// Factory to inject `plugins`. Takes `callback` for the actual inserting.
function useFactory(callback) {
  return use

  // Validate if `plugins` can be inserted.
  // Invokes the bound `callback` to do the actual inserting.
  function use(key, plugins) {
    var wareKey

    // Throw if the method is not pluggable.
    if (!(key in this)) {
      throw new Error(
        'Illegal Invocation: Unsupported `key` for ' +
          '`use(key, plugins)`. Make sure `key` is a ' +
          'supported function'
      )
    }

    // Fail silently when no plugins are given.
    if (!plugins) {
      return
    }

    wareKey = key + 'Plugins'

    // Make sure `plugins` is a list.
    plugins = typeof plugins === 'function' ? [plugins] : plugins.concat()

    // Make sure `wareKey` exists.
    if (!this[wareKey]) {
      this[wareKey] = []
    }

    // Invoke callback with the ware key and plugins.
    callback(this, wareKey, plugins)
  }
}

// Add mechanism used when text-tokenisers are called directly outside of the
// `tokenize` function.
function noopAdd(node, parent) {
  if (parent) {
    parent.children.push(node)
  }

  return node
}

// Eat and add mechanism without adding positional information, used when
// text-tokenisers are called directly outside of the `tokenize` function.
function noopEat() {
  return noopAdd
}


/***/ }),

/***/ "./node_modules/parse-latin/lib/parser.js":
/*!************************************************!*\
  !*** ./node_modules/parse-latin/lib/parser.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parserFactory": function() { return /* binding */ parserFactory; }
/* harmony export */ });
/* harmony import */ var _tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenizer.js */ "./node_modules/parse-latin/lib/tokenizer.js");


// Construct a parser based on `options`.
function parserFactory(options) {
  var type = options.type
  var tokenizerProperty = options.tokenizer
  var delimiter = options.delimiter
  var tokenize = delimiter && (0,_tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.tokenizerFactory)(options.delimiterType, delimiter)

  return parser

  function parser(value) {
    var children = this[tokenizerProperty](value)

    return {type, children: tokenize ? tokenize(children) : children}
  }
}


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/break-implicit-sentences.js":
/*!*************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/break-implicit-sentences.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "breakImplicitSentences": function() { return /* binding */ breakImplicitSentences; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expressions.js */ "./node_modules/parse-latin/lib/expressions.js");



// Two or more new line characters.


// Break a sentence if a white space with more than one new-line is found.
var breakImplicitSentences = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var children
  var position
  var tail
  var head
  var end
  var insertion
  var node

  if (child.type !== 'SentenceNode') {
    return
  }

  children = child.children

  // Ignore first and last child.
  position = 0

  while (++position < children.length - 1) {
    node = children[position]

    if (node.type !== 'WhiteSpaceNode' || !_expressions_js__WEBPACK_IMPORTED_MODULE_2__.newLineMulti.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(node))) {
      continue
    }

    child.children = children.slice(0, position)

    insertion = {
      type: 'SentenceNode',
      children: children.slice(position + 1)
    }

    tail = children[position - 1]
    head = children[position + 1]

    parent.children.splice(index + 1, 0, node, insertion)

    if (child.position && tail.position && head.position) {
      end = child.position.end

      child.position.end = tail.position.end

      insertion.position = {start: head.position.start, end}
    }

    return index + 1
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/make-final-white-space-siblings.js":
/*!********************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/make-final-white-space-siblings.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeFinalWhiteSpaceSiblings": function() { return /* binding */ makeFinalWhiteSpaceSiblings; }
/* harmony export */ });
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");


// Move white space ending a paragraph up, so they are the siblings of
// paragraphs.
var makeFinalWhiteSpaceSiblings = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__(function (
  child,
  index,
  parent
) {
  var children = child.children
  var previous

  if (
    children &&
    children.length > 0 &&
    children[children.length - 1].type === 'WhiteSpaceNode'
  ) {
    parent.children.splice(index + 1, 0, child.children.pop())
    previous = children[children.length - 1]

    if (previous && previous.position && child.position) {
      child.position.end = previous.position.end
    }

    // Next, iterate over the current node again.
    return index
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/make-initial-white-space-siblings.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/make-initial-white-space-siblings.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeInitialWhiteSpaceSiblings": function() { return /* binding */ makeInitialWhiteSpaceSiblings; }
/* harmony export */ });
/* harmony import */ var unist_util_visit_children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit-children */ "./node_modules/unist-util-visit-children/index.js");


// Move white space starting a sentence up, so they are the siblings of
// sentences.
var makeInitialWhiteSpaceSiblings = unist_util_visit_children__WEBPACK_IMPORTED_MODULE_0__(function (
  child,
  index,
  parent
) {
  var children = child.children
  var next

  if (
    children &&
    children.length > 0 &&
    children[0].type === 'WhiteSpaceNode'
  ) {
    parent.children.splice(index, 0, children.shift())
    next = children[0]

    if (next && next.position && child.position) {
      child.position.start = next.position.start
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-affix-exceptions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-affix-exceptions.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeAffixExceptions": function() { return /* binding */ mergeAffixExceptions; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");



// Merge a sentence into its previous sentence, when the sentence starts with a
// comma.
var mergeAffixExceptions = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var children = child.children
  var node
  var position
  var value
  var previousChild

  if (!children || children.length === 0 || index < 1) {
    return
  }

  position = -1

  while (children[++position]) {
    node = children[position]

    if (node.type === 'WordNode') {
      return
    }

    if (node.type === 'SymbolNode' || node.type === 'PunctuationNode') {
      value = nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(node)

      if (value !== ',' && value !== ';') {
        return
      }

      previousChild = parent.children[index - 1]

      previousChild.children = previousChild.children.concat(children)

      // Update position.
      if (previousChild.position && child.position) {
        previousChild.position.end = child.position.end
      }

      parent.children.splice(index, 1)

      // Next, iterate over the node *now* at the current position.
      return index
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-affix-symbol.js":
/*!*******************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-affix-symbol.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeAffixSymbol": function() { return /* binding */ mergeAffixSymbol; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expressions.js */ "./node_modules/parse-latin/lib/expressions.js");



// Closing or final punctuation, or terminal markers that should still be
// included in the previous sentence, even though they follow the sentence’s
// terminal marker.


// Move certain punctuation following a terminal marker (thus in the next
// sentence) to the previous sentence.
var mergeAffixSymbol = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (child, index, parent) {
  var children = child.children
  var first
  var second
  var previous

  if (children && children.length > 0 && index > 0) {
    first = children[0]
    second = children[1]
    previous = parent.children[index - 1]

    if (
      (first.type === 'SymbolNode' || first.type === 'PunctuationNode') &&
      _expressions_js__WEBPACK_IMPORTED_MODULE_2__.affixSymbol.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(first))
    ) {
      previous.children.push(children.shift())

      // Update position.
      if (first.position && previous.position) {
        previous.position.end = first.position.end
      }

      if (second && second.position && child.position) {
        child.position.start = second.position.start
      }

      // Next, iterate over the previous node again.
      return index - 1
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-final-word-symbol.js":
/*!************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-final-word-symbol.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeFinalWordSymbol": function() { return /* binding */ mergeFinalWordSymbol; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");



// Merge certain punctuation marks into their preceding words.
var mergeFinalWordSymbol = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var children
  var previous
  var next

  if (
    index > 0 &&
    (child.type === 'SymbolNode' || child.type === 'PunctuationNode') &&
    nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(child) === '-'
  ) {
    children = parent.children
    previous = children[index - 1]
    next = children[index + 1]

    if (
      (!next || next.type !== 'WordNode') &&
      previous &&
      previous.type === 'WordNode'
    ) {
      // Remove `child` from parent.
      children.splice(index, 1)

      // Add the punctuation mark at the end of the previous node.
      previous.children.push(child)

      // Update position.
      if (previous.position && child.position) {
        previous.position.end = child.position.end
      }

      // Next, iterate over the node *now* at the current position (which was
      // the next node).
      return index
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-initial-digit-sentences.js":
/*!******************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-initial-digit-sentences.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInitialDigitSentences": function() { return /* binding */ mergeInitialDigitSentences; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expressions.js */ "./node_modules/parse-latin/lib/expressions.js");




// Merge a sentence into its previous sentence, when the sentence starts with a
// lower case letter.
var mergeInitialDigitSentences = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var children = child.children
  var siblings = parent.children
  var previous = siblings[index - 1]
  var head = children[0]

  if (
    previous &&
    head &&
    head.type === 'WordNode' &&
    _expressions_js__WEBPACK_IMPORTED_MODULE_2__.digitStart.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(head))
  ) {
    previous.children = previous.children.concat(children)
    siblings.splice(index, 1)

    // Update position.
    if (previous.position && child.position) {
      previous.position.end = child.position.end
    }

    // Next, iterate over the node *now* at the current position.
    return index
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-initial-lower-case-letter-sentences.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-initial-lower-case-letter-sentences.js ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInitialLowerCaseLetterSentences": function() { return /* binding */ mergeInitialLowerCaseLetterSentences; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expressions.js */ "./node_modules/parse-latin/lib/expressions.js");



// Initial lowercase letter.


// Merge a sentence into its previous sentence, when the sentence starts with a
// lower case letter.
var mergeInitialLowerCaseLetterSentences = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var children = child.children
  var position
  var node
  var siblings
  var previous

  if (children && children.length > 0 && index > 0) {
    position = -1

    while (children[++position]) {
      node = children[position]

      if (node.type === 'WordNode') {
        if (!_expressions_js__WEBPACK_IMPORTED_MODULE_2__.lowerInitial.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(node))) {
          return
        }

        siblings = parent.children

        previous = siblings[index - 1]

        previous.children = previous.children.concat(children)

        siblings.splice(index, 1)

        // Update position.
        if (previous.position && child.position) {
          previous.position.end = child.position.end
        }

        // Next, iterate over the node *now* at the current position.
        return index
      }

      if (node.type === 'SymbolNode' || node.type === 'PunctuationNode') {
        return
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-initial-word-symbol.js":
/*!**************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-initial-word-symbol.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInitialWordSymbol": function() { return /* binding */ mergeInitialWordSymbol; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");



// Merge certain punctuation marks into their following words.
var mergeInitialWordSymbol = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var children
  var next

  if (
    (child.type !== 'SymbolNode' && child.type !== 'PunctuationNode') ||
    nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(child) !== '&'
  ) {
    return
  }

  children = parent.children

  next = children[index + 1]

  // If either a previous word, or no following word, exists, exit early.
  if (
    (index > 0 && children[index - 1].type === 'WordNode') ||
    !(next && next.type === 'WordNode')
  ) {
    return
  }

  // Remove `child` from parent.
  children.splice(index, 1)

  // Add the punctuation mark at the start of the next node.
  next.children.unshift(child)

  // Update position.
  if (next.position && child.position) {
    next.position.start = child.position.start
  }

  // Next, iterate over the node at the previous position, as it's now adjacent
  // to a following word.
  return index - 1
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-initialisms.js":
/*!******************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-initialisms.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInitialisms": function() { return /* binding */ mergeInitialisms; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expressions.js */ "./node_modules/parse-latin/lib/expressions.js");




// Merge initialisms.
var mergeInitialisms = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (child, index, parent) {
  var siblings
  var previous
  var children
  var position
  var otherChild
  var isAllDigits
  var value

  if (index > 0 && nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(child) === '.') {
    siblings = parent.children

    previous = siblings[index - 1]
    children = previous.children

    if (
      previous.type === 'WordNode' &&
      children &&
      children.length !== 1 &&
      children.length % 2 !== 0
    ) {
      position = children.length
      isAllDigits = true

      while (children[--position]) {
        otherChild = children[position]

        value = nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(otherChild)

        if (position % 2 === 0) {
          // Initialisms consist of one character values.
          if (value.length > 1) {
            return
          }

          if (!_expressions_js__WEBPACK_IMPORTED_MODULE_2__.numerical.test(value)) {
            isAllDigits = false
          }
        } else if (value !== '.') {
          if (position < children.length - 2) {
            break
          } else {
            return
          }
        }
      }

      if (!isAllDigits) {
        // Remove `child` from parent.
        siblings.splice(index, 1)

        // Add child to the previous children.
        children.push(child)

        // Update position.
        if (previous.position && child.position) {
          previous.position.end = child.position.end
        }

        // Next, iterate over the node *now* at the current position.
        return index
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-inner-word-slash.js":
/*!***********************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-inner-word-slash.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInnerWordSlash": function() { return /* binding */ mergeInnerWordSlash; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");



var slash = '/'

// Merge words joined by certain punctuation marks.
var mergeInnerWordSlash = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var siblings = parent.children
  var previous
  var next
  var previousValue
  var nextValue
  var queue
  var tail
  var count

  previous = siblings[index - 1]
  next = siblings[index + 1]

  if (
    previous &&
    previous.type === 'WordNode' &&
    (child.type === 'SymbolNode' || child.type === 'PunctuationNode') &&
    nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(child) === slash
  ) {
    previousValue = nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(previous)
    tail = child
    queue = [child]
    count = 1

    if (next && next.type === 'WordNode') {
      nextValue = nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(next)
      tail = next
      queue = queue.concat(next.children)
      count++
    }

    if (previousValue.length < 3 && (!nextValue || nextValue.length < 3)) {
      // Add all found tokens to `prev`s children.
      previous.children = previous.children.concat(queue)

      siblings.splice(index, count)

      // Update position.
      if (previous.position && tail.position) {
        previous.position.end = tail.position.end
      }

      // Next, iterate over the node *now* at the current position.
      return index
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-inner-word-symbol.js":
/*!************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-inner-word-symbol.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInnerWordSymbol": function() { return /* binding */ mergeInnerWordSymbol; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expressions.js */ "./node_modules/parse-latin/lib/expressions.js");



// Symbols part of surrounding words.


// Merge words joined by certain punctuation marks.
var mergeInnerWordSymbol = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var siblings
  var sibling
  var previous
  var last
  var position
  var tokens
  var queue

  if (
    index > 0 &&
    (child.type === 'SymbolNode' || child.type === 'PunctuationNode')
  ) {
    siblings = parent.children
    previous = siblings[index - 1]

    if (previous && previous.type === 'WordNode') {
      position = index - 1

      tokens = []
      queue = []

      // -   If a token which is neither word nor inner word symbol is found,
      //     the loop is broken
      // -   If an inner word symbol is found,  it’s queued
      // -   If a word is found, it’s queued (and the queue stored and emptied)
      while (siblings[++position]) {
        sibling = siblings[position]

        if (sibling.type === 'WordNode') {
          tokens = tokens.concat(queue, sibling.children)

          queue = []
        } else if (
          (sibling.type === 'SymbolNode' ||
            sibling.type === 'PunctuationNode') &&
          _expressions_js__WEBPACK_IMPORTED_MODULE_2__.wordSymbolInner.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(sibling))
        ) {
          queue.push(sibling)
        } else {
          break
        }
      }

      if (tokens.length > 0) {
        // If there is a queue, remove its length from `position`.
        if (queue.length > 0) {
          position -= queue.length
        }

        // Remove every (one or more) inner-word punctuation marks and children
        // of words.
        siblings.splice(index, position - index)

        // Add all found tokens to `prev`s children.
        previous.children = previous.children.concat(tokens)

        last = tokens[tokens.length - 1]

        // Update position.
        if (previous.position && last.position) {
          previous.position.end = last.position.end
        }

        // Next, iterate over the node *now* at the current position.
        return index
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-non-word-sentences.js":
/*!*************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-non-word-sentences.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeNonWordSentences": function() { return /* binding */ mergeNonWordSentences; }
/* harmony export */ });
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");


// Merge a sentence into the following sentence, when the sentence does not
// contain word tokens.
var mergeNonWordSentences = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__(function (
  child,
  index,
  parent
) {
  var children = child.children
  var position = -1
  var previous
  var next

  while (children[++position]) {
    if (children[position].type === 'WordNode') {
      return
    }
  }

  previous = parent.children[index - 1]

  if (previous) {
    previous.children = previous.children.concat(children)

    // Remove the child.
    parent.children.splice(index, 1)

    // Patch position.
    if (previous.position && child.position) {
      previous.position.end = child.position.end
    }

    // Next, iterate over the node *now* at the current position (which was the
    // next node).
    return index
  }

  next = parent.children[index + 1]

  if (next) {
    next.children = children.concat(next.children)

    // Patch position.
    if (next.position && child.position) {
      next.position.start = child.position.start
    }

    // Remove the child.
    parent.children.splice(index, 1)
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-prefix-exceptions.js":
/*!************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-prefix-exceptions.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergePrefixExceptions": function() { return /* binding */ mergePrefixExceptions; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");



// Full stop characters that should not be treated as terminal sentence markers:
// A case-insensitive abbreviation.
var abbreviationPrefix = new RegExp(
  '^(' +
    '[0-9]{1,3}|' +
    '[a-z]|' +
    // Common Latin Abbreviations:
    // Based on: <https://en.wikipedia.org/wiki/List_of_Latin_abbreviations>.
    // Where only the abbreviations written without joining full stops,
    // but with a final full stop, were extracted.
    //
    // circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
    // et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
    // opere && citato, (per) cent, (per) procurationem, (pro) tempore,
    // sic erat scriptum, (et) sequentia, statim, videlicet. */
    'al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|' +
    'fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz' +
    ')$'
)

// Merge a sentence into its next sentence, when the sentence ends with a
// certain word.
var mergePrefixExceptions = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_1__(function (
  child,
  index,
  parent
) {
  var children = child.children
  var period
  var node
  var next

  if (children && children.length > 1) {
    period = children[children.length - 1]

    if (period && nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(period) === '.') {
      node = children[children.length - 2]

      if (
        node &&
        node.type === 'WordNode' &&
        abbreviationPrefix.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(node).toLowerCase())
      ) {
        // Merge period into abbreviation.
        node.children.push(period)
        children.pop()

        // Update position.
        if (period.position && node.position) {
          node.position.end = period.position.end
        }

        // Merge sentences.
        next = parent.children[index + 1]

        if (next) {
          child.children = children.concat(next.children)

          parent.children.splice(index + 1, 1)

          // Update position.
          if (next.position && child.position) {
            child.position.end = next.position.end
          }

          // Next, iterate over the current node again.
          return index - 1
        }
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-remaining-full-stops.js":
/*!***************************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-remaining-full-stops.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeRemainingFullStops": function() { return /* binding */ mergeRemainingFullStops; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_visit_children__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-visit-children */ "./node_modules/unist-util-visit-children/index.js");
/* harmony import */ var _expressions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expressions.js */ "./node_modules/parse-latin/lib/expressions.js");



// Full stop characters that should not be treated as terminal sentence markers:
// A case-insensitive abbreviation.


// Merge non-terminal-marker full stops into the previous word (if available),
// or the next word (if available).
var mergeRemainingFullStops = unist_util_visit_children__WEBPACK_IMPORTED_MODULE_1__(function (child) {
  var children = child.children
  var position = children.length
  var hasFoundDelimiter = false
  var grandchild
  var previous
  var next
  var nextNext

  while (children[--position]) {
    grandchild = children[position]

    if (
      grandchild.type !== 'SymbolNode' &&
      grandchild.type !== 'PunctuationNode'
    ) {
      // This is a sentence without terminal marker, so we 'fool' the code to
      // make it think we have found one.
      if (grandchild.type === 'WordNode') {
        hasFoundDelimiter = true
      }

      continue
    }

    // Exit when this token is not a terminal marker.
    if (!_expressions_js__WEBPACK_IMPORTED_MODULE_2__.terminalMarker.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(grandchild))) {
      continue
    }

    // Ignore the first terminal marker found (starting at the end), as it
    // should not be merged.
    if (!hasFoundDelimiter) {
      hasFoundDelimiter = true

      continue
    }

    // Only merge a single full stop.
    if (nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(grandchild) !== '.') {
      continue
    }

    previous = children[position - 1]
    next = children[position + 1]

    if (previous && previous.type === 'WordNode') {
      nextNext = children[position + 2]

      // Continue when the full stop is followed by a space and another full
      // stop, such as: `{.} .`
      if (
        next &&
        nextNext &&
        next.type === 'WhiteSpaceNode' &&
        nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(nextNext) === '.'
      ) {
        continue
      }

      // Remove `child` from parent.
      children.splice(position, 1)

      // Add the punctuation mark at the end of the previous node.
      previous.children.push(grandchild)

      // Update position.
      if (grandchild.position && previous.position) {
        previous.position.end = grandchild.position.end
      }

      position--
    } else if (next && next.type === 'WordNode') {
      // Remove `child` from parent.
      children.splice(position, 1)

      // Add the punctuation mark at the start of the next node.
      next.children.unshift(grandchild)

      if (grandchild.position && next.position) {
        next.position.start = grandchild.position.start
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/merge-words.js":
/*!************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/merge-words.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeWords": function() { return /* binding */ mergeWords; }
/* harmony export */ });
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");


// Merge multiple words. This merges the children of adjacent words, something
// which should not occur naturally by parse-latin, but might happen when custom
// tokens were passed in.
var mergeWords = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__(function (child, index, parent) {
  var siblings = parent.children
  var next

  if (child.type === 'WordNode') {
    next = siblings[index + 1]

    if (next && next.type === 'WordNode') {
      // Remove `next` from parent.
      siblings.splice(index + 1, 1)

      // Add the punctuation mark at the end of the previous node.
      child.children = child.children.concat(next.children)

      // Update position.
      if (next.position && child.position) {
        child.position.end = next.position.end
      }

      // Next, re-iterate the current node.
      return index
    }
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/patch-position.js":
/*!***************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/patch-position.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "patchPosition": function() { return /* binding */ patchPosition; }
/* harmony export */ });
/* harmony import */ var unist_util_visit_children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit-children */ "./node_modules/unist-util-visit-children/index.js");


// Patch the position on a parent node based on its first and last child.
var patchPosition = unist_util_visit_children__WEBPACK_IMPORTED_MODULE_0__(function (child, index, node) {
  var siblings = node.children

  if (!child.position) {
    return
  }

  if (
    index < 1 &&
    /* c8 ignore next */
    (!node.position || !node.position.start)
  ) {
    patch(node)
    node.position.start = child.position.start
  }

  if (index === siblings.length - 1 && (!node.position || !node.position.end)) {
    patch(node)
    node.position.end = child.position.end
  }
})

// Add a `position` object when it does not yet exist on `node`.
function patch(node) {
  if (!node.position) {
    node.position = {}
  }
}


/***/ }),

/***/ "./node_modules/parse-latin/lib/plugin/remove-empty-nodes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/parse-latin/lib/plugin/remove-empty-nodes.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeEmptyNodes": function() { return /* binding */ removeEmptyNodes; }
/* harmony export */ });
/* harmony import */ var unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-modify-children */ "./node_modules/unist-util-modify-children/index.js");


// Remove empty children.
var removeEmptyNodes = unist_util_modify_children__WEBPACK_IMPORTED_MODULE_0__(function (child, index, parent) {
  if ('children' in child && child.children.length === 0) {
    parent.children.splice(index, 1)

    // Next, iterate over the node *now* at the current position (which was the
    // next node).
    return index
  }
})


/***/ }),

/***/ "./node_modules/parse-latin/lib/tokenizer.js":
/*!***************************************************!*\
  !*** ./node_modules/parse-latin/lib/tokenizer.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tokenizerFactory": function() { return /* binding */ tokenizerFactory; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/parse-latin/node_modules/nlcst-to-string/index.js");


// Factory to create a tokenizer based on a given `expression`.
function tokenizerFactory(childType, expression) {
  return tokenizer

  // A function that splits.
  function tokenizer(node) {
    var children = []
    var tokens = node.children
    var type = node.type
    var index = -1
    var lastIndex = tokens.length - 1
    var start = 0
    var first
    var last
    var parent

    while (++index < tokens.length) {
      if (
        index === lastIndex ||
        (tokens[index].type === childType &&
          expression.test(nlcst_to_string__WEBPACK_IMPORTED_MODULE_0__(tokens[index])))
      ) {
        first = tokens[start]
        last = tokens[index]

        parent = {type, children: tokens.slice(start, index + 1)}

        if (first.position && last.position) {
          parent.position = {
            start: first.position.start,
            end: last.position.end
          }
        }

        children.push(parent)

        start = index + 1
      }
    }

    return children
  }
}


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

/***/ "./node_modules/quotation/index.js":
/*!*****************************************!*\
  !*** ./node_modules/quotation/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quotation": function() { return /* binding */ quotation; }
/* harmony export */ });
/**
 * Quote a value.
 *
 * @param value
 *   Value(s) to wrap in quotes
 * @param [open='"']
 *   Opening quote
 * @param [close=open]
 *   Closing quote
 */
const quotation =
  /**
   * @type {{
   *   (value: string, open?: string, close?: string): string
   *   (value: string[], open?: string, close?: string): string[]
   * }}
   */
  (
    /**
     * @param {string|Array<string>} value
     * @param {string} open
     * @param {string} close
     * @returns {string|string[]}
     */
    function (value, open, close) {
      const start = open || '"'
      const end = close || start
      /** @type {string[]} */
      const result = []
      let index = -1

      if (Array.isArray(value)) {
        while (++index < value.length) {
          result[index] = start + value[index] + end
        }

        return result
      }

      if (typeof value === 'string') {
        return start + value + end
      }

      throw new TypeError('Expected string or array of strings')
    }
  )


/***/ }),

/***/ "./node_modules/remark-message-control/index.js":
/*!******************************************************!*\
  !*** ./node_modules/remark-message-control/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ remarkMessageControl; }
/* harmony export */ });
/* harmony import */ var unified_message_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unified-message-control */ "./node_modules/unified-message-control/index.js");
/* harmony import */ var mdast_comment_marker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mdast-comment-marker */ "./node_modules/mdast-comment-marker/index.js");
/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('unified-message-control')} MessageControl
 * @typedef {Omit<import('unified-message-control').OptionsWithoutReset, 'marker'>|Omit<import('unified-message-control').OptionsWithReset, 'marker'>} Options
 */




const test = [
  'html', // Comments are `html` nodes in mdast.
  'comment', // In MDX@1, comments have their own node.
  'mdxFlowExpression', // In MDX@2, comments exist in bracketed expressions.
  'mdxTextExpression'
]

/**
 * Plugin to enable, disable, and ignore messages.
 *
 * @type {import('unified').Plugin<[Options], Root>}
 * @returns {(node: Root, file: VFile) => void}
 */
function remarkMessageControl(options) {
  return (0,unified_message_control__WEBPACK_IMPORTED_MODULE_0__["default"])(
    Object.assign({marker: mdast_comment_marker__WEBPACK_IMPORTED_MODULE_1__.commentMarker, test}, options)
  )
}


/***/ }),

/***/ "./node_modules/retext-contractions/index.js":
/*!***************************************************!*\
  !*** ./node_modules/retext-contractions/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextContractions; }
/* harmony export */ });
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var nlcst_is_literal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nlcst-is-literal */ "./node_modules/nlcst-is-literal/index.js");
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list.js */ "./node_modules/retext-contractions/list.js");
/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Sentence} Sentence
 *
 * @typedef Options
 *   Configuration.
 * @property {boolean} [allowLiterals=false]
 *   Suggest straight (`'`) instead of smart (`’`) apostrophes.
 *   Use `retext-quotes` if you want to properly check that though.
 * @property {boolean} [straight=false]
 *   Include literal phrases.
 *   The default is to ignore them.
 */






// Rules.
const source = 'retext-contractions'
const url = 'https://github.com/retextjs/retext-contractions#readme'

const own = {}.hasOwnProperty

const data = initialize()

/**
 * Plugin to check contractions use.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
function retextContractions(options = {}) {
  const ignore = options.allowLiterals
  const straight = options.straight

  return (tree, file) => {
    ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(tree, 'WordNode', (node, index, parent_) => {
      const parent = /** @type {Sentence} */ (parent_)
      const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(node)
      const normal = actual.replace(/['’]/g, '')

      // Suggest if the straightened version is listed.
      if (own.call(data, normal)) {
        let expected = data[normal]

        if (!straight) {
          expected = expected.replace(/'/g, '’')
        }

        if (
          // Perfect.
          actual === expected ||
          // Ignore literal misspelt words: `like this: “hasnt”`.
          (parent && index !== null && !ignore && (0,nlcst_is_literal__WEBPACK_IMPORTED_MODULE_2__.isLiteral)(parent, index))
        ) {
          return
        }

        Object.assign(
          file.message(
            normal === actual
              ? 'Expected an apostrophe in `' +
                  actual +
                  '`, ' +
                  'like this: `' +
                  expected +
                  '`'
              : 'Expected the apostrophe in `' +
                  actual +
                  '` to be ' +
                  'like this: `' +
                  expected +
                  '`',
            node,
            [
              source,
              (normal === actual ? 'missing-' : '') +
                (straight ? 'straight-apostrophe' : 'smart-apostrophe')
            ].join(':')
          ),
          {actual, expected: [expected], url}
        )
      }
    })
  }
}

/** @returns {Record<string, string>} */
function initialize() {
  /** @type {Record<string, string>} */
  const result = {}
  /** @type {string} */
  let key

  for (key in _list_js__WEBPACK_IMPORTED_MODULE_3__.list) {
    if (own.call(_list_js__WEBPACK_IMPORTED_MODULE_3__.list, key)) {
      const value = _list_js__WEBPACK_IMPORTED_MODULE_3__.list[key]

      result[key] = value

      // Add upper- and sentence case as well.
      if (key === key.toLowerCase()) {
        result[key.toUpperCase()] = value.toUpperCase()
        result[key.charAt(0).toUpperCase() + key.slice(1)] =
          value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }

  return result
}


/***/ }),

/***/ "./node_modules/retext-contractions/list.js":
/*!**************************************************!*\
  !*** ./node_modules/retext-contractions/list.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "list": function() { return /* binding */ list; }
/* harmony export */ });
/** @type {Record<string, string>} */
const list = {
  aint: "ain't",
  arent: "aren't",
  couldnt: "couldn't",
  didnt: "didn't",
  doesnt: "doesn't",
  dont: "don't",
  hadnt: "hadn't",
  hasnt: "hasn't",
  havent: "haven't",
  hed: "he'd",
  hes: "he's",
  howd: "how'd",
  hows: "how's",
  howll: "how'll",
  Id: "I'd",
  Im: "I'm",
  Ive: "I've",
  isnt: "isn't",
  mightnt: "mightn't",
  mustve: "must've",
  mustnt: "mustn't",
  neednt: "needn't",
  oclock: "o'clock",
  shant: "shan't",
  shes: "she's",
  shouldve: "should've",
  shouldnt: "shouldn't",
  thatd: "that'd",
  thats: "that's",
  thered: "there'd",
  theres: "there's",
  therere: "there're",
  theyd: "they'd",
  theyll: "they'll",
  theyre: "they're",
  theyve: "they've",
  tis: "'tis",
  twas: "'twas",
  twere: "'twere",
  wasnt: "wasn't",
  weve: "we've",
  werent: "weren't",
  whatll: "what'll",
  whatre: "what're",
  whats: "what's",
  whatve: "what've",
  whens: "when's",
  wheres: "where's",
  whereve: "where've",
  whod: "who'd",
  wholl: "who'll",
  whos: "who's",
  whove: "who've",
  whys: "why's",
  wouldve: "would've",
  wouldnt: "wouldn't",
  yall: "y'all",
  youd: "you'd",
  youll: "you'll",
  youre: "you're",
  youve: "you've"
}


/***/ }),

/***/ "./node_modules/retext-diacritics/index.js":
/*!*************************************************!*\
  !*** ./node_modules/retext-diacritics/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextDiacritics; }
/* harmony export */ });
/* harmony import */ var match_casing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! match-casing */ "./node_modules/match-casing/index.js");
/* harmony import */ var nlcst_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-search */ "./node_modules/nlcst-search/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/* harmony import */ var quotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! quotation */ "./node_modules/quotation/index.js");
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema.js */ "./node_modules/retext-diacritics/schema.js");
/**
 * @typedef {import('nlcst').Root} Root
 */








const source = 'retext-diacritics'
const url = 'https://github.com/retext/retext-diacritics#readme'

const list = Object.keys(_schema_js__WEBPACK_IMPORTED_MODULE_0__.schema)

/**
 * Plugin to check for proper use of diacritics.
 *
 * @type {import('unified').Plugin<[], Root>}
 */
function retextDiacritics() {
  return (tree, file) => {
    ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_1__.search)(tree, list, (match, _, _1, phrase) => {
      const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_2__.toString)(match)
      const expected = (0,match_casing__WEBPACK_IMPORTED_MODULE_3__.matchCasing)(_schema_js__WEBPACK_IMPORTED_MODULE_0__.schema[phrase], actual)

      Object.assign(
        file.message(
          'Replace ' +
            (0,quotation__WEBPACK_IMPORTED_MODULE_4__.quotation)(actual, '`') +
            ' with ' +
            (0,quotation__WEBPACK_IMPORTED_MODULE_4__.quotation)(expected, '`'),
          {start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_5__.pointStart)(match[0]), end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_5__.pointEnd)(match[match.length - 1])},
          [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
        ),
        {actual, expected: [expected], url}
      )
    })
  }
}


/***/ }),

/***/ "./node_modules/retext-diacritics/schema.js":
/*!**************************************************!*\
  !*** ./node_modules/retext-diacritics/schema.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": function() { return /* binding */ schema; }
/* harmony export */ });
/** @type {Record<string, string>} */
const schema = {
  // French.
  'beau ideal': 'beau idéal',
  boutonniere: 'boutonnière',
  'bric-a-brac': 'bric-à-brac',
  cafe: 'café',
  'cause celebre': 'cause célèbre',
  chevre: 'chèvre',
  cliche: 'cliché',
  'comsi comsa': 'comme ci comme ça',
  'comme ci comme ca': 'comme ci comme ça',
  consomme: 'consommé',
  "coup d'etat": "coup d'état",
  'coup de grace': 'coup de grâce',
  crudites: 'crudités',
  'creme brulee': 'crème brûlée',
  'creme de menthe': 'crème de menthe',
  'creme fraice': 'crème fraîche',
  'creme fresh': 'crème fraîche',
  crepe: 'crêpe',
  debutante: 'débutante',
  decor: 'décor',
  'deja vu': 'déjà vu',
  denouement: 'dénouement',
  facade: 'façade',
  fiance: 'fiancé',
  fiancee: 'fiancée',
  flambe: 'flambé',
  garcon: 'garçon',
  lycee: 'lycée',
  'maitre d': 'maître d',
  'menage a trois': 'ménage à trois',
  negligee: 'négligée',
  'papier-mache': 'papier-mâché',
  'paper mache': 'papier-mâché',
  'paper-mache': 'papier-mâché',
  protege: 'protégé',
  protegee: 'protégée',
  puree: 'purée',

  "raison d'etre": "raison d'être",
  'my resume': 'my résumé',
  'your resume': 'your résumé',
  'his resume': 'his résumé',
  'her resume': 'her résumé',
  'a resume': 'a résumé',
  'the resume': 'the résumé',
  risque: 'risqué',
  roue: 'roué',
  soiree: 'soirée',
  souffle: 'soufflé',
  soupcon: 'soupçon',
  touche: 'touché',
  'tete-a-tete': 'tête-à-tête',
  voila: 'voilà',
  'a la carte': 'à la carte',
  'a la mode': 'à la mode',
  emigre: 'émigré',

  // Spanish.
  'el nino': 'el niño',
  jalapeno: 'jalapeño',
  'la nina': 'la niña',
  'pina colada': 'piña colada',
  senor: 'señor',
  senora: 'señora',
  senorita: 'señorita',

  // Portuguese.
  acai: 'açaí',

  // German.
  doppelganger: 'doppelgänger',
  fuhrer: 'führer',
  gewurztraminer: 'gewürztraminer',
  ubermensch: 'Übermensch',

  // Latin.
  'vis-a-vis': 'vis-à-vis',

  // Swedish.
  filmjolk: 'filmjölk',
  smorgasbord: 'smörgåsbord',

  // Names, places, and companies.
  beyonce: 'beyoncé',
  bronte: 'brontë',
  'champs-elysees': 'champs-Élysées',
  citroen: 'citroën',
  curacao: 'curaçao',
  'haagen-dazs': 'häagen-dazs',
  'haagen dazs': 'häagen-dazs',
  lowenbrau: 'löwenbräu',
  monegasque: 'monégasque',
  'motley crue': 'mötley crüe',
  nescafe: 'nescafé',
  queensryche: 'Queensrÿche',
  quebec: 'québec',
  quebecois: 'québécois',
  Angstrom: 'Ångström',
  angstrom: 'ångström',
  skoda: 'Škoda'
}


/***/ }),

/***/ "./node_modules/retext-english/index.js":
/*!**********************************************!*\
  !*** ./node_modules/retext-english/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parser": function() { return /* reexport safe */ _lib_index_js__WEBPACK_IMPORTED_MODULE_0__.Parser; }
/* harmony export */ });
/* harmony import */ var _lib_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index.js */ "./node_modules/retext-english/lib/index.js");



/* harmony default export */ __webpack_exports__["default"] = (_lib_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/retext-english/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/retext-english/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parser": function() { return /* binding */ Parser; },
/* harmony export */   "default": function() { return /* binding */ retextEnglish; }
/* harmony export */ });
/* harmony import */ var unherit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unherit */ "./node_modules/unherit/index.js");
/* harmony import */ var parse_english__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parse-english */ "./node_modules/parse-english/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 */


// @ts-expect-error: untyped.


/** @type {import('unified').ParserClass<Root>} */
const Parser = parse_english__WEBPACK_IMPORTED_MODULE_0__.ParseEnglish

/** @type {import('unified').Plugin<void[], string, Root>} */
function retextEnglish() {
  Object.assign(this, {Parser: (0,unherit__WEBPACK_IMPORTED_MODULE_1__.unherit)(parse_english__WEBPACK_IMPORTED_MODULE_0__.ParseEnglish)})
}


/***/ }),

/***/ "./node_modules/retext-equality/en.js":
/*!********************************************!*\
  !*** ./node_modules/retext-equality/en.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/factory.js */ "./node_modules/retext-equality/lib/factory.js");
/* harmony import */ var _lib_en_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/en.js */ "./node_modules/retext-equality/lib/en.js");



const retextEquality = (0,_lib_factory_js__WEBPACK_IMPORTED_MODULE_0__.factory)(_lib_en_js__WEBPACK_IMPORTED_MODULE_1__.patterns, 'en')

/* harmony default export */ __webpack_exports__["default"] = (retextEquality);


/***/ }),

/***/ "./node_modules/retext-equality/index.js":
/*!***********************************************!*\
  !*** ./node_modules/retext-equality/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _en_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en.js */ "./node_modules/retext-equality/en.js");
/**
 * @typedef {import('./lib/factory.js').Options} Options
 */



/* harmony default export */ __webpack_exports__["default"] = (_en_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/retext-equality/lib/en.js":
/*!************************************************!*\
  !*** ./node_modules/retext-equality/lib/en.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "patterns": function() { return /* binding */ patterns; }
/* harmony export */ });
/**
 * @typedef Pattern
 * @property {string} id
 * @property {'or'|'basic'} type
 * @property {string[]} categories
 * @property {Record<string, string>} [considerate]
 * @property {Record<string, string>} inconsiderate
 * @property {string} [condition]
 * @property {string} [note]
 * @property {boolean} [apostrophe]
 */

/** @type {Pattern[]} */
const patterns = [
  {
    id: 'learning-disabled',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with learning disabilities': 'a'
    },
    inconsiderate: {
      'learning disabled': 'a'
    },
    note: 'Refer to the person, rather than the disability, first.'
  },
  {
    id: 'invalid',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'turned off': 'a',
      'has a disability': 'a',
      'person with a disability': 'a',
      'people with disabilities': 'a'
    },
    inconsiderate: {
      disabled: 'a',
      invalid: 'a'
    },
    note: 'Refer to the person, rather than the disability, first.'
  },
  {
    id: 'birth-defect',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'has a disability': 'a',
      'person with a disability': 'a',
      'people with disabilities': 'a'
    },
    inconsiderate: {
      'birth defect': 'a'
    },
    note: 'Assumes/implies that a person with a disability is deficient or inferior to others. When possible, specify the functional ability or its restriction. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'suffers-from-disabilities',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'has a disability': 'a',
      'person with a disability': 'a',
      'people with disabilities': 'a'
    },
    inconsiderate: {
      'suffers from disabilities': 'a',
      'suffering from disabilities': 'a',
      'suffering from a disability': 'a',
      'afflicted with disabilities': 'a',
      'afflicted with a disability': 'a'
    },
    note: 'Assumes that a person with a disability has a reduced quality of life. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'intellectually-disabled-people',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'people with intellectual disabilities': 'a'
    },
    inconsiderate: {
      'intellectually disabled people': 'a'
    },
    note: 'Refer to the person, rather than the disability, first. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'intellectually-disabled',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with an intellectual disability': 'a'
    },
    inconsiderate: {
      'intellectually disabled': 'a',
      'has intellectual issues': 'a',
      'suffers from intellectual disabilities': 'a',
      'suffering from intellectual disabilities': 'a',
      'suffering from an intellectual disability': 'a',
      'afflicted with intellectual disabilities': 'a',
      'afflicted with a intellectual disability': 'a'
    },
    note: 'Assumes that a person with an intellectual disability has a reduced quality of life. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'nuts',
    type: 'basic',
    categories: ['a'],
    considerate: {
      rude: 'a',
      malicious: 'a',
      mean: 'a',
      disgusting: 'a',
      incredible: 'a',
      vile: 'a',
      'person with symptoms of mental illness': 'a',
      'person with mental illness': 'a',
      'person with symptoms of a mental disorder': 'a',
      'person with a mental disorder': 'a'
    },
    inconsiderate: {
      batshit: 'a',
      psycho: 'a',
      crazy: 'a',
      delirious: 'a',
      insane: 'a',
      insanity: 'a',
      loony: 'a',
      lunacy: 'a',
      lunatic: 'a',
      'mentally ill': 'a',
      psychopathology: 'a',
      'mental defective': 'a',
      moron: 'a',
      moronic: 'a',
      nuts: 'a',
      'mental case': 'a',
      mental: 'a'
    },
    note: 'Describe the behavior or illness without derogatory words. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'insanely',
    type: 'basic',
    categories: ['a'],
    considerate: {
      incredibly: 'a'
    },
    inconsiderate: {
      insanely: 'a'
    },
    note: 'Describe the behavior or illness without derogatory words.'
  },
  {
    id: 'sane',
    type: 'basic',
    categories: ['a'],
    considerate: {
      correct: 'a',
      adequate: 'a',
      sufficient: 'a',
      consistent: 'a',
      valid: 'a',
      coherent: 'a',
      sensible: 'a',
      reasonable: 'a'
    },
    inconsiderate: {
      sane: 'a'
    },
    note: 'When describing a mathematical or programmatic value, using the word “sane” needlessly invokes the topic of mental health.  Consider using a domain-specific or neutral term instead.'
  },
  {
    id: 'sanity-check',
    type: 'basic',
    categories: ['a'],
    considerate: {
      check: 'a',
      assertion: 'a',
      validation: 'a',
      'smoke test': 'a'
    },
    inconsiderate: {
      'sanity check': 'a'
    },
    note: 'When describing a mathematical or programmatic value, using the phrase “sanity check” needlessly invokes the topic of mental health.  Consider using simply “check”, or a domain-specific or neutral term, instead.'
  },
  {
    id: 'bipolar',
    type: 'basic',
    categories: ['a'],
    considerate: {
      fluctuating: 'a',
      'person with bipolar disorder': 'a'
    },
    inconsiderate: {
      bipolar: 'a'
    },
    note: 'Only use terms describing mental illness when referring to a professionally diagnosed medical condition. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'schizo',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with schizophrenia': 'a'
    },
    inconsiderate: {
      schizophrenic: 'a',
      schizo: 'a'
    },
    note: 'Only use terms describing mental illness when referring to a professionally diagnosed medical condition. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'manic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with schizophrenia': 'a'
    },
    inconsiderate: {
      'suffers from schizophrenia': 'a',
      'suffering from schizophrenia': 'a',
      'afflicted with schizophrenia': 'a',
      manic: 'a'
    },
    note: 'Assumes a person with schizophrenia experiences a reduced quality of life. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'handicapped-parking',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'accessible parking': 'a'
    },
    inconsiderate: {
      'handicapped parking': 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'handicapped',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with a handicap': 'a',
      accessible: 'a'
    },
    inconsiderate: {
      handicapped: 'a'
    },
    note: 'Refer to the person, rather than the disability, first. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'amputee',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with an amputation': 'a'
    },
    inconsiderate: {
      amputee: 'a'
    },
    note: 'Refer to the person, rather than the condition, first. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'gimp',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with a limp': 'a'
    },
    inconsiderate: {
      cripple: 'a',
      crippled: 'a',
      gimp: 'a'
    },
    note: 'Refer to the specific disability.'
  },
  {
    id: 'mongoloid',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with Down Syndrome': 'a'
    },
    inconsiderate: {
      mongoloid: 'a'
    }
  },
  {
    id: 'stroke-victim',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'individual who has had a stroke': 'a'
    },
    inconsiderate: {
      'stroke victim': 'a',
      'suffering from a stroke': 'a',
      'victim of a stroke': 'a'
    },
    note: 'Refer to the person, rather than the condition, first.'
  },
  {
    id: 'multiple-sclerosis-victim',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person who has multiple sclerosis': 'a'
    },
    inconsiderate: {
      'suffers from multiple sclerosis': 'a',
      'suffering from multiple sclerosis': 'a',
      'victim of multiple sclerosis': 'a',
      'multiple sclerosis victim': 'a',
      'afflicted with multiple sclerosis': 'a'
    }
  },
  {
    id: 'suffers-from-md',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person who has muscular dystrophy': 'a'
    },
    inconsiderate: {
      'suffers from muscular dystrophy': 'a',
      'afflicted with muscular dystrophy': 'a',
      'suffers from MD': 'a',
      'afflicted with MD': 'a'
    },
    note: "Refer to a person's condition as a state, not as an affliction. (source: https://ncdj.org/style-guide)"
  },
  {
    id: 'family-burden',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'with family support needs': 'a'
    },
    inconsiderate: {
      'family burden': 'a'
    }
  },
  {
    id: 'asylum',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'psychiatric hospital': 'a',
      'mental health hospital': 'a'
    },
    inconsiderate: {
      asylum: 'a'
    }
  },
  {
    id: 'bedlam',
    type: 'basic',
    categories: ['a'],
    considerate: {
      chaos: 'a',
      hectic: 'a',
      pandemonium: 'a'
    },
    inconsiderate: {
      bedlam: 'a',
      madhouse: 'a',
      'loony bin': 'a'
    }
  },
  {
    id: 'downs-syndrome',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Down Syndrome': 'a'
    },
    inconsiderate: {
      'downs syndrome': 'a'
    },
    note: 'Source: https://media.specialolympics.org/soi/files/press-kit/2014_FactSheet_Final.pdf'
  },
  {
    id: 'retard',
    type: 'basic',
    categories: ['a'],
    considerate: {
      silly: 'a',
      dullard: 'a',
      'person with Down Syndrome': 'a',
      'person with developmental disabilities': 'a',
      delay: 'a',
      'hold back': 'a'
    },
    inconsiderate: {
      retard: 'a',
      retarded: 'a',
      'short bus': 'a'
    }
  },
  {
    id: 'retards',
    type: 'basic',
    categories: ['a'],
    considerate: {
      sillies: 'a',
      dullards: 'a',
      'people with developmental disabilities': 'a',
      'people with Down’s Syndrome': 'a',
      delays: 'a',
      'holds back': 'a'
    },
    inconsiderate: {
      retards: 'a'
    }
  },
  {
    id: 'psychotic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with a psychotic condition': 'a',
      'person with psychosis': 'a'
    },
    inconsiderate: {
      psychotic: 'a',
      'suffers from psychosis': 'a',
      'suffering from psychosis': 'a',
      'afflicted with psychosis': 'a',
      'victim of psychosis': 'a'
    },
    note: 'Only use terms describing mental illness when referring to a professionally diagnosed medical condition.'
  },
  {
    id: 'lame',
    type: 'basic',
    categories: ['a'],
    considerate: {
      boring: 'a',
      dull: 'a'
    },
    inconsiderate: {
      lame: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'aids-victim',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with AIDS': 'a'
    },
    inconsiderate: {
      'suffering from aids': 'a',
      'suffer from aids': 'a',
      'suffers from aids': 'a',
      'afflicted with aids': 'a',
      'victim of aids': 'a',
      'aids victim': 'a'
    }
  },
  {
    id: 'wheelchair-bound',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'uses a wheelchair': 'a'
    },
    inconsiderate: {
      'confined to a wheelchair': 'a',
      'bound to a wheelchair': 'a',
      'restricted to a wheelchair': 'a',
      'wheelchair bound': 'a'
    }
  },
  {
    id: 'special-olympians',
    type: 'basic',
    categories: ['a'],
    considerate: {
      athletes: 'a',
      'Special Olympics athletes': 'a'
    },
    inconsiderate: {
      'special olympians': 'a',
      'special olympic athletes': 'a'
    },
    note: 'When possible, use the exact discipline of sport. (source: https://media.specialolympics.org/soi/files/press-kit/2014_FactSheet_Final.pdf)'
  },
  {
    id: 'ablebodied',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'non-disabled': 'a'
    },
    inconsiderate: {
      ablebodied: 'a'
    },
    note: 'Can imply that people with disabilities lack the ability to use their bodies well. Sometimes `typical` can be used. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'addict',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with a drug addiction': 'a',
      'person recovering from a drug addiction': 'a'
    },
    inconsiderate: {
      addict: 'a',
      junkie: 'a'
    },
    note: 'Addiction is a neurobiological disease. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'addicts',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'people with a drug addiction': 'a',
      'people recovering from a drug addiction': 'a'
    },
    inconsiderate: {
      addicts: 'a',
      junkies: 'a'
    },
    note: 'Addiction is a neurobiological disease. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'alcoholic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'someone with an alcohol problem': 'a'
    },
    inconsiderate: {
      alcoholic: 'a',
      'alcohol abuser': 'a'
    },
    note: 'Alcoholism is a neurobiological disease. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'deafmute',
    type: 'basic',
    categories: ['a'],
    considerate: {
      deaf: 'a'
    },
    inconsiderate: {
      'deaf and dumb': 'a',
      deafmute: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'senile',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with dementia': 'a'
    },
    inconsiderate: {
      demented: 'a',
      senile: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'depressed',
    type: 'basic',
    categories: ['a'],
    considerate: {
      sad: 'a',
      blue: 'a',
      'bummed out': 'a',
      'person with seasonal affective disorder': 'a',
      'person with psychotic depression': 'a',
      'person with postpartum depression': 'a'
    },
    inconsiderate: {
      depressed: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'dwarf',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with dwarfism': 'a',
      'little person': 'a',
      'little people': 'a',
      LP: 'a',
      'person of short stature': 'a'
    },
    inconsiderate: {
      'vertically challenged': 'a',
      midget: 'a',
      'small person': 'a',
      dwarf: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/,https://www.lpaonline.org/faq-#Midget'
  },
  {
    id: 'dyslexic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with dyslexia': 'a'
    },
    inconsiderate: {
      dyslexic: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'epileptic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with epilepsy': 'a'
    },
    inconsiderate: {
      epileptic: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'hearing-impaired',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'hard of hearing': 'a',
      'partially deaf': 'a',
      'partial hearing loss': 'a',
      deaf: 'a'
    },
    inconsiderate: {
      'hearing impaired': 'a',
      'hearing impairment': 'a'
    },
    note: 'When possible, ask the person what they prefer. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'victim-of-polio',
    type: 'basic',
    categories: ['a'],
    considerate: {
      polio: 'a',
      'person who had polio': 'a'
    },
    inconsiderate: {
      'infantile paralysis': 'a',
      'suffers from polio': 'a',
      'suffering from polio': 'a',
      'suffering from a polio': 'a',
      'afflicted with polio': 'a',
      'afflicted with a polio': 'a',
      'victim of polio': 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'victim-of-an-injury',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'sustain an injury': 'a',
      'receive an injury': 'a'
    },
    inconsiderate: {
      'suffer from an injury': 'a',
      'suffers from an injury': 'a',
      'suffering from an injury': 'a',
      'afflicted with an injury': 'a',
      'victim of an injury': 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'victim-of-injuries',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'sustain injuries': 'a',
      'receive injuries': 'a'
    },
    inconsiderate: {
      'suffer from injuries': 'a',
      'suffers from injuries': 'a',
      'suffering from injuries': 'a',
      'afflicted with injuries': 'a',
      'victim of injuries': 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'paraplegic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with paraplegia': 'a'
    },
    inconsiderate: {
      paraplegic: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'quadriplegic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with quadriplegia': 'a'
    },
    inconsiderate: {
      quadriplegic: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'spaz',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with cerebral palsy': 'a',
      twitch: 'a',
      flinch: 'a',
      hectic: 'a'
    },
    inconsiderate: {
      spaz: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'spastic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with cerebral palsy': 'a',
      twitch: 'a',
      flinch: 'a'
    },
    inconsiderate: {
      spastic: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'stammering',
    type: 'basic',
    categories: ['a'],
    considerate: {
      stuttering: 'a',
      'disfluency of speech': 'a'
    },
    inconsiderate: {
      stammering: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'stutterer',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person who stutters': 'a'
    },
    inconsiderate: {
      stutterer: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'tourettes-syndrome',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Tourette syndrome': 'a'
    },
    inconsiderate: {
      'tourettes syndrome': 'a',
      'tourettes disorder': 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'rehab-center',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'treatment center': 'a'
    },
    inconsiderate: {
      'rehab center': 'a',
      'detox center': 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'rehab',
    type: 'basic',
    categories: ['a'],
    considerate: {
      treatment: 'a'
    },
    inconsiderate: {
      rehab: 'a',
      detox: 'a'
    },
    note: 'Source: https://ncdj.org/style-guide/'
  },
  {
    id: 'sociopath',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with a personality disorder': 'a',
      'person with psychopathic personality': 'a'
    },
    inconsiderate: {
      sociopath: 'a'
    },
    note: 'Only use terms describing mental illness when referring to a professionally diagnosed medical condition. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'sociopaths',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'people with psychopathic personalities': 'a',
      'people with a personality disorder': 'a'
    },
    inconsiderate: {
      sociopaths: 'a'
    },
    note: 'Only use terms describing mental illness when referring to a professionally diagnosed medical condition. (source: https://ncdj.org/style-guide/)'
  },
  {
    id: 'dumb',
    type: 'basic',
    categories: ['a'],
    considerate: {
      foolish: 'a',
      ludicrous: 'a',
      speechless: 'a',
      silent: 'a'
    },
    inconsiderate: {
      dumb: 'a'
    },
    note: 'Dumb here is used in 2 different contexts , the inability to talk or as a curse word. (source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html)'
  },
  {
    id: 'wacko',
    type: 'basic',
    categories: ['a'],
    considerate: {
      foolish: 'a',
      ludicrous: 'a',
      unintelligent: 'a'
    },
    inconsiderate: {
      simpleton: 'a',
      stupid: 'a',
      wacko: 'a',
      whacko: 'a',
      'low iq': 'a'
    },
    note: 'Source: http://www.mmonjejr.com/2014/02/deconstructing-stupid.html'
  },
  {
    id: 'panic-attack',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'fit of terror': 'a',
      scare: 'a'
    },
    inconsiderate: {
      'panic attack': 'a'
    }
  },
  {
    id: 'bony',
    type: 'basic',
    categories: ['a'],
    considerate: {
      thin: 'a',
      slim: 'a'
    },
    inconsiderate: {
      anorexic: 'a',
      bony: 'a'
    }
  },
  {
    id: 'ocd',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'has an anxiety disorder': 'a',
      obsessive: 'a',
      pedantic: 'a',
      niggly: 'a',
      picky: 'a'
    },
    inconsiderate: {
      neurotic: 'a',
      ocd: 'a',
      'o.c.d': 'a',
      'o.c.d.': 'a'
    },
    note: 'Only use terms describing mental illness when referring to a professionally diagnosed medical condition. (source: https://english.stackexchange.com/questions/247550/)'
  },
  {
    id: 'insomnia',
    type: 'basic',
    categories: ['a'],
    considerate: {
      restlessness: 'a',
      sleeplessness: 'a'
    },
    inconsiderate: {
      insomnia: 'a'
    }
  },
  {
    id: 'insomniac',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person who has insomnia': 'a'
    },
    inconsiderate: {
      insomniac: 'a'
    }
  },
  {
    id: 'insomniacs',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'people who have insomnia': 'a'
    },
    inconsiderate: {
      insomniacs: 'a'
    }
  },
  {
    id: 'barren',
    type: 'basic',
    categories: ['a'],
    considerate: {
      empty: 'a',
      sterile: 'a',
      infertile: 'a'
    },
    inconsiderate: {
      barren: 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'deaf-to',
    type: 'basic',
    categories: ['a'],
    considerate: {
      careless: 'a',
      heartless: 'a',
      indifferent: 'a',
      insensitive: 'a'
    },
    inconsiderate: {
      'blind to': 'a',
      'blind eye to': 'a',
      'blinded by': 'a',
      'deaf to': 'a',
      'deaf ear to': 'a',
      'deafened by': 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'cretin',
    type: 'basic',
    categories: ['a'],
    considerate: {
      creep: 'a',
      fool: 'a'
    },
    inconsiderate: {
      cretin: 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'daft',
    type: 'basic',
    categories: ['a'],
    considerate: {
      absurd: 'a',
      foolish: 'a'
    },
    inconsiderate: {
      daft: 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'idiot',
    type: 'basic',
    categories: ['a'],
    considerate: {
      foolish: 'a',
      ludicrous: 'a',
      silly: 'a'
    },
    inconsiderate: {
      feebleminded: 'a',
      'feeble minded': 'a',
      idiot: 'a',
      imbecile: 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'harelipped',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with a cleft-lip and palate': 'a'
    },
    inconsiderate: {
      harelipped: 'a',
      cleftlipped: 'a'
    },
    note: "Sometimes it's cleft lip or palate, not both. Specify when possible. (source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html)"
  },
  {
    id: 'harelip',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'cleft-lip and palate': 'a'
    },
    inconsiderate: {
      harelip: 'a',
      'hare lip': 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'maniac',
    type: 'basic',
    categories: ['a'],
    considerate: {
      fanatic: 'a',
      zealot: 'a',
      enthusiast: 'a'
    },
    inconsiderate: {
      maniac: 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'buckteeth',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person with prominent teeth': 'a',
      'prominent teeth': 'a'
    },
    inconsiderate: {
      bucktoothed: 'a',
      buckteeth: 'a'
    }
  },
  {
    id: 'special',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'has a disability': 'a',
      'person with a disability': 'a',
      'people with disabilities': 'a'
    },
    inconsiderate: {
      challenged: 'a',
      diffability: 'a',
      'differently abled': 'a',
      handicapable: 'a',
      special: 'a',
      'special needs': 'a',
      'specially abled': 'a'
    },
    note: 'Euphemisms for disabilities can be infantilizing. (source: http://cdrnys.org/blog/disability-dialogue/the-disability-dialogue-4-disability-euphemisms-that-need-to-bite-the-dust/,https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html)'
  },
  {
    id: 'libtard',
    type: 'basic',
    categories: ['a'],
    considerate: {
      disagreeable: 'a',
      uneducated: 'a',
      ignorant: 'a',
      naive: 'a',
      inconsiderate: 'a'
    },
    inconsiderate: {
      fucktard: 'a',
      libtard: 'a',
      contard: 'a'
    },
    note: 'Source: https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html'
  },
  {
    id: 'add',
    type: 'basic',
    categories: ['a'],
    considerate: {
      disorganized: 'a',
      distracted: 'a',
      energetic: 'a',
      hyperactive: 'a',
      impetuous: 'a',
      impulsive: 'a',
      inattentive: 'a',
      restless: 'a',
      unfocused: 'a'
    },
    inconsiderate: {
      ADD: 'a',
      adhd: 'a',
      'a.d.d.': 'a',
      'a.d.h.d.': 'a'
    }
  },
  {
    id: 'dummy',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'test double': 'a',
      placeholder: 'a',
      fake: 'a',
      stub: 'a'
    },
    inconsiderate: {
      dummyvariable: 'a',
      dummyvalue: 'a',
      dummyobject: 'a',
      dummy: 'a'
    },
    note: 'Dummy can refer to the inability to talk or be used as a derogatory word meaning stupid. In computer programming it is used where a value or behavior is unimportant. There are better alternatives for other use cases also.'
  },
  {
    id: 'binge',
    type: 'basic',
    categories: ['a'],
    considerate: {
      enthusiastic: 'a',
      spree: 'a'
    },
    inconsiderate: {
      binge: 'a'
    },
    note: 'Binge might be insensitive towards folks with eating or drinking disorders (source: https://github.com/retextjs/retext-equality/issues/110)'
  },
  {
    id: 'obvious',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      obvious: 'a',
      obviously: 'a'
    },
    note: 'Not everything is as obvious as you might think. And if it isn’t obvious to the reader, it can hurt. (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'just',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      just: 'a'
    },
    note: 'Not everything is as easy as you might think. And if it isn’t easy for the reader, it can hurt. (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'basically',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      basically: 'a'
    },
    note: 'It’s probably not that basic. If you’re going to explain a confusing previous sentence with a clearer next sentence, why not drop the former and only use the latter? (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'simple',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      simple: 'a',
      simply: 'a'
    },
    note: 'It’s probably not that simple. Even if it is, you probably don’t need to specifically say it. (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'easy',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      easy: 'a',
      easily: 'a'
    },
    note: 'It’s probably not that easy. Even if it is, you probably don’t need to specifically say it. (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'of-course',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      'of course': 'a'
    },
    note: 'If it’s self-evident then maybe you don’t need to describe it. If it isn’t, don’t say it. (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'clearly',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      clearly: 'a'
    },
    note: 'If it’s self-evident then maybe you don’t need to describe it. If it isn’t, don’t say it. (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'everyone-knows',
    type: 'basic',
    categories: ['a'],
    inconsiderate: {
      'everyone knows': 'a'
    },
    note: 'If it’s self-evident then maybe you don’t need to describe it. If it isn’t, don’t say it. (source: https://css-tricks.com/words-avoid-educational-writing/)'
  },
  {
    id: 'her-him',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      their: 'a',
      theirs: 'a',
      them: 'a'
    },
    inconsiderate: {
      her: 'female',
      hers: 'female',
      him: 'male',
      his: 'male'
    },
    condition: 'when referring to a person'
  },
  {
    id: 'he-she',
    type: 'or',
    apostrophe: true,
    categories: ['female', 'male'],
    considerate: {
      they: 'a',
      it: 'a'
    },
    inconsiderate: {
      she: 'female',
      he: 'male',
      "she'd": 'female',
      "he'd": 'male',
      "she'll": 'female',
      "he'll": 'male',
      "she's": 'female',
      "he's": 'male'
    }
  },
  {
    id: 'herself-himself',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      themselves: 'a',
      theirself: 'a',
      self: 'a'
    },
    inconsiderate: {
      herself: 'female',
      himself: 'male'
    }
  },
  {
    id: 'boy-girl',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      kid: 'a',
      child: 'a',
      youth: 'a'
    },
    inconsiderate: {
      girl: 'female',
      boy: 'male'
    },
    condition: 'when referring to a person'
  },
  {
    id: 'gals-man',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      people: 'a',
      persons: 'a',
      folks: 'a'
    },
    inconsiderate: {
      women: 'female',
      girls: 'female',
      gals: 'female',
      ladies: 'female',
      man: 'male',
      boys: 'male',
      men: 'male',
      guys: 'male',
      dudes: 'male',
      gents: 'male',
      gentlemen: 'male'
    }
  },
  {
    id: 'gal-guy',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      person: 'a',
      friend: 'a',
      pal: 'a',
      folk: 'a',
      individual: 'a'
    },
    inconsiderate: {
      woman: 'female',
      gal: 'female',
      lady: 'female',
      babe: 'female',
      bimbo: 'female',
      chick: 'female',
      guy: 'male',
      lad: 'male',
      fellow: 'male',
      dude: 'male',
      bro: 'male',
      gentleman: 'male'
    }
  },
  {
    id: 'fatherland-motherland',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'native land': 'a',
      homeland: 'a'
    },
    inconsiderate: {
      motherland: 'female',
      fatherland: 'male'
    }
  },
  {
    id: 'father-tongue-mother-tongue',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'native tongue': 'a',
      'native language': 'a'
    },
    inconsiderate: {
      'mother tongue': 'female',
      'father tongue': 'male'
    }
  },
  {
    id: 'freshmen-freshwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'first-year students': 'a',
      freshers: 'a'
    },
    inconsiderate: {
      freshwomen: 'female',
      freshmen: 'male'
    }
  },
  {
    id: 'garbageman-garbagewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'garbage collector': 'a',
      'waste collector': 'a',
      'trash collector': 'a'
    },
    inconsiderate: {
      garbagewoman: 'female',
      garbageman: 'male'
    }
  },
  {
    id: 'garbagemen-garbagewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'garbage collectors': 'a',
      'waste collectors': 'a',
      'trash collectors': 'a'
    },
    inconsiderate: {
      garbagewomen: 'female',
      garbagemen: 'male'
    }
  },
  {
    id: 'chairman-chairwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      chair: 'a',
      head: 'a',
      chairperson: 'a',
      coordinator: 'a',
      'committee head': 'a',
      moderator: 'a',
      'presiding officer': 'a'
    },
    inconsiderate: {
      chairwoman: 'female',
      chairman: 'male'
    }
  },
  {
    id: 'committee-man-committee-woman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'committee member': 'a'
    },
    inconsiderate: {
      'committee woman': 'female',
      'committee man': 'male'
    }
  },
  {
    id: 'cowboy-cowgirl',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      cowhand: 'a'
    },
    inconsiderate: {
      cowgirl: 'female',
      cowboy: 'male'
    }
  },
  {
    id: 'cowboys-cowgirls',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      cowhands: 'a'
    },
    inconsiderate: {
      cowgirls: 'female',
      cowboys: 'male'
    }
  },
  {
    id: 'cattleman-cattlewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'cattle rancher': 'a'
    },
    inconsiderate: {
      cattlewoman: 'female',
      cattleman: 'male'
    }
  },
  {
    id: 'cattlemen-cattlewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'cattle ranchers': 'a'
    },
    inconsiderate: {
      cattlewomen: 'female',
      cattlemen: 'male'
    }
  },
  {
    id: 'chairmen-chairwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      chairs: 'a',
      chairpersons: 'a',
      coordinators: 'a'
    },
    inconsiderate: {
      chairwomen: 'female',
      chairmen: 'male'
    }
  },
  {
    id: 'postman-postwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'mail carrier': 'a',
      'letter carrier': 'a',
      'postal worker': 'a'
    },
    inconsiderate: {
      postwoman: 'female',
      mailwoman: 'female',
      postman: 'male',
      mailman: 'male'
    }
  },
  {
    id: 'postmen-postwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'mail carriers': 'a',
      'letter carriers': 'a',
      'postal workers': 'a'
    },
    inconsiderate: {
      postwomen: 'female',
      mailwomen: 'female',
      postmen: 'male',
      mailmen: 'male'
    }
  },
  {
    id: 'chick-cop-policeman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      officer: 'a',
      'police officer': 'a'
    },
    inconsiderate: {
      policewoman: 'female',
      policeman: 'male',
      'chick cop': 'female'
    }
  },
  {
    id: 'policemen-policewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      officers: 'a',
      'police officers': 'a'
    },
    inconsiderate: {
      policewomen: 'female',
      policemen: 'male'
    }
  },
  {
    id: 'steward-stewardess',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'flight attendant': 'a'
    },
    inconsiderate: {
      stewardess: 'female',
      steward: 'male'
    }
  },
  {
    id: 'stewardesses-stewards',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'flight attendants': 'a'
    },
    inconsiderate: {
      stewardesses: 'female',
      stewards: 'male'
    }
  },
  {
    id: 'congressman-congresswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'member of congress': 'a',
      'congress person': 'a',
      legislator: 'a',
      representative: 'a'
    },
    inconsiderate: {
      congresswoman: 'female',
      congressman: 'male'
    }
  },
  {
    id: 'congressmen-congresswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'members of congress': 'a',
      'congress persons': 'a',
      legislators: 'a',
      representatives: 'a'
    },
    inconsiderate: {
      congresswomen: 'female',
      congressmen: 'male'
    }
  },
  {
    id: 'fireman-firewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'fire fighter': 'a',
      'fire officer': 'a'
    },
    inconsiderate: {
      firewoman: 'female',
      fireman: 'male'
    }
  },
  {
    id: 'firemen-firewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'fire fighters': 'a'
    },
    inconsiderate: {
      firewomen: 'female',
      firemen: 'male'
    }
  },
  {
    id: 'fisherman-fisherwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      fisher: 'a',
      'crew member': 'a',
      fisherfolk: 'a',
      angler: 'a'
    },
    inconsiderate: {
      fisherwoman: 'female',
      fisherman: 'male'
    }
  },
  {
    id: 'fishermen-fisherwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      fishers: 'a'
    },
    inconsiderate: {
      fisherwomen: 'female',
      fishermen: 'male'
    }
  },
  {
    id: 'brotherhood-sisterhood',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      kinship: 'a',
      community: 'a'
    },
    inconsiderate: {
      sisterhood: 'female',
      brotherhood: 'male'
    }
  },
  {
    id: 'common-girl-common-man',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'common person': 'a',
      'average person': 'a'
    },
    inconsiderate: {
      'common girl': 'female',
      'common man': 'male'
    }
  },
  {
    id: 'salaryman-salarywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'business executive': 'a',
      entrepreneur: 'a',
      'business person': 'a',
      professional: 'a'
    },
    inconsiderate: {
      businesswoman: 'female',
      salarywoman: 'female',
      businessman: 'male',
      salaryman: 'male'
    }
  },
  {
    id: 'salarymen-salarywomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'business executives': 'a',
      entrepreneurs: 'a'
    },
    inconsiderate: {
      businesswomen: 'female',
      salarywomen: 'female',
      'career girl': 'female',
      'career woman': 'female',
      businessmen: 'male',
      salarymen: 'male'
    }
  },
  {
    id: 'janitor-janitress',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      cleaner: 'a'
    },
    inconsiderate: {
      'cleaning lady': 'female',
      'cleaning girl': 'female',
      'cleaning woman': 'female',
      janitress: 'female',
      'cleaning man': 'male',
      'cleaning boy': 'male',
      janitor: 'male'
    }
  },
  {
    id: 'janitors-janitresses',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      cleaners: 'a',
      housekeeping: 'a'
    },
    inconsiderate: {
      'cleaning ladies': 'female',
      'cleaning girls': 'female',
      janitresses: 'female',
      'cleaning men': 'male',
      janitors: 'male'
    }
  },
  {
    id: 'delivery-boy-delivery-girl',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      courier: 'a',
      messenger: 'a'
    },
    inconsiderate: {
      'delivery girl': 'female',
      'delivery boy': 'male'
    }
  },
  {
    id: 'foreman-forewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      supervisor: 'a',
      'shift boss': 'a'
    },
    inconsiderate: {
      forewoman: 'female',
      foreman: 'male'
    }
  },
  {
    id: 'frontman,-front-man-frontwoman,-front-woman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      lead: 'a',
      front: 'a',
      figurehead: 'a'
    },
    inconsiderate: {
      'frontwoman, front woman': 'female',
      'frontman, front man': 'male'
    }
  },
  {
    id: 'front-men,-frontmen-front-women,-frontwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      figureheads: 'a'
    },
    inconsiderate: {
      'front women, frontwomen': 'female',
      'front men, frontmen': 'male'
    }
  },
  {
    id: 'foremen-forewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      supervisors: 'a',
      'shift bosses': 'a'
    },
    inconsiderate: {
      forewomen: 'female',
      foremen: 'male'
    }
  },
  {
    id: 'insurance-man-insurance-woman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'insurance agent': 'a'
    },
    inconsiderate: {
      'insurance woman': 'female',
      'insurance man': 'male'
    }
  },
  {
    id: 'insurance-men-insurance-women',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'insurance agents': 'a'
    },
    inconsiderate: {
      'insurance women': 'female',
      'insurance men': 'male'
    }
  },
  {
    id: 'landlady-landlord',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      proprietor: 'a',
      'building manager': 'a'
    },
    inconsiderate: {
      landlady: 'female',
      landlord: 'male'
    }
  },
  {
    id: 'landladies-landlords',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      proprietors: 'a',
      'building managers': 'a'
    },
    inconsiderate: {
      landladies: 'female',
      landlords: 'male'
    }
  },
  {
    id: 'alumna-alumnus',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      graduate: 'a'
    },
    inconsiderate: {
      alumna: 'female',
      alumnus: 'male'
    }
  },
  {
    id: 'alumnae-alumni',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      graduates: 'a'
    },
    inconsiderate: {
      alumnae: 'female',
      alumni: 'male'
    }
  },
  {
    id: 'newsman-newswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      anchor: 'a',
      journalist: 'a'
    },
    inconsiderate: {
      newswoman: 'female',
      newspaperwoman: 'female',
      anchorwoman: 'female',
      newsman: 'male',
      newspaperman: 'male',
      anchorman: 'male'
    }
  },
  {
    id: 'newsmen-newswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      anchors: 'a',
      journalists: 'a'
    },
    inconsiderate: {
      newswomen: 'female',
      newspaperwomen: 'female',
      anchorwomen: 'female',
      newsmen: 'male',
      newspapermen: 'male',
      anchormen: 'male'
    }
  },
  {
    id: 'repairman-repairwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      repairer: 'a',
      technician: 'a'
    },
    inconsiderate: {
      repairwoman: 'female',
      repairman: 'male'
    }
  },
  {
    id: 'repairmen-repairwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      technicians: 'a'
    },
    inconsiderate: {
      repairwomen: 'female',
      repairmen: 'male'
    }
  },
  {
    id: 'saleslady-salesman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      salesperson: 'a',
      'sales clerk': 'a',
      'sales rep': 'a',
      'sales agent': 'a',
      'sales attendant': 'a',
      seller: 'a',
      'shop assistant': 'a'
    },
    inconsiderate: {
      saleswoman: 'female',
      'sales woman': 'female',
      saleslady: 'female',
      salesman: 'male',
      'sales man': 'male'
    }
  },
  {
    id: 'salesmen-saleswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'sales clerks': 'a',
      'sales reps': 'a',
      'sales agents': 'a',
      sellers: 'a'
    },
    inconsiderate: {
      saleswomen: 'female',
      'sales women': 'female',
      salesladies: 'female',
      salesmen: 'male',
      'sales men': 'male'
    }
  },
  {
    id: 'serviceman-servicewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      soldier: 'a',
      'service representative': 'a'
    },
    inconsiderate: {
      servicewoman: 'female',
      serviceman: 'male'
    }
  },
  {
    id: 'servicemen-servicewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      soldiers: 'a',
      'service representatives': 'a'
    },
    inconsiderate: {
      servicewomen: 'female',
      servicemen: 'male'
    }
  },
  {
    id: 'waiter-waitress',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      server: 'a'
    },
    inconsiderate: {
      waitress: 'female',
      waiter: 'male'
    }
  },
  {
    id: 'waiters-waitresses',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      servers: 'a'
    },
    inconsiderate: {
      waitresses: 'female',
      waiters: 'male'
    }
  },
  {
    id: 'workman-workwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      worker: 'a',
      'wage earner': 'a',
      taxpayer: 'a'
    },
    inconsiderate: {
      workwoman: 'female',
      'working woman': 'female',
      workman: 'male',
      'working man': 'male'
    }
  },
  {
    id: 'workmen-workwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      workers: 'a'
    },
    inconsiderate: {
      workwomen: 'female',
      workmen: 'male'
    }
  },
  {
    id: 'actor-actress',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      performer: 'a',
      star: 'a',
      artist: 'a',
      entertainer: 'a'
    },
    inconsiderate: {
      actress: 'female',
      actor: 'male'
    }
  },
  {
    id: 'actors-actresses',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      performers: 'a',
      stars: 'a',
      artists: 'a',
      entertainers: 'a'
    },
    inconsiderate: {
      actresses: 'female',
      actors: 'male'
    }
  },
  {
    id: 'aircrewwoman-airman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      pilot: 'a',
      aviator: 'a',
      airstaff: 'a'
    },
    inconsiderate: {
      aircrewwoman: 'female',
      'aircrew woman': 'female',
      aircrewman: 'male',
      airman: 'male'
    }
  },
  {
    id: 'aircrewwomen-airmen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      pilots: 'a',
      aviators: 'a',
      airstaff: 'a'
    },
    inconsiderate: {
      aircrewwomen: 'female',
      'aircrew women': 'female',
      aircrewmen: 'male',
      airmen: 'male'
    }
  },
  {
    id: 'alderman-alderwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'cabinet member': 'a'
    },
    inconsiderate: {
      alderwoman: 'female',
      alderman: 'male'
    }
  },
  {
    id: 'aldermen-alderwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      cabinet: 'a',
      'cabinet members': 'a',
      alderperson: 'a'
    },
    inconsiderate: {
      alderwomen: 'female',
      aldermen: 'male'
    }
  },
  {
    id: 'assemblyman-assemblywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'assembly person': 'a',
      'assembly worker': 'a'
    },
    inconsiderate: {
      assemblywoman: 'female',
      assemblyman: 'male'
    }
  },
  {
    id: 'aunt-uncle',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      relative: 'a'
    },
    inconsiderate: {
      kinswoman: 'female',
      aunt: 'female',
      kinsman: 'male',
      uncle: 'male'
    }
  },
  {
    id: 'aunts-uncles',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      relatives: 'a'
    },
    inconsiderate: {
      kinswomen: 'female',
      aunts: 'female',
      kinsmen: 'male',
      uncles: 'male'
    }
  },
  {
    id: 'boogeyman-boogeywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      boogeymonster: 'a'
    },
    inconsiderate: {
      boogeywoman: 'female',
      boogeyman: 'male'
    }
  },
  {
    id: 'boogieman-boogiewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      boogeymonster: 'a'
    },
    inconsiderate: {
      boogiewoman: 'female',
      boogieman: 'male'
    }
  },
  {
    id: 'bogeyman-bogeywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      bogeymonster: 'a'
    },
    inconsiderate: {
      bogeywoman: 'female',
      bogeyman: 'male'
    }
  },
  {
    id: 'bogieman-bogiewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      bogeymonster: 'a'
    },
    inconsiderate: {
      bogiewoman: 'female',
      bogieman: 'male'
    }
  },
  {
    id: 'boogiemen-boogiewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      boogeymonsters: 'a'
    },
    inconsiderate: {
      boogiewomen: 'female',
      boogiemen: 'male'
    }
  },
  {
    id: 'bogiemen-bogiewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      bogeymonsters: 'a'
    },
    inconsiderate: {
      bogiewomen: 'female',
      bogiemen: 'male'
    }
  },
  {
    id: 'bondsman-bondswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      bonder: 'a'
    },
    inconsiderate: {
      bondswoman: 'female',
      bondsman: 'male'
    }
  },
  {
    id: 'bondsmen-bondswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      bonders: 'a'
    },
    inconsiderate: {
      bondswomen: 'female',
      bondsmen: 'male'
    }
  },
  {
    id: 'husband-wife',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      partner: 'a',
      'significant other': 'a',
      spouse: 'a'
    },
    inconsiderate: {
      wife: 'female',
      husband: 'male'
    },
    note: 'Source: https://www.bustle.com/articles/108321-6-reasons-to-refer-to-your-significant-other-as-your-partner'
  },
  {
    id: 'husbands-wives',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      partners: 'a',
      'significant others': 'a',
      spouses: 'a'
    },
    inconsiderate: {
      wives: 'female',
      husbands: 'male'
    },
    note: 'Source: https://www.bustle.com/articles/108321-6-reasons-to-refer-to-your-significant-other-as-your-partner'
  },
  {
    id: 'boyfriend-girlfriend',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      partner: 'a',
      friend: 'a',
      'significant other': 'a'
    },
    inconsiderate: {
      girlfriend: 'female',
      boyfriend: 'male'
    },
    note: 'Source: https://www.bustle.com/articles/108321-6-reasons-to-refer-to-your-significant-other-as-your-partner'
  },
  {
    id: 'boyfriends-girlfriends',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      partners: 'a',
      friends: 'a',
      'significant others': 'a'
    },
    inconsiderate: {
      girlfriends: 'female',
      boyfriends: 'male'
    },
    note: 'Source: https://www.bustle.com/articles/108321-6-reasons-to-refer-to-your-significant-other-as-your-partner'
  },
  {
    id: 'boyhood-girlhood',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      childhood: 'a'
    },
    inconsiderate: {
      girlhood: 'female',
      boyhood: 'male'
    }
  },
  {
    id: 'boyish-girly',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      childish: 'a'
    },
    inconsiderate: {
      girly: 'female',
      girlish: 'female',
      boyish: 'male'
    }
  },
  {
    id: 'journeyman-journeywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      journeyperson: 'a'
    },
    inconsiderate: {
      journeywoman: 'female',
      journeyman: 'male'
    }
  },
  {
    id: 'journeymen-journeywomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      journeypersons: 'a'
    },
    inconsiderate: {
      journeywomen: 'female',
      journeymen: 'male'
    }
  },
  {
    id: 'godfather-godmother',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      godparent: 'a',
      elder: 'a',
      patron: 'a'
    },
    inconsiderate: {
      godmother: 'female',
      patroness: 'female',
      godfather: 'male'
    }
  },
  {
    id: 'granddaughter-grandson',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      grandchild: 'a'
    },
    inconsiderate: {
      granddaughter: 'female',
      grandson: 'male'
    }
  },
  {
    id: 'granddaughters-grandsons',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      grandchildren: 'a'
    },
    inconsiderate: {
      granddaughters: 'female',
      grandsons: 'male'
    }
  },
  {
    id: 'forefather-foremother',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      ancestor: 'a'
    },
    inconsiderate: {
      foremother: 'female',
      forefather: 'male'
    }
  },
  {
    id: 'forefathers-foremothers',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      ancestors: 'a'
    },
    inconsiderate: {
      foremothers: 'female',
      forefathers: 'male'
    }
  },
  {
    id: 'gramps-granny',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      grandparent: 'a',
      ancestor: 'a'
    },
    inconsiderate: {
      granny: 'female',
      grandma: 'female',
      grandmother: 'female',
      grandpappy: 'male',
      granddaddy: 'male',
      gramps: 'male',
      grandpa: 'male',
      grandfather: 'male'
    }
  },
  {
    id: 'grandfathers-grandmothers',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      grandparents: 'a',
      ancestors: 'a'
    },
    inconsiderate: {
      grandmothers: 'female',
      grandfathers: 'male'
    }
  },
  {
    id: 'bride-groom',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      spouse: 'a',
      newlywed: 'a'
    },
    inconsiderate: {
      bride: 'female',
      groom: 'male'
    }
  },
  {
    id: 'brother-sister',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      sibling: 'a'
    },
    inconsiderate: {
      sister: 'female',
      brother: 'male'
    }
  },
  {
    id: 'brothers-sisters',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      siblings: 'a'
    },
    inconsiderate: {
      sisters: 'female',
      brothers: 'male'
    }
  },
  {
    id: 'cameraman-camerawoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'camera operator': 'a',
      'camera person': 'a'
    },
    inconsiderate: {
      camerawoman: 'female',
      cameraman: 'male'
    }
  },
  {
    id: 'cameramen-camerawomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'camera operators': 'a'
    },
    inconsiderate: {
      camerawomen: 'female',
      cameramen: 'male'
    }
  },
  {
    id: 'caveman-cavewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      troglodyte: 'a',
      hominidae: 'a'
    },
    inconsiderate: {
      cavewoman: 'female',
      caveman: 'male'
    }
  },
  {
    id: 'cavemen-cavewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      troglodytae: 'a',
      troglodyti: 'a',
      troglodytes: 'a',
      hominids: 'a'
    },
    inconsiderate: {
      cavewomen: 'female',
      cavemen: 'male'
    }
  },
  {
    id: 'clergyman-clergywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      clergyperson: 'a',
      clergy: 'a',
      cleric: 'a'
    },
    inconsiderate: {
      clergywoman: 'female',
      clergyman: 'male'
    }
  },
  {
    id: 'clergymen-clergywomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      clergies: 'a',
      clerics: 'a'
    },
    inconsiderate: {
      clergywomen: 'female',
      clergymen: 'male'
    }
  },
  {
    id: 'councilman-councilwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'council member': 'a'
    },
    inconsiderate: {
      councilwoman: 'female',
      councilman: 'male'
    }
  },
  {
    id: 'councilmen-councilwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'council members': 'a'
    },
    inconsiderate: {
      councilwomen: 'female',
      councilmen: 'male'
    }
  },
  {
    id: 'countryman-countrywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'country person': 'a'
    },
    inconsiderate: {
      countrywoman: 'female',
      countryman: 'male'
    }
  },
  {
    id: 'countrymen-countrywomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'country folk': 'a'
    },
    inconsiderate: {
      countrywomen: 'female',
      countrymen: 'male'
    }
  },
  {
    id: 'handyman-handywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      artisan: 'a',
      craftsperson: 'a',
      'skilled worker': 'a'
    },
    inconsiderate: {
      handywoman: 'female',
      craftswoman: 'female',
      handyman: 'male',
      craftsman: 'male'
    }
  },
  {
    id: 'host-hostess',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      presenter: 'a',
      entertainer: 'a',
      emcee: 'a'
    },
    inconsiderate: {
      hostess: 'female',
      host: 'male'
    }
  },
  {
    id: 'hostesses-hosts',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      presenters: 'a',
      entertainers: 'a',
      emcees: 'a'
    },
    inconsiderate: {
      hostesses: 'female',
      hosts: 'male'
    }
  },
  {
    id: 'handymen-handywomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      artisans: 'a',
      craftspersons: 'a',
      'skilled workers': 'a'
    },
    inconsiderate: {
      handywomen: 'female',
      craftswomen: 'female',
      handymen: 'male',
      craftsmen: 'male'
    }
  },
  {
    id: 'hangman-hangwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      guillotine: 'a'
    },
    inconsiderate: {
      hangwoman: 'female',
      hangman: 'male'
    }
  },
  {
    id: 'hangmen-hangwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      guillotines: 'a'
    },
    inconsiderate: {
      hangwomen: 'female',
      hangmen: 'male'
    }
  },
  {
    id: 'henchman-henchwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      sidekick: 'a'
    },
    inconsiderate: {
      henchwoman: 'female',
      henchman: 'male'
    }
  },
  {
    id: 'henchmen-henchwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      sidekicks: 'a'
    },
    inconsiderate: {
      henchwomen: 'female',
      henchmen: 'male'
    }
  },
  {
    id: 'hero-heroine',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'role-model': 'a',
      mentor: 'a'
    },
    inconsiderate: {
      heroine: 'female',
      hero: 'male'
    }
  },
  {
    id: 'heroes-heroines',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'role-models': 'a',
      mentor: 'a'
    },
    inconsiderate: {
      heroines: 'female',
      heroes: 'male'
    }
  },
  {
    id: 'maternal-paternal',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      parental: 'a',
      warm: 'a',
      intimate: 'a'
    },
    inconsiderate: {
      maternal: 'female',
      paternal: 'male',
      fraternal: 'male'
    }
  },
  {
    id: 'maternity-paternity',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      parental: 'a'
    },
    inconsiderate: {
      maternity: 'female',
      paternity: 'male'
    }
  },
  {
    id: 'dads-moms',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      parents: 'a'
    },
    inconsiderate: {
      mamas: 'female',
      mothers: 'female',
      moms: 'female',
      mums: 'female',
      mommas: 'female',
      mommies: 'female',
      papas: 'male',
      fathers: 'male',
      dads: 'male',
      daddies: 'male'
    }
  },
  {
    id: 'dad-mom',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      parent: 'a'
    },
    inconsiderate: {
      mama: 'female',
      mother: 'female',
      mom: 'female',
      mum: 'female',
      momma: 'female',
      mommy: 'female',
      papa: 'male',
      father: 'male',
      dad: 'male',
      pop: 'male',
      daddy: 'male'
    }
  },
  {
    id: 'daughter-son',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      child: 'a'
    },
    inconsiderate: {
      daughter: 'female',
      son: 'male'
    }
  },
  {
    id: 'daughters-sons',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      children: 'a'
    },
    inconsiderate: {
      daughters: 'female',
      sons: 'male'
    }
  },
  {
    id: 'doorman-doorwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      concierge: 'a'
    },
    inconsiderate: {
      doorwoman: 'female',
      doorman: 'male'
    }
  },
  {
    id: 'doormen-doorwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      concierges: 'a'
    },
    inconsiderate: {
      doorwomen: 'female',
      doormen: 'male'
    }
  },
  {
    id: 'feminin-manly',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      humanly: 'a',
      mature: 'a'
    },
    inconsiderate: {
      feminin: 'female',
      dudely: 'male',
      manly: 'male'
    }
  },
  {
    id: 'females-males',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      humans: 'a'
    },
    inconsiderate: {
      females: 'female',
      males: 'male'
    }
  },
  {
    id: 'king-queen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      ruler: 'a'
    },
    inconsiderate: {
      empress: 'female',
      queen: 'female',
      emperor: 'male',
      king: 'male'
    }
  },
  {
    id: 'kings-queens',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      rulers: 'a'
    },
    inconsiderate: {
      empresses: 'female',
      queens: 'female',
      emperors: 'male',
      kings: 'male'
    }
  },
  {
    id: 'kingsize-queensize',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      jumbo: 'a',
      gigantic: 'a'
    },
    inconsiderate: {
      queensize: 'female',
      kingsize: 'male'
    }
  },
  {
    id: 'kingmaker-queenmaker',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'power behind the throne': 'a'
    },
    inconsiderate: {
      queenmaker: 'female',
      kingmaker: 'male'
    }
  },
  {
    id: 'layman-laywoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      civilian: 'a'
    },
    inconsiderate: {
      laywoman: 'female',
      layman: 'male'
    }
  },
  {
    id: 'laymen-laywomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      civilians: 'a'
    },
    inconsiderate: {
      laywomen: 'female',
      laymen: 'male'
    }
  },
  {
    id: 'dame-lord',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      official: 'a',
      owner: 'a',
      expert: 'a',
      superior: 'a',
      chief: 'a',
      ruler: 'a'
    },
    inconsiderate: {
      dame: 'female',
      lord: 'male'
    }
  },
  {
    id: 'dames-lords',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      officials: 'a',
      chiefs: 'a',
      rulers: 'a'
    },
    inconsiderate: {
      dames: 'female',
      lords: 'male'
    }
  },
  {
    id: 'manhood-womanhood',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      adulthood: 'a',
      personhood: 'a',
      maturity: 'a'
    },
    inconsiderate: {
      womanhood: 'female',
      masculinity: 'male',
      manhood: 'male'
    }
  },
  {
    id: 'femininity-manliness',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      humanity: 'a'
    },
    inconsiderate: {
      femininity: 'female',
      manliness: 'male'
    }
  },
  {
    id: 'marksman-markswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      shooter: 'a'
    },
    inconsiderate: {
      markswoman: 'female',
      marksman: 'male'
    }
  },
  {
    id: 'marksmen-markswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      shooters: 'a'
    },
    inconsiderate: {
      markswomen: 'female',
      marksmen: 'male'
    }
  },
  {
    id: 'middleman-middlewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      intermediary: 'a',
      'go-between': 'a'
    },
    inconsiderate: {
      middlewoman: 'female',
      middleman: 'male'
    }
  },
  {
    id: 'middlemen-middlewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      intermediaries: 'a',
      'go-betweens': 'a'
    },
    inconsiderate: {
      middlewomen: 'female',
      middlemen: 'male'
    }
  },
  {
    id: 'milkman-milkwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'milk person': 'a'
    },
    inconsiderate: {
      milkwoman: 'female',
      milkman: 'male'
    }
  },
  {
    id: 'milkmen-milkwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'milk people': 'a'
    },
    inconsiderate: {
      milkwomen: 'female',
      milkmen: 'male'
    }
  },
  {
    id: 'nephew-niece',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      nibling: 'a',
      'sibling’s child': 'a'
    },
    inconsiderate: {
      niece: 'female',
      nephew: 'male'
    }
  },
  {
    id: 'nephews-nieces',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      niblings: 'a',
      'sibling’s children': 'a'
    },
    inconsiderate: {
      nieces: 'female',
      nephews: 'male'
    }
  },
  {
    id: 'nobleman-noblewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      noble: 'a'
    },
    inconsiderate: {
      noblewoman: 'female',
      nobleman: 'male'
    }
  },
  {
    id: 'noblemen-noblewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      nobles: 'a'
    },
    inconsiderate: {
      noblewomen: 'female',
      noblemen: 'male'
    }
  },
  {
    id: 'ombudsman-ombudswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      notary: 'a',
      'consumer advocate': 'a',
      'trouble shooter': 'a',
      omsbudperson: 'a',
      mediator: 'a'
    },
    inconsiderate: {
      ombudswoman: 'female',
      ombudsman: 'male'
    }
  },
  {
    id: 'ombudsmen-ombudswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      notaries: 'a',
      omsbudpersons: 'a',
      omsbudpeople: 'a',
      mediators: 'a'
    },
    inconsiderate: {
      ombudswomen: 'female',
      ombudsmen: 'male'
    }
  },
  {
    id: 'prince-princess',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      heir: 'a'
    },
    inconsiderate: {
      princess: 'female',
      prince: 'male'
    }
  },
  {
    id: 'princes-princesses',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      heirs: 'a'
    },
    inconsiderate: {
      princesses: 'female',
      princes: 'male'
    }
  },
  {
    id: 'sandman-sandwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      fairy: 'a'
    },
    inconsiderate: {
      sandwoman: 'female',
      sandman: 'male'
    }
  },
  {
    id: 'sandmen-sandwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      fairies: 'a'
    },
    inconsiderate: {
      sandwomen: 'female',
      sandmen: 'male'
    }
  },
  {
    id: 'showman-showwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      promoter: 'a'
    },
    inconsiderate: {
      showwoman: 'female',
      showman: 'male'
    }
  },
  {
    id: 'showmen-showwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      promoters: 'a'
    },
    inconsiderate: {
      showwomen: 'female',
      'show women': 'female',
      showmen: 'male'
    }
  },
  {
    id: 'spaceman-spacewoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      astronaut: 'a'
    },
    inconsiderate: {
      spacewoman: 'female',
      spaceman: 'male'
    }
  },
  {
    id: 'spacemen-spacewomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      astronauts: 'a'
    },
    inconsiderate: {
      spacewomen: 'female',
      spacemen: 'male'
    }
  },
  {
    id: 'spokesman-spokeswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      speaker: 'a',
      spokesperson: 'a',
      representative: 'a'
    },
    inconsiderate: {
      spokeswoman: 'female',
      spokesman: 'male'
    }
  },
  {
    id: 'spokesmen-spokeswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      speakers: 'a',
      spokespersons: 'a'
    },
    inconsiderate: {
      spokeswomen: 'female',
      spokesmen: 'male'
    }
  },
  {
    id: 'sportsman-sportswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      athlete: 'a',
      'sports person': 'a'
    },
    inconsiderate: {
      sportswoman: 'female',
      sportsman: 'male'
    }
  },
  {
    id: 'sportsmen-sportswomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      athletes: 'a',
      'sports persons': 'a'
    },
    inconsiderate: {
      sportswomen: 'female',
      sportsmen: 'male'
    }
  },
  {
    id: 'statesman-stateswoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      senator: 'a'
    },
    inconsiderate: {
      stateswoman: 'female',
      statesman: 'male'
    }
  },
  {
    id: 'stepbrother-stepsister',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'step-sibling': 'a'
    },
    inconsiderate: {
      stepsister: 'female',
      stepbrother: 'male'
    }
  },
  {
    id: 'stepbrothers-stepsisters',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'step-siblings': 'a'
    },
    inconsiderate: {
      stepsisters: 'female',
      stepbrothers: 'male'
    }
  },
  {
    id: 'stepdad-stepmom',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'step-parent': 'a'
    },
    inconsiderate: {
      stepmom: 'female',
      stepmother: 'female',
      stepdad: 'male',
      stepfather: 'male'
    }
  },
  {
    id: 'stepfathers-stepmothers',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'step-parents': 'a'
    },
    inconsiderate: {
      stepmothers: 'female',
      stepfathers: 'male'
    }
  },
  {
    id: 'superman-superwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      titan: 'a'
    },
    inconsiderate: {
      superwoman: 'female',
      superman: 'male'
    }
  },
  {
    id: 'supermen-superwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      titans: 'a'
    },
    inconsiderate: {
      superwomen: 'female',
      supermen: 'male'
    }
  },
  {
    id: 'unmanly-unwomanly',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      inhumane: 'a'
    },
    inconsiderate: {
      unwomanly: 'female',
      unwomenly: 'female',
      unmanly: 'male',
      unmenly: 'male'
    }
  },
  {
    id: 'watchman-watchwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      watcher: 'a'
    },
    inconsiderate: {
      watchwoman: 'female',
      watchman: 'male'
    }
  },
  {
    id: 'watchmen-watchwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      watchers: 'a'
    },
    inconsiderate: {
      watchwomen: 'female',
      watchmen: 'male'
    }
  },
  {
    id: 'weatherman-weatherwoman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'weather forecaster': 'a',
      meteorologist: 'a'
    },
    inconsiderate: {
      weatherwoman: 'female',
      weatherman: 'male'
    }
  },
  {
    id: 'weathermen-weatherwomen',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'weather forecasters': 'a',
      meteorologists: 'a'
    },
    inconsiderate: {
      weatherwomen: 'female',
      weathermen: 'male'
    }
  },
  {
    id: 'widow-widower',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      bereaved: 'a'
    },
    inconsiderate: {
      widow: 'female',
      widows: 'female',
      widower: 'male',
      widowers: 'male'
    }
  },
  {
    id: 'own-man-own-woman',
    type: 'or',
    categories: ['female', 'male'],
    considerate: {
      'own person': 'a'
    },
    inconsiderate: {
      'own woman': 'female',
      'own man': 'male'
    }
  },
  {
    id: 'frenchmen',
    type: 'basic',
    categories: ['male'],
    considerate: {
      french: 'a',
      'the french': 'a'
    },
    inconsiderate: {
      frenchmen: 'male'
    }
  },
  {
    id: 'ladylike',
    type: 'basic',
    categories: ['female'],
    considerate: {
      courteous: 'a',
      cultured: 'a'
    },
    inconsiderate: {
      ladylike: 'female'
    }
  },
  {
    id: 'like-a-man',
    type: 'basic',
    categories: ['male'],
    considerate: {
      resolutely: 'a',
      bravely: 'a'
    },
    inconsiderate: {
      'like a man': 'male'
    }
  },
  {
    id: 'maiden-name',
    type: 'basic',
    categories: ['female'],
    considerate: {
      'birth name': 'a'
    },
    inconsiderate: {
      'maiden name': 'female'
    }
  },
  {
    id: 'maiden-voyage',
    type: 'basic',
    categories: ['female'],
    considerate: {
      'first voyage': 'a'
    },
    inconsiderate: {
      'maiden voyage': 'female'
    }
  },
  {
    id: 'maiden-flight',
    type: 'basic',
    categories: ['female'],
    considerate: {
      'first flight': 'a'
    },
    inconsiderate: {
      'maiden flight': 'female'
    }
  },
  {
    id: 'man-enough',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'strong enough': 'a'
    },
    inconsiderate: {
      'man enough': 'male'
    }
  },
  {
    id: 'oneupmanship',
    type: 'basic',
    categories: ['male'],
    considerate: {
      upstaging: 'a',
      competitiveness: 'a'
    },
    inconsiderate: {
      oneupmanship: 'male'
    }
  },
  {
    id: 'mrs-',
    type: 'basic',
    categories: ['female'],
    considerate: {
      'ms.': 'a'
    },
    inconsiderate: {
      'miss.': 'female',
      'mrs.': 'female'
    }
  },
  {
    id: 'manmade',
    type: 'basic',
    categories: ['male'],
    considerate: {
      manufactured: 'a',
      artificial: 'a',
      synthetic: 'a',
      'machine-made': 'a',
      constructed: 'a'
    },
    inconsiderate: {
      manmade: 'male'
    }
  },
  {
    id: 'man-of-action',
    type: 'basic',
    categories: ['male'],
    considerate: {
      dynamo: 'a'
    },
    inconsiderate: {
      'man of action': 'male'
    }
  },
  {
    id: 'man-of-letters',
    type: 'basic',
    categories: ['male'],
    considerate: {
      scholar: 'a',
      writer: 'a',
      'literary figure': 'a'
    },
    inconsiderate: {
      'man of letters': 'male'
    }
  },
  {
    id: 'man-of-the-world',
    type: 'basic',
    categories: ['male'],
    considerate: {
      sophisticate: 'a'
    },
    inconsiderate: {
      'man of the world': 'male'
    }
  },
  {
    id: 'fellowship',
    type: 'basic',
    categories: ['male'],
    considerate: {
      camaraderie: 'a',
      community: 'a',
      organization: 'a'
    },
    inconsiderate: {
      fellowship: 'male'
    }
  },
  {
    id: 'freshman',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'first-year student': 'a',
      fresher: 'a'
    },
    inconsiderate: {
      freshman: 'male',
      freshwoman: 'male'
    }
  },
  {
    id: 'workmanship',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'quality construction': 'a',
      expertise: 'a'
    },
    inconsiderate: {
      workmanship: 'male'
    }
  },
  {
    id: 'housewife',
    type: 'basic',
    categories: ['female'],
    considerate: {
      homemaker: 'a',
      homeworker: 'a'
    },
    inconsiderate: {
      housewife: 'female'
    }
  },
  {
    id: 'housewives',
    type: 'basic',
    categories: ['female'],
    considerate: {
      homemakers: 'a',
      homeworkers: 'a'
    },
    inconsiderate: {
      housewives: 'female'
    }
  },
  {
    id: 'motherly',
    type: 'basic',
    categories: ['female'],
    considerate: {
      loving: 'a',
      warm: 'a',
      nurturing: 'a'
    },
    inconsiderate: {
      motherly: 'female'
    }
  },
  {
    id: 'manpower',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'human resources': 'a',
      workforce: 'a',
      personnel: 'a',
      staff: 'a',
      labor: 'a',
      'labor force': 'a',
      staffing: 'a',
      'combat personnel': 'a'
    },
    inconsiderate: {
      manpower: 'male'
    }
  },
  {
    id: 'master-of-ceremonies',
    type: 'basic',
    categories: ['male'],
    considerate: {
      emcee: 'a',
      moderator: 'a',
      convenor: 'a'
    },
    inconsiderate: {
      'master of ceremonies': 'male'
    }
  },
  {
    id: 'masterful',
    type: 'basic',
    categories: ['male'],
    considerate: {
      skilled: 'a',
      authoritative: 'a',
      commanding: 'a'
    },
    inconsiderate: {
      masterful: 'male'
    }
  },
  {
    id: 'mastermind',
    type: 'basic',
    categories: ['male'],
    considerate: {
      genius: 'a',
      creator: 'a',
      instigator: 'a',
      oversee: 'a',
      launch: 'a',
      originate: 'a'
    },
    inconsiderate: {
      mastermind: 'male'
    }
  },
  {
    id: 'masterpiece',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'work of genius': 'a',
      'chef d’oeuvre': 'a'
    },
    inconsiderate: {
      masterpiece: 'male'
    }
  },
  {
    id: 'masterplan',
    type: 'basic',
    categories: ['male'],
    considerate: {
      vision: 'a',
      'comprehensive plan': 'a'
    },
    inconsiderate: {
      masterplan: 'male'
    }
  },
  {
    id: 'masterstroke',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'trump card': 'a',
      'stroke of genius': 'a'
    },
    inconsiderate: {
      masterstroke: 'male'
    }
  },
  {
    id: 'madman',
    type: 'basic',
    categories: ['male'],
    considerate: {
      fanatic: 'a',
      zealot: 'a',
      enthusiast: 'a'
    },
    inconsiderate: {
      madman: 'male',
      'mad man': 'male'
    }
  },
  {
    id: 'madmen',
    type: 'basic',
    categories: ['male'],
    considerate: {
      fanatics: 'a',
      zealots: 'a',
      enthusiasts: 'a'
    },
    inconsiderate: {
      madmen: 'male',
      'mad men': 'male'
    }
  },
  {
    id: 'mankind',
    type: 'basic',
    categories: ['male'],
    considerate: {
      humankind: 'a'
    },
    inconsiderate: {
      mankind: 'male'
    }
  },
  {
    id: 'manhour',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'staff hour': 'a',
      'hour of work': 'a'
    },
    inconsiderate: {
      manhour: 'male',
      'man hour': 'male'
    }
  },
  {
    id: 'manhours',
    type: 'basic',
    categories: ['male'],
    considerate: {
      'staff hours': 'a',
      'hours of work': 'a',
      'hours of labor': 'a',
      hours: 'a'
    },
    inconsiderate: {
      manhours: 'male',
      'man hours': 'male'
    }
  },
  {
    id: 'manned',
    type: 'basic',
    categories: ['a'],
    considerate: {
      staffed: 'a',
      crewed: 'a',
      piloted: 'a'
    },
    inconsiderate: {
      manned: 'a'
    },
    note: 'Using gender neutral language means users will help to break up gender stereotypes.'
  },
  {
    id: 'unmanned',
    type: 'basic',
    categories: ['a'],
    considerate: {
      robotic: 'a',
      automated: 'a'
    },
    inconsiderate: {
      unmanned: 'a'
    },
    note: 'Using gender neutral language means users will help to break up gender stereotypes.'
  },
  {
    id: 'moaning',
    type: 'basic',
    categories: ['a'],
    considerate: {
      whining: 'a',
      complaining: 'a',
      crying: 'a'
    },
    inconsiderate: {
      bitching: 'a',
      moaning: 'a'
    }
  },
  {
    id: 'moan',
    type: 'basic',
    categories: ['a'],
    considerate: {
      whine: 'a',
      complain: 'a',
      cry: 'a'
    },
    inconsiderate: {
      bitch: 'a',
      moan: 'a'
    }
  },
  {
    id: 'wifebeater',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'tank top': 'a',
      'sleeveless undershirt': 'a'
    },
    inconsiderate: {
      'wife beater': 'a',
      wifebeater: 'a'
    }
  },
  {
    id: 'ancient-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'ancient civilization': 'a',
      'ancient people': 'a'
    },
    inconsiderate: {
      'ancient man': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'authoress',
    type: 'basic',
    categories: ['a'],
    considerate: {
      author: 'a',
      writer: 'a'
    },
    inconsiderate: {
      authoress: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'average-housewife',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'average consumer': 'a',
      'average household': 'a',
      'average homemaker': 'a'
    },
    inconsiderate: {
      'average housewife': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'average-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'average person': 'a'
    },
    inconsiderate: {
      'average man': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'average-working-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'average wage earner': 'a',
      'average taxpayer': 'a'
    },
    inconsiderate: {
      'average working man': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'aviatrix',
    type: 'basic',
    categories: ['a'],
    considerate: {
      aviator: 'a'
    },
    inconsiderate: {
      aviatrix: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'brotherhood-of-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'the human family': 'a'
    },
    inconsiderate: {
      'brotherhood of man': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'calendar-girl',
    type: 'basic',
    categories: ['a'],
    considerate: {
      model: 'a'
    },
    inconsiderate: {
      'calendar girl': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'call-girl',
    type: 'basic',
    categories: ['a'],
    considerate: {
      escort: 'a',
      prostitute: 'a',
      'sex worker': 'a'
    },
    inconsiderate: {
      'call girl': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'churchman',
    type: 'basic',
    categories: ['a'],
    considerate: {
      cleric: 'a',
      'practicing Christian': 'a',
      'pillar of the Church': 'a'
    },
    inconsiderate: {
      churchman: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'english-master',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'english coordinator': 'a',
      'senior teacher of english': 'a'
    },
    inconsiderate: {
      'english master': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'englishmen',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'the english': 'a'
    },
    inconsiderate: {
      englishmen: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'executrix',
    type: 'basic',
    categories: ['a'],
    considerate: {
      executor: 'a'
    },
    inconsiderate: {
      executrix: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'father-of-*',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'founder of': 'a'
    },
    inconsiderate: {
      'father of *': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'founding-father',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'the founders': 'a',
      'founding leaders': 'a',
      forebears: 'a'
    },
    inconsiderate: {
      'founding father': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'housemaid',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'house worker': 'a',
      'domestic help': 'a'
    },
    inconsiderate: {
      housemaid: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'industrial-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'industrial civilization': 'a',
      'industrial people': 'a'
    },
    inconsiderate: {
      'industrial man': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'lady-doctor',
    type: 'basic',
    categories: ['a'],
    considerate: {
      doctor: 'a'
    },
    inconsiderate: {
      'lady doctor': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'leading-lady',
    type: 'basic',
    categories: ['a'],
    considerate: {
      lead: 'a'
    },
    inconsiderate: {
      'leading lady': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'maiden',
    type: 'basic',
    categories: ['a'],
    considerate: {
      virgin: 'a'
    },
    inconsiderate: {
      maiden: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'maiden-race',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'first race': 'a'
    },
    inconsiderate: {
      'maiden race': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'maiden-speech',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'first speech': 'a'
    },
    inconsiderate: {
      'maiden speech': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'man-a-desk',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'staff a desk': 'a'
    },
    inconsiderate: {
      'man a desk': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'man-in-the-street',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'ordinary citizen': 'a',
      'typical person': 'a',
      'average person': 'a'
    },
    inconsiderate: {
      'man in the street': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'man-of-the-land',
    type: 'basic',
    categories: ['a'],
    considerate: {
      farmer: 'a',
      'rural worker': 'a',
      grazier: 'a',
      landowner: 'a',
      'rural community': 'a',
      'country people': 'a',
      'country folk': 'a'
    },
    inconsiderate: {
      'man of the land': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'mans-best-friend',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'a faithful dog': 'a'
    },
    inconsiderate: {
      'mans best friend': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'man-the-booth',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'staff the booth': 'a'
    },
    inconsiderate: {
      'man the booth': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'man-the-phones',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'answer the phones': 'a'
    },
    inconsiderate: {
      'man the phones': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'mansized-task',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'a demanding task': 'a',
      'a big job': 'a'
    },
    inconsiderate: {
      'mansized task': 'a',
      'man sized task': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'master-key',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'pass key': 'a',
      original: 'a'
    },
    inconsiderate: {
      'master key': 'a',
      'master copy': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'master-plan',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'grand scheme': 'a',
      'guiding principles': 'a'
    },
    inconsiderate: {
      'master plan': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'master-the-art',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'become skilled': 'a'
    },
    inconsiderate: {
      'master the art': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'men-of-science',
    type: 'basic',
    categories: ['a'],
    considerate: {
      scientists: 'a'
    },
    inconsiderate: {
      'men of science': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'midwife',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'birthing nurse': 'a'
    },
    inconsiderate: {
      midwife: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'modern-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'modern civilization': 'a',
      'modern people': 'a'
    },
    inconsiderate: {
      'modern man': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'no-mans-land',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'unoccupied territory': 'a',
      wasteland: 'a',
      deathtrap: 'a'
    },
    inconsiderate: {
      'no mans land': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'office-girls',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'administrative staff': 'a'
    },
    inconsiderate: {
      'office girls': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'poetess',
    type: 'basic',
    categories: ['a'],
    considerate: {
      poet: 'a'
    },
    inconsiderate: {
      poetess: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'railwayman',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'railway worker': 'a'
    },
    inconsiderate: {
      railwayman: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'sportsmanlike',
    type: 'basic',
    categories: ['a'],
    considerate: {
      fair: 'a',
      sporting: 'a'
    },
    inconsiderate: {
      sportsmanlike: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'sportsmanship',
    type: 'basic',
    categories: ['a'],
    considerate: {
      fairness: 'a',
      'good humor': 'a',
      'sense of fair play': 'a'
    },
    inconsiderate: {
      sportsmanship: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'statesmanlike',
    type: 'basic',
    categories: ['a'],
    considerate: {
      diplomatic: 'a'
    },
    inconsiderate: {
      statesmanlike: 'a',
      'statesman like': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'stockman',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'cattle worker': 'a',
      farmhand: 'a',
      drover: 'a'
    },
    inconsiderate: {
      stockman: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'tradesmans-entrance',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'service entrance': 'a'
    },
    inconsiderate: {
      'tradesmans entrance': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'tax-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'tax commissioner': 'a',
      'tax office': 'a',
      'tax collector': 'a'
    },
    inconsiderate: {
      'tax man': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'usherette',
    type: 'basic',
    categories: ['a'],
    considerate: {
      usher: 'a'
    },
    inconsiderate: {
      usherette: 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'woman-lawyer',
    type: 'basic',
    categories: ['a'],
    considerate: {
      lawyer: 'a'
    },
    inconsiderate: {
      'woman lawyer': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'woman-painter',
    type: 'basic',
    categories: ['a'],
    considerate: {
      painter: 'a'
    },
    inconsiderate: {
      'woman painter': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'working-wife',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'wage or salary earning woman': 'a',
      'two-income family': 'a'
    },
    inconsiderate: {
      'working mother': 'a',
      'working wife': 'a'
    },
    note: 'Source: https://radyananda.wordpress.com/2009/06/06/nonsexist-alternative-language-handbook-for-conscious-writers/'
  },
  {
    id: 'homosexual',
    type: 'basic',
    categories: ['a'],
    considerate: {
      gay: 'a',
      'gay man': 'a',
      lesbian: 'a',
      'gay person/people': 'a'
    },
    inconsiderate: {
      homosexual: 'a'
    },
    note: 'This term has a clinical history and is used to imply LGBTQ+ people are diseased or psychologically/emotionally disordered (source: https://www.glaad.org/reference/offensive)'
  },
  {
    id: 'homosexual-relations',
    type: 'basic',
    categories: ['a'],
    considerate: {
      relationship: 'a'
    },
    inconsiderate: {
      'homosexual relations': 'a',
      'homosexual relationship': 'a'
    },
    note: 'Avoid labeling something as LGBTQ+ unless you would call the same thing “straight” (source: https://www.glaad.org/reference/offensive)'
  },
  {
    id: 'homosexual-couple',
    type: 'basic',
    categories: ['a'],
    considerate: {
      couple: 'a'
    },
    inconsiderate: {
      'homosexual couple': 'a'
    },
    note: 'Avoid labeling something as LGBTQ+ unless you would call the same thing “straight” (source: https://www.glaad.org/reference/offensive)'
  },
  {
    id: 'sexual-preference',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'sexual orientation': 'a',
      orientation: 'a'
    },
    inconsiderate: {
      'sexual preference': 'a'
    },
    note: 'Implies that being LGBTQ+ is a choice (source: https://www.glaad.org/reference/offensive)'
  },
  {
    id: 'gay-lifestyle',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'gay lives': 'a',
      'gay/lesbian lives': 'a'
    },
    inconsiderate: {
      'gay lifestyle': 'a',
      'homosexual lifestyle': 'a'
    },
    note: 'Implies that being LGBTQ+ is a choice (source: https://www.glaad.org/reference/offensive)'
  },
  {
    id: 'gay-agenda',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'gay issues': 'a'
    },
    inconsiderate: {
      'gay agenda': 'a',
      'homosexual agenda': 'a'
    },
    note: 'Used by anti-LGBTQ+ extremists to create a climate of fear around LGBTQ+ issues (source: https://www.glaad.org/reference/offensive)'
  },
  {
    id: 'gay-rights',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'equal rights': 'a',
      'civil rights for gay people': 'a'
    },
    inconsiderate: {
      'special rights': 'a',
      'gay rights': 'a'
    },
    note: 'LGBTQ+ rights are human rights (source: https://www.glaad.org/reference/style)'
  },
  {
    id: 'fag',
    type: 'basic',
    categories: ['a'],
    considerate: {
      gay: 'a'
    },
    inconsiderate: {
      fag: 'a',
      faggot: 'a',
      dyke: 'a',
      homo: 'a',
      sodomite: 'a'
    },
    note: 'Derogatory terms for LGBTQ+ people are offensive (source: https://www.glaad.org/reference/offensive)'
  },
  {
    id: 'bi',
    type: 'basic',
    categories: ['a'],
    considerate: {
      bisexual: 'a'
    },
    inconsiderate: {
      bi: 'a'
    },
    note: 'Avoid using slang shorthand (source: https://www.glaad.org/reference/style)'
  },
  {
    id: 'homosexual-marriage',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'gay marriage': 'a',
      'same-sex marriage': 'a'
    },
    inconsiderate: {
      'homosexual marriage': 'a'
    },
    note: 'Homosexual has a clinical history and is used to imply LGBTQ+ people are diseased or psychologically/emotionally disordered (source: https://www.glaad.org/reference/style)'
  },
  {
    id: 'tranny',
    type: 'basic',
    categories: ['a'],
    considerate: {
      transgender: 'a'
    },
    inconsiderate: {
      tranny: 'a'
    },
    note: 'Derogatory terms for LGBTQ+ people are offensive (source: https://www.glaad.org/reference/style)'
  },
  {
    id: 'transvestite',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'cross-dresser': 'a'
    },
    inconsiderate: {
      transvestite: 'a'
    },
    note: 'Avoid using outdated / offensive terms (source: https://www.glaad.org/reference/transgender)'
  },
  {
    id: 'sexchange',
    type: 'basic',
    categories: ['a'],
    considerate: {
      transition: 'a',
      'gender confirmation surgery': 'a'
    },
    inconsiderate: {
      sexchange: 'a',
      'sex change': 'a'
    },
    note: 'Avoid overemphasizing surgery when discussing transgender people or the process of transition - it’s not a necessary component (source: https://www.glaad.org/reference/transgender)'
  },
  {
    id: 'sex-change-operation',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'sex reassignment surgery': 'a',
      'gender confirmation surgery': 'a'
    },
    inconsiderate: {
      'sex change operation': 'a'
    },
    note: 'Shift focus away from the assigned sex and towards the identified gender (source: https://www.glaad.org/reference/transgender)'
  },
  {
    id: 'transgenders',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'transgender people': 'a'
    },
    inconsiderate: {
      transgenders: 'a'
    },
    note: 'Transgender should be used as an adjective, not as a noun (source: https://www.glaad.org/reference/transgender)'
  },
  {
    id: 'transgendered',
    type: 'basic',
    categories: ['a'],
    considerate: {
      transgender: 'a'
    },
    inconsiderate: {
      transgendered: 'a'
    },
    note: 'Transgender is already an adjective (source: https://www.glaad.org/reference/transgender)'
  },
  {
    id: 'transgenderism',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'being transgender': 'a',
      'the movement for transgender equality': 'a'
    },
    inconsiderate: {
      transgenderism: 'a'
    },
    note: 'This is a term used by anti-transgender activists to dehumanize transgender people and reduce who they are to a condition (source: https://www.glaad.org/reference/transgender)'
  },
  {
    id: 'born-a-man',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'assigned male at birth': 'a',
      'designated male at birth': 'a'
    },
    inconsiderate: {
      'biologically male': 'a',
      'born a man': 'a',
      'genetically male': 'a'
    },
    note: 'Assigned birth gender is complicated; gender identity is more than what your parents decided you were at birth'
  },
  {
    id: 'born-a-woman',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'assigned female at birth': 'a',
      'designated female at birth': 'a'
    },
    inconsiderate: {
      'biologically female': 'a',
      'born a woman': 'a',
      'genetically female': 'a'
    },
    note: 'Assigned birth gender is complicated; gender identity is more than what your parents decided you were at birth'
  },
  {
    id: 'bathroom-bill',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'non-discrimination law': 'a',
      'non-discrimination ordinance': 'a'
    },
    inconsiderate: {
      'bathroom bill': 'a'
    },
    note: 'A term created and used by far-right extremists to oppose nondiscrimination laws that protect transgender people (source: https://www.glaad.org/reference/transgender)'
  },
  {
    id: 'hermaphroditic',
    type: 'basic',
    categories: ['a'],
    considerate: {
      intersex: 'a'
    },
    inconsiderate: {
      hermaphroditic: 'a',
      pseudohermaphroditic: 'a',
      'pseudo hermaphroditic': 'a'
    },
    note: 'These terms are stigmatizing to patients and their families because intersex status is more complicated than the mere presence or absence of certain gonadal tissues (source: http://www.isna.org/node/979)'
  },
  {
    id: 'hermaphrodite',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person who is intersex': 'a',
      person: 'a',
      'intersex person': 'a'
    },
    inconsiderate: {
      hermaphrodite: 'a',
      pseudohermaphrodite: 'a',
      'pseudo hermaphrodite': 'a'
    },
    note: 'These terms are stigmatizing to patients and their families because intersex status is more complicated than the mere presence or absence of certain gonadal tissues (source: http://www.isna.org/node/979)'
  },
  {
    id: 'heshe',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'transgender person': 'a',
      person: 'a'
    },
    inconsiderate: {
      shemale: 'a',
      'she male': 'a',
      heshe: 'a',
      shehe: 'a'
    },
    note: 'This word dehumanizes transgender people (source: https://www.reddit.com/r/asktransgender/comments/23wbq1/is_the_term_shemale_seen_as_offensive/)'
  },
  {
    id: 'gender-pronoun',
    type: 'basic',
    categories: ['a'],
    considerate: {
      pronoun: 'a',
      pronouns: 'a'
    },
    inconsiderate: {
      'preferred pronoun': 'a',
      'preferred pronouns': 'a',
      'gender pronoun': 'a',
      'gender pronouns': 'a'
    },
    note: "Preferred pronoun sounds like it is optional to use someone's correct pronoun (source: https://www.selfdefined.app/definitions/pronouns/)"
  },
  {
    id: 'islamist',
    type: 'basic',
    categories: ['a'],
    considerate: {
      muslim: 'a',
      'person of Islamic faith': 'a',
      fanatic: 'a',
      zealot: 'a',
      'follower of islam': 'a',
      'follower of the islamic faith': 'a'
    },
    inconsiderate: {
      islamist: 'a'
    },
    note: 'Source: https://www.usnews.com/news/newsgram/articles/2013/04/04/the-associated-press-revises-islamist-another-politically-charged-term'
  },
  {
    id: 'islamists',
    type: 'basic',
    categories: ['a'],
    considerate: {
      muslims: 'a',
      'people of Islamic faith': 'a',
      fanatics: 'a',
      zealots: 'a'
    },
    inconsiderate: {
      islamists: 'a'
    },
    note: 'Source: https://www.usnews.com/news/newsgram/articles/2013/04/04/the-associated-press-revises-islamist-another-politically-charged-term'
  },
  {
    id: 'master',
    type: 'basic',
    categories: ['a'],
    considerate: {
      primary: 'a',
      hub: 'a',
      reference: 'a'
    },
    inconsiderate: {
      master: 'a'
    },
    note: 'Avoid using the term `master`; these suggestions are for the computer term, but there are better alternatives for other cases too'
  },
  {
    id: 'masters',
    type: 'basic',
    categories: ['a'],
    considerate: {
      primaries: 'a',
      hubs: 'a',
      references: 'a'
    },
    inconsiderate: {
      masters: 'a'
    },
    note: 'Avoid using the term `master`; these suggestions are for the computer term, but there are better alternatives for other cases too'
  },
  {
    id: 'eskimo',
    type: 'basic',
    categories: ['a'],
    considerate: {
      Inuit: 'a'
    },
    inconsiderate: {
      eskimo: 'a'
    }
  },
  {
    id: 'eskimos',
    type: 'basic',
    categories: ['a'],
    considerate: {
      Inuits: 'a'
    },
    inconsiderate: {
      eskimos: 'a'
    }
  },
  {
    id: 'oriental',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Asian person': 'a'
    },
    inconsiderate: {
      oriental: 'a'
    }
  },
  {
    id: 'orientals',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Asian people': 'a'
    },
    inconsiderate: {
      orientals: 'a'
    }
  },
  {
    id: 'nonwhite',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'person of color': 'a',
      'people of color': 'a'
    },
    inconsiderate: {
      nonwhite: 'a',
      'non white': 'a'
    }
  },
  {
    id: 'ghetto',
    type: 'basic',
    categories: ['a'],
    considerate: {
      projects: 'a',
      urban: 'a'
    },
    inconsiderate: {
      ghetto: 'a'
    }
  },
  {
    id: 'redskin',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Native American': 'a'
    },
    inconsiderate: {
      'red indian': 'a',
      pocahontas: 'a',
      redskin: 'a'
    }
  },
  {
    id: 'redskins',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Native American People': 'a'
    },
    inconsiderate: {
      'red indians': 'a',
      redskins: 'a'
    }
  },
  {
    id: 'totem',
    type: 'basic',
    categories: ['a'],
    considerate: {
      favorite: 'a',
      inspiration: 'a',
      'personal interest': 'a',
      'personality type': 'a'
    },
    inconsiderate: {
      'animal spirit': 'a',
      'dream catcher': 'a',
      'spirit animal': 'a',
      totem: 'a'
    },
    note: 'Avoid using terms that oversimplify the complex and varied beliefs of indigenous religions. (source: https://www.worldreligionnews.com/opinion/spirit-animal-not-joke-oppression,https://www.spiralnature.com/spirituality/spirit-animal-cultural-appropriation)'
  },
  {
    id: 'long-time-no-see',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'I haven’t seen you in a long time': 'a',
      'it’s been a long time': 'a'
    },
    inconsiderate: {
      'long time no hear': 'a',
      'long time no see': 'a'
    },
    note: 'Avoid using phrases that implicitly mock people with limited knowledge of the English language. (source: https://www.npr.org/sections/codeswitch/2014/03/09/288300303/who-first-said-long-time-no-see-and-in-which-language)'
  },
  {
    id: 'indian-country',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'enemy territory': 'a'
    },
    inconsiderate: {
      'Indian country': 'a'
    },
    note: 'Avoid using phrases referring to the genocidal United States “Indian Removal” laws. (source: https://newsmaven.io/indiancountrytoday/archive/off-the-reservation-a-teachable-moment-nW1d7U0JRkOszhtg8N1V1A/)'
  },
  {
    id: 'off-reserve',
    type: 'basic',
    categories: ['a'],
    considerate: {
      disobey: 'a',
      endure: 'a',
      'object to': 'a',
      oppose: 'a',
      resist: 'a'
    },
    inconsiderate: {
      'jump the reservation': 'a',
      'off reserve': 'a',
      'off the reservation': 'a'
    },
    note: 'Avoid using phrases referring to the genocidal United States “Indian Removal” laws. (source: http://blog.nativepartnership.org/off-the-reservation/,https://www.wsj.com/articles/off-the-reservation-is-a-phrase-with-a-dark-past-1462552837,https://www.npr.org/sections/codeswitch/2014/06/29/326690947/should-saying-someone-is-off-the-reservation-be-off-limits,https://nowtoronto.com/news/native-references-and-terms-that-are-offensive-to-indigenous-people/)'
  },
  {
    id: 'on-the-warpath',
    type: 'basic',
    categories: ['a'],
    considerate: {
      defend: 'a'
    },
    inconsiderate: {
      'circle the wagons': 'a',
      'on the warpath': 'a'
    },
    note: 'Avoid using phrases referring to colonial stereotypes regarding Native Americans. (source: https://idioms.thefreedictionary.com/circle+the+wagons,https://idioms.thefreedictionary.com/go+on+the+warpath)'
  },
  {
    id: 'too-many-chiefs',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'too many chefs in the kitchen': 'a',
      'too many cooks spoil the broth': 'a'
    },
    inconsiderate: {
      'too many chiefs': 'a'
    },
    note: 'Avoid using phrases referring to colonial stereotypes regarding Native Americans. (source: https://idioms.thefreedictionary.com/too+many+chiefs+and+not+enough+Indians)'
  },
  {
    id: 'natives-are-restless',
    type: 'basic',
    categories: ['a'],
    considerate: {
      dissatisfied: 'a',
      frustrated: 'a'
    },
    inconsiderate: {
      'natives are restless': 'a',
      'natives are becoming restless': 'a',
      'natives are getting restless': 'a',
      'natives are growing restless': 'a'
    },
    note: 'Avoid using phrases referring to colonial stereotypes regarding indigenous peoples. (source: https://tvtropes.org/pmwiki/pmwiki.php/Main/TheNativesAreRestless)'
  },
  {
    id: 'powwow',
    type: 'basic',
    categories: ['a'],
    considerate: {
      conference: 'a',
      gathering: 'a',
      meeting: 'a'
    },
    inconsiderate: {
      'pow wow': 'a',
      powwow: 'a'
    },
    note: 'Avoid casually using this term, which refers to traditional indigenous celebration ceremonies that were banned by genocidal laws in the United States and Canada — Native people died fighting for this right. (source: https://twitter.com/chadloder/status/1203507070772793345,http://nativeappropriations.com/2012/09/paul-frank-offends-every-native-person-on-the-planet-with-fashion-night-out-dream-catchin-pow-wow.html,https://www.britannica.com/topic/powwow,https://nowtoronto.com/news/native-references-and-terms-that-are-offensive-to-indigenous-people/)'
  },
  {
    id: 'indian-give',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'go back on one’s offer': 'a'
    },
    inconsiderate: {
      'indian give': 'a',
      'indian giver': 'a'
    },
    note: 'Avoid using phrases referring to colonial stereotypes regarding Native Americans.'
  },
  {
    id: 'pinoys',
    type: 'basic',
    categories: ['a'],
    considerate: {
      Filipinos: 'a',
      'Filipino people': 'a'
    },
    inconsiderate: {
      pinoys: 'a',
      pinays: 'a'
    }
  },
  {
    id: 'towel-heads',
    type: 'basic',
    categories: ['a'],
    considerate: {
      Arabs: 'a',
      'Middle Eastern People': 'a'
    },
    inconsiderate: {
      'sand niggers': 'a',
      'towel heads': 'a'
    }
  },
  {
    id: 'latino',
    type: 'basic',
    categories: ['a'],
    considerate: {
      Latinx: 'a'
    },
    inconsiderate: {
      latino: 'a',
      latina: 'a'
    },
    note: 'Whenever possible, try to be gender inclusive.'
  },
  {
    id: 'japs',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Japanese person': 'a',
      'Japanese people': 'a'
    },
    inconsiderate: {
      japs: 'a'
    }
  },
  {
    id: 'hymie',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'Jewish person': 'a'
    },
    inconsiderate: {
      shlomo: 'a',
      shyster: 'a',
      hymie: 'a'
    }
  },
  {
    id: 'goy',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'a person who is not Jewish': 'a',
      'not Jewish': 'a'
    },
    inconsiderate: {
      goyim: 'a',
      goyum: 'a',
      goy: 'a'
    }
  },
  {
    id: 'spade',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'a Black person': 'a'
    },
    inconsiderate: {
      spade: 'a'
    }
  },
  {
    id: 'gyp',
    type: 'basic',
    categories: ['a'],
    considerate: {
      Nomad: 'a',
      Traveler: 'a',
      Roma: 'a',
      Romani: 'a'
    },
    inconsiderate: {
      gyppo: 'a',
      gypsy: 'a',
      Gipsy: 'a',
      gyp: 'a'
    },
    note: 'Gypsy is insensitive, use Roma or Romani. They’re not Egyptian as the name suggests. (source: en.wikipedia.org/wiki/Romani_people#cite_ref-80)'
  },
  {
    id: 'blacklist',
    type: 'basic',
    categories: ['a'],
    considerate: {
      blocklist: 'a',
      wronglist: 'a',
      banlist: 'a',
      'deny list': 'a'
    },
    inconsiderate: {
      blacklist: 'a',
      'black list': 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'blacklisted',
    type: 'basic',
    categories: ['a'],
    considerate: {
      blocklisted: 'a',
      wronglisted: 'a',
      banlisted: 'a',
      'deny-listed': 'a'
    },
    inconsiderate: {
      blacklisted: 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'blacklisting',
    type: 'basic',
    categories: ['a'],
    considerate: {
      blocklisting: 'a',
      wronglisting: 'a',
      banlisting: 'a',
      'deny-listing': 'a'
    },
    inconsiderate: {
      blacklisting: 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'whitelist',
    type: 'basic',
    categories: ['a'],
    considerate: {
      passlist: 'a',
      alrightlist: 'a',
      safelist: 'a',
      'allow list': 'a'
    },
    inconsiderate: {
      whitelist: 'a',
      'white list': 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'whitelisted',
    type: 'basic',
    categories: ['a'],
    considerate: {
      passlisted: 'a',
      alrightlisted: 'a',
      safelisted: 'a',
      'allow-listed': 'a'
    },
    inconsiderate: {
      whitelisted: 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'whitelisting',
    type: 'basic',
    categories: ['a'],
    considerate: {
      passlisting: 'a',
      alrightlisting: 'a',
      safelisting: 'a',
      'allow-listing': 'a'
    },
    inconsiderate: {
      whitelisting: 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'whitespace',
    type: 'basic',
    categories: ['a'],
    considerate: {
      space: 'a',
      blank: 'a'
    },
    inconsiderate: {
      whitespace: 'a',
      'white space': 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'whitespaces',
    type: 'basic',
    categories: ['a'],
    considerate: {
      space: 'a',
      blank: 'a'
    },
    inconsiderate: {
      whitespaces: 'a',
      'white spaces': 'a'
    },
    note: 'Replace racially-charged language with more accurate and inclusive words'
  },
  {
    id: 'savage',
    type: 'basic',
    categories: ['a'],
    considerate: {
      simple: 'a',
      indigenous: 'a',
      'hunter-gatherer': 'a'
    },
    inconsiderate: {
      primitive: 'a',
      savage: 'a',
      'stone age': 'a'
    },
    note: 'Avoid using terms that imply a group has not changed over time and that they are inferior'
  },
  {
    id: 'tribe',
    type: 'basic',
    categories: ['a'],
    considerate: {
      society: 'a',
      community: 'a'
    },
    inconsiderate: {
      tribe: 'a'
    },
    note: 'Avoid using terms that make some groups sound inferior'
  },
  {
    id: 'sophisticated-culture',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'complex culture': 'a'
    },
    inconsiderate: {
      'sophisticated culture': 'a'
    },
    note: 'Avoid using terms that make some groups sound inferior. Replace “sophisticated” with a neutral term such as “complex”'
  },
  {
    id: 'sophisticated-technology',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'complex technology': 'a'
    },
    inconsiderate: {
      'sophisticated technology': 'a'
    },
    note: 'Avoid using terms that make some groups sound inferior. Replace “sophisticated” with a neutral term such as “complex”'
  },
  {
    id: 'bugreport',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'bug report': 'a',
      snapshot: 'a'
    },
    inconsiderate: {
      bugreport: 'a'
    },
    note: 'Avoid using `bugreport`, as the word `bugre` is a slur in Brazilian Portuguese'
  },
  {
    id: 'grandfather-clause',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'legacy policy': 'a',
      'legacy clause': 'a',
      'deprecation policy': 'a'
    },
    inconsiderate: {
      'grandfather clause': 'a',
      'grandfather policy': 'a'
    },
    note: 'Avoid using phrases referring to racist United States “Jim Crow” laws. (source: https://en.wikipedia.org/wiki/Grandfather_clause#Origin)'
  },
  {
    id: 'grandfathering',
    type: 'basic',
    categories: ['a'],
    considerate: {
      deprecate: 'a'
    },
    inconsiderate: {
      grandfathering: 'a'
    },
    note: 'Avoid using phrases referring to racist United States “Jim Crow” laws. (source: https://en.wikipedia.org/wiki/Grandfather_clause#Origin)'
  },
  {
    id: 'grandfathered',
    type: 'basic',
    categories: ['a'],
    considerate: {
      deprecated: 'a'
    },
    inconsiderate: {
      grandfathered: 'a'
    },
    note: 'Avoid using phrases referring to racist United States “Jim Crow” laws. (source: https://en.wikipedia.org/wiki/Grandfather_clause#Origin)'
  },
  {
    id: 'make-*-great-again',
    type: 'basic',
    categories: ['a'],
    considerate: {
      improve: 'a'
    },
    inconsiderate: {
      'make * great again': 'a',
      'make * * great again': 'a',
      'make * * * great again': 'a',
      'make * * * * great again': 'a',
      'make * * * * * great again': 'a'
    }
  },
  {
    id: 'committed-suicide',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'died by suicide': 'a'
    },
    inconsiderate: {
      'committed suicide': 'a',
      'completed suicide': 'a'
    },
    note: 'Source: https://www.afsp.org/news-events/for-the-media/reporting-on-suicide, https://www.speakingofsuicide.com/2013/04/13/language/'
  },
  {
    id: 'commit-suicide',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'die by suicide': 'a'
    },
    inconsiderate: {
      'commit suicide': 'a',
      'complete suicide': 'a',
      'successful suicide': 'a'
    },
    note: 'Committing suicide is not successful/unsuccessful, that sends the wrong message (source: https://www.afsp.org/news-events/for-the-media/reporting-on-suicide, https://www.speakingofsuicide.com/2013/04/13/language/)'
  },
  {
    id: 'suicide-pact',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'rise in suicides': 'a'
    },
    inconsiderate: {
      'suicide epidemic': 'a',
      'epidemic of suicides': 'a',
      'suicide pact': 'a'
    },
    note: 'Using sensational words can cause copycat suicides or contagion (source: https://www.afsp.org/news-events/for-the-media/reporting-on-suicide)'
  },
  {
    id: 'failed-suicide',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'suicide attempt': 'a',
      'attempted suicide': 'a'
    },
    inconsiderate: {
      'failed suicide': 'a',
      'failed attempt': 'a',
      'suicide failure': 'a'
    },
    note: 'Attempted suicide should not be depicted as a failure (source: https://www.speakingofsuicide.com/2013/04/13/language, https://www.afsp.org/news-events/for-the-media/reporting-on-suicide)'
  },
  {
    id: 'suicide-note',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'a note from the deceased': 'a'
    },
    inconsiderate: {
      'suicide note': 'a'
    },
    note: 'Source: https://www.afsp.org/news-events/for-the-media/reporting-on-suicide'
  },
  {
    id: 'hang',
    type: 'basic',
    categories: ['a'],
    considerate: {
      'the app froze': 'a',
      'the app stopped responding': 'a',
      'the app stopped responding to events': 'a',
      'the app became unresponsive': 'a'
    },
    inconsiderate: {
      hang: 'a',
      hanged: 'a'
    },
    note: 'When describing the behavior of computer software, using the word “hanged” needlessly invokes the topic of death by self-harm or lynching.  Consider using the word “froze” or the phrase “stopped responding to events” or “became unresponsive” instead.'
  }
]


/***/ }),

/***/ "./node_modules/retext-equality/lib/factory.js":
/*!*****************************************************!*\
  !*** ./node_modules/retext-equality/lib/factory.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "factory": function() { return /* binding */ factory; }
/* harmony export */ });
/* harmony import */ var nlcst_normalize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nlcst-normalize */ "./node_modules/nlcst-normalize/index.js");
/* harmony import */ var nlcst_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nlcst-search */ "./node_modules/nlcst-search/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var quotation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! quotation */ "./node_modules/quotation/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/index.js");
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ "./node_modules/unist-util-is/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Sentence} Sentence
 * @typedef {import('nlcst').SentenceContent} SentenceContent
 * @typedef {import('nlcst').Content} Content
 * @typedef {import('nlcst').Parent} Parent
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('nlcst-search').Handler} SearchHandle
 * @typedef {import('./en.js').Pattern} Pattern
 *
 * @typedef Match
 * @property {string} type
 * @property {Parent} parent
 * @property {Content[]} nodes
 * @property {number} start
 * @property {number} end
 *
 * @typedef Options
 * @property {string[]} [ignore]
 * @property {boolean} [noBinary=false]
 */








const own = {}.hasOwnProperty

const word = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)('WordNode')
const whiteSpace = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)('WhiteSpaceNode')
const punctuation = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)('PunctuationNode')

/**
 * @param {Pattern[]} patterns
 * @param {string} lang
 */
function factory(patterns, lang) {
  // Needed for other languages.
  /* c8 ignore next */
  const source = 'retext-equality' + (lang === 'en' ? '' : '-' + lang)

  // Several pattern types can be handled.
  // Handlers are stored in this map by type.
  const handlers = {or, basic}

  // Internal mapping.
  /** @type {Record<string, Pattern>} */
  const byId = {}
  /** @type {Pattern[]} */
  const byIndex = []
  /** @type {string[]} */
  const apostrophes = []
  /** @type {string[]} */
  const list = []

  unpack()

  /** @type {import('unified').Plugin<[Options?], Root>} */
  return (options = {}) => {
    const ignore = options.ignore || []
    const noBinary = options.noBinary
    let index = -1
    /** @type {string[]} */
    const noNormalize = []
    /** @type {string[]} */
    const normalize = []

    while (++index < list.length) {
      const item = list[index]

      if (ignore.includes(item)) {
        continue
      }

      if (apostrophes.includes(item)) {
        noNormalize.push(item)
      } else {
        normalize.push(item)
      }
    }

    return (tree, file) => {
      (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_1__.visit)(tree, 'ParagraphNode', (node) => {
        /** @type {Record<string, Match[]>} */
        const matches = {}

        ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_2__.search)(node, normalize, handle)
        ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_2__.search)(node, noNormalize, handle, true)

        /** @type {string} */
        let key

        // Ignore or emit offending words based on their pattern.
        for (key in matches) {
          if (own.call(matches, key)) {
            const pattern = byId[key]
            handlers[
              pattern.type === 'or' && noBinary ? 'basic' : pattern.type
            ](matches[key], pattern, file)
          }
        }

        return unist_util_visit__WEBPACK_IMPORTED_MODULE_3__.SKIP

        // Handle a match.
        /** @type {SearchHandle} */
        function handle(match, position, parent, phrase) {
          const index = list.indexOf(phrase)
          const pattern = byIndex[index]
          const id = pattern.id

          if (phrase !== phrase.toLowerCase() && (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_4__.toString)(match) !== phrase) {
            return
          }

          if (!(id in matches)) {
            matches[id] = []
          }

          matches[id].push({
            type: pattern.inconsiderate[phrase],
            parent,
            nodes: match,
            start: position,
            end: position + match.length - 1
          })
        }
      })
    }
  }

  function unpack() {
    let index = -1

    while (++index < patterns.length) {
      const pattern = patterns[index]
      /** @type {string} */
      let phrase

      byId[pattern.id] = pattern

      for (phrase in pattern.inconsiderate) {
        if (own.call(pattern.inconsiderate, phrase)) {
          list.push(phrase)
          byIndex.push(pattern)
          if (pattern.apostrophe) apostrophes.push(phrase)
        }
      }
    }
  }

  /**
   * Handle matches for a `basic` pattern.
   * **Basic** patterns need no extra logic, every match is emitted as a
   * warning.
   *
   * @param {Match[]} matches
   * @param {Pattern} pattern
   * @param {VFile} file
   * @returns {void}
   */
  function basic(matches, pattern, file) {
    let index = -1

    while (++index < matches.length) {
      warn(file, matches[index], pattern)
    }
  }

  /**
   * Handle matches for an **or** pattern.
   * **Or** patterns emit a warning unless every category is present.
   *
   * For example, when `him` and `her` occur adjacent to each other, they are not
   * warned about.
   * But when they occur alone, they are.
   *
   * @param {Match[]} matches
   * @param {Pattern} pattern
   * @param {VFile} file
   * @returns {void}
   */
  function or(matches, pattern, file) {
    let index = -1

    while (++index < matches.length) {
      const match = matches[index]
      const siblings = match.parent.children
      const next = matches[index + 1]

      if (next && next.parent === match.parent && next.type !== match.type) {
        let start = match.end

        while (++start < next.start) {
          const sibling = siblings[start]

          if (
            whiteSpace(sibling) ||
            (word(sibling) && /(and|or)/.test((0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_5__.normalize)(sibling))) ||
            (punctuation(sibling) && (0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_5__.normalize)(sibling) === '/')
          ) {
            continue
          }

          break
        }

        // If we didn’t break…
        if (start === next.start) {
          index++
          continue
        }
      }

      warn(file, match, pattern)
    }
  }

  /**
   * @param {VFile} file
   * @param {Match} match
   * @param {Pattern} pattern
   * @returns {void}
   */
  function warn(file, match, pattern) {
    const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_4__.toString)(match.nodes)
    /** @type {string[]|undefined} */
    let expected

    if (pattern.considerate) {
      expected = Object.keys(pattern.considerate)

      // Capitalize suggestions.
      if (actual.charAt(0).toUpperCase() === actual.charAt(0)) {
        let index = -1

        while (++index < expected.length) {
          expected[index] =
            expected[index].charAt(0).toUpperCase() + expected[index].slice(1)
        }
      }
    }

    Object.assign(
      file.message(
        (0,quotation__WEBPACK_IMPORTED_MODULE_6__.quotation)(actual, '`') +
          ' may be insensitive' +
          (pattern.condition ? ', ' + pattern.condition : '') +
          ', ' +
          (expected
            ? 'use ' + (0,quotation__WEBPACK_IMPORTED_MODULE_6__.quotation)(expected, '`').join(', ') + ' instead'
            : 'try not to use it'),
        match.nodes[0],
        [source, pattern.id].join(':')
      ),
      {actual, expected, note: pattern.note}
    )
  }
}


/***/ }),

/***/ "./node_modules/retext-indefinite-article/lib/a.js":
/*!*********************************************************!*\
  !*** ./node_modules/retext-indefinite-article/lib/a.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": function() { return /* binding */ a; }
/* harmony export */ });
const a = [
  'unist',

  'U',
  'UEFA',
  'UK',
  'UN',
  'UNHCR',
  'US',
  'USB',
  'eucalypt*',
  'eucha*',
  'euchr*',
  'euclid*',
  'eucrite',
  'eucryphia',
  'eugen*',
  'eukar*',
  'eulog*',
  'eunice',
  'eunuch',
  'euph*',
  'eura*',
  'eure*',
  'euro*',
  'eury*',
  'eutha*',
  'ewe',
  'ewer',
  'habitual',
  'hallucin*',
  'herb*',
  'heredit*',
  'histor*',
  'hilarious*',
  'horrend*',
  'horrif*',
  'hotel*',
  'ms',
  'once',
  'one',
  'one/',
  'one-*',
  'oneanother',
  'oneberry',
  'onefold*',
  'oneheart*',
  'oneness*',
  'oneself*',
  'onetime*',
  'oneway',
  'onewhere*',
  'oneyear',
  'ubiq*',
  'ugandan',
  'ukase',
  'ukrain*',
  'ukulele',
  'ululated',
  'ululation',
  'unanim*',
  'unary',
  'unesco',
  'uniam*',
  'uniart*',
  'uniat*',
  'uniaur*',
  'uniax*',
  'unibas*',
  'unible',
  'unicycl*',
  'unidirect*',
  'union*',
  'unit*',
  'univ*',
  'unif*',
  'uniq*',
  'uran*',
  'urate',
  'uri*',
  'urologist',
  'uruguay',
  'uruguayan',
  'uruguayans',
  'usab*',
  'usage',
  'use*',
  'using',
  'usu*',
  'utah',
  'uten*',
  'uter*',
  'util*',
  'utop*',
  'utrecht',
  'uttoxeter',
  'uvula',
  'uvular',
  'uyghur'
]


/***/ }),

/***/ "./node_modules/retext-indefinite-article/lib/an.js":
/*!**********************************************************!*\
  !*** ./node_modules/retext-indefinite-article/lib/an.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "an": function() { return /* binding */ an; }
/* harmony export */ });
const an = [
  'mdast',

  'α',
  'f',
  'fbi',
  'fm',
  'fda',
  'l',
  'm',
  'n',
  'nfl',
  'nba',
  'nbc',
  'nhl',
  'ngo',
  'npm',
  'nvidia',
  's',
  'r',
  'h',
  'habitual',
  'hallucin*',
  'hauteur',
  'heir*',
  'herb*',
  'heredit*',
  'hilarious*',
  'histor*',
  'homage',
  'honest*',
  'honor*',
  'honour*',
  'horrend*',
  'horrif*',
  'hotel*',
  'hour*',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hiv',
  'lbw',
  'lcd',
  'mpg',
  'mph',
  'MBA',
  'MA',
  'MRI',
  'msc',
  'MS',
  'MTV',
  'html',
  'r&d',
  'SGML',
  'SOS',
  'SMS',
  'x',
  'XML',
  'xmas',
  'x-ray',
  'x-rays',
  'xbox',
  'SUV',
  'STD',
  'SPF',
  'HB',
  'RAF',
  'IOU'
]


/***/ }),

/***/ "./node_modules/retext-indefinite-article/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/retext-indefinite-article/lib/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextIndefiniteArticle; }
/* harmony export */ });
/* harmony import */ var format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! format */ "./node_modules/format/format.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var number_to_words__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! number-to-words */ "./node_modules/number-to-words/numberToWords.min.js");
/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./a.js */ "./node_modules/retext-indefinite-article/lib/a.js");
/* harmony import */ var _an_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./an.js */ "./node_modules/retext-indefinite-article/lib/an.js");
/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Sentence} Sentence
 * @typedef {import('nlcst').Word} Word
 *
 * @typedef {'a'|'an'|'a-or-an'} Type
 */

// @ts-expect-error: untyped.







const ruleId = 'retext-indefinite-article:retext-indefinite-article'
const url = 'https://github.com/retextjs/retext-indefinite-article#readme'

const needsA = factory(_a_js__WEBPACK_IMPORTED_MODULE_2__.a)
const needsAn = factory(_an_js__WEBPACK_IMPORTED_MODULE_3__.an)

/**
 * Plugin to check if indefinite articles (`a` and `an`) are used correctly
 * (which isn’t as simple as checking vowels as it has to do with sounds).
 * Knows about how digits are pronounced as well.
 *
 * @type {import('unified').Plugin<[], Root>}
 */
function retextIndefiniteArticle() {
  return (tree, file) => {
    ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_4__.visit)(tree, 'WordNode', (node, index, parent_) => {
      const parent = /** @type {Sentence} */ (parent_)
      const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__.toString)(node)
      const normal = actual.toLowerCase()

      if ((normal !== 'a' && normal !== 'an') || !parent || index === null) {
        return
      }

      const next = after(parent, index)

      if (!next) {
        return
      }

      const an = actual.length !== 1
      const following = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__.toString)(next)

      // Exit if `A` and this isn’t sentence-start: `Station A equals`
      if (normal !== actual && !an && !firstWord(parent, index)) {
        return
      }

      // Exit if `a` is used as a letter: `a and b`.
      if (normal === actual && !an && /^(and|or|nor)$/i.test(following)) {
        return
      }

      /** @type {string|undefined} */
      let expected = classify(following)

      if (!(expected === 'an' && !an) && !(expected === 'a' && an)) {
        return
      }

      if (normal !== actual) {
        expected = expected.charAt(0).toUpperCase() + expected.slice(1)
      }

      Object.assign(
        file.message(
          format__WEBPACK_IMPORTED_MODULE_0__('Use `%s` before `%s`, not `%s`', expected, following, actual),
          node,
          ruleId
        ),
        {actual, expected: [expected], url}
      )
    })
  }
}

/**
 * Check if there’s no word before `index`.
 *
 * @param {Sentence} parent
 * @param {number} index
 * @returns {boolean}
 */
function firstWord(parent, index) {
  const siblings = parent.children

  while (index--) {
    if (siblings[index].type === 'WordNode') {
      return false
    }
  }

  return true
}

/**
 * Get the next word.
 *
 * @param {Sentence} parent
 * @param {number} index
 * @returns {Word|undefined}
 */
function after(parent, index) {
  const siblings = parent.children
  let sibling = siblings[++index]
  /** @type {Word|undefined} */
  let other

  if (sibling && sibling.type === 'WhiteSpaceNode') {
    sibling = siblings[++index]

    if (
      sibling &&
      sibling.type === 'PunctuationNode' &&
      /^[“”‘’'"()[\]]$/.test((0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__.toString)(sibling))
    ) {
      sibling = siblings[++index]
    }

    if (sibling && sibling.type === 'WordNode') {
      other = sibling
    }
  }

  return other
}

/**
 * Classify a word.
 *
 * @param {string} value
 * @returns {Type|undefined}
 */
function classify(value) {
  const head = value
    .replace(/^\d+/, (value) => number_to_words__WEBPACK_IMPORTED_MODULE_1__.toWords(value) + ' ')
    .split(/['’ -]/, 1)[0]
  const normal = head.toLowerCase()
  /** @type {Type|undefined} */
  let type

  if (needsA(head)) {
    type = 'a'
  }

  if (needsAn(head)) {
    type = type === 'a' ? 'a-or-an' : 'an'
  }

  if (!type && normal === head) {
    type = /[aeiou]/.test(normal.charAt(0)) ? 'an' : 'a'
  }

  return type
}

/**
 * Create a test based on a list of phrases.
 *
 * @param {string[]} list
 */
function factory(list) {
  /** @type {RegExp[]} */
  const expressions = []
  /** @type {string[]} */
  const sensitive = []
  /** @type {string[]} */
  const insensitive = []
  let index = -1

  while (++index < list.length) {
    const value = list[index]

    if (value.charAt(value.length - 1) === '*') {
      // Regexes are insensitive now, once we need them this should check for
      // `normal` as well.
      expressions.push(new RegExp('^' + value.slice(0, -1), 'i'))
    } else if (value === value.toLowerCase()) {
      insensitive.push(value)
    } else {
      sensitive.push(value)
    }
  }

  return test

  /**
   * @param {string} value
   * @returns {boolean}
   */
  function test(value) {
    const normal = value.toLowerCase()

    if (sensitive.includes(value) || insensitive.includes(normal)) {
      return true
    }

    let index = -1

    while (++index < expressions.length) {
      if (expressions[index].test(value)) {
        return true
      }
    }

    return false
  }
}


/***/ }),

/***/ "./node_modules/retext-intensify/index.js":
/*!************************************************!*\
  !*** ./node_modules/retext-intensify/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextIntensify; }
/* harmony export */ });
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/* harmony import */ var nlcst_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nlcst-search */ "./node_modules/nlcst-search/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var quotation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! quotation */ "./node_modules/quotation/index.js");
/* harmony import */ var fillers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fillers */ "./node_modules/fillers/index.js");
/* harmony import */ var hedges__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hedges */ "./node_modules/hedges/index.js");
/* harmony import */ var weasels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! weasels */ "./node_modules/weasels/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {string[]} [ignore]
 *   Phrases *not* to warn about.
 */









const list = [...new Set([...fillers__WEBPACK_IMPORTED_MODULE_0__.fillers, ...hedges__WEBPACK_IMPORTED_MODULE_1__.hedges, ...weasels__WEBPACK_IMPORTED_MODULE_2__.weasels])].sort()

const source = 'retext-intensify'
const url = 'https://github.com/retextjs/retext-intensify#readme'

/**
 * Plugin to check for weak and mitigating wording.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
function retextIntensify(options = {}) {
  const ignore = options.ignore || []
  const phrases =
    ignore.length > 0 ? list.filter((d) => !ignore.includes(d)) : list

  return (tree, file) => {
    ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_3__.search)(tree, phrases, (match, _, _1, phrase) => {
      const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_4__.toString)(match)
      let type = 'weasel'

      if (!weasels__WEBPACK_IMPORTED_MODULE_2__.weasels.includes(phrase)) {
        type = fillers__WEBPACK_IMPORTED_MODULE_0__.fillers.includes(phrase) ? 'filler' : 'hedge'
      }

      Object.assign(
        file.message(
          'Don’t use ' +
            (0,quotation__WEBPACK_IMPORTED_MODULE_5__.quotation)(actual, '`') +
            ', ' +
            (type === 'weasel'
              ? 'it’s vague or ambiguous'
              : type === 'filler'
              ? 'it doesn’t add meaning'
              : 'it lessens impact'),
          {start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_6__.pointStart)(match[0]), end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_6__.pointEnd)(match[match.length - 1])},
          [source, type].join(':')
        ),
        {actual, expected: [], url}
      )
    })
  }
}


/***/ }),

/***/ "./node_modules/retext-passive/index.js":
/*!**********************************************!*\
  !*** ./node_modules/retext-passive/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextPassive; }
/* harmony export */ });
/* harmony import */ var nlcst_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-search */ "./node_modules/nlcst-search/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_find_before__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-find-before */ "./node_modules/unist-util-find-before/index.js");
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.js */ "./node_modules/retext-passive/list.js");
/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Word} Word
 *
 * @typedef Options
 *   Configuration.
 * @property {string[]} [ignore]
 *   Phrases *not* to warn about.
 */







const source = 'retext-passive'
const url = 'https://github.com/retextjs/retext-passive#readme'

const verbs = new Set(['am', 'are', 'were', 'being', 'is', 'been', 'was', 'be'])

/**
 * Plugin to check for passive voice.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
function retextPassive(options = {}) {
  const ignore = options.ignore || []
  const phrases =
    ignore.length > 0 ? _list_js__WEBPACK_IMPORTED_MODULE_0__.list.filter((d) => !ignore.includes(d)) : _list_js__WEBPACK_IMPORTED_MODULE_0__.list

  return (tree, file) => {
    ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_1__.search)(tree, phrases, (match, index, parent, phrase) => {
      const before = /** @type {Word} */ ((0,unist_util_find_before__WEBPACK_IMPORTED_MODULE_2__.findBefore)(parent, index, 'WordNode'))

      if (!before || !verbs.has((0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_3__.toString)(before).toLowerCase())) {
        return
      }

      Object.assign(
        file.message(
          'Don’t use the passive voice',
          {start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_4__.pointStart)(match[0]), end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_4__.pointEnd)(match[match.length - 1])},
          [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
        ),
        {actual: (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_3__.toString)(match), expected: [], url}
      )
    })
  }
}


/***/ }),

/***/ "./node_modules/retext-passive/list.js":
/*!*********************************************!*\
  !*** ./node_modules/retext-passive/list.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "list": function() { return /* binding */ list; }
/* harmony export */ });
const list = [
  'awoken',
  'awoke',
  'beaten',
  'beat',
  'begun',
  'began',
  'bent',
  'bitten',
  'bit',
  'bled',
  'blown',
  'blew',
  'broken',
  'broke',
  'brought',
  'built',
  'bought',
  'caught',
  'chosen',
  'chose',
  'dealt',
  'done',
  'did',
  'drawn',
  'drew',
  'driven',
  'drove',
  'eaten',
  'ate',
  'fed',
  'felt',
  'fought',
  'found',
  'forbidden',
  'forbade',
  'forgotten',
  'forgot',
  'forgiven',
  'forgave',
  'frozen',
  'froze',
  'gotten',
  'got',
  'given',
  'gave',
  'ground',
  'grinded',
  'hung',
  'heard',
  'hidden',
  'hid',
  'hit',
  'held',
  'hurt',
  'kept',
  'known',
  'knew',
  'laid',
  'led',
  'let',
  'lost',
  'made',
  'meant',
  'met',
  'paid',
  'proven',
  'proved',
  'put',
  'read',
  'ridden',
  'rode',
  'rung',
  'rang',
  'run',
  'ran',
  'said',
  'seen',
  'saw',
  'sold',
  'sent',
  'shaken',
  'shook',
  'shaved',
  'shot',
  'shown',
  'shut',
  'sung',
  'sunk',
  'slain',
  'slew',
  'slid',
  'spoken',
  'spoke',
  'spent',
  'spun',
  'split',
  'spread',
  'stolen',
  'stole',
  'struck',
  'swept',
  'swung',
  'taken',
  'took',
  'taught',
  'torn',
  'tore',
  'told',
  'thought',
  'thrown',
  'threw',
  'undergone',
  'underwent',
  'understood',
  'upset',
  'woken',
  'woke',
  'worn',
  'wore',
  'won',
  'withdrawn',
  'withdrew',
  'written',
  'wrote',
  'been',
  'born',
  'become',
  'beset',
  'bet',
  'bid',
  'bidden',
  'bound',
  'bred',
  'broadcast',
  'burnt',
  'burst',
  'cast',
  'clung',
  'come',
  'cost',
  'crept',
  'cut',
  'dug',
  'dived',
  'dreamt',
  'drunk',
  'fallen',
  'fit',
  'fled',
  'flung',
  'flown',
  'foregone',
  'forsaken',
  'gone',
  'grown',
  'knelt',
  'knit',
  'leapt',
  'learnt',
  'left',
  'lent',
  'lain',
  'lighted',
  'misspelt',
  'mistaken',
  'mown',
  'overcome',
  'overdone',
  'overtaken',
  'overthrown',
  'pled',
  'quit',
  'rid',
  'risen',
  'sawn',
  'sought',
  'set',
  'sewn',
  'shaven',
  'shorn',
  'shed',
  'shone',
  'shod',
  'shrunk',
  'sat',
  'slept',
  'slung',
  'slit',
  'smitten',
  'sown',
  'sped',
  'spilt',
  'spit',
  'sprung',
  'stood',
  'stuck',
  'stung',
  'stunk',
  'stridden',
  'strung',
  'striven',
  'sworn',
  'swollen',
  'swum',
  'thrived',
  'thrust',
  'trodden',
  'upheld',
  'woven',
  'wed',
  'wept',
  'wound',
  'withheld',
  'withstood',
  'wrung'
]


/***/ }),

/***/ "./node_modules/retext-profanities/en.js":
/*!***********************************************!*\
  !*** ./node_modules/retext-profanities/en.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cuss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cuss */ "./node_modules/cuss/index.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factory.js */ "./node_modules/retext-profanities/factory.js");
/**
 * @typedef {import('./factory.js').Options} Options
 */





const retextProfanitiesEn = (0,_factory_js__WEBPACK_IMPORTED_MODULE_1__.factory)({
  lang: 'en',
  cuss: cuss__WEBPACK_IMPORTED_MODULE_2__.cuss,
  pluralize: pluralize__WEBPACK_IMPORTED_MODULE_0__,
  // Misclassified singulars and plurals.
  ignorePluralize: [
    'children',
    'dy', // Singular of `dies`.
    'pro', // Singular of `pros`.
    'so', // Singular of `sos`.
    'dice', // Plural of `die`.
    'fus' // Plural of `fu`.
  ],
  // List of values not to normalize.
  regular: ['hell']
})

/* harmony default export */ __webpack_exports__["default"] = (retextProfanitiesEn);


/***/ }),

/***/ "./node_modules/retext-profanities/factory.js":
/*!****************************************************!*\
  !*** ./node_modules/retext-profanities/factory.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "factory": function() { return /* binding */ factory; }
/* harmony export */ });
/* harmony import */ var nlcst_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nlcst-search */ "./node_modules/nlcst-search/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var quotation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quotation */ "./node_modules/quotation/index.js");
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef Config
 * @property {string} lang
 * @property {Record<string, number>} cuss
 * @property {{singular: (word: string) => string, plural: (word: string) => string}} [pluralize]
 * @property {string[]} [ignorePluralize]
 * @property {string[]} [regular]
 *
 * @typedef Options
 *   Configuration.
 * @property {string[]} [ignore]
 *   Phrases *not* to warn about.
 * @property {0|1|2} [sureness=0]
 *   Minimum *sureness* to warn about, see `cuss`.
 */






const own = {}.hasOwnProperty

/**
 * @param {Config} config
 */
function factory(config) {
  const regular = config.regular || []
  const words = unpack()
  const source =
    'retext-profanities' + (config.lang === 'en' ? '' : '-' + config.lang)

  /**
   * Plugin to check for profane and vulgar wording.
   * Uses `cuss` for sureness.
   *
   * @type {import('unified').Plugin<[Options?], Root>}
   */
  return (options = {}) => {
    const ignore = options.ignore || []
    const sureness = options.sureness || 0
    const phrases = Object.keys(words).filter((d) => !ignore.includes(d))
    const normals =
      regular.length > 0 ? phrases.filter((d) => !regular.includes(d)) : phrases
    const literals = regular.filter((d) => phrases.includes(d))

    return (tree, file) => {
      ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_0__.search)(tree, normals, handle)
      ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_0__.search)(tree, literals, handle, true)

      /** @type {import('nlcst-search').Handler} */
      function handle(match, _, _1, phrase) {
        const profanitySeverity = words[phrase]
        const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(match)

        if (profanitySeverity < sureness) {
          return
        }

        Object.assign(
          file.message(
            [
              profanitySeverity === 0
                ? 'Be careful with'
                : profanitySeverity === 1
                ? 'Reconsider using'
                : 'Don’t use',
              (0,quotation__WEBPACK_IMPORTED_MODULE_2__.quotation)(actual, '`') + ',',
              profanitySeverity === 0
                ? 'it’s profane in some cases'
                : profanitySeverity === 1
                ? 'it may be profane'
                : 'it’s profane'
            ].join(' '),
            {
              start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_3__.pointStart)(match[0]),
              end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_3__.pointEnd)(match[match.length - 1])
            },
            [source, phrase.replace(/\W+/g, '-')].join(':')
          ),
          {profanitySeverity, actual, expected: []}
        )
      }
    }
  }

  /**
   * @returns {Record<string, number>}
   */
  function unpack() {
    /** @type {Record<string, number>} */
    const result = {}
    /** @type {string} */
    let key

    for (key in config.cuss) {
      if (own.call(config.cuss, key)) {
        add(key, config.cuss[key])

        if (config.pluralize) {
          add(config.pluralize.singular(key), config.cuss[key])
          add(config.pluralize.plural(key), config.cuss[key])
        }
      }
    }

    /**
     * @param {string} key
     * @param {number} value
     */
    function add(key, value) {
      if (!config.ignorePluralize || !config.ignorePluralize.includes(key)) {
        result[key] = value
      }
    }

    return result
  }
}


/***/ }),

/***/ "./node_modules/retext-profanities/index.js":
/*!**************************************************!*\
  !*** ./node_modules/retext-profanities/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _en_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en.js */ "./node_modules/retext-profanities/en.js");
/**
 * @typedef {import('./factory.js').Options} Options
 */



/* harmony default export */ __webpack_exports__["default"] = (_en_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/retext-readability/index.js":
/*!**************************************************!*\
  !*** ./node_modules/retext-readability/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextReadability; }
/* harmony export */ });
/* harmony import */ var automated_readability__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! automated-readability */ "./node_modules/automated-readability/index.js");
/* harmony import */ var coleman_liau__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! coleman-liau */ "./node_modules/coleman-liau/index.js");
/* harmony import */ var dale_chall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dale-chall */ "./node_modules/dale-chall/index.js");
/* harmony import */ var dale_chall_formula__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dale-chall-formula */ "./node_modules/dale-chall-formula/index.js");
/* harmony import */ var flesch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flesch */ "./node_modules/flesch/index.js");
/* harmony import */ var gunning_fog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gunning-fog */ "./node_modules/gunning-fog/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var smog_formula__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! smog-formula */ "./node_modules/smog-formula/index.js");
/* harmony import */ var spache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! spache */ "./node_modules/spache/index.js");
/* harmony import */ var spache_formula__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! spache-formula */ "./node_modules/spache-formula/index.js");
/* harmony import */ var syllable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! syllable */ "./node_modules/syllable/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef Options
 * @property {number} [age=16]
 *   Target age group.
 *   Note that the different algorithms provide varying results, so your milage
 *   may vary with people actually that age.
 * @property {number} [threshold=4/7]
 *   Number of algorithms that need to agree.
 *   By default, 4 out of the 7 algorithms need to agree that a sentence is hard
 *   to read for the target age, in which case it’s warned about.
 * @property {number} [minWords=5]
 *   Minimum number of words a sentence should have when warning.
 *   Most algorithms are designed to take a large sample of sentences to detect
 *   the body’s reading level.
 *   This plugin works on a per-sentence basis and that makes the results quite
 *   skewered when a short sentence has a few long words or some unknown ones.
 */














const origin = 'retext-readability:readability'
const url = 'https://github.com/retextjs/retext-readability#readme'
const defaultTargetAge = 16
const defaultWordynessThreshold = 5
const defaultThreshold = 4 / 7

const own = {}.hasOwnProperty
const floor = Math.floor
const round = Math.round
const ceil = Math.ceil
const sqrt = Math.sqrt

/**
 * Plugin to detect possibly hard to read sentences.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
function retextReadability(options = {}) {
  const targetAge = options.age || defaultTargetAge
  const threshold = options.threshold || defaultThreshold
  const minWords =
    options.minWords === null || options.minWords === undefined
      ? defaultWordynessThreshold
      : options.minWords

  return (tree, file) => {
    ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(tree, 'SentenceNode', (sentence) => {
      /** @type {Record<string, boolean>} */
      const familiarWords = {}
      /** @type {Record<string, boolean>} */
      const easyWord = {}
      let complexPolysillabicWord = 0
      let familiarWordCount = 0
      let polysillabicWord = 0
      let totalSyllables = 0
      let easyWordCount = 0
      let wordCount = 0
      let letters = 0

      ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(sentence, 'WordNode', (node) => {
        const value = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(node)
        const caseless = value.toLowerCase()
        const syllables = (0,syllable__WEBPACK_IMPORTED_MODULE_2__.syllable)(value)

        wordCount++
        totalSyllables += syllables
        letters += value.length

        // Count complex words for gunning-fog based on whether they have three
        // or more syllables and whether they aren’t proper nouns.  The last is
        // checked a little simple, so this index might be over-eager.
        if (syllables >= 3) {
          polysillabicWord++

          if (value.charCodeAt(0) === caseless.charCodeAt(0)) {
            complexPolysillabicWord++
          }
        }

        // Find unique unfamiliar words for spache.
        if (spache__WEBPACK_IMPORTED_MODULE_3__.spache.includes(caseless) && !own.call(familiarWords, caseless)) {
          familiarWords[caseless] = true
          familiarWordCount++
        }

        // Find unique difficult words for dale-chall.
        if (dale_chall__WEBPACK_IMPORTED_MODULE_4__.daleChall.includes(caseless) && !own.call(easyWord, caseless)) {
          easyWord[caseless] = true
          easyWordCount++
        }
      })

      if (wordCount >= minWords) {
        const counts = {
          complexPolysillabicWord,
          polysillabicWord,
          unfamiliarWord: wordCount - familiarWordCount,
          difficultWord: wordCount - easyWordCount,
          syllable: totalSyllables,
          sentence: 1,
          word: wordCount,
          character: letters,
          letter: letters
        }

        /** @type {number[]} */
        const scores = [
          gradeToAge((0,dale_chall_formula__WEBPACK_IMPORTED_MODULE_5__.daleChallGradeLevel)((0,dale_chall_formula__WEBPACK_IMPORTED_MODULE_5__.daleChallFormula)(counts))[1]),
          gradeToAge((0,automated_readability__WEBPACK_IMPORTED_MODULE_6__.automatedReadability)(counts)),
          gradeToAge((0,coleman_liau__WEBPACK_IMPORTED_MODULE_7__.colemanLiau)(counts)),
          fleschToAge((0,flesch__WEBPACK_IMPORTED_MODULE_8__.flesch)(counts)),
          smogToAge((0,smog_formula__WEBPACK_IMPORTED_MODULE_9__.smogFormula)(counts)),
          gradeToAge((0,gunning_fog__WEBPACK_IMPORTED_MODULE_10__.gunningFog)(counts)),
          gradeToAge((0,spache_formula__WEBPACK_IMPORTED_MODULE_11__.spacheFormula)(counts))
        ]

        let index = -1
        let failCount = 0

        while (++index < scores.length) {
          if (scores[index] > targetAge) {
            failCount++
          }
        }

        const confidence = failCount / scores.length

        if (confidence >= threshold) {
          const label = failCount + '/' + scores.length

          Object.assign(
            file.message(
              'Hard to read sentence (confidence: ' + label + ')',
              sentence,
              origin
            ),
            {
              actual: (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(sentence),
              expected: [],
              url,
              confidence,
              confidenceLabel: label
            }
          )
        }
      }

      return unist_util_visit__WEBPACK_IMPORTED_MODULE_12__.SKIP
    })
  }
}

/**
 * Calculate the typical starting age (on the higher-end) when someone joins
 * `grade` grade, in the US.
 * See: <https://en.wikipedia.org/wiki/Educational_stage#United_States>
 *
 * @param {number} grade
 * @returns {number}
 */
function gradeToAge(grade) {
  return round(grade + 5)
}

/**
 * Calculate the age relating to a Flesch result.
 *
 * @param {number} value
 * @returns {number}
 */
function fleschToAge(value) {
  return 20 - floor(value / 10)
}

/**
 * Calculate the age relating to a SMOG result.
 * See: <http://www.readabilityformulas.com/smog-readability-formula.php>
 *
 * @param {number} value
 * @returns {number}
 */
function smogToAge(value) {
  return ceil(sqrt(value) + 2.5)
}


/***/ }),

/***/ "./node_modules/retext-redundant-acronyms/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/retext-redundant-acronyms/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextRedundantAcronyms; }
/* harmony export */ });
/* harmony import */ var nlcst_normalize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nlcst-normalize */ "./node_modules/nlcst-normalize/index.js");
/* harmony import */ var nlcst_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nlcst-search */ "./node_modules/nlcst-search/index.js");
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var quotation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! quotation */ "./node_modules/quotation/index.js");
/* harmony import */ var unist_util_find_after__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unist-util-find-after */ "./node_modules/unist-util-find-after/index.js");
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema.js */ "./node_modules/retext-redundant-acronyms/schema.js");
/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Sentence} Sentence
 * @typedef {import('nlcst').Word} Word
 */










// Trans.
pluralize__WEBPACK_IMPORTED_MODULE_0__.addSingularRule(/trans$/i, 'singular')

const source = 'retext-redundant-acronyms'
const url = 'https://github.com/retextjs/retext-redundant-acronyms#readme'

const list = Object.keys(_schema_js__WEBPACK_IMPORTED_MODULE_1__.schema)

/**
 * Plugin to check for redundant acronyms (such as `ATM machine` to `ATM`).
 *
 * @type {import('unified').Plugin<[], Root>}
 */
function retextRedundantAcronyms() {
  return (tree, file) => {
    ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_2__.search)(tree, list, (match, start, parent_, phrase) => {
      const parent = /** @type {Sentence} */ (parent_)
      const expansions = _schema_js__WEBPACK_IMPORTED_MODULE_1__.schema[phrase]
      const siblings = parent.children
      const tail = siblings[start + match.length - 1]
      let index = -1

      while (++index < expansions.length) {
        const expansion = expansions[index]
        let nextNode = /** @type {Word} */ ((0,unist_util_find_after__WEBPACK_IMPORTED_MODULE_3__.findAfter)(parent, tail, 'WordNode'))

        // We can probably break because the other expansions probably aren’t
        // going to match, but it could be that a following expansion has no
        // next word.
        if (!nextNode) {
          continue
        }

        let nextActual = pluralize__WEBPACK_IMPORTED_MODULE_0__.singular((0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_4__.normalize)(nextNode))
        const expansionIndex = expansion.indexOf(nextActual, 1)

        if (expansionIndex === -1) {
          continue
        }

        let nextExpected = nextActual
        const rest = expansion.slice(expansionIndex + 1)

        while (rest.length > 0) {
          // @ts-expect-error: to do: impove `find-after` types.
          nextNode = (0,unist_util_find_after__WEBPACK_IMPORTED_MODULE_3__.findAfter)(parent, nextNode, 'WordNode')

          if (!nextNode) {
            break
          }

          // @ts-expect-error: TS doesn’t know there’s always one item in the
          // list.
          nextExpected = rest.shift()
          nextActual = pluralize__WEBPACK_IMPORTED_MODULE_0__.singular((0,nlcst_normalize__WEBPACK_IMPORTED_MODULE_4__.normalize)(nextNode))

          if (nextExpected !== nextActual) {
            break
          }
        }

        if (rest.length === 0 && nextExpected === nextActual) {
          const nodes = siblings.slice(start, siblings.indexOf(nextNode) + 1)
          const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__.toString)(nodes)
          let expected = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__.toString)(match)

          if (pluralize__WEBPACK_IMPORTED_MODULE_0__.isPlural((0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_5__.toString)(nextNode))) {
            expected += 's'
          }

          Object.assign(
            file.message(
              'Expected ' +
                (0,quotation__WEBPACK_IMPORTED_MODULE_6__.quotation)(expected, '`') +
                ' instead of ' +
                (0,quotation__WEBPACK_IMPORTED_MODULE_6__.quotation)(actual, '`'),
              {
                start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_7__.pointStart)(nodes[0]),
                end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_7__.pointEnd)(nodes[nodes.length - 1])
              },
              [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
            ),
            {actual, expected: [expected], url}
          )

          return
        }
      }
    })
  }
}


/***/ }),

/***/ "./node_modules/retext-redundant-acronyms/schema.js":
/*!**********************************************************!*\
  !*** ./node_modules/retext-redundant-acronyms/schema.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": function() { return /* binding */ schema; }
/* harmony export */ });
/** @type {Record<string, string[][]>} */
const schema = {
  ABM: [['antiballistic', 'missile']],
  ABS: [['antilock', 'braking', 'system']],
  AC: [['alternating', 'current']],
  ADD: [
    ['attentiondeficit', 'disorder'],
    ['attention', 'deficit', 'disorder']
  ],
  ADSL: [['asymmetric', 'digital', 'subscriber', 'line']],
  ACT: [['american', 'college', 'test']],
  AFC: [['american', 'footbal', 'conference']],
  AIDS: [['acquired', 'immune', 'deficiency', 'syndrome']],
  AM: [['amplitude', 'modulation']],
  APL: [['a', 'programming', 'language']],
  ARM: [['adjustable', 'rate', 'mortgage']],
  ATC: [['air', 'traffic', 'control']],
  ATM: [['automated', 'teller', 'machine']],
  BASIC: [['beginner', 'allpurpose', 'symbolic', 'instruction', 'code']],
  BBS: [['bulletin', 'board', 'system']],
  CAD: [
    ['computer', 'aided', 'design'],
    ['computeraided', 'design']
  ],
  CD: [['compact', 'disc']],
  CGA: [['color', 'graphic', 'adapter']],
  CNN: [['cable', 'news', 'network']],
  CSS: [
    ['cascading', 'style', 'sheet'],
    ['cascading', 'stylesheet']
  ],
  COBOL: [['common', 'businessoriented', 'language']],
  CPI: [['consumer', 'price', 'index']],
  CPU: [['central', 'processing', 'unit']],
  DAT: [['digital', 'audio', 'tape']],
  DC: [['direct', 'current']],
  DMZ: [['demilitarized', 'zone']],
  DOS: [['disk', 'operating', 'system']],
  EBCDIC: [['extended', 'binary', 'coded', 'decimal', 'interchange', 'code']],
  EGA: [['enhanced', 'graphic', 'adapter']],
  FM: [['frequency', 'modulation']],
  GIF: [['graphic', 'interchange', 'format']],
  GOB: [['george', 'oscar', 'bluth']],
  GOP: [['grand', 'old', 'party']],
  GPS: [['global', 'positioning', 'system']],
  GRE: [
    ['graduate', 'record', 'examination'],
    ['graduate', 'record', 'exam']
  ],
  GUI: [['graphical', 'user', 'interface']],
  HIV: [
    ['human', 'immuno', 'deficiency', 'virus'],
    ['human', 'immunodeficiency', 'virus']
  ],
  HTML: [['hypertext', 'markup', 'language']],
  IBM: [
    ['international', 'business', 'machine', 'corporation'],
    ['international', 'business', 'machine']
  ],
  IP: [
    ['internet', 'protocol'],
    ['instruction', 'pointer']
  ],
  IRA: [['individual', 'retirement', 'account']],
  IRC: [['internet', 'relay', 'chat']],
  ISBN: [['international', 'standard', 'book', 'number']],
  ISDN: [['integrated', 'service', 'digital', 'network']],
  KFC: [['kentucky', 'fried', 'chicken']],
  LAN: [['local', 'area', 'network']],
  LCD: [
    ['liquid', 'crystal', 'display'],
    ['liquidcrystal', 'display']
  ],
  LED: [
    ['light', 'emitting', 'diode'],
    ['lightemitting', 'diode']
  ],
  LEM: [['lunar', 'excursion', 'module']],
  LPG: [['liquefied', 'petroleum', 'gas']],
  MASH: [['mobile', 'army', 'surgical', 'hospital']],
  MIDI: [['musical', 'instrument', 'digital', 'interface']],
  NATO: [
    ['north', 'atlantic', 'treaty', 'organization'],
    ['north', 'atlantic', 'treaty', 'organisation']
  ],
  NFC: [['national', 'football', 'conference']],
  NPR: [['national', 'public', 'radio']],
  OPEC: [['organization', 'of', 'the', 'petroleum', 'exporting', 'country']],
  PC: [
    ['printed', 'circuit'],
    ['personal', 'computer']
  ],
  PDF: [['portable', 'document', 'format']],
  PIF: [['program', 'information', 'file']],
  PIN: [['personal', 'identification', 'number']],
  RAM: [
    ['random', 'access', 'memory'],
    ['randomaccess', 'memory']
  ],
  RAS: [['redundant', 'acronym', 'syndrome']],
  RIP: [['rest', 'in', 'peace']],
  RISC: [['reduced', 'instruction', 'set', 'computer']],
  RF: [['radio', 'frequency']],
  ROM: [
    ['read', 'only', 'memory'],
    ['readonly', 'memory']
  ],
  RPN: [['reverse', 'polish', 'notation']],
  SALT: [['strategic', 'arm', 'limitation', 'talk']],
  SAM: [
    ['surface', 'to', 'air', 'missile'],
    ['surfacetoair', 'missile']
  ],
  SAT: [
    ['scholastic', 'aptitude', 'test'],
    ['scholastic', 'assessment', 'test']
  ],
  START: [['strategic', 'arm', 'reduction', 'treaty']],
  TWA: [['trans', 'world', 'airline']],
  UHF: [['ultra', 'high', 'frequency']],
  UL: [['underwriter', 'laboratory']],
  UN: [['united', 'nation']],
  UNIVAC: [['universal', 'automatic', 'computer']],
  UPC: [['universal', 'product', 'code']],
  UPI: [['united', 'press', 'international']],
  USGS: [['united', 'state', 'geological', 'survey']],
  VAT: [
    ['value', 'added', 'tax'],
    ['valueadded', 'tax']
  ],
  VHF: [['very', 'high', 'frequency']],
  VIN: [['vehicle', 'identification', 'number']]
}


/***/ }),

/***/ "./node_modules/retext-repeated-words/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/retext-repeated-words/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextRepeatedWords; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/index.js");
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').SentenceContent} SentenceContent
 * @typedef {{value: string, child: SentenceContent, index: number}} Info
 */





const source = 'retext-repeated-words'
const url = 'https://github.com/retextjs/retext-repeated-words#readme'

// List of words that can legally occur twice.
const list = new Set([
  'had',
  'that',
  'can',
  'blah',
  'beep',
  'yadda',
  'sapiens',
  'tse',
  'mau'
])

/**
 * A retext plugin to check for for repeated words.
 *
 * * Doesn’t warn for some words which *do* occur twice (`the best exhibition
 *   they had had since`)
 * * Doesn’t warn for initialisms (`D. D. will pop up with…`)
 * * Doesn’t warn for capitalised words (`Duran Duran…`)
 *
 * @type {import('unified').Plugin<[], Root>}
 */
function retextRepeatedWords() {
  return (tree, file) => {
    ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(tree, 'SentenceNode', (parent) => {
      let index = -1
      /** @type {Info|undefined} */
      let previous
      /** @type {Info|undefined} */
      let current

      while (++index < parent.children.length) {
        const child = parent.children[index]

        if (child.type === 'WordNode') {
          const value = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(child)

          current = {child, index, value}

          if (
            previous &&
            previous.value.toLowerCase() === value.toLowerCase() &&
            !ignore(value)
          ) {
            Object.assign(
              file.message(
                'Expected `' + value + '` once, not twice',
                {start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_2__.pointStart)(previous.child), end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_2__.pointEnd)(child)},
                [source, value.toLowerCase().replace(/\W+/g, '-')].join(':')
              ),
              {
                actual: (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(
                  parent.children.slice(previous.index, index + 1)
                ),
                expected: [value],
                url
              }
            )
          }
        } else if (child.type === 'WhiteSpaceNode') {
          previous = current
          current = undefined
        } else {
          previous = undefined
          current = undefined
        }
      }

      return unist_util_visit__WEBPACK_IMPORTED_MODULE_3__.SKIP
    })
  }
}

/**
 * Check if `value`, a word which occurs twice, should be ignored.
 *
 * @param {string} value
 * @returns {boolean}
 */
function ignore(value) {
  // …the most heartening exhibition they had had since…
  if (list.has(value.toLowerCase())) {
    return true
  }

  const head = value.charAt(0)

  if (head === head.toUpperCase()) {
    // D. D. will pop up with…
    if (value.length === 2 && value.charAt(1) === '.') {
      return true
    }

    const tail = value.slice(1)

    // Duran Duran… Bella Bella…
    if (tail === tail.toLowerCase()) {
      return true
    }
  }

  return false
}


/***/ }),

/***/ "./node_modules/retext-sentence-spacing/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/retext-sentence-spacing/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextSentenceSpacing; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ "./node_modules/unist-util-is/index.js");
/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef {0|1|2|'newline'|'space'|'double-space'|null|undefined} Preferred
 *
 * @typedef Options
 *   Configuration.
 * @property {Preferred} [preferred=1]
 *   Spaces between sentences.
 *   Use `0` for line endings.
 */





const sentence = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)('SentenceNode')
const whiteSpace = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)('WhiteSpaceNode')

const source = 'retext-sentence-spacing'
const url = 'https://github.com/retextjs/retext-sentence-spacing#readme'

/**
 * Plugin to check spacing between sentences.
 * Emit warnings when the spacing does not adhere to the preferred style.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
function retextSentenceSpacing(options = {}) {
  let preferred = options.preferred

  if (preferred === 'newline') {
    preferred = 0
  }

  if (preferred === null || preferred === undefined || preferred === 'space') {
    preferred = 1
  }

  if (preferred === 'double-space') {
    preferred = 2
  }

  if (typeof preferred !== 'number') {
    throw new TypeError(
      "Expected `options.preferred` to be `'space'`, `'newline'`, or a `number`"
    )
  }

  if (preferred < 0 || preferred > 2) {
    throw new Error(
      "Expected `options.preferred` to be `'space'`, `'newline'`, or a `number` between (including) `0` and `2`"
    )
  }

  return (tree, file) => {
    (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_1__.visit)(tree, 'ParagraphNode', (node) => {
      let index = -1

      while (++index < node.children.length) {
        const child = node.children[index]

        if (
          !sentence(node.children[index - 1]) ||
          !whiteSpace(child) ||
          !sentence(node.children[index + 1])
        ) {
          continue
        }

        const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_2__.toString)(child)

        // We only check for whitespace that is *just* spaces: it’s OK to add
        // line feeds if `space` is expected.
        if (!/^ +$/.test(actual)) {
          continue
        }

        const size = actual.length
        /** @type {string} */
        let reason

        // Size is never preferred if we want a line feed.
        if (preferred === 0) {
          reason =
            'Expected a newline between sentences, not `' +
            size +
            '` space' +
            (size === 1 ? '' : 's')
        } else if (size === preferred) {
          continue
        } else {
          reason =
            'Expected `' +
            preferred +
            '` space' +
            (preferred === 1 ? '' : 's') +
            ' between sentences, not `' +
            size +
            '`'
        }

        Object.assign(
          file.message(
            reason,
            child,
            [
              source,
              preferred === 0
                ? 'newline'
                : preferred === 1
                ? 'space'
                : 'double-space'
            ].join(':')
          ),
          {
            actual,
            expected: [preferred === 0 ? '\n' : preferred === 1 ? ' ' : '  '],
            url
          }
        )
      }
    })
  }
}


/***/ }),

/***/ "./node_modules/retext-simplify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/retext-simplify/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ retextSimplify; }
/* harmony export */ });
/* harmony import */ var nlcst_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nlcst-to-string */ "./node_modules/nlcst-to-string/index.js");
/* harmony import */ var quotation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quotation */ "./node_modules/quotation/index.js");
/* harmony import */ var nlcst_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nlcst-search */ "./node_modules/nlcst-search/index.js");
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/* harmony import */ var _patterns_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patterns.js */ "./node_modules/retext-simplify/patterns.js");
/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef Options
 *   Configuration.
 * @property {string[]} [ignore]
 *   Phrases *not* to warn about (rule IDs).
 */







const source = 'retext-simplify'
const url = 'https://github.com/retextjs/retext-simplify#readme'

const keys = Object.keys(_patterns_js__WEBPACK_IMPORTED_MODULE_0__.patterns)

/**
 * Plugin to check phrases for simpler alternatives.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
function retextSimplify(options = {}) {
  const ignore = options.ignore || []
  const searches =
    ignore.length > 0 ? keys.filter((d) => !ignore.includes(d)) : keys

  return (tree, file) => {
    ;(0,nlcst_search__WEBPACK_IMPORTED_MODULE_1__.search)(tree, searches, (match, _, _1, phrase) => {
      const pattern = _patterns_js__WEBPACK_IMPORTED_MODULE_0__.patterns[phrase]
      const actual = (0,nlcst_to_string__WEBPACK_IMPORTED_MODULE_2__.toString)(match)
      const expected = pattern.replace

      Object.assign(
        file.message(
          pattern.omit && expected.length === 0
            ? 'Remove ' + (0,quotation__WEBPACK_IMPORTED_MODULE_3__.quotation)(actual, '`')
            : 'Replace ' +
                (0,quotation__WEBPACK_IMPORTED_MODULE_3__.quotation)(actual, '`') +
                ' with ' +
                (0,quotation__WEBPACK_IMPORTED_MODULE_3__.quotation)(expected, '`').join(', ') +
                (pattern.omit ? ', or remove it' : ''),
          {start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_4__.pointStart)(match[0]), end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_4__.pointEnd)(match[match.length - 1])},
          [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
        ),
        {actual, expected, url}
      )
    })
  }
}


/***/ }),

/***/ "./node_modules/retext-simplify/patterns.js":
/*!**************************************************!*\
  !*** ./node_modules/retext-simplify/patterns.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "patterns": function() { return /* binding */ patterns; }
/* harmony export */ });
/**
 * @typedef Pattern
 * @property {string[]} replace
 * @property {boolean} [omit=false]
 */

/**
 * @type {Object.<string, Pattern>}
 */
const patterns = {
  'a number of': {
    replace: ['many', 'some']
  },
  abundance: {
    replace: ['enough', 'plenty']
  },
  'accede to': {
    replace: ['agree to', 'allow']
  },
  accelerate: {
    replace: ['speed up']
  },
  accentuate: {
    replace: ['stress']
  },
  accompany: {
    replace: ['go with', 'with']
  },
  accomplish: {
    replace: ['carry out', 'do']
  },
  accorded: {
    replace: ['given']
  },
  accordingly: {
    replace: ['so']
  },
  accrue: {
    replace: ['add', 'gain']
  },
  accurate: {
    replace: ['correct', 'exact', 'right']
  },
  acquiesce: {
    replace: ['agree']
  },
  acquire: {
    replace: ['get']
  },
  additional: {
    replace: ['added', 'extra', 'more', 'other']
  },
  address: {
    replace: ['discuss']
  },
  addressees: {
    replace: ['you']
  },
  'addressees are requested': {
    omit: true,
    replace: ['please']
  },
  'adjacent to': {
    replace: ['next to']
  },
  adjustment: {
    replace: ['change']
  },
  admissible: {
    replace: ['accepted', 'allowed']
  },
  advantageous: {
    replace: ['helpful']
  },
  'adversely impact': {
    replace: ['hurt']
  },
  'adversely impact on': {
    replace: ['hurt', 'set back']
  },
  advise: {
    replace: ['recommend', 'tell']
  },
  'afford an opportunity': {
    replace: ['allow', 'let']
  },
  aforementioned: {
    replace: ['remove']
  },
  aggregate: {
    replace: ['add', 'total']
  },
  aircraft: {
    replace: ['plane']
  },
  'all of': {
    replace: ['all']
  },
  alleviate: {
    replace: ['ease', 'reduce']
  },
  allocate: {
    replace: ['divide']
  },
  'along the lines of': {
    replace: ['as in', 'like']
  },
  'already existing': {
    replace: ['existing']
  },
  alternatively: {
    replace: ['or']
  },
  ameliorate: {
    replace: ['help', 'improve']
  },
  'and/or': {
    replace: ['… or … or both']
  },
  anticipate: {
    replace: ['expect']
  },
  apparent: {
    replace: ['clear', 'plain']
  },
  appreciable: {
    replace: ['many']
  },
  appropriate: {
    omit: true,
    replace: ['proper', 'right']
  },
  approximate: {
    replace: ['about']
  },
  'arrive onboard': {
    replace: ['arrive']
  },
  'as a means of': {
    replace: ['to']
  },
  'as of yet': {
    replace: ['yet']
  },
  'as prescribed by': {
    replace: ['in']
  },
  'as to': {
    replace: ['about', 'on']
  },
  'as yet': {
    replace: ['yet']
  },
  ascertain: {
    replace: ['find out', 'learn']
  },
  assist: {
    replace: ['aid', 'help']
  },
  assistance: {
    replace: ['aid', 'help']
  },
  'at the present time': {
    replace: ['at present']
  },
  'at this time': {
    replace: ['now']
  },
  attain: {
    replace: ['meet']
  },
  attempt: {
    replace: ['try']
  },
  'attributable to': {
    replace: ['because']
  },
  authorise: {
    replace: ['allow', 'let']
  },
  authorize: {
    replace: ['allow', 'let']
  },
  'be advised': {
    omit: true,
    replace: []
  },
  'because of the fact that': {
    replace: ['because']
  },
  belated: {
    replace: ['late']
  },
  benefit: {
    replace: ['help']
  },
  'benefit from': {
    replace: ['enjoy']
  },
  bestow: {
    replace: ['award', 'give']
  },
  'by means of': {
    replace: ['by', 'with']
  },
  'by virtue of': {
    replace: ['by', 'under']
  },
  capability: {
    replace: ['ability']
  },
  caveat: {
    replace: ['warning']
  },
  cease: {
    replace: ['stop']
  },
  'close proximity': {
    replace: ['near']
  },
  'combat environment': {
    replace: ['combat']
  },
  combined: {
    replace: ['joint']
  },
  commence: {
    replace: ['begin', 'start']
  },
  'comply with': {
    replace: ['follow']
  },
  component: {
    replace: ['part']
  },
  comprise: {
    replace: ['form', 'include', 'make up']
  },
  concerning: {
    replace: ['about', 'on']
  },
  consequently: {
    replace: ['so']
  },
  consolidate: {
    replace: ['combine', 'join', 'merge']
  },
  constitutes: {
    replace: ['forms', 'is', 'makes up']
  },
  contains: {
    replace: ['has']
  },
  convene: {
    replace: ['meet']
  },
  currently: {
    omit: true,
    replace: ['now']
  },
  deem: {
    replace: ['believe', 'consider', 'think']
  },
  delete: {
    replace: ['cut', 'drop']
  },
  demonstrate: {
    replace: ['prove', 'show']
  },
  depart: {
    replace: ['go', 'leave']
  },
  designate: {
    replace: ['appoint', 'choose', 'name']
  },
  desire: {
    replace: ['want', 'wish']
  },
  determine: {
    replace: ['decide', 'figure', 'find']
  },
  disclose: {
    replace: ['show']
  },
  discontinue: {
    replace: ['drop', 'stop']
  },
  disseminate: {
    replace: ['give', 'issue', 'pass', 'send']
  },
  'due to the fact that': {
    replace: ['because', 'due to', 'since']
  },
  'during the period': {
    replace: ['during']
  },
  'e.g.': {
    replace: ['for example', 'such as']
  },
  'each and every': {
    replace: ['each']
  },
  economical: {
    replace: ['cheap']
  },
  effect: {
    replace: ['choose', 'pick', 'result']
  },
  'effect modifications': {
    replace: ['make changes']
  },
  elect: {
    replace: ['choose']
  },
  eliminate: {
    replace: ['cut', 'drop', 'end', 'stop']
  },
  elucidate: {
    replace: ['explain']
  },
  employ: {
    replace: ['use']
  },
  encounter: {
    replace: ['meet']
  },
  endeavor: {
    replace: ['try']
  },
  ensure: {
    replace: ['make sure']
  },
  enumerate: {
    replace: ['count']
  },
  equipments: {
    replace: ['equipment']
  },
  equitable: {
    replace: ['fair']
  },
  equivalent: {
    replace: ['equal']
  },
  establish: {
    replace: ['set up', 'prove', 'show']
  },
  evaluate: {
    replace: ['check', 'test']
  },
  evidenced: {
    replace: ['showed']
  },
  evident: {
    replace: ['clear']
  },
  exclusively: {
    replace: ['only']
  },
  exhibit: {
    replace: ['show']
  },
  expedite: {
    replace: ['hasten', 'hurry', 'speed up']
  },
  expeditious: {
    replace: ['fast', 'quick']
  },
  expend: {
    replace: ['spend']
  },
  expertise: {
    replace: ['ability']
  },
  expiration: {
    replace: ['end']
  },
  facilitate: {
    replace: ['ease', 'help']
  },
  'factual evidence': {
    replace: ['evidence', 'facts']
  },
  'failed to': {
    replace: ['didn’t']
  },
  feasible: {
    replace: ['can be done', 'workable']
  },
  females: {
    replace: ['women']
  },
  finalise: {
    replace: ['complete', 'finish']
  },
  finalize: {
    replace: ['complete', 'finish']
  },
  'first and foremost': {
    replace: ['first']
  },
  'for a period of': {
    replace: ['for']
  },
  'for the purpose of': {
    replace: ['to']
  },
  forfeit: {
    replace: ['give up', 'lose']
  },
  formulate: {
    replace: ['plan']
  },
  forward: {
    replace: ['send']
  },
  frequently: {
    replace: ['often']
  },
  function: {
    replace: ['act', 'role', 'work']
  },
  furnish: {
    replace: ['give', 'send']
  },
  'has a requirement for': {
    replace: ['needs']
  },
  'has no effect': {
    replace: ['does nothing', 'does not apply']
  },
  herein: {
    replace: ['here']
  },
  heretofore: {
    replace: ['until now']
  },
  herewith: {
    replace: ['here', 'below']
  },
  'honest truth': {
    replace: ['truth']
  },
  however: {
    replace: ['but', 'yet']
  },
  'i.e.': {
    replace: ['as in']
  },
  identical: {
    replace: ['same']
  },
  identify: {
    replace: ['find', 'name', 'show']
  },
  'if and when': {
    replace: ['if', 'when']
  },
  immediately: {
    replace: ['at once']
  },
  impacted: {
    replace: ['affected', 'changed', 'harmed']
  },
  implement: {
    replace: ['carry out', 'install', 'put in place', 'tool', 'start']
  },
  'in a timely manner': {
    replace: ['on time', 'promptly']
  },
  'in accordance with': {
    replace: ['by', 'under', 'following', 'per']
  },
  'in addition': {
    replace: ['also', 'besides', 'too']
  },
  'in all likelihood': {
    replace: ['probably']
  },
  'in an effort to': {
    replace: ['to']
  },
  'in between': {
    replace: ['between']
  },
  'in excess of': {
    replace: ['more than']
  },
  'in lieu of': {
    replace: ['instead']
  },
  'in light of the fact that': {
    replace: ['because']
  },
  'in many cases': {
    replace: ['often']
  },
  'in order that': {
    replace: ['for', 'so']
  },
  'in order to': {
    replace: ['to']
  },
  'in order for': {
    replace: ['for']
  },
  'in regard to': {
    replace: ['about', 'concerning', 'on']
  },
  'in relation to': {
    replace: ['about', 'with', 'to']
  },
  'in some instances': {
    replace: ['sometimes']
  },
  'in terms of': {
    omit: true,
    replace: ['as', 'for', 'with']
  },
  'in the amount of': {
    replace: ['for']
  },
  'in the event of': {
    replace: ['if']
  },
  'in the near future': {
    replace: ['soon', 'shortly']
  },
  'in the process of': {
    omit: true,
    replace: []
  },
  'in view of': {
    replace: ['since']
  },
  'in view of the above': {
    replace: ['so']
  },
  'inasmuch as': {
    replace: ['since']
  },
  inception: {
    replace: ['start']
  },
  'incumbent upon': {
    replace: ['must']
  },
  indicate: {
    replace: ['show', 'say', 'state', 'write down']
  },
  indication: {
    replace: ['sign']
  },
  initial: {
    replace: ['first']
  },
  initiate: {
    replace: ['start']
  },
  'inter alia': {
    omit: true,
    replace: []
  },
  interface: {
    replace: ['meet', 'work with']
  },
  'interpose no objection': {
    replace: ['don’t object']
  },
  'is applicable to': {
    replace: ['applies to']
  },
  'is authorised to': {
    replace: ['may']
  },
  'is authorized to': {
    replace: ['may']
  },
  'is in consonance with': {
    replace: ['agrees with', 'follows']
  },
  'is responsible for': {
    omit: true,
    replace: ['handles']
  },
  'it appears': {
    replace: ['seems']
  },
  'it is': {
    omit: true,
    replace: []
  },
  'it is essential': {
    replace: ['must', 'need to']
  },
  'it is requested': {
    replace: ['please']
  },
  liaison: {
    replace: ['discussion']
  },
  'limited number': {
    replace: ['limits']
  },
  literally: {
    omit: true,
    replace: []
  },
  magnitude: {
    replace: ['size']
  },
  maintain: {
    replace: ['support', 'keep']
  },
  maximum: {
    replace: ['greatest', 'largest', 'most']
  },
  methodology: {
    replace: ['method']
  },
  minimise: {
    replace: ['cut', 'decrease']
  },
  minimize: {
    replace: ['cut', 'decrease']
  },
  minimum: {
    replace: ['least', 'small', 'smallest']
  },
  modify: {
    replace: ['change']
  },
  monitor: {
    replace: ['check', 'track', 'watch']
  },
  multiple: {
    replace: ['many']
  },
  necessitate: {
    replace: ['cause', 'need']
  },
  nevertheless: {
    replace: ['besides', 'even so', 'still']
  },
  'not certain': {
    replace: ['uncertain']
  },
  'not many': {
    replace: ['few']
  },
  'not often': {
    replace: ['rarely']
  },
  'not unless': {
    replace: ['only if']
  },
  'not unlike': {
    replace: ['alike', 'similar']
  },
  notify: {
    replace: ['let know', 'tell']
  },
  'not later than': {
    replace: ['by', 'before']
  },
  notwithstanding: {
    replace: ['despite', 'in spite of', 'still']
  },
  'null and void': {
    replace: ['null', 'void']
  },
  numerous: {
    replace: ['many']
  },
  objective: {
    replace: ['aim', 'goal']
  },
  obligate: {
    replace: ['bind', 'compel']
  },
  observe: {
    replace: ['see']
  },
  obtain: {
    replace: ['get']
  },
  'on the contrary': {
    replace: ['but', 'so']
  },
  'on the other hand': {
    omit: true,
    replace: ['but', 'so']
  },
  'one particular': {
    replace: ['one']
  },
  operate: {
    replace: ['run', 'use', 'work']
  },
  optimum: {
    replace: ['best', 'greatest', 'most']
  },
  option: {
    replace: ['choice']
  },
  overall: {
    omit: true,
    replace: []
  },
  'owing to the fact that': {
    replace: ['because', 'since']
  },
  parameters: {
    replace: ['limits']
  },
  participate: {
    replace: ['take part']
  },
  particulars: {
    replace: ['details']
  },
  'pass away': {
    replace: ['die']
  },
  perform: {
    replace: ['do']
  },
  permit: {
    replace: ['let']
  },
  'pertaining to': {
    replace: ['about', 'of', 'on']
  },
  'point in time': {
    replace: ['moment', 'now', 'point', 'time']
  },
  portion: {
    replace: ['part']
  },
  possess: {
    replace: ['have', 'own']
  },
  practicable: {
    replace: ['practical']
  },
  preclude: {
    replace: ['prevent']
  },
  previous: {
    replace: ['earlier']
  },
  previously: {
    replace: ['before']
  },
  'prior to': {
    replace: ['before']
  },
  prioritise: {
    replace: ['focus on', 'rank']
  },
  prioritize: {
    replace: ['focus on', 'rank']
  },
  proceed: {
    replace: ['do', 'go ahead', 'try']
  },
  procure: {
    omit: true,
    replace: ['buy', 'get']
  },
  proficiency: {
    replace: ['skill']
  },
  promulgate: {
    replace: ['issue', 'publish']
  },
  provide: {
    replace: ['give', 'offer', 'say']
  },
  'provided that': {
    replace: ['if']
  },
  'provides guidance for': {
    replace: ['guides']
  },
  purchase: {
    replace: ['buy', 'sale']
  },
  'pursuant to': {
    replace: ['by', 'following', 'per', 'under']
  },
  'put simply': {
    omit: true,
    replace: []
  },
  'readily apparent': {
    replace: ['clear']
  },
  'refer back': {
    replace: ['refer']
  },
  reflect: {
    replace: ['say', 'show']
  },
  regarding: {
    replace: ['about', 'of', 'on']
  },
  'relative to': {
    replace: ['about', 'on']
  },
  relocate: {
    replace: ['move']
  },
  remain: {
    replace: ['stay']
  },
  remainder: {
    replace: ['rest']
  },
  remuneration: {
    replace: ['pay', 'payment']
  },
  render: {
    replace: ['give', 'make']
  },
  represents: {
    replace: ['is']
  },
  request: {
    replace: ['ask']
  },
  require: {
    replace: ['must', 'need']
  },
  requirement: {
    replace: ['need', 'rule']
  },
  reside: {
    replace: ['live']
  },
  residence: {
    replace: ['house']
  },
  retain: {
    replace: ['keep']
  },
  satisfy: {
    replace: ['meet', 'please']
  },
  selection: {
    replace: ['choice']
  },
  'set forth in': {
    replace: ['in']
  },
  shall: {
    replace: ['must', 'will']
  },
  'should you wish': {
    replace: ['if you want']
  },
  'similar to': {
    replace: ['like']
  },
  solicit: {
    replace: ['ask for', 'request']
  },
  'span across': {
    replace: ['cross', 'span']
  },
  'state-of-the-art': {
    replace: ['latest']
  },
  strategise: {
    replace: ['plan']
  },
  strategize: {
    replace: ['plan']
  },
  submit: {
    replace: ['give', 'send']
  },
  subsequent: {
    replace: ['after', 'later', 'next', 'then']
  },
  subsequently: {
    replace: ['after', 'later', 'then']
  },
  substantial: {
    replace: ['large', 'much']
  },
  'successfully complete': {
    replace: ['complete', 'pass']
  },
  sufficient: {
    replace: ['enough']
  },
  'take action to': {
    omit: true,
    replace: []
  },
  terminate: {
    replace: ['end', 'stop']
  },
  'the month of': {
    omit: true,
    replace: []
  },
  'the undersigned': {
    replace: ['I']
  },
  'the use of': {
    omit: true,
    replace: []
  },
  'there are': {
    omit: true,
    replace: []
  },
  'there is': {
    omit: true,
    replace: []
  },
  therefore: {
    replace: ['so', 'thus']
  },
  thereof: {
    replace: ['its', 'their']
  },
  therein: {
    replace: ['there']
  },
  'this day and age': {
    replace: ['today']
  },
  'time period': {
    replace: ['period', 'time']
  },
  timely: {
    replace: ['prompt']
  },
  'took advantage of': {
    replace: ['preyed on']
  },
  transmit: {
    replace: ['send']
  },
  type: {
    omit: true,
    replace: []
  },
  transpire: {
    replace: ['happen']
  },
  'under the provisions of': {
    replace: ['under']
  },
  'until such time as': {
    replace: ['until']
  },
  utilise: {
    replace: ['use']
  },
  utilisation: {
    replace: ['use']
  },
  utilization: {
    replace: ['use']
  },
  utilize: {
    replace: ['use']
  },
  validate: {
    replace: ['confirm']
  },
  'various different': {
    replace: ['different', 'various']
  },
  very: {
    omit: true,
    replace: []
  },
  viable: {
    replace: ['practical', 'workable']
  },
  vice: {
    replace: ['instead of', 'versus']
  },
  warrant: {
    replace: ['call for', 'permit']
  },
  whereas: {
    replace: ['because', 'since']
  },
  'whether or not': {
    replace: ['whether']
  },
  'with reference to': {
    replace: ['about']
  },
  'with respect to': {
    replace: ['about', 'on']
  },
  'with the exception of': {
    replace: ['except for']
  },
  witnessed: {
    replace: ['saw', 'seen']
  },
  'your office': {
    replace: ['you']
  }
}


/***/ }),

/***/ "./node_modules/smog-formula/index.js":
/*!********************************************!*\
  !*** ./node_modules/smog-formula/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "smogFormula": function() { return /* binding */ smogFormula; }
/* harmony export */ });
/**
 * @typedef {Object} SmogFormulaCounts
 * @property {number} sentence
 * @property {number} [polysillabicWord]
 */

var sentenceSize = 30
var weight = 1.043
var base = 3.1291

/**
 * Get the grade level of a given value according to the SMOG formula. More information is available at WikiPedia: <https://en.wikipedia.org/wiki/SMOG>.
 *
 * @param {SmogFormulaCounts} counts
 * @returns {number}
 */
function smogFormula(counts) {
  if (!counts || !counts.sentence) {
    return Number.NaN
  }

  return (
    base +
    weight *
      Math.sqrt(
        (counts.polysillabicWord || 0) * (sentenceSize / counts.sentence)
      )
  )
}


/***/ }),

/***/ "./node_modules/spache-formula/index.js":
/*!**********************************************!*\
  !*** ./node_modules/spache-formula/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "spacheFormula": function() { return /* binding */ spacheFormula; }
/* harmony export */ });
/**
 * @typedef {Object} SpaceFormulaCounts
 * @property {number} sentence
 * @property {number} word
 * @property {number} [unfamiliarWord]
 */

var sentenceWeight = 0.121
var wordWeight = 0.082
var percentage = 100
var base = 0.659

/**
 * Get the grade level of a given value according to the Spache Readability Formula. More information is available at WikiPedia: <https://en.wikipedia.org/wiki/Spache_Readability_Formula>
 *
 * @param {SpaceFormulaCounts} counts
 * @return {number}
 */
function spacheFormula(counts) {
  if (!counts || !counts.sentence || !counts.word) {
    return Number.NaN
  }

  return (
    base +
    (sentenceWeight * counts.word) / counts.sentence +
    ((wordWeight * (counts.unfamiliarWord || 0)) / counts.word) * percentage
  )
}


/***/ }),

/***/ "./node_modules/spache/index.js":
/*!**************************************!*\
  !*** ./node_modules/spache/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "spache": function() { return /* binding */ spache; }
/* harmony export */ });
var spache = [
  'a',
  'able',
  'about',
  'above',
  'across',
  'act',
  'add',
  'afraid',
  'after',
  'afternoon',
  'again',
  'against',
  'ago',
  'air',
  'airplane',
  'alarm',
  'all',
  'almost',
  'alone',
  'along',
  'already',
  'also',
  'always',
  'am',
  'among',
  'an',
  'and',
  'angry',
  'animal',
  'another',
  'answer',
  'any',
  'anyone',
  'appear',
  'apple',
  'are',
  'arm',
  'around',
  'arrow',
  'as',
  'ask',
  'asleep',
  'at',
  'ate',
  'attention',
  'aunt',
  'awake',
  'away',
  'b',
  'baby',
  'back',
  'bad',
  'bag',
  'ball',
  'balloon',
  'bang',
  'bank',
  'bark',
  'barn',
  'basket',
  'be',
  'bean',
  'bear',
  'beat',
  'beautiful',
  'became',
  'because',
  'become',
  'bed',
  'bee',
  'been',
  'before',
  'began',
  'begin',
  'behind',
  'believe',
  'bell',
  'belong',
  'bend',
  'bent',
  'beside',
  'best',
  'better',
  'between',
  'big',
  'bird',
  'birthday',
  'bit',
  'bite',
  'black',
  'blanket',
  'blew',
  'block',
  'blow',
  'blue',
  'board',
  'boat',
  'book',
  'boot',
  'born',
  'borrow',
  'both',
  'bother',
  'bottle',
  'bottom',
  'bought',
  'bow',
  'box',
  'boy',
  'branch',
  'brave',
  'bread',
  'break',
  'breakfast',
  'breath',
  'brick',
  'bridge',
  'bright',
  'bring',
  'broke',
  'broken',
  'brother',
  'brought',
  'brown',
  'brush',
  'build',
  'bump',
  'burn',
  'bus',
  'busy',
  'but',
  'butter',
  'button',
  'buy',
  'by',
  'c',
  'cabin',
  'cage',
  'cake',
  'call',
  'came',
  'camp',
  'can',
  "can't",
  'candle',
  'candy',
  'cap',
  'captain',
  'car',
  'card',
  'care',
  'careful',
  'carrot',
  'carry',
  'case',
  'castle',
  'cat',
  'catch',
  'cattle',
  'caught',
  'cause',
  'cent',
  'certain',
  'chair',
  'chance',
  'change',
  'chase',
  'chicken',
  'chief',
  'child',
  'children',
  'church',
  'circle',
  'circus',
  'city',
  'clap',
  'clean',
  'clever',
  'cliff',
  'climb',
  'clock',
  'close',
  'cloth',
  'clothes',
  'clown',
  'coat',
  'cold',
  'color',
  'come',
  'comfortable',
  'company',
  'contest',
  'continue',
  'cook',
  'cool',
  'corner',
  'could',
  'count',
  'country',
  'course',
  'cover',
  'cow',
  'crawl',
  'cream',
  'cry',
  'cup',
  'curtain',
  'cut',
  'd',
  'dad',
  'dance',
  'danger',
  'dangerous',
  'dark',
  'dash',
  'daughter',
  'day',
  'dear',
  'decide',
  'deep',
  'desk',
  'did',
  "didn't",
  'die',
  'different',
  'dig',
  'dinner',
  'direction',
  'disappear',
  'disappoint',
  'discover',
  'distance',
  'do',
  'doctor',
  'does',
  'dog',
  'dollar',
  "don't",
  'done',
  'door',
  'down',
  'dragon',
  'dream',
  'dress',
  'drink',
  'drive',
  'drop',
  'drove',
  'dry',
  'duck',
  'during',
  'dust',
  'e',
  'each',
  'eager',
  'ear',
  'early',
  'earn',
  'earth',
  'easy',
  'eat',
  'edge',
  'egg',
  'eight',
  'eighteen',
  'either',
  'elephant',
  'else',
  'empty',
  'end',
  'enemy',
  'enough',
  'enter',
  'even',
  'ever',
  'every',
  'everything',
  'exact',
  'except',
  'excite',
  'exclaim',
  'explain',
  'eye',
  'face',
  'fact',
  'fair',
  'fall',
  'family',
  'far',
  'farm',
  'farmer',
  'farther',
  'fast',
  'fat',
  'father',
  'feather',
  'feed',
  'feel',
  'feet',
  'fell',
  'fellow',
  'felt',
  'fence',
  'few',
  'field',
  'fierce',
  'fight',
  'figure',
  'fill',
  'final',
  'find',
  'fine',
  'finger',
  'finish',
  'fire',
  'first',
  'fish',
  'five',
  'flag',
  'flash',
  'flat',
  'flew',
  'floor',
  'flower',
  'fly',
  'follow',
  'food',
  'for',
  'forest',
  'forget',
  'forth',
  'found',
  'four',
  'fourth',
  'fox',
  'fresh',
  'friend',
  'frighten',
  'frog',
  'from',
  'front',
  'fruit',
  'full',
  'fun',
  'funny',
  'fur',
  'g',
  'game',
  'garden',
  'gasp',
  'gate',
  'gave',
  'get',
  'giant',
  'gift',
  'girl',
  'give',
  'glad',
  'glass',
  'go',
  'goat',
  'gone',
  'good',
  'got',
  'grandfather',
  'grandmother',
  'grass',
  'gray',
  'great',
  'green',
  'grew',
  'grin',
  'ground',
  'group',
  'grow',
  'growl',
  'guess',
  'gun',
  'h',
  'had',
  'hair',
  'half',
  'hall',
  'hand',
  'handle',
  'hang',
  'happen',
  'happiness',
  'happy',
  'hard',
  'harm',
  'has',
  'hat',
  'hate',
  'have',
  'he',
  "he's",
  'head',
  'hear',
  'heard',
  'heavy',
  'held',
  'hello',
  'help',
  'hen',
  'her',
  'here',
  'herself',
  'hid',
  'hide',
  'high',
  'hill',
  'him',
  'himself',
  'his',
  'hit',
  'hold',
  'hole',
  'holiday',
  'home',
  'honey',
  'hop',
  'horn',
  'horse',
  'hot',
  'hour',
  'house',
  'how',
  'howl',
  'hum',
  'hundred',
  'hung',
  'hungry',
  'hunt',
  'hurry',
  'hurt',
  'husband',
  'i',
  "i'll",
  "i'm",
  'ice',
  'idea',
  'if',
  'imagine',
  'important',
  'in',
  'inch',
  'indeed',
  'inside',
  'instead',
  'into',
  'invite',
  'is',
  'it',
  "it's",
  'its',
  'j',
  'jacket',
  'jar',
  'jet',
  'job',
  'join',
  'joke',
  'joy',
  'jump',
  'just',
  'k',
  'keep',
  'kept',
  'key',
  'kick',
  'kill',
  'kind',
  'king',
  'kitchen',
  'kitten',
  'knee',
  'knew',
  'knock',
  'know',
  'l',
  'ladder',
  'lady',
  'laid',
  'lake',
  'land',
  'large',
  'last',
  'late',
  'laugh',
  'lay',
  'lazy',
  'lead',
  'leap',
  'learn',
  'least',
  'leave',
  'left',
  'leg',
  'less',
  'let',
  "let's",
  'letter',
  'lick',
  'lift',
  'light',
  'like',
  'line',
  'lion',
  'list',
  'listen',
  'little',
  'live',
  'load',
  'long',
  'look',
  'lost',
  'lot',
  'loud',
  'love',
  'low',
  'luck',
  'lump',
  'lunch',
  'm',
  'machine',
  'made',
  'magic',
  'mail',
  'make',
  'man',
  'many',
  'march',
  'mark',
  'market',
  'master',
  'matter',
  'may',
  'maybe',
  'me',
  'mean',
  'meant',
  'meat',
  'meet',
  'melt',
  'men',
  'merry',
  'met',
  'middle',
  'might',
  'mile',
  'milk',
  'milkman',
  'mind',
  'mine',
  'minute',
  'miss',
  'mistake',
  'moment',
  'money',
  'monkey',
  'month',
  'more',
  'morning',
  'most',
  'mother',
  'mountain',
  'mouse',
  'mouth',
  'move',
  'much',
  'mud',
  'music',
  'must',
  'my',
  'n',
  'name',
  'near',
  'neck',
  'need',
  'needle',
  'neighbor',
  'neighborhood',
  'nest',
  'never',
  'new',
  'next',
  'nibble',
  'nice',
  'night',
  'nine',
  'no',
  'nod',
  'noise',
  'none',
  'north',
  'nose',
  'not',
  'note',
  'nothing',
  'notice',
  'now',
  'number',
  'o',
  'ocean',
  'of',
  'off',
  'offer',
  'often',
  'oh',
  'old',
  'on',
  'once',
  'one',
  'only',
  'open',
  'or',
  'orange',
  'order',
  'other',
  'our',
  'out',
  'outside',
  'over',
  'owl',
  'own',
  'p',
  'pack',
  'paid',
  'pail',
  'paint',
  'pair',
  'palace',
  'pan',
  'paper',
  'parade',
  'parent',
  'park',
  'part',
  'party',
  'pass',
  'past',
  'pasture',
  'path',
  'paw',
  'pay',
  'peanut',
  'peek',
  'pen',
  'penny',
  'people',
  'perfect',
  'perhaps',
  'person',
  'pet',
  'pick',
  'picket',
  'picnic',
  'picture',
  'pie',
  'piece',
  'pig',
  'pile',
  'pin',
  'place',
  'plan',
  'plant',
  'play',
  'pleasant',
  'please',
  'plenty',
  'plow',
  'point',
  'poke',
  'pole',
  'policeman',
  'pond',
  'poor',
  'pop',
  'postman',
  'pot',
  'potato',
  'pound',
  'pour',
  'practice',
  'prepare',
  'present',
  'pretend',
  'pretty',
  'princess',
  'prize',
  'probably',
  'problem',
  'promise',
  'protect',
  'proud',
  'puff',
  'pull',
  'puppy',
  'push',
  'put',
  'q',
  'queen',
  'queer',
  'quick',
  'quiet',
  'quite',
  'r',
  'rabbit',
  'raccoon',
  'race',
  'radio',
  'rag',
  'rain',
  'raise',
  'ran',
  'ranch',
  'rang',
  'reach',
  'read',
  'ready',
  'real',
  'red',
  'refuse',
  'remember',
  'reply',
  'rest',
  'return',
  'reward',
  'rich',
  'ride',
  'right',
  'ring',
  'river',
  'road',
  'roar',
  'rock',
  'rode',
  'roll',
  'roof',
  'room',
  'rope',
  'round',
  'row',
  'rub',
  'rule',
  'run',
  'rush',
  's',
  'sad',
  'safe',
  'said',
  'sail',
  'sale',
  'salt',
  'same',
  'sand',
  'sang',
  'sat',
  'save',
  'saw',
  'say',
  'scare',
  'school',
  'scold',
  'scratch',
  'scream',
  'sea',
  'seat',
  'second',
  'secret',
  'see',
  'seed',
  'seem',
  'seen',
  'sell',
  'send',
  'sent',
  'seven',
  'several',
  'sew',
  'shadow',
  'shake',
  'shall',
  'shape',
  'she',
  'sheep',
  'shell',
  'shine',
  'ship',
  'shoe',
  'shone',
  'shook',
  'shoot',
  'shop',
  'shore',
  'short',
  'shot',
  'should',
  'show',
  'sick',
  'side',
  'sight',
  'sign',
  'signal',
  'silent',
  'silly',
  'silver',
  'since',
  'sing',
  'sister',
  'sit',
  'six',
  'size',
  'skip',
  'sky',
  'sled',
  'sleep',
  'slid',
  'slide',
  'slow',
  'small',
  'smart',
  'smell',
  'smile',
  'smoke',
  'snap',
  'sniff',
  'snow',
  'so',
  'soft',
  'sold',
  'some',
  'something',
  'sometimes',
  'son',
  'song',
  'soon',
  'sorry',
  'sound',
  'speak',
  'special',
  'spend',
  'spill',
  'splash',
  'spoke',
  'spot',
  'spread',
  'spring',
  'squirrel',
  'stand',
  'star',
  'start',
  'station',
  'stay',
  'step',
  'stick',
  'still',
  'stone',
  'stood',
  'stop',
  'store',
  'story',
  'straight',
  'strange',
  'street',
  'stretch',
  'strike',
  'strong',
  'such',
  'sudden',
  'sugar',
  'suit',
  'summer',
  'sun',
  'supper',
  'suppose',
  'sure',
  'surprise',
  'swallow',
  'sweet',
  'swim',
  'swing',
  't',
  'table',
  'tail',
  'take',
  'talk',
  'tall',
  'tap',
  'taste',
  'teach',
  'teacher',
  'team',
  'tear',
  'teeth',
  'telephone',
  'tell',
  'ten',
  'tent',
  'than',
  'thank',
  'that',
  "that's",
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'thick',
  'thin',
  'thing',
  'think',
  'third',
  'this',
  'those',
  'though',
  'thought',
  'three',
  'threw',
  'through',
  'throw',
  'tie',
  'tiger',
  'tight',
  'time',
  'tiny',
  'tip',
  'tire',
  'to',
  'today',
  'toe',
  'together',
  'told',
  'tomorrow',
  'too',
  'took',
  'tooth',
  'top',
  'touch',
  'toward',
  'tower',
  'town',
  'toy',
  'track',
  'traffic',
  'train',
  'trap',
  'tree',
  'trick',
  'trip',
  'trot',
  'truck',
  'true',
  'trunk',
  'try',
  'turkey',
  'turn',
  'turtle',
  'twelve',
  'twin',
  'two',
  'u',
  'ugly',
  'uncle',
  'under',
  'unhappy',
  'until',
  'up',
  'upon',
  'upstairs',
  'us',
  'use',
  'usual',
  'v',
  'valley',
  'vegetable',
  'very',
  'village',
  'visit',
  'voice',
  'w',
  'wag',
  'wagon',
  'wait',
  'wake',
  'walk',
  'want',
  'war',
  'warm',
  'was',
  'wash',
  'waste',
  'watch',
  'water',
  'wave',
  'way',
  'we',
  'wear',
  'weather',
  'week',
  'well',
  'went',
  'were',
  'wet',
  'what',
  'wheel',
  'when',
  'where',
  'which',
  'while',
  'whisper',
  'whistle',
  'white',
  'who',
  'whole',
  'whose',
  'why',
  'wide',
  'wife',
  'will',
  'win',
  'wind',
  'window',
  'wing',
  'wink',
  'winter',
  'wire',
  'wise',
  'wish',
  'with',
  'without',
  'woke',
  'wolf',
  'woman',
  'women',
  "won't",
  'wonder',
  'wood',
  'word',
  'wore',
  'work',
  'world',
  'worm',
  'worry',
  'worth',
  'would',
  'wrong',
  'x',
  'y',
  'yard',
  'year',
  'yell',
  'yellow',
  'yes',
  'yet',
  'you',
  'young',
  'your',
  'z',
  'zoo'
]


/***/ }),

/***/ "./node_modules/syllable/index.js":
/*!****************************************!*\
  !*** ./node_modules/syllable/index.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "syllable": function() { return /* binding */ syllable; }
/* harmony export */ });
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var normalize_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! normalize-strings */ "./node_modules/normalize-strings/index.js");
/* harmony import */ var _problematic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./problematic.js */ "./node_modules/syllable/problematic.js");

// @ts-ignore remove when typed.



var own = {}.hasOwnProperty

// Two expressions of occurrences which normally would be counted as two
// syllables, but should be counted as one.
var EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
  [
    'awe($|d|so)',
    'cia(?:l|$)',
    'tia',
    'cius',
    'cious',
    '[^aeiou]giu',
    '[aeiouy][^aeiouy]ion',
    'iou',
    'sia$',
    'eous$',
    '[oa]gue$',
    '.[^aeiuoycgltdb]{2,}ed$',
    '.ely$',
    '^jua',
    'uai',
    'eau',
    '^busi$',
    '(?:[aeiouy](?:' +
      [
        '[bcfgklmnprsvwxyz]',
        'ch',
        'dg',
        'g[hn]',
        'lch',
        'l[lv]',
        'mm',
        'nch',
        'n[cgn]',
        'r[bcnsv]',
        'squ',
        's[chkls]',
        'th'
      ].join('|') +
      ')ed$)',
    '(?:[aeiouy](?:' +
      [
        '[bdfklmnprstvy]',
        'ch',
        'g[hn]',
        'lch',
        'l[lv]',
        'mm',
        'nch',
        'nn',
        'r[nsv]',
        'squ',
        's[cklst]',
        'th'
      ].join('|') +
      ')es$)'
  ].join('|'),
  'g'
)

var EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
  '[aeiouy](?:' +
    [
      '[bcdfgklmnprstvyz]',
      'ch',
      'dg',
      'g[hn]',
      'l[lv]',
      'mm',
      'n[cgns]',
      'r[cnsv]',
      'squ',
      's[cklst]',
      'th'
    ].join('|') +
    ')e$',
  'g'
)

// Four expression of occurrences which normally would be counted as one
// syllable, but should be counted as two.
var EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
  '(?:' +
    [
      '([^aeiouy])\\1l',
      '[^aeiouy]ie(?:r|s?t)',
      '[aeiouym]bl',
      'eo',
      'ism',
      'asm',
      'thm',
      'dnt',
      'snt',
      'uity',
      'dea',
      'gean',
      'oa',
      'ua',
      'react?',
      'orbed', // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
      'shred', // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
      'eings?',
      '[aeiouy]sh?e[rs]'
    ].join('|') +
    ')$',
  'g'
)

var EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
  [
    'creat(?!u)',
    '[^gq]ua[^auieo]',
    '[aeiou]{3}',
    '^(?:ia|mc|coa[dglx].)',
    '^re(app|es|im|us)',
    '(th|d)eist'
  ].join('|'),
  'g'
)

var EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
  [
    '[^aeiou]y[ae]',
    '[^l]lien',
    'riet',
    'dien',
    'iu',
    'io',
    'ii',
    'uen',
    '[aeilotu]real',
    'real[aeilotu]',
    'iell',
    'eo[^aeiou]',
    '[aeiou]y[aeiou]'
  ].join('|'),
  'g'
)

var EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/

// Expression to match single syllable pre- and suffixes.
var EXPRESSION_SINGLE = new RegExp(
  [
    '^(?:' +
      [
        'un',
        'fore',
        'ware',
        'none?',
        'out',
        'post',
        'sub',
        'pre',
        'pro',
        'dis',
        'side',
        'some'
      ].join('|') +
      ')',
    '(?:' +
      [
        'ly',
        'less',
        'some',
        'ful',
        'ers?',
        'ness',
        'cians?',
        'ments?',
        'ettes?',
        'villes?',
        'ships?',
        'sides?',
        'ports?',
        'shires?',
        '[gnst]ion(?:ed|s)?'
      ].join('|') +
      ')$'
  ].join('|'),
  'g'
)

// Expression to match double syllable pre- and suffixes.
var EXPRESSION_DOUBLE = new RegExp(
  [
    '^' +
      '(?:' +
      [
        'above',
        'anti',
        'ante',
        'counter',
        'hyper',
        'afore',
        'agri',
        'infra',
        'intra',
        'inter',
        'over',
        'semi',
        'ultra',
        'under',
        'extra',
        'dia',
        'micro',
        'mega',
        'kilo',
        'pico',
        'nano',
        'macro',
        'somer'
      ].join('|') +
      ')',
    '(?:fully|berry|woman|women|edly|union|((?:[bcdfghjklmnpqrstvwxz])|[aeiou])ye?ing)$'
  ].join('|'),
  'g'
)

// Expression to match triple syllable suffixes.
var EXPRESSION_TRIPLE = /(creations?|ology|ologist|onomy|onomist)$/g

// Wrapper to support multiple word-parts (GH-11).
/**
 * Syllable count
 *
 * @param {string} value
 * @returns {number}
 */
function syllable(value) {
  var values = normalize_strings__WEBPACK_IMPORTED_MODULE_1__(String(value))
    .toLowerCase()
    // Remove apostrophes.
    .replace(/['’]/g, '')
    // Split on word boundaries.
    .split(/\b/g)
  var index = -1
  var sum = 0

  while (++index < values.length) {
    // Remove non-alphabetic characters from a given value.
    sum += one(values[index].replace(/[^a-z]/g, ''))
  }

  return sum
}

/**
 * Get syllables in a given value.
 *
 * @param {string} value
 * @returns {number}
 */
function one(value) {
  var count = 0
  /** @type {number} */
  var index
  /** @type {string} */
  var singular
  /** @type {Array.<string>} */
  var parts
  /** @type {ReturnType.<returnFactory>} */
  var addOne
  /** @type {ReturnType.<returnFactory>} */
  var subtractOne

  if (value.length === 0) {
    return count
  }

  // Return early when possible.
  if (value.length < 3) {
    return 1
  }

  // If `value` is a hard to count, it might be in `problematic`.
  if (own.call(_problematic_js__WEBPACK_IMPORTED_MODULE_2__.problematic, value)) {
    return _problematic_js__WEBPACK_IMPORTED_MODULE_2__.problematic[value]
  }

  // Additionally, the singular word might be in `problematic`.
  singular = pluralize__WEBPACK_IMPORTED_MODULE_0__(value, 1)

  if (own.call(_problematic_js__WEBPACK_IMPORTED_MODULE_2__.problematic, singular)) {
    return _problematic_js__WEBPACK_IMPORTED_MODULE_2__.problematic[singular]
  }

  addOne = returnFactory(1)
  subtractOne = returnFactory(-1)

  // Count some prefixes and suffixes, and remove their matched ranges.
  value = value
    .replace(EXPRESSION_TRIPLE, countFactory(3))
    .replace(EXPRESSION_DOUBLE, countFactory(2))
    .replace(EXPRESSION_SINGLE, countFactory(1))

  // Count multiple consonants.
  parts = value.split(/[^aeiouy]+/)
  index = -1

  while (++index < parts.length) {
    if (parts[index] !== '') {
      count++
    }
  }

  // Subtract one for occurrences which should be counted as one (but are
  // counted as two).
  value
    .replace(EXPRESSION_MONOSYLLABIC_ONE, subtractOne)
    .replace(EXPRESSION_MONOSYLLABIC_TWO, subtractOne)

  // Add one for occurrences which should be counted as two (but are counted as
  // one).
  value
    .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, addOne)

  // Make sure at least on is returned.
  return count || 1

  /**
   * Define scoped counters, to be used in `String#replace()` calls.
   * The scoped counter removes the matched value from the input.
   *
   * @param {number} addition
   */
  function countFactory(addition) {
    return counter
    /**
     * @returns {string}
     */
    function counter() {
      count += addition
      return ''
    }
  }

  /**
   * This scoped counter does not remove the matched value from the input.
   *
   * @param {number} addition
   */
  function returnFactory(addition) {
    return returner
    /**
     * @param {string} $0
     * @returns {string}
     */
    function returner($0) {
      count += addition
      return $0
    }
  }
}


/***/ }),

/***/ "./node_modules/syllable/problematic.js":
/*!**********************************************!*\
  !*** ./node_modules/syllable/problematic.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "problematic": function() { return /* binding */ problematic; }
/* harmony export */ });
var problematic = {
  abalone: 4,
  abare: 3,
  abbruzzese: 4,
  abed: 2,
  aborigine: 5,
  abruzzese: 4,
  acreage: 3,
  adame: 3,
  adieu: 2,
  adobe: 3,
  anemone: 4,
  anyone: 3,
  apache: 3,
  aphrodite: 4,
  apostrophe: 4,
  ariadne: 4,
  cafe: 2,
  calliope: 4,
  catastrophe: 4,
  chile: 2,
  chloe: 2,
  circe: 2,
  coyote: 3,
  daphne: 2,
  epitome: 4,
  eurydice: 4,
  euterpe: 3,
  every: 2,
  everywhere: 3,
  forever: 3,
  gethsemane: 4,
  guacamole: 4,
  hermione: 4,
  hyperbole: 4,
  jesse: 2,
  jukebox: 2,
  karate: 3,
  machete: 3,
  maybe: 2,
  naive: 2,
  newlywed: 3,
  penelope: 4,
  people: 2,
  persephone: 4,
  phoebe: 2,
  pulse: 1,
  queue: 1,
  recipe: 3,
  riverbed: 3,
  sesame: 3,
  shoreline: 2,
  simile: 3,
  snuffleupagus: 5,
  sometimes: 2,
  syncope: 3,
  tamale: 3,
  waterbed: 3,
  wednesday: 2,
  yosemite: 4,
  zoe: 2
}


/***/ }),

/***/ "./node_modules/trough/index.js":
/*!**************************************!*\
  !*** ./node_modules/trough/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trough": function() { return /* binding */ trough; },
/* harmony export */   "wrap": function() { return /* binding */ wrap; }
/* harmony export */ });
/**
 * @typedef {(error?: Error|null|undefined, ...output: Array<any>) => void} Callback
 * @typedef {(...input: Array<any>) => any} Middleware
 *
 * @typedef {(...input: Array<any>) => void} Run
 *   Call all middleware.
 * @typedef {(fn: Middleware) => Pipeline} Use
 *   Add `fn` (middleware) to the list.
 * @typedef {{run: Run, use: Use}} Pipeline
 *   Middleware.
 */

/**
 * Create new middleware.
 *
 * @returns {Pipeline}
 */
function trough() {
  /** @type {Array<Middleware>} */
  const fns = []
  /** @type {Pipeline} */
  const pipeline = {run, use}

  return pipeline

  /** @type {Run} */
  function run(...values) {
    let middlewareIndex = -1
    /** @type {Callback} */
    const callback = values.pop()

    if (typeof callback !== 'function') {
      throw new TypeError('Expected function as last argument, not ' + callback)
    }

    next(null, ...values)

    /**
     * Run the next `fn`, or we’re done.
     *
     * @param {Error|null|undefined} error
     * @param {Array<any>} output
     */
    function next(error, ...output) {
      const fn = fns[++middlewareIndex]
      let index = -1

      if (error) {
        callback(error)
        return
      }

      // Copy non-nullish input into values.
      while (++index < values.length) {
        if (output[index] === null || output[index] === undefined) {
          output[index] = values[index]
        }
      }

      // Save the newly created `output` for the next call.
      values = output

      // Next or done.
      if (fn) {
        wrap(fn, next)(...output)
      } else {
        callback(null, ...output)
      }
    }
  }

  /** @type {Use} */
  function use(middelware) {
    if (typeof middelware !== 'function') {
      throw new TypeError(
        'Expected `middelware` to be a function, not ' + middelware
      )
    }

    fns.push(middelware)
    return pipeline
  }
}

/**
 * Wrap `middleware`.
 * Can be sync or async; return a promise, receive a callback, or return new
 * values and errors.
 *
 * @param {Middleware} middleware
 * @param {Callback} callback
 */
function wrap(middleware, callback) {
  /** @type {boolean} */
  let called

  return wrapped

  /**
   * Call `middleware`.
   * @this {any}
   * @param {Array<any>} parameters
   * @returns {void}
   */
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length
    /** @type {any} */
    let result

    if (fnExpectsCallback) {
      parameters.push(done)
    }

    try {
      result = middleware.apply(this, parameters)
    } catch (error) {
      const exception = /** @type {Error} */ (error)

      // Well, this is quite the pickle.
      // `middleware` received a callback and called it synchronously, but that
      // threw an error.
      // The only thing left to do is to throw the thing instead.
      if (fnExpectsCallback && called) {
        throw exception
      }

      return done(exception)
    }

    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done)
      } else if (result instanceof Error) {
        done(result)
      } else {
        then(result)
      }
    }
  }

  /**
   * Call `callback`, only once.
   * @type {Callback}
   */
  function done(error, ...output) {
    if (!called) {
      called = true
      callback(error, ...output)
    }
  }

  /**
   * Call `done` with one value.
   *
   * @param {any} [value]
   */
  function then(value) {
    done(null, value)
  }
}


/***/ }),

/***/ "./node_modules/unherit/index.js":
/*!***************************************!*\
  !*** ./node_modules/unherit/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unherit": function() { return /* binding */ unherit; }
/* harmony export */ });
/**
 * Create a custom constructor which can be modified without affecting the
 * original class.
 *
 * @template {{prototype: object, new (...args: any[]): any}} Class
 * @param {Class} Super
 * @return {Class}
 */
function unherit(Super) {
  const Of = class extends Super {}

  // Clone values.
  const proto = Of.prototype
  /** @type {string} */
  let key

  // We specifically want to get *all* fields, not just own fields.
  // eslint-disable-next-line guard-for-in
  for (key in proto) {
    /** @type {unknown} */
    const value = proto[key]

    if (value && typeof value === 'object') {
      // @ts-expect-error: shallow clone arrays or other values.
      proto[key] = 'concat' in value ? value.concat() : Object.assign({}, value)
    }
  }

  return Of
}


/***/ }),

/***/ "./node_modules/unified-message-control/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/unified-message-control/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ messageControl; }
/* harmony export */ });
/* harmony import */ var vfile_location__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vfile-location */ "./node_modules/vfile-location/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unified-message-control/node_modules/unist-util-visit/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist').Point} Point
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 *
 * @typedef {OptionsWithoutReset|OptionsWithReset} Options
 * @typedef {OptionsBaseFields & OptionsWithoutResetFields} OptionsWithoutReset
 * @typedef {OptionsBaseFields & OptionsWithResetFields} OptionsWithReset
 *
 * @typedef OptionsWithoutResetFields
 * @property {false} [reset]
 *   Whether to treat all messages as turned off initially.
 * @property {string[]} [disable]
 *   List of `ruleId`s to turn off.
 *
 * @typedef OptionsWithResetFields
 * @property {true} reset
 *   Whether to treat all messages as turned off initially.
 * @property {string[]} [enable]
 *   List of `ruleId`s to initially turn on.
 *
 * @typedef OptionsBaseFields
 * @property {string} name
 *   Name of markers that can control the message sources.
 *
 *   For example, `{name: 'alpha'}` controls `alpha` markers:
 *
 *   ```html
 *   <!--alpha ignore-->
 *   ```
 * @property {MarkerParser} marker
 *   Parse a possible marker to a comment marker object (Marker).
 *   If the marker isn't a marker, should return `null`.
 * @property {Test} [test]
 *   Test for possible markers
 * @property {string[]} [known]
 *   List of allowed `ruleId`s. When given a warning is shown
 *   when someone tries to control an unknown rule.
 *
 *   For example, `{name: 'alpha', known: ['bravo']}` results in a warning if
 *   `charlie` is configured:
 *
 *   ```html
 *   <!--alpha ignore charlie-->
 *   ```
 * @property {string|string[]} [source]
 *   Sources that can be controlled with `name` markers.
 *   Defaults to `name`.
 *
 * @callback MarkerParser
 *   Parse a possible comment marker node to a Marker.
 * @param {Node} node
 *   Node to parse
 *
 * @typedef Marker
 *   A comment marker.
 * @property {string} name
 *   Name of marker.
 * @property {string} attributes
 *   Value after name.
 * @property {Record<string, string|number|boolean>} parameters
 *   Parsed attributes.
 * @property {Node} node
 *   Reference to given node.
 *
 * @typedef Mark
 * @property {Point|undefined} point
 * @property {boolean} state
 */




const own = {}.hasOwnProperty

/**
 * @type {import('unified').Plugin<[Options]>}
 * @returns {(tree: Node, file: VFile) => void}
 */
function messageControl(options) {
  if (!options || typeof options !== 'object' || !options.name) {
    throw new Error(
      'Expected `name` in `options`, got `' + (options || {}).name + '`'
    )
  }

  if (!options.marker) {
    throw new Error(
      'Expected `marker` in `options`, got `' + options.marker + '`'
    )
  }

  const enable = 'enable' in options && options.enable ? options.enable : []
  const disable = 'disable' in options && options.disable ? options.disable : []
  let reset = options.reset
  const sources =
    typeof options.source === 'string'
      ? [options.source]
      : options.source || [options.name]

  return transformer

  /**
   * @param {Node} tree
   * @param {VFile} file
   */
  function transformer(tree, file) {
    const toOffset = (0,vfile_location__WEBPACK_IMPORTED_MODULE_0__.location)(file).toOffset
    const initial = !reset
    const gaps = detectGaps(tree, file)
    /** @type {Record<string, Mark[]>} */
    const scope = {}
    /** @type {Mark[]} */
    const globals = []

    ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_1__.visit)(tree, options.test, visitor)

    file.messages = file.messages.filter((m) => filter(m))

    /**
     * @param {Node} node
     * @param {number|null} position
     * @param {Parent|null} parent
     */
    function visitor(node, position, parent) {
      /** @type {Marker|null} */
      const mark = options.marker(node)

      if (!mark || mark.name !== options.name) {
        return
      }

      const ruleIds = mark.attributes.split(/\s/g)
      const point = mark.node.position && mark.node.position.start
      const next =
        (parent && position !== null && parent.children[position + 1]) ||
        undefined
      const tail = (next && next.position && next.position.end) || undefined
      let index = -1

      /** @type {string} */
      // @ts-expect-error: we’ll check for unknown values next.
      const verb = ruleIds.shift()

      if (verb !== 'enable' && verb !== 'disable' && verb !== 'ignore') {
        file.fail(
          'Unknown keyword `' +
            verb +
            '`: expected ' +
            "`'enable'`, `'disable'`, or `'ignore'`",
          mark.node
        )
      }

      // Apply to all rules.
      if (ruleIds.length > 0) {
        while (++index < ruleIds.length) {
          const ruleId = ruleIds[index]

          if (isKnown(ruleId, verb, mark.node)) {
            toggle(point, verb === 'enable', ruleId)

            if (verb === 'ignore') {
              toggle(tail, true, ruleId)
            }
          }
        }
      } else if (verb === 'ignore') {
        toggle(point, false)
        toggle(tail, true)
      } else {
        toggle(point, verb === 'enable')
        reset = verb !== 'enable'
      }
    }

    /**
     * @param {VFileMessage} message
     * @returns {boolean}
     */
    function filter(message) {
      let gapIndex = gaps.length

      // Keep messages from a different source.
      if (!message.source || !sources.includes(message.source)) {
        return true
      }

      // We only ignore messages if they‘re disabled, *not* when they’re not in
      // the document.
      if (!message.line) {
        message.line = 1
      }

      if (!message.column) {
        message.column = 1
      }

      // Check whether the warning is inside a gap.
      // @ts-expect-error: we just normalized `null` to `number`s.
      const offset = toOffset(message)

      while (gapIndex--) {
        if (gaps[gapIndex][0] <= offset && gaps[gapIndex][1] > offset) {
          return false
        }
      }

      // Check whether allowed by specific and global states.
      return (
        (!message.ruleId ||
          check(message, scope[message.ruleId], message.ruleId)) &&
        check(message, globals)
      )
    }

    /**
     * Helper to check (and possibly warn) if a `ruleId` is unknown.
     *
     * @param {string} ruleId
     * @param {string} verb
     * @param {Node} node
     * @returns {boolean}
     */
    function isKnown(ruleId, verb, node) {
      const result = options.known ? options.known.includes(ruleId) : true

      if (!result) {
        file.message(
          'Unknown rule: cannot ' + verb + " `'" + ruleId + "'`",
          node
        )
      }

      return result
    }

    /**
     * Get the latest state of a rule.
     * When without `ruleId`, gets global state.
     *
     * @param {string|undefined} ruleId
     * @returns {boolean}
     */
    function getState(ruleId) {
      const ranges = ruleId ? scope[ruleId] : globals

      if (ranges && ranges.length > 0) {
        return ranges[ranges.length - 1].state
      }

      if (!ruleId) {
        return !reset
      }

      return reset ? enable.includes(ruleId) : !disable.includes(ruleId)
    }

    /**
     * Handle a rule.
     *
     * @param {Point|undefined} point
     * @param {boolean} state
     * @param {string|undefined} [ruleId]
     * @returns {void}
     */
    function toggle(point, state, ruleId) {
      let markers = ruleId ? scope[ruleId] : globals

      if (!markers) {
        markers = []
        scope[String(ruleId)] = markers
      }

      const previousState = getState(ruleId)

      if (state !== previousState) {
        markers.push({state, point})
      }

      // Toggle all known rules.
      if (!ruleId) {
        for (ruleId in scope) {
          if (own.call(scope, ruleId)) {
            toggle(point, state, ruleId)
          }
        }
      }
    }

    /**
     * Check all `ranges` for `message`.
     *
     * @param {VFileMessage} message
     * @param {Mark[]|undefined} ranges
     * @param {string|undefined} [ruleId]
     * @returns {boolean}
     */
    function check(message, ranges, ruleId) {
      if (ranges && ranges.length > 0) {
        // Check the state at the message’s position.
        let index = ranges.length

        while (index--) {
          const range = ranges[index]

          if (
            message.line &&
            message.column &&
            range.point &&
            range.point.line &&
            range.point.column &&
            (range.point.line < message.line ||
              (range.point.line === message.line &&
                range.point.column <= message.column))
          ) {
            return range.state === true
          }
        }
      }

      // The first marker ocurred after the first message, so we check the
      // initial state.
      if (!ruleId) {
        return Boolean(initial || reset)
      }

      return reset ? enable.includes(ruleId) : !disable.includes(ruleId)
    }
  }
}

/**
 * Detect gaps in `tree`.
 *
 * @param {Node} tree
 * @param {VFile} file
 */
function detectGaps(tree, file) {
  /** @type {Node[]} */
  // @ts-expect-error: fine.
  const children = tree.children || []
  const lastNode = children[children.length - 1]
  /** @type {[number, number][]} */
  const gaps = []
  let offset = 0
  /** @type {boolean|undefined} */
  let gap

  // Find all gaps.
  ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_1__.visit)(tree, one)

  // Get the end of the document.
  // This detects if the last node was the last node.
  // If not, there’s an extra gap between the last node and the end of the
  // document.
  if (
    lastNode &&
    lastNode.position &&
    lastNode.position.end &&
    offset === lastNode.position.end.offset &&
    file.toString().slice(offset).trim() !== ''
  ) {
    update()

    update(
      tree &&
        tree.position &&
        tree.position.end &&
        tree.position.end.offset &&
        tree.position.end.offset - 1
    )
  }

  return gaps

  /**
   * @param {Node} node
   */
  function one(node) {
    update(node.position && node.position.start && node.position.start.offset)

    if (!('children' in node)) {
      update(node.position && node.position.end && node.position.end.offset)
    }
  }

  /**
   * Detect a new position.
   *
   * @param {number|undefined} [latest]
   * @returns {void}
   */
  function update(latest) {
    if (latest === null || latest === undefined) {
      gap = true
    } else if (offset < latest) {
      if (gap) {
        gaps.push([offset, latest])
        gap = undefined
      }

      offset = latest
    }
  }
}


/***/ }),

/***/ "./node_modules/unified-message-control/node_modules/unist-util-visit/index.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/unified-message-control/node_modules/unist-util-visit/index.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTINUE": function() { return /* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.CONTINUE; },
/* harmony export */   "SKIP": function() { return /* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.SKIP; },
/* harmony export */   "EXIT": function() { return /* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.EXIT; },
/* harmony export */   "visit": function() { return /* binding */ visit; }
/* harmony export */ });
/* harmony import */ var unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit-parents */ "./node_modules/unist-util-visit-parents/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
 */

/**
 * Invoked when a node (matching test, if given) is found.
 * Visitors are free to transform node.
 * They can also transform the parent of node (the last of ancestors).
 * Replacing node itself, if `SKIP` is not returned, still causes its descendants to be visited.
 * If adding or removing previous siblings (or next siblings, in case of reverse) of node,
 * visitor should return a new index (number) to specify the sibling to traverse after node is traversed.
 * Adding or removing next siblings of node (or previous siblings, in case of reverse)
 * is handled as expected without needing to return a new index.
 * Removing the children property of an ancestor still results in them being traversed.
 *
 * @template {Node} V
 * @callback Visitor
 * @param {V} node Found node
 * @param {number|null} index Position of `node` in `parent`
 * @param {Parent|null} parent Parent of `node`
 * @returns {VisitorResult}
 */





const visit =
  /**
   * @type {(
   *   (<T extends Node>(tree: Node, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>, visitor: Visitor<T>, reverse?: boolean) => void) &
   *   ((tree: Node, test: Test, visitor: Visitor<Node>, reverse?: boolean) => void) &
   *   ((tree: Node, visitor: Visitor<Node>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * Visit children of tree which pass a test
     *
     * @param {Node} tree Abstract syntax tree to walk
     * @param {Test} test test Test node
     * @param {Visitor<Node>} visitor Function to run for each node
     * @param {boolean} [reverse] Fisit the tree in reverse, defaults to false
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor
        visitor = test
        test = null
      }

      (0,unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.visitParents)(tree, test, overload, reverse)

      /**
       * @param {Node} node
       * @param {Array.<Parent>} parents
       */
      function overload(node, parents) {
        var parent = parents[parents.length - 1]
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        )
      }
    }
  )


/***/ }),

/***/ "./node_modules/unified/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/unified/lib/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unified": function() { return /* binding */ unified; }
/* harmony export */ });
/* harmony import */ var bail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bail */ "./node_modules/bail/index.js");
/* harmony import */ var is_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-buffer */ "./node_modules/unified/node_modules/is-buffer/index.js");
/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! extend */ "./node_modules/extend/index.js");
/* harmony import */ var is_plain_obj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is-plain-obj */ "./node_modules/unified/node_modules/is-plain-obj/index.js");
/* harmony import */ var trough__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! trough */ "./node_modules/trough/index.js");
/* harmony import */ var vfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vfile */ "./node_modules/vfile/lib/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('vfile').VFileCompatible} VFileCompatible
 * @typedef {import('vfile').VFileValue} VFileValue
 * @typedef {import('..').Processor} Processor
 * @typedef {import('..').Plugin} Plugin
 * @typedef {import('..').Preset} Preset
 * @typedef {import('..').Pluggable} Pluggable
 * @typedef {import('..').PluggableList} PluggableList
 * @typedef {import('..').Transformer} Transformer
 * @typedef {import('..').Parser} Parser
 * @typedef {import('..').Compiler} Compiler
 * @typedef {import('..').RunCallback} RunCallback
 * @typedef {import('..').ProcessCallback} ProcessCallback
 *
 * @typedef Context
 * @property {Node} tree
 * @property {VFile} file
 */








// Expose a frozen processor.
const unified = base().freeze()

const own = {}.hasOwnProperty

// Function to create the first processor.
/**
 * @returns {Processor}
 */
function base() {
  const transformers = (0,trough__WEBPACK_IMPORTED_MODULE_3__.trough)()
  /** @type {Processor['attachers']} */
  const attachers = []
  /** @type {Record<string, unknown>} */
  let namespace = {}
  /** @type {boolean|undefined} */
  let frozen
  let freezeIndex = -1

  // Data management.
  // @ts-expect-error: overloads are handled.
  processor.data = data
  processor.Parser = undefined
  processor.Compiler = undefined

  // Lock.
  processor.freeze = freeze

  // Plugins.
  processor.attachers = attachers
  // @ts-expect-error: overloads are handled.
  processor.use = use

  // API.
  processor.parse = parse
  processor.stringify = stringify
  // @ts-expect-error: overloads are handled.
  processor.run = run
  processor.runSync = runSync
  // @ts-expect-error: overloads are handled.
  processor.process = process
  processor.processSync = processSync

  // Expose.
  return processor

  // Create a new processor based on the processor in the current scope.
  /** @type {Processor} */
  function processor() {
    const destination = base()
    let index = -1

    while (++index < attachers.length) {
      destination.use(...attachers[index])
    }

    destination.data(extend__WEBPACK_IMPORTED_MODULE_1__(true, {}, namespace))

    return destination
  }

  /**
   * @param {string|Record<string, unknown>} [key]
   * @param {unknown} [value]
   * @returns {unknown}
   */
  function data(key, value) {
    if (typeof key === 'string') {
      // Set `key`.
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen)
        namespace[key] = value
        return processor
      }

      // Get `key`.
      return (own.call(namespace, key) && namespace[key]) || null
    }

    // Set space.
    if (key) {
      assertUnfrozen('data', frozen)
      namespace = key
      return processor
    }

    // Get space.
    return namespace
  }

  /** @type {Processor['freeze']} */
  function freeze() {
    if (frozen) {
      return processor
    }

    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex]

      if (options[0] === false) {
        continue
      }

      if (options[0] === true) {
        options[1] = undefined
      }

      /** @type {Transformer|void} */
      const transformer = attacher.call(processor, ...options)

      if (typeof transformer === 'function') {
        transformers.use(transformer)
      }
    }

    frozen = true
    freezeIndex = Number.POSITIVE_INFINITY

    return processor
  }

  /**
   * @param {Pluggable|null|undefined} [value]
   * @param {...unknown} options
   * @returns {Processor}
   */
  function use(value, ...options) {
    /** @type {Record<string, unknown>|undefined} */
    let settings

    assertUnfrozen('use', frozen)

    if (value === null || value === undefined) {
      // Empty.
    } else if (typeof value === 'function') {
      addPlugin(value, ...options)
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        addList(value)
      } else {
        addPreset(value)
      }
    } else {
      throw new TypeError('Expected usable value, not `' + value + '`')
    }

    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings)
    }

    return processor

    /**
     * @param {import('..').Pluggable<unknown[]>} value
     * @returns {void}
     */
    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value)
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          const [plugin, ...options] = value
          addPlugin(plugin, ...options)
        } else {
          addPreset(value)
        }
      } else {
        throw new TypeError('Expected usable value, not `' + value + '`')
      }
    }

    /**
     * @param {Preset} result
     * @returns {void}
     */
    function addPreset(result) {
      addList(result.plugins)

      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings)
      }
    }

    /**
     * @param {PluggableList|null|undefined} [plugins]
     * @returns {void}
     */
    function addList(plugins) {
      let index = -1

      if (plugins === null || plugins === undefined) {
        // Empty.
      } else if (Array.isArray(plugins)) {
        while (++index < plugins.length) {
          const thing = plugins[index]
          add(thing)
        }
      } else {
        throw new TypeError('Expected a list of plugins, not `' + plugins + '`')
      }
    }

    /**
     * @param {Plugin} plugin
     * @param {...unknown} [value]
     * @returns {void}
     */
    function addPlugin(plugin, value) {
      let index = -1
      /** @type {Processor['attachers'][number]|undefined} */
      let entry

      while (++index < attachers.length) {
        if (attachers[index][0] === plugin) {
          entry = attachers[index]
          break
        }
      }

      if (entry) {
        if ((0,is_plain_obj__WEBPACK_IMPORTED_MODULE_2__["default"])(entry[1]) && (0,is_plain_obj__WEBPACK_IMPORTED_MODULE_2__["default"])(value)) {
          value = extend__WEBPACK_IMPORTED_MODULE_1__(true, entry[1], value)
        }

        entry[1] = value
      } else {
        // @ts-expect-error: fine.
        attachers.push([...arguments])
      }
    }
  }

  /** @type {Processor['parse']} */
  function parse(doc) {
    processor.freeze()
    const file = vfile(doc)
    const Parser = processor.Parser
    assertParser('parse', Parser)

    if (newable(Parser, 'parse')) {
      // @ts-expect-error: `newable` checks this.
      return new Parser(String(file), file).parse()
    }

    // @ts-expect-error: `newable` checks this.
    return Parser(String(file), file) // eslint-disable-line new-cap
  }

  /** @type {Processor['stringify']} */
  function stringify(node, doc) {
    processor.freeze()
    const file = vfile(doc)
    const Compiler = processor.Compiler
    assertCompiler('stringify', Compiler)
    assertNode(node)

    if (newable(Compiler, 'compile')) {
      // @ts-expect-error: `newable` checks this.
      return new Compiler(node, file).compile()
    }

    // @ts-expect-error: `newable` checks this.
    return Compiler(node, file) // eslint-disable-line new-cap
  }

  /**
   * @param {Node} node
   * @param {VFileCompatible|RunCallback} [doc]
   * @param {RunCallback} [callback]
   * @returns {Promise<Node>|void}
   */
  function run(node, doc, callback) {
    assertNode(node)
    processor.freeze()

    if (!callback && typeof doc === 'function') {
      callback = doc
      doc = undefined
    }

    if (!callback) {
      return new Promise(executor)
    }

    executor(null, callback)

    /**
     * @param {null|((node: Node) => void)} resolve
     * @param {(error: Error) => void} reject
     * @returns {void}
     */
    function executor(resolve, reject) {
      // @ts-expect-error: `doc` can’t be a callback anymore, we checked.
      transformers.run(node, vfile(doc), done)

      /**
       * @param {Error|null} error
       * @param {Node} tree
       * @param {VFile} file
       * @returns {void}
       */
      function done(error, tree, file) {
        tree = tree || node
        if (error) {
          reject(error)
        } else if (resolve) {
          resolve(tree)
        } else {
          // @ts-expect-error: `callback` is defined if `resolve` is not.
          callback(null, tree, file)
        }
      }
    }
  }

  /** @type {Processor['runSync']} */
  function runSync(node, file) {
    /** @type {Node|undefined} */
    let result
    /** @type {boolean|undefined} */
    let complete

    processor.run(node, file, done)

    assertDone('runSync', 'run', complete)

    // @ts-expect-error: we either bailed on an error or have a tree.
    return result

    /**
     * @param {Error|null} [error]
     * @param {Node} [tree]
     * @returns {void}
     */
    function done(error, tree) {
      ;(0,bail__WEBPACK_IMPORTED_MODULE_4__.bail)(error)
      result = tree
      complete = true
    }
  }

  /**
   * @param {VFileCompatible} doc
   * @param {ProcessCallback} [callback]
   * @returns {Promise<VFile>|undefined}
   */
  function process(doc, callback) {
    processor.freeze()
    assertParser('process', processor.Parser)
    assertCompiler('process', processor.Compiler)

    if (!callback) {
      return new Promise(executor)
    }

    executor(null, callback)

    /**
     * @param {null|((file: VFile) => void)} resolve
     * @param {(error?: Error|null|undefined) => void} reject
     * @returns {void}
     */
    function executor(resolve, reject) {
      const file = vfile(doc)

      processor.run(processor.parse(file), file, (error, tree, file) => {
        if (error || !tree || !file) {
          done(error)
        } else {
          /** @type {unknown} */
          const result = processor.stringify(tree, file)

          if (result === undefined || result === null) {
            // Empty.
          } else if (looksLikeAVFileValue(result)) {
            file.value = result
          } else {
            file.result = result
          }

          done(error, file)
        }
      })

      /**
       * @param {Error|null|undefined} [error]
       * @param {VFile|undefined} [file]
       * @returns {void}
       */
      function done(error, file) {
        if (error || !file) {
          reject(error)
        } else if (resolve) {
          resolve(file)
        } else {
          // @ts-expect-error: `callback` is defined if `resolve` is not.
          callback(null, file)
        }
      }
    }
  }

  /** @type {Processor['processSync']} */
  function processSync(doc) {
    /** @type {boolean|undefined} */
    let complete

    processor.freeze()
    assertParser('processSync', processor.Parser)
    assertCompiler('processSync', processor.Compiler)

    const file = vfile(doc)

    processor.process(file, done)

    assertDone('processSync', 'process', complete)

    return file

    /**
     * @param {Error|null|undefined} [error]
     * @returns {void}
     */
    function done(error) {
      complete = true
      ;(0,bail__WEBPACK_IMPORTED_MODULE_4__.bail)(error)
    }
  }
}

/**
 * Check if `value` is a constructor.
 *
 * @param {unknown} value
 * @param {string} name
 * @returns {boolean}
 */
function newable(value, name) {
  return (
    typeof value === 'function' &&
    // Prototypes do exist.
    // type-coverage:ignore-next-line
    value.prototype &&
    // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    // type-coverage:ignore-next-line
    (keys(value.prototype) || name in value.prototype)
  )
}

/**
 * Check if `value` is an object with keys.
 *
 * @param {Record<string, unknown>} value
 * @returns {boolean}
 */
function keys(value) {
  /** @type {string} */
  let key

  for (key in value) {
    if (own.call(value, key)) {
      return true
    }
  }

  return false
}

/**
 * Assert a parser is available.
 *
 * @param {string} name
 * @param {unknown} value
 * @returns {asserts value is Parser}
 */
function assertParser(name, value) {
  if (typeof value !== 'function') {
    throw new TypeError('Cannot `' + name + '` without `Parser`')
  }
}

/**
 * Assert a compiler is available.
 *
 * @param {string} name
 * @param {unknown} value
 * @returns {asserts value is Compiler}
 */
function assertCompiler(name, value) {
  if (typeof value !== 'function') {
    throw new TypeError('Cannot `' + name + '` without `Compiler`')
  }
}

/**
 * Assert the processor is not frozen.
 *
 * @param {string} name
 * @param {unknown} frozen
 * @returns {asserts frozen is false}
 */
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      'Cannot call `' +
        name +
        '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
    )
  }
}

/**
 * Assert `node` is a unist node.
 *
 * @param {unknown} node
 * @returns {asserts node is Node}
 */
function assertNode(node) {
  // `isPlainObj` unfortunately uses `any` instead of `unknown`.
  // type-coverage:ignore-next-line
  if (!(0,is_plain_obj__WEBPACK_IMPORTED_MODULE_2__["default"])(node) || typeof node.type !== 'string') {
    throw new TypeError('Expected node, got `' + node + '`')
    // Fine.
  }
}

/**
 * Assert that `complete` is `true`.
 *
 * @param {string} name
 * @param {string} asyncName
 * @param {unknown} complete
 * @returns {asserts complete is true}
 */
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name + '` finished async. Use `' + asyncName + '` instead'
    )
  }
}

/**
 * @param {VFileCompatible} [value]
 * @returns {VFile}
 */
function vfile(value) {
  return looksLikeAVFile(value) ? value : new vfile__WEBPACK_IMPORTED_MODULE_5__.VFile(value)
}

/**
 * @param {VFileCompatible} [value]
 * @returns {value is VFile}
 */
function looksLikeAVFile(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'message' in value &&
      'messages' in value
  )
}

/**
 * @param {unknown} [value]
 * @returns {value is VFileValue}
 */
function looksLikeAVFileValue(value) {
  return typeof value === 'string' || is_buffer__WEBPACK_IMPORTED_MODULE_0__(value)
}


/***/ }),

/***/ "./node_modules/unified/node_modules/is-plain-obj/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/unified/node_modules/is-plain-obj/index.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isPlainObject; }
/* harmony export */ });
function isPlainObject(value) {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
}


/***/ }),

/***/ "./node_modules/unist-util-find-after/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/unist-util-find-after/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findAfter": function() { return /* binding */ findAfter; }
/* harmony export */ });
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ "./node_modules/unist-util-is/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {import('unist-util-is').Type} Type
 * @typedef {import('unist-util-is').Props} Props
 * @typedef {import('unist-util-is').TestFunctionAnything} TestFunctionAnything
 */



var findAfter =
  /**
   * @type {(
   *  (<T extends Node>(node: Parent, index: Node|number, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>) => T|null) &
   *  ((node: Parent, index: Node|number, test?: null|undefined|Type|Props|TestFunctionAnything|Array<Type|Props|TestFunctionAnything>) => Node|null)
   * )}
   */
  (
    /**
     * @param {Parent} parent Parent node
     * @param {Node|number} index Child of `parent`, or it’s index
     * @param {null|undefined|Type|Props|TestFunctionAnything|Array<Type|Props|TestFunctionAnything>} [test] is-compatible test (such as a type)
     * @returns {Node|null}
     */
    function (parent, index, test) {
      var is = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)(test)

      if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node')
      }

      if (typeof index === 'number') {
        if (index < 0 || index === Number.POSITIVE_INFINITY) {
          throw new Error('Expected positive finite number as index')
        }
      } else {
        index = parent.children.indexOf(index)

        if (index < 0) {
          throw new Error('Expected child node or index')
        }
      }

      while (++index < parent.children.length) {
        if (is(parent.children[index], index, parent)) {
          return parent.children[index]
        }
      }

      return null
    }
  )


/***/ }),

/***/ "./node_modules/unist-util-find-before/index.js":
/*!******************************************************!*\
  !*** ./node_modules/unist-util-find-before/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findBefore": function() { return /* binding */ findBefore; }
/* harmony export */ });
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ "./node_modules/unist-util-is/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {import('unist-util-is').Type} Type
 * @typedef {import('unist-util-is').Props} Props
 * @typedef {import('unist-util-is').TestFunctionAnything} TestFunctionAnything
 */



var findBefore =
  /**
   * @type {(
   *  (<T extends Node>(node: Parent, index: Node|number, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>) => T|null) &
   *  ((node: Parent, index: Node|number, test?: null|undefined|Type|Props|TestFunctionAnything|Array<Type|Props|TestFunctionAnything>) => Node|null)
   * )}
   */
  (
    /**
     * @param {Parent} parent Parent node
     * @param {Node|number} index Child of `parent`, or it’s index
     * @param {null|undefined|Type|Props|TestFunctionAnything|Array<Type|Props|TestFunctionAnything>} [test] is-compatible test (such as a type)
     * @returns {Node|null}
     */
    function (parent, index, test) {
      var is = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)(test)

      if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node')
      }

      if (typeof index === 'number') {
        if (index < 0 || index === Number.POSITIVE_INFINITY) {
          throw new Error('Expected positive finite number as index')
        }
      } else {
        index = parent.children.indexOf(index)

        if (index < 0) {
          throw new Error('Expected child node or index')
        }
      }

      // Performance.
      if (index > parent.children.length) {
        index = parent.children.length
      }

      while (index--) {
        if (is(parent.children[index], index, parent)) {
          return parent.children[index]
        }
      }

      return null
    }
  )


/***/ }),

/***/ "./node_modules/unist-util-is/index.js":
/*!*********************************************!*\
  !*** ./node_modules/unist-util-is/index.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is": function() { return /* binding */ is; },
/* harmony export */   "convert": function() { return /* binding */ convert; }
/* harmony export */ });
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 *
 * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
 */

/**
 * Check if a node passes a test
 *
 * @callback TestFunctionAnything
 * @param {Node} node
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {boolean|void}
 */

/**
 * Check if a node passes a certain node test
 *
 * @template {Node} X
 * @callback TestFunctionPredicate
 * @param {Node} node
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {node is X}
 */

/**
 * @callback AssertAnything
 * @param {unknown} [node]
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {boolean}
 */

/**
 * Check if a node passes a certain node test
 *
 * @template {Node} Y
 * @callback AssertPredicate
 * @param {unknown} [node]
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {node is Y}
 */

const is =
  /**
   * Check if a node passes a test.
   * When a `parent` node is known the `index` of node should also be given.
   *
   * @type {(
   *   (<T extends Node>(node: unknown, test: T['type']|Partial<T>|TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|TestFunctionPredicate<T>>, index?: number|null|undefined, parent?: Parent|null|undefined, context?: unknown) => node is T) &
   *   ((node?: unknown, test?: Test, index?: number|null|undefined, parent?: Parent|null|undefined, context?: unknown) => boolean)
   * )}
   */
  (
    /**
     * Check if a node passes a test.
     * When a `parent` node is known the `index` of node should also be given.
     *
     * @param {unknown} [node] Node to check
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @param {number|null|undefined} [index] Position of `node` in `parent`
     * @param {Parent|null|undefined} [parent] Parent of `node`
     * @param {unknown} [context] Context object to invoke `test` with
     * @returns {boolean} Whether test passed and `node` is a `Node` (object with `type` set to non-empty `string`).
     */
    // eslint-disable-next-line max-params
    function is(node, test, index, parent, context) {
      const check = convert(test)

      if (
        index !== undefined &&
        index !== null &&
        (typeof index !== 'number' ||
          index < 0 ||
          index === Number.POSITIVE_INFINITY)
      ) {
        throw new Error('Expected positive finite index')
      }

      if (
        parent !== undefined &&
        parent !== null &&
        (!is(parent) || !parent.children)
      ) {
        throw new Error('Expected parent node')
      }

      if (
        (parent === undefined || parent === null) !==
        (index === undefined || index === null)
      ) {
        throw new Error('Expected both parent and index')
      }

      // @ts-expect-error Looks like a node.
      return node && node.type && typeof node.type === 'string'
        ? Boolean(check.call(context, node, index, parent))
        : false
    }
  )

const convert =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok
      }

      if (typeof test === 'string') {
        return typeFactory(test)
      }

      if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory(test) : propsFactory(test)
      }

      if (typeof test === 'function') {
        return castFactory(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  )
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory(tests) {
  /** @type {Array.<AssertAnything>} */
  const checks = []
  let index = -1

  while (++index < tests.length) {
    checks[index] = convert(tests[index])
  }

  return castFactory(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    let index = -1

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }

    return false
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory(check) {
  return castFactory(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    let key

    for (key in check) {
      // @ts-expect-error: hush, it sure works as an index.
      if (node[key] !== check[key]) return false
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory(check) {
  return castFactory(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    // @ts-expect-error: spreading is fine.
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok() {
  return true
}


/***/ }),

/***/ "./node_modules/unist-util-position/index.js":
/*!***************************************************!*\
  !*** ./node_modules/unist-util-position/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pointStart": function() { return /* binding */ pointStart; },
/* harmony export */   "pointEnd": function() { return /* binding */ pointEnd; },
/* harmony export */   "position": function() { return /* binding */ position; }
/* harmony export */ });
/**
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Point} Point
 *
 * @typedef {Partial<Point>} PointLike
 *
 * @typedef {Object} PositionLike
 * @property {PointLike} [start]
 * @property {PointLike} [end]
 *
 * @typedef {Object} NodeLike
 * @property {PositionLike} [position]
 */

var pointStart = point('start')
var pointEnd = point('end')

/**
 * Get the positional info of `node`.
 *
 * @param {NodeLike} [node]
 * @returns {Position}
 */
function position(node) {
  return {start: pointStart(node), end: pointEnd(node)}
}

/**
 * Get the positional info of `node`.
 *
 * @param {'start'|'end'} type
 */
function point(type) {
  return point

  /**
   * Get the positional info of `node`.
   *
   * @param {NodeLike} [node]
   * @returns {Point}
   */
  function point(node) {
    /** @type {Point} */
    // @ts-ignore looks like a point
    var point = (node && node.position && node.position[type]) || {}

    return {
      line: point.line || null,
      column: point.column || null,
      offset: point.offset > -1 ? point.offset : null
    }
  }
}


/***/ }),

/***/ "./node_modules/unist-util-visit-parents/color.browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/unist-util-visit-parents/color.browser.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "color": function() { return /* binding */ color; }
/* harmony export */ });
/**
 * @param {string} d
 * @returns {string}
 */
function color(d) {
  return d
}


/***/ }),

/***/ "./node_modules/unist-util-visit-parents/index.js":
/*!********************************************************!*\
  !*** ./node_modules/unist-util-visit-parents/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTINUE": function() { return /* binding */ CONTINUE; },
/* harmony export */   "SKIP": function() { return /* binding */ SKIP; },
/* harmony export */   "EXIT": function() { return /* binding */ EXIT; },
/* harmony export */   "visitParents": function() { return /* binding */ visitParents; }
/* harmony export */ });
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ "./node_modules/unist-util-is/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/unist-util-visit-parents/color.browser.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 */

/**
 * @typedef {CONTINUE|SKIP|EXIT} Action Union of the action types
 * @typedef {number} Index Move to the sibling at index next (after node itself is completely traversed). Useful if mutating the tree, such as removing the node the visitor is currently on, or any of its previous siblings (or next siblings, in case of reverse) Results less than 0 or greater than or equal to children.length stop traversing the parent
 * @typedef {[(Action|null|undefined|void)?, (Index|null|undefined)?]} ActionTuple List with one or two values, the first an action, the second an index.
 * @typedef {null|undefined|Action|Index|ActionTuple|void} VisitorResult Any value that can be returned from a visitor
 */

/**
 * Invoked when a node (matching test, if given) is found.
 * Visitors are free to transform node.
 * They can also transform the parent of node (the last of ancestors).
 * Replacing node itself, if `SKIP` is not returned, still causes its descendants to be visited.
 * If adding or removing previous siblings (or next siblings, in case of reverse) of node,
 * visitor should return a new index (number) to specify the sibling to traverse after node is traversed.
 * Adding or removing next siblings of node (or previous siblings, in case of reverse)
 * is handled as expected without needing to return a new index.
 * Removing the children property of an ancestor still results in them being traversed.
 *
 * @template {Node} V
 * @callback Visitor
 * @param {V} node Found node
 * @param {Array.<Parent>} ancestors Ancestors of node
 * @returns {VisitorResult}
 */




/**
 * Continue traversing as normal
 */
const CONTINUE = true
/**
 * Do not traverse this node’s children
 */
const SKIP = 'skip'
/**
 * Stop traversing immediately
 */
const EXIT = false

const visitParents =
  /**
   * @type {(
   *   (<T extends Node>(tree: Node, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>, visitor: Visitor<T>, reverse?: boolean) => void) &
   *   ((tree: Node, test: Test, visitor: Visitor<Node>, reverse?: boolean) => void) &
   *   ((tree: Node, visitor: Visitor<Node>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * Visit children of tree which pass a test
     *
     * @param {Node} tree Abstract syntax tree to walk
     * @param {Test} test test Test node
     * @param {Visitor<Node>} visitor Function to run for each node
     * @param {boolean} [reverse] Fisit the tree in reverse, defaults to false
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor
        // @ts-ignore no visitor given, so `visitor` is test.
        visitor = test
        test = null
      }

      var is = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)(test)
      var step = reverse ? -1 : 1

      factory(tree, null, [])()

      /**
       * @param {Node} node
       * @param {number?} index
       * @param {Array.<Parent>} parents
       */
      function factory(node, index, parents) {
        /** @type {Object.<string, unknown>} */
        var value = typeof node === 'object' && node !== null ? node : {}
        /** @type {string} */
        var name

        if (typeof value.type === 'string') {
          name =
            typeof value.tagName === 'string'
              ? value.tagName
              : typeof value.name === 'string'
              ? value.name
              : undefined

          Object.defineProperty(visit, 'name', {
            value:
              'node (' +
              (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.color)(value.type + (name ? '<' + name + '>' : '')) +
              ')'
          })
        }

        return visit

        function visit() {
          /** @type {ActionTuple} */
          var result = []
          /** @type {ActionTuple} */
          var subresult
          /** @type {number} */
          var offset
          /** @type {Array.<Parent>} */
          var grandparents

          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents))

            if (result[0] === EXIT) {
              return result
            }
          }

          if (node.children && result[0] !== SKIP) {
            // @ts-ignore looks like a parent.
            offset = (reverse ? node.children.length : -1) + step
            // @ts-ignore looks like a parent.
            grandparents = parents.concat(node)

            // @ts-ignore looks like a parent.
            while (offset > -1 && offset < node.children.length) {
              subresult = factory(node.children[offset], offset, grandparents)()

              if (subresult[0] === EXIT) {
                return subresult
              }

              offset =
                typeof subresult[1] === 'number' ? subresult[1] : offset + step
            }
          }

          return result
        }
      }
    }
  )

/**
 * @param {VisitorResult} value
 * @returns {ActionTuple}
 */
function toResult(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE, value]
  }

  return [value]
}


/***/ }),

/***/ "./node_modules/unist-util-visit/index.js":
/*!************************************************!*\
  !*** ./node_modules/unist-util-visit/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTINUE": function() { return /* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.CONTINUE; },
/* harmony export */   "SKIP": function() { return /* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.SKIP; },
/* harmony export */   "EXIT": function() { return /* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.EXIT; },
/* harmony export */   "visit": function() { return /* binding */ visit; }
/* harmony export */ });
/* harmony import */ var unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit-parents */ "./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */





/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test, optional
 * @param visitor Function to run for each node
 * @param reverse Fisit the tree in reverse, defaults to false
 */
const visit =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor
        visitor = test
        test = null
      }

      (0,unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.visitParents)(tree, test, overload, reverse)

      /**
       * @param {Node} node
       * @param {Array.<Parent>} parents
       */
      function overload(node, parents) {
        const parent = parents[parents.length - 1]
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        )
      }
    }
  )


/***/ }),

/***/ "./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/color.browser.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/color.browser.js ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "color": function() { return /* binding */ color; }
/* harmony export */ });
/**
 * @param {string} d
 * @returns {string}
 */
function color(d) {
  return d
}


/***/ }),

/***/ "./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/index.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTINUE": function() { return /* binding */ CONTINUE; },
/* harmony export */   "SKIP": function() { return /* binding */ SKIP; },
/* harmony export */   "EXIT": function() { return /* binding */ EXIT; },
/* harmony export */   "visitParents": function() { return /* binding */ visitParents; }
/* harmony export */ });
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ "./node_modules/unist-util-is/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/unist-util-visit/node_modules/unist-util-visit-parents/color.browser.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('./complex-types').Action} Action
 * @typedef {import('./complex-types').Index} Index
 * @typedef {import('./complex-types').ActionTuple} ActionTuple
 * @typedef {import('./complex-types').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */




/**
 * Continue traversing as normal
 */
const CONTINUE = true
/**
 * Do not traverse this node’s children
 */
const SKIP = 'skip'
/**
 * Stop traversing immediately
 */
const EXIT = false

/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test node, optional
 * @param visitor Function to run for each node
 * @param reverse Visit the tree in reverse order, defaults to false
 */
const visitParents =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor<Node>} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test
        test = null
      }

      const is = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)(test)
      const step = reverse ? -1 : 1

      factory(tree, null, [])()

      /**
       * @param {Node} node
       * @param {number?} index
       * @param {Array.<Parent>} parents
       */
      function factory(node, index, parents) {
        /** @type {Object.<string, unknown>} */
        // @ts-expect-error: hush
        const value = typeof node === 'object' && node !== null ? node : {}
        /** @type {string|undefined} */
        let name

        if (typeof value.type === 'string') {
          name =
            typeof value.tagName === 'string'
              ? value.tagName
              : typeof value.name === 'string'
              ? value.name
              : undefined

          Object.defineProperty(visit, 'name', {
            value:
              'node (' +
              (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.color)(value.type + (name ? '<' + name + '>' : '')) +
              ')'
          })
        }

        return visit

        function visit() {
          /** @type {ActionTuple} */
          let result = []
          /** @type {ActionTuple} */
          let subresult
          /** @type {number} */
          let offset
          /** @type {Array.<Parent>} */
          let grandparents

          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents))

            if (result[0] === EXIT) {
              return result
            }
          }

          // @ts-expect-error looks like a parent.
          if (node.children && result[0] !== SKIP) {
            // @ts-expect-error looks like a parent.
            offset = (reverse ? node.children.length : -1) + step
            // @ts-expect-error looks like a parent.
            grandparents = parents.concat(node)

            // @ts-expect-error looks like a parent.
            while (offset > -1 && offset < node.children.length) {
              // @ts-expect-error looks like a parent.
              subresult = factory(node.children[offset], offset, grandparents)()

              if (subresult[0] === EXIT) {
                return subresult
              }

              offset =
                typeof subresult[1] === 'number' ? subresult[1] : offset + step
            }
          }

          return result
        }
      }
    }
  )

/**
 * @param {VisitorResult} value
 * @returns {ActionTuple}
 */
function toResult(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE, value]
  }

  return [value]
}


/***/ }),

/***/ "./node_modules/vfile-location/index.js":
/*!**********************************************!*\
  !*** ./node_modules/vfile-location/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "location": function() { return /* binding */ location; }
/* harmony export */ });
/**
 * @typedef {import('unist').Point} Point
 * @typedef {import('vfile').VFile} VFile
 *
 * @typedef {Pick<Point, 'line'|'column'>} PositionalPoint
 * @typedef {Required<Point>} FullPoint
 * @typedef {NonNullable<Point['offset']>} Offset
 */

/**
 * Get transform functions for the given `document`.
 *
 * @param {string|Uint8Array|VFile} file
 */
function location(file) {
  var value = String(file)
  /** @type {Array.<number>} */
  var indices = []
  var search = /\r?\n|\r/g

  while (search.test(value)) {
    indices.push(search.lastIndex)
  }

  indices.push(value.length + 1)

  return {toPoint, toOffset}

  /**
   * Get the line and column-based `point` for `offset` in the bound indices.
   * Returns a point with `undefined` values when given invalid or out of bounds
   * input.
   *
   * @param {Offset} offset
   * @returns {FullPoint}
   */
  function toPoint(offset) {
    var index = -1

    if (offset > -1 && offset < indices[indices.length - 1]) {
      while (++index < indices.length) {
        if (indices[index] > offset) {
          return {
            line: index + 1,
            column: offset - (indices[index - 1] || 0) + 1,
            offset
          }
        }
      }
    }

    return {line: undefined, column: undefined, offset: undefined}
  }

  /**
   * Get the `offset` for a line and column-based `point` in the bound indices.
   * Returns `-1` when given invalid or out of bounds input.
   *
   * @param {PositionalPoint} point
   * @returns {Offset}
   */
  function toOffset(point) {
    var line = point && point.line
    var column = point && point.column
    /** @type {number} */
    var offset

    if (
      typeof line === 'number' &&
      typeof column === 'number' &&
      !Number.isNaN(line) &&
      !Number.isNaN(column) &&
      line - 1 in indices
    ) {
      offset = (indices[line - 2] || 0) + column - 1 || 0
    }

    return offset > -1 && offset < indices[indices.length - 1] ? offset : -1
  }
}


/***/ }),

/***/ "./node_modules/vfile-message/index.js":
/*!*********************************************!*\
  !*** ./node_modules/vfile-message/index.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VFileMessage": function() { return /* binding */ VFileMessage; }
/* harmony export */ });
/* harmony import */ var unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-stringify-position */ "./node_modules/vfile-message/node_modules/unist-util-stringify-position/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Point} Point
 * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
 */



class VFileMessage extends Error {
  /**
   * Constructor of a message for `reason` at `place` from `origin`.
   * When an error is passed in as `reason`, copies the `stack`.
   *
   * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
   * @param {string} [origin] Place in code the message originates from (`string`, optional).
   */
  constructor(reason, place, origin) {
    /** @type {[string|null, string|null]} */
    const parts = [null, null]
    /** @type {Position} */
    let position = {
      // @ts-expect-error: we always follows the structure of `position`.
      start: {line: null, column: null},
      // @ts-expect-error: "
      end: {line: null, column: null}
    }

    super()

    if (typeof place === 'string') {
      origin = place
      place = undefined
    }

    if (typeof origin === 'string') {
      const index = origin.indexOf(':')

      if (index === -1) {
        parts[1] = origin
      } else {
        parts[0] = origin.slice(0, index)
        parts[1] = origin.slice(index + 1)
      }
    }

    if (place) {
      // Node.
      if ('type' in place || 'position' in place) {
        if (place.position) {
          position = place.position
        }
      }
      // Position.
      else if ('start' in place || 'end' in place) {
        position = place
      }
      // Point.
      else if ('line' in place || 'column' in place) {
        position.start = place
      }
    }

    // Fields from `Error`
    this.name = (0,unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_0__.stringifyPosition)(place) || '1:1'
    this.message = typeof reason === 'object' ? reason.message : reason
    this.stack = typeof reason === 'object' ? reason.stack : ''

    /**
     * Reason for message.
     * @type {string}
     */
    this.reason = this.message
    /**
     * If true, marks associated file as no longer processable.
     * @type {boolean?}
     */
    // eslint-disable-next-line no-unused-expressions
    this.fatal
    /**
     * Starting line of error.
     * @type {number?}
     */
    this.line = position.start.line
    /**
     * Starting column of error.
     * @type {number?}
     */
    this.column = position.start.column
    /**
     * Namespace of warning.
     * @type {string?}
     */
    this.source = parts[0]
    /**
     * Category of message.
     * @type {string?}
     */
    this.ruleId = parts[1]
    /**
     * Full range information, when available.
     * Has start and end properties, both set to an object with line and column, set to number?.
     * @type {Position?}
     */
    this.position = position

    // The following fields are “well known”.
    // Not standard.
    // Feel free to add other non-standard fields to your messages.

    /* eslint-disable no-unused-expressions */
    /**
     * You can use this to specify the source value that’s being reported, which
     * is deemed incorrect.
     * @type {string?}
     */
    this.actual
    /**
     * You can use this to suggest values that should be used instead of
     * `actual`, one or more values that are deemed as acceptable.
     * @type {Array<string>?}
     */
    this.expected
    /**
     * You may add a file property with a path of a file (used throughout the VFile ecosystem).
     * @type {string?}
     */
    this.file
    /**
     * You may add a url property with a link to documentation for the message.
     * @type {string?}
     */
    this.url
    /**
     * You may add a note property with a long form description of the message (supported by vfile-reporter).
     * @type {string?}
     */
    this.note
    /* eslint-enable no-unused-expressions */
  }
}

VFileMessage.prototype.file = ''
VFileMessage.prototype.name = ''
VFileMessage.prototype.reason = ''
VFileMessage.prototype.message = ''
VFileMessage.prototype.stack = ''
VFileMessage.prototype.fatal = null
VFileMessage.prototype.column = null
VFileMessage.prototype.line = null
VFileMessage.prototype.source = null
VFileMessage.prototype.ruleId = null
VFileMessage.prototype.position = null


/***/ }),

/***/ "./node_modules/vfile-message/node_modules/unist-util-stringify-position/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/vfile-message/node_modules/unist-util-stringify-position/index.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringifyPosition": function() { return /* binding */ stringifyPosition; }
/* harmony export */ });
/**
 * @typedef {import('unist').Point} Point
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
 */

/**
 * Stringify one point, a position (start and end points), or a node’s
 * positional information.
 *
 * @param {Node|NodeLike|Position|Point|null} [value]
 * @returns {string}
 */
function stringifyPosition(value) {
  // Nothing.
  if (!value || typeof value !== 'object') {
    return ''
  }

  // Node.
  if ('position' in value || 'type' in value) {
    return position(value.position)
  }

  // Position.
  if ('start' in value || 'end' in value) {
    return position(value)
  }

  // Point.
  if ('line' in value || 'column' in value) {
    return point(value)
  }

  // ?
  return ''
}

/**
 * @param {Point|undefined} point
 * @returns {string}
 */
function point(point) {
  return index(point && point.line) + ':' + index(point && point.column)
}

/**
 * @param {Position|undefined} pos
 * @returns {string}
 */
function position(pos) {
  return point(pos && pos.start) + '-' + point(pos && pos.end)
}

/**
 * @param {number|undefined} value
 * @returns {number}
 */
function index(value) {
  return value && typeof value === 'number' ? value : 1
}


/***/ }),

/***/ "./node_modules/vfile-sort/index.js":
/*!******************************************!*\
  !*** ./node_modules/vfile-sort/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sort": function() { return /* binding */ sort; }
/* harmony export */ });
/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 */

var severities = {true: 2, false: 1, null: 0, undefined: 0}

/**
 * @template {VFile} F
 * @param {F} file
 * @returns {F}
 */
function sort(file) {
  file.messages.sort(comparator)
  return file
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @returns {number}
 */
function comparator(a, b) {
  return (
    check(a, b, 'line') ||
    check(a, b, 'column') ||
    severities[b.fatal] - severities[a.fatal] ||
    compare(a, b, 'source') ||
    compare(a, b, 'ruleId') ||
    compare(a, b, 'reason') ||
    0
  )
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @param {string} property
 * @returns {number}
 */
function check(a, b, property) {
  return (a[property] || 0) - (b[property] || 0)
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @param {string} property
 * @returns {number}
 */
function compare(a, b, property) {
  return String(a[property] || '').localeCompare(b[property] || '')
}


/***/ }),

/***/ "./node_modules/vfile/lib/index.js":
/*!*****************************************!*\
  !*** ./node_modules/vfile/lib/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VFile": function() { return /* binding */ VFile; }
/* harmony export */ });
/* harmony import */ var is_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-buffer */ "./node_modules/vfile/node_modules/is-buffer/index.js");
/* harmony import */ var vfile_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vfile-message */ "./node_modules/vfile-message/index.js");
/* harmony import */ var _minpath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./minpath.js */ "./node_modules/vfile/lib/minpath.browser.js");
/* harmony import */ var _minproc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minproc.js */ "./node_modules/vfile/lib/minproc.browser.js");
/* harmony import */ var _minurl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minurl.js */ "./node_modules/vfile/lib/minurl.shared.js");
/* harmony import */ var _minurl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./minurl.js */ "./node_modules/vfile/lib/minurl.browser.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Point} Point
 * @typedef {Record<string, unknown> & {type: string, position?: Position|undefined}} NodeLike
 * @typedef {import('./minurl.shared.js').URL} URL
 * @typedef {import('..').VFileData} VFileData
 * @typedef {import('..').VFileValue} VFileValue
 *
 * @typedef {'ascii'|'utf8'|'utf-8'|'utf16le'|'ucs2'|'ucs-2'|'base64'|'base64url'|'latin1'|'binary'|'hex'} BufferEncoding
 *   Encodings supported by the buffer class.
 *   This is a copy of the typing from Node, copied to prevent Node globals from
 *   being needed.
 *   Copied from: <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/90a4ec8/types/node/buffer.d.ts#L170>
 *
 * @typedef {VFileValue|VFileOptions|VFile|URL} VFileCompatible
 *   Things that can be passed to the constructor.
 *
 * @typedef VFileCoreOptions
 * @property {VFileValue} [value]
 * @property {string} [cwd]
 * @property {Array<string>} [history]
 * @property {string|URL} [path]
 * @property {string} [basename]
 * @property {string} [stem]
 * @property {string} [extname]
 * @property {string} [dirname]
 * @property {VFileData} [data]
 *
 * @typedef Map
 *   Raw source map, see:
 *   <https://github.com/mozilla/source-map/blob/58819f0/source-map.d.ts#L15-L23>.
 * @property {number} version
 * @property {Array<string>} sources
 * @property {Array<string>} names
 * @property {string|undefined} [sourceRoot]
 * @property {Array<string>|undefined} [sourcesContent]
 * @property {string} mappings
 * @property {string} file
 *
 * @typedef {{[key: string]: unknown} & VFileCoreOptions} VFileOptions
 *   Configuration: a bunch of keys that will be shallow copied over to the new
 *   file.
 *
 * @typedef {Record<string, unknown>} VFileReporterSettings
 * @typedef {<T = VFileReporterSettings>(files: Array<VFile>, options: T) => string} VFileReporter
 */







// Order of setting (least specific to most), we need this because otherwise
// `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
// stem can be set.
const order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname']

class VFile {
  /**
   * Create a new virtual file.
   *
   * If `options` is `string` or `Buffer`, treats it as `{value: options}`.
   * If `options` is a `VFile`, shallow copies its data over to the new file.
   * All other given fields are set on the newly created `VFile`.
   *
   * Path related properties are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * It’s not possible to set either `dirname` or `extname` without setting
   * either `history`, `path`, `basename`, or `stem` as well.
   *
   * @param {VFileCompatible} [value]
   */
  constructor(value) {
    /** @type {VFileOptions} */
    let options

    if (!value) {
      options = {}
    } else if (typeof value === 'string' || is_buffer__WEBPACK_IMPORTED_MODULE_0__(value)) {
      // @ts-expect-error Looks like a buffer.
      options = {value}
    } else if ((0,_minurl_js__WEBPACK_IMPORTED_MODULE_1__.isUrl)(value)) {
      options = {path: value}
    } else {
      // @ts-expect-error Looks like file or options.
      options = value
    }

    /**
     * Place to store custom information.
     * It’s OK to store custom data directly on the file, moving it to `data`
     * gives a little more privacy.
     * @type {VFileData}
     */
    this.data = {}

    /**
     * List of messages associated with the file.
     * @type {Array<VFileMessage>}
     */
    this.messages = []

    /**
     * List of file paths the file moved between.
     * @type {Array<string>}
     */
    this.history = []

    /**
     * Base of `path`.
     * Defaults to `process.cwd()` (`/` in browsers).
     * @type {string}
     */
    this.cwd = _minproc_js__WEBPACK_IMPORTED_MODULE_2__.proc.cwd()

    /* eslint-disable no-unused-expressions */
    /**
     * Raw value.
     * @type {VFileValue}
     */
    this.value

    // The below are non-standard, they are “well-known”.
    // As in, used in several tools.

    /**
     * Whether a file was saved to disk.
     * This is used by vfile reporters.
     * @type {boolean}
     */
    this.stored

    /**
     * Sometimes files have a non-string representation.
     * This can be stored in the `result` field.
     * One example is when turning markdown into React nodes.
     * This is used by unified to store non-string results.
     * @type {unknown}
     */
    this.result

    /**
     * Sometimes files have a source map associated with them.
     * This can be stored in the `map` field.
     * This should be a `RawSourceMap` type from the `source-map` module.
     * @type {Map|undefined}
     */
    this.map
    /* eslint-enable no-unused-expressions */

    // Set path related properties in the correct order.
    let index = -1

    while (++index < order.length) {
      const prop = order[index]

      // Note: we specifically use `in` instead of `hasOwnProperty` to accept
      // `vfile`s too.
      if (prop in options && options[prop] !== undefined) {
        // @ts-expect-error: TS is confused by the different types for `history`.
        this[prop] = prop === 'history' ? [...options[prop]] : options[prop]
      }
    }

    /** @type {string} */
    let prop

    // Set non-path related properties.
    for (prop in options) {
      // @ts-expect-error: fine to set other things.
      if (!order.includes(prop)) this[prop] = options[prop]
    }
  }

  /**
   * Access full path (`~/index.min.js`).
   *
   * @returns {string}
   */
  get path() {
    return this.history[this.history.length - 1]
  }

  /**
   * Set full path (`~/index.min.js`).
   * Cannot be nullified.
   *
   * @param {string|URL} path
   */
  set path(path) {
    if ((0,_minurl_js__WEBPACK_IMPORTED_MODULE_1__.isUrl)(path)) {
      path = (0,_minurl_js__WEBPACK_IMPORTED_MODULE_3__.urlToPath)(path)
    }

    assertNonEmpty(path, 'path')

    if (this.path !== path) {
      this.history.push(path)
    }
  }

  /**
   * Access parent path (`~`).
   */
  get dirname() {
    return typeof this.path === 'string' ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.dirname(this.path) : undefined
  }

  /**
   * Set parent path (`~`).
   * Cannot be set if there's no `path` yet.
   */
  set dirname(dirname) {
    assertPath(this.basename, 'dirname')
    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.join(dirname || '', this.basename)
  }

  /**
   * Access basename (including extname) (`index.min.js`).
   */
  get basename() {
    return typeof this.path === 'string' ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.basename(this.path) : undefined
  }

  /**
   * Set basename (`index.min.js`).
   * Cannot contain path separators.
   * Cannot be nullified either (use `file.path = file.dirname` instead).
   */
  set basename(basename) {
    assertNonEmpty(basename, 'basename')
    assertPart(basename, 'basename')
    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.join(this.dirname || '', basename)
  }

  /**
   * Access extname (including dot) (`.js`).
   */
  get extname() {
    return typeof this.path === 'string' ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.extname(this.path) : undefined
  }

  /**
   * Set extname (including dot) (`.js`).
   * Cannot be set if there's no `path` yet and cannot contain path separators.
   */
  set extname(extname) {
    assertPart(extname, 'extname')
    assertPath(this.dirname, 'extname')

    if (extname) {
      if (extname.charCodeAt(0) !== 46 /* `.` */) {
        throw new Error('`extname` must start with `.`')
      }

      if (extname.includes('.', 1)) {
        throw new Error('`extname` cannot contain multiple dots')
      }
    }

    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.join(this.dirname, this.stem + (extname || ''))
  }

  /**
   * Access stem (w/o extname) (`index.min`).
   */
  get stem() {
    return typeof this.path === 'string'
      ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.basename(this.path, this.extname)
      : undefined
  }

  /**
   * Set stem (w/o extname) (`index.min`).
   * Cannot be nullified, and cannot contain path separators.
   */
  set stem(stem) {
    assertNonEmpty(stem, 'stem')
    assertPart(stem, 'stem')
    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.join(this.dirname || '', stem + (this.extname || ''))
  }

  /**
   * Serialize the file.
   *
   * @param {BufferEncoding} [encoding='utf8'] If `file.value` is a buffer, `encoding` is used to serialize buffers.
   * @returns {string}
   */
  toString(encoding) {
    return (this.value || '').toString(encoding)
  }

  /**
   * Create a message and associates it w/ the file.
   *
   * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
   * @param {string} [origin] Place in code the message originates from (`string`, optional).
   * @returns {VFileMessage}
   */
  message(reason, place, origin) {
    const message = new vfile_message__WEBPACK_IMPORTED_MODULE_5__.VFileMessage(reason, place, origin)

    if (this.path) {
      message.name = this.path + ':' + message.name
      message.file = this.path
    }

    message.fatal = false

    this.messages.push(message)

    return message
  }

  /**
   * Info: create a message, associate it with the file, and mark the fatality
   * as `null`.
   * Calls `message()` internally.
   *
   * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
   * @param {string} [origin] Place in code the message originates from (`string`, optional).
   * @returns {VFileMessage}
   */
  info(reason, place, origin) {
    const message = this.message(reason, place, origin)

    message.fatal = null

    return message
  }

  /**
   * Fail: create a message, associate it with the file, mark the fatality as
   * `true`.
   * Note: fatal errors mean a file is no longer processable.
   * Calls `message()` internally.
   *
   * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
   * @param {string} [origin] Place in code the message originates from (`string`, optional).
   * @returns {never}
   */
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin)

    message.fatal = true

    throw message
  }
}

/**
 * Assert that `part` is not a path (as in, does not contain `path.sep`).
 *
 * @param {string|undefined} part
 * @param {string} name
 * @returns {void}
 */
function assertPart(part, name) {
  if (part && part.includes(_minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.sep)) {
    throw new Error(
      '`' + name + '` cannot be a path: did not expect `' + _minpath_js__WEBPACK_IMPORTED_MODULE_4__.path.sep + '`'
    )
  }
}

/**
 * Assert that `part` is not empty.
 *
 * @param {string|undefined} part
 * @param {string} name
 * @returns {asserts part is string}
 */
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty')
  }
}

/**
 * Assert `path` exists.
 *
 * @param {string|undefined} path
 * @param {string} name
 * @returns {asserts path is string}
 */
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too')
  }
}


/***/ }),

/***/ "./node_modules/vfile/lib/minpath.browser.js":
/*!***************************************************!*\
  !*** ./node_modules/vfile/lib/minpath.browser.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "path": function() { return /* binding */ path; }
/* harmony export */ });
// A derivative work based on:
// <https://github.com/browserify/path-browserify>.
// Which is licensed:
//
// MIT License
//
// Copyright (c) 2013 James Halliday
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// A derivative work based on:
//
// Parts of that are extracted from Node’s internal `path` module:
// <https://github.com/nodejs/node/blob/master/lib/path.js>.
// Which is licensed:
//
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

const path = {basename, dirname, extname, join, sep: '/'}

/* eslint-disable max-depth, complexity */

/**
 * @param {string} path
 * @param {string} [ext]
 * @returns {string}
 */
function basename(path, ext) {
  if (ext !== undefined && typeof ext !== 'string') {
    throw new TypeError('"ext" argument must be a string')
  }

  assertPath(path)
  let start = 0
  let end = -1
  let index = path.length
  /** @type {boolean|undefined} */
  let seenNonSlash

  if (ext === undefined || ext.length === 0 || ext.length > path.length) {
    while (index--) {
      if (path.charCodeAt(index) === 47 /* `/` */) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now.
        if (seenNonSlash) {
          start = index + 1
          break
        }
      } else if (end < 0) {
        // We saw the first non-path separator, mark this as the end of our
        // path component.
        seenNonSlash = true
        end = index + 1
      }
    }

    return end < 0 ? '' : path.slice(start, end)
  }

  if (ext === path) {
    return ''
  }

  let firstNonSlashEnd = -1
  let extIndex = ext.length - 1

  while (index--) {
    if (path.charCodeAt(index) === 47 /* `/` */) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now.
      if (seenNonSlash) {
        start = index + 1
        break
      }
    } else {
      if (firstNonSlashEnd < 0) {
        // We saw the first non-path separator, remember this index in case
        // we need it if the extension ends up not matching.
        seenNonSlash = true
        firstNonSlashEnd = index + 1
      }

      if (extIndex > -1) {
        // Try to match the explicit extension.
        if (path.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            // We matched the extension, so mark this as the end of our path
            // component
            end = index
          }
        } else {
          // Extension does not match, so our result is the entire path
          // component
          extIndex = -1
          end = firstNonSlashEnd
        }
      }
    }
  }

  if (start === end) {
    end = firstNonSlashEnd
  } else if (end < 0) {
    end = path.length
  }

  return path.slice(start, end)
}

/**
 * @param {string} path
 * @returns {string}
 */
function dirname(path) {
  assertPath(path)

  if (path.length === 0) {
    return '.'
  }

  let end = -1
  let index = path.length
  /** @type {boolean|undefined} */
  let unmatchedSlash

  // Prefix `--` is important to not run on `0`.
  while (--index) {
    if (path.charCodeAt(index) === 47 /* `/` */) {
      if (unmatchedSlash) {
        end = index
        break
      }
    } else if (!unmatchedSlash) {
      // We saw the first non-path separator
      unmatchedSlash = true
    }
  }

  return end < 0
    ? path.charCodeAt(0) === 47 /* `/` */
      ? '/'
      : '.'
    : end === 1 && path.charCodeAt(0) === 47 /* `/` */
    ? '//'
    : path.slice(0, end)
}

/**
 * @param {string} path
 * @returns {string}
 */
function extname(path) {
  assertPath(path)

  let index = path.length

  let end = -1
  let startPart = 0
  let startDot = -1
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find.
  let preDotState = 0
  /** @type {boolean|undefined} */
  let unmatchedSlash

  while (index--) {
    const code = path.charCodeAt(index)

    if (code === 47 /* `/` */) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now.
      if (unmatchedSlash) {
        startPart = index + 1
        break
      }

      continue
    }

    if (end < 0) {
      // We saw the first non-path separator, mark this as the end of our
      // extension.
      unmatchedSlash = true
      end = index + 1
    }

    if (code === 46 /* `.` */) {
      // If this is our first dot, mark it as the start of our extension.
      if (startDot < 0) {
        startDot = index
      } else if (preDotState !== 1) {
        preDotState = 1
      }
    } else if (startDot > -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension.
      preDotState = -1
    }
  }

  if (
    startDot < 0 ||
    end < 0 ||
    // We saw a non-dot character immediately before the dot.
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly `..`.
    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
  ) {
    return ''
  }

  return path.slice(startDot, end)
}

/**
 * @param {Array<string>} segments
 * @returns {string}
 */
function join(...segments) {
  let index = -1
  /** @type {string|undefined} */
  let joined

  while (++index < segments.length) {
    assertPath(segments[index])

    if (segments[index]) {
      joined =
        joined === undefined ? segments[index] : joined + '/' + segments[index]
    }
  }

  return joined === undefined ? '.' : normalize(joined)
}

/**
 * Note: `normalize` is not exposed as `path.normalize`, so some code is
 * manually removed from it.
 *
 * @param {string} path
 * @returns {string}
 */
function normalize(path) {
  assertPath(path)

  const absolute = path.charCodeAt(0) === 47 /* `/` */

  // Normalize the path according to POSIX rules.
  let value = normalizeString(path, !absolute)

  if (value.length === 0 && !absolute) {
    value = '.'
  }

  if (value.length > 0 && path.charCodeAt(path.length - 1) === 47 /* / */) {
    value += '/'
  }

  return absolute ? '/' + value : value
}

/**
 * Resolve `.` and `..` elements in a path with directory names.
 *
 * @param {string} path
 * @param {boolean} allowAboveRoot
 * @returns {string}
 */
function normalizeString(path, allowAboveRoot) {
  let result = ''
  let lastSegmentLength = 0
  let lastSlash = -1
  let dots = 0
  let index = -1
  /** @type {number|undefined} */
  let code
  /** @type {number} */
  let lastSlashIndex

  while (++index <= path.length) {
    if (index < path.length) {
      code = path.charCodeAt(index)
    } else if (code === 47 /* `/` */) {
      break
    } else {
      code = 47 /* `/` */
    }

    if (code === 47 /* `/` */) {
      if (lastSlash === index - 1 || dots === 1) {
        // Empty.
      } else if (lastSlash !== index - 1 && dots === 2) {
        if (
          result.length < 2 ||
          lastSegmentLength !== 2 ||
          result.charCodeAt(result.length - 1) !== 46 /* `.` */ ||
          result.charCodeAt(result.length - 2) !== 46 /* `.` */
        ) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf('/')

            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = ''
                lastSegmentLength = 0
              } else {
                result = result.slice(0, lastSlashIndex)
                lastSegmentLength = result.length - 1 - result.lastIndexOf('/')
              }

              lastSlash = index
              dots = 0
              continue
            }
          } else if (result.length > 0) {
            result = ''
            lastSegmentLength = 0
            lastSlash = index
            dots = 0
            continue
          }
        }

        if (allowAboveRoot) {
          result = result.length > 0 ? result + '/..' : '..'
          lastSegmentLength = 2
        }
      } else {
        if (result.length > 0) {
          result += '/' + path.slice(lastSlash + 1, index)
        } else {
          result = path.slice(lastSlash + 1, index)
        }

        lastSegmentLength = index - lastSlash - 1
      }

      lastSlash = index
      dots = 0
    } else if (code === 46 /* `.` */ && dots > -1) {
      dots++
    } else {
      dots = -1
    }
  }

  return result
}

/**
 * @param {string} path
 */
function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError(
      'Path must be a string. Received ' + JSON.stringify(path)
    )
  }
}

/* eslint-enable max-depth, complexity */


/***/ }),

/***/ "./node_modules/vfile/lib/minproc.browser.js":
/*!***************************************************!*\
  !*** ./node_modules/vfile/lib/minproc.browser.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "proc": function() { return /* binding */ proc; }
/* harmony export */ });
// Somewhat based on:
// <https://github.com/defunctzombie/node-process/blob/master/browser.js>.
// But I don’t think one tiny line of code can be copyrighted. 😅
const proc = {cwd}

function cwd() {
  return '/'
}


/***/ }),

/***/ "./node_modules/vfile/lib/minurl.browser.js":
/*!**************************************************!*\
  !*** ./node_modules/vfile/lib/minurl.browser.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlToPath": function() { return /* binding */ urlToPath; },
/* harmony export */   "isUrl": function() { return /* reexport safe */ _minurl_shared_js__WEBPACK_IMPORTED_MODULE_0__.isUrl; }
/* harmony export */ });
/* harmony import */ var _minurl_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minurl.shared.js */ "./node_modules/vfile/lib/minurl.shared.js");
/// <reference lib="dom" />



// See: <https://github.com/nodejs/node/blob/fcf8ba4/lib/internal/url.js>

/**
 * @param {string|URL} path
 */
function urlToPath(path) {
  if (typeof path === 'string') {
    path = new URL(path)
  } else if (!(0,_minurl_shared_js__WEBPACK_IMPORTED_MODULE_0__.isUrl)(path)) {
    /** @type {NodeJS.ErrnoException} */
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        path +
        '`'
    )
    error.code = 'ERR_INVALID_ARG_TYPE'
    throw error
  }

  if (path.protocol !== 'file:') {
    /** @type {NodeJS.ErrnoException} */
    const error = new TypeError('The URL must be of scheme file')
    error.code = 'ERR_INVALID_URL_SCHEME'
    throw error
  }

  return getPathFromURLPosix(path)
}

/**
 * @param {URL} url
 */
function getPathFromURLPosix(url) {
  if (url.hostname !== '') {
    /** @type {NodeJS.ErrnoException} */
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    )
    error.code = 'ERR_INVALID_FILE_URL_HOST'
    throw error
  }

  const pathname = url.pathname
  let index = -1

  while (++index < pathname.length) {
    if (
      pathname.charCodeAt(index) === 37 /* `%` */ &&
      pathname.charCodeAt(index + 1) === 50 /* `2` */
    ) {
      const third = pathname.charCodeAt(index + 2)
      if (third === 70 /* `F` */ || third === 102 /* `f` */) {
        /** @type {NodeJS.ErrnoException} */
        const error = new TypeError(
          'File URL path must not include encoded / characters'
        )
        error.code = 'ERR_INVALID_FILE_URL_PATH'
        throw error
      }
    }
  }

  return decodeURIComponent(pathname)
}




/***/ }),

/***/ "./node_modules/vfile/lib/minurl.shared.js":
/*!*************************************************!*\
  !*** ./node_modules/vfile/lib/minurl.shared.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isUrl": function() { return /* binding */ isUrl; }
/* harmony export */ });
/**
 * @typedef URL
 * @property {string} hash
 * @property {string} host
 * @property {string} hostname
 * @property {string} href
 * @property {string} origin
 * @property {string} password
 * @property {string} pathname
 * @property {string} port
 * @property {string} protocol
 * @property {string} search
 * @property {any} searchParams
 * @property {string} username
 * @property {() => string} toString
 * @property {() => string} toJSON
 */

/**
 * @param {unknown} fileURLOrPath
 * @returns {fileURLOrPath is URL}
 */
// From: <https://github.com/nodejs/node/blob/fcf8ba4/lib/internal/url.js#L1501>
function isUrl(fileURLOrPath) {
  return (
    fileURLOrPath !== null &&
    typeof fileURLOrPath === 'object' &&
    // @ts-expect-error: indexable.
    fileURLOrPath.href &&
    // @ts-expect-error: indexable.
    fileURLOrPath.origin
  )
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


/***/ }),

/***/ "./node_modules/normalize-strings/charmap.json":
/*!*****************************************************!*\
  !*** ./node_modules/normalize-strings/charmap.json ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"105":"i","192":"A","193":"A","194":"A","195":"A","196":"A","197":"A","199":"C","200":"E","201":"E","202":"E","203":"E","204":"I","205":"I","206":"I","207":"I","209":"N","210":"O","211":"O","212":"O","213":"O","214":"O","216":"O","217":"U","218":"U","219":"U","220":"U","221":"Y","224":"a","225":"a","226":"a","227":"a","228":"a","229":"a","231":"c","232":"e","233":"e","234":"e","235":"e","236":"i","237":"i","238":"i","239":"i","241":"n","242":"o","243":"o","244":"o","245":"o","246":"o","248":"o","249":"u","250":"u","251":"u","252":"u","253":"y","255":"y","256":"A","257":"a","258":"A","259":"a","260":"A","261":"a","262":"C","263":"c","264":"C","265":"c","266":"C","267":"c","268":"C","269":"c","270":"D","271":"d","272":"D","273":"d","274":"E","275":"e","276":"E","277":"e","278":"E","279":"e","280":"E","281":"e","282":"E","283":"e","284":"G","285":"g","286":"G","287":"g","288":"G","289":"g","290":"G","291":"g","292":"H","293":"h","294":"H","295":"h","296":"I","297":"i","298":"I","299":"i","300":"I","301":"i","302":"I","303":"i","304":"I","308":"J","309":"j","310":"K","311":"k","313":"L","314":"l","315":"L","316":"l","317":"L","318":"l","319":"L","320":"l","321":"L","322":"l","323":"N","324":"n","325":"N","326":"n","327":"N","328":"n","332":"O","333":"o","334":"O","335":"o","336":"O","337":"o","338":"O","339":"o","340":"R","341":"r","342":"R","343":"r","344":"R","345":"r","346":"S","347":"s","348":"S","349":"s","350":"S","351":"s","352":"S","353":"s","354":"T","355":"t","356":"T","357":"t","358":"T","359":"t","360":"U","361":"u","362":"U","363":"u","364":"U","365":"u","366":"U","367":"u","368":"U","369":"u","370":"U","371":"u","372":"W","373":"w","374":"Y","375":"y","376":"Y","377":"Z","378":"z","379":"Z","380":"z","381":"Z","382":"z","384":"b","385":"B","386":"B","387":"b","390":"O","391":"C","392":"c","393":"D","394":"D","395":"D","396":"d","398":"E","400":"E","401":"F","402":"f","403":"G","407":"I","408":"K","409":"k","410":"l","412":"M","413":"N","414":"n","415":"O","416":"O","417":"o","420":"P","421":"p","422":"R","427":"t","428":"T","429":"t","430":"T","431":"U","432":"u","434":"V","435":"Y","436":"y","437":"Z","438":"z","461":"A","462":"a","463":"I","464":"i","465":"O","466":"o","467":"U","468":"u","477":"e","484":"G","485":"g","486":"G","487":"g","488":"K","489":"k","490":"O","491":"o","500":"G","501":"g","504":"N","505":"n","512":"A","513":"a","514":"A","515":"a","516":"E","517":"e","518":"E","519":"e","520":"I","521":"i","522":"I","523":"i","524":"O","525":"o","526":"O","527":"o","528":"R","529":"r","530":"R","531":"r","532":"U","533":"u","534":"U","535":"u","536":"S","537":"s","538":"T","539":"t","542":"H","543":"h","544":"N","545":"d","548":"Z","549":"z","550":"A","551":"a","552":"E","553":"e","558":"O","559":"o","562":"Y","563":"y","564":"l","565":"n","566":"t","567":"j","570":"A","571":"C","572":"c","573":"L","574":"T","575":"s","576":"z","579":"B","580":"U","581":"V","582":"E","583":"e","584":"J","585":"j","586":"Q","587":"q","588":"R","589":"r","590":"Y","591":"y","592":"a","593":"a","595":"b","596":"o","597":"c","598":"d","599":"d","600":"e","603":"e","604":"e","605":"e","606":"e","607":"j","608":"g","609":"g","610":"g","613":"h","614":"h","616":"i","618":"i","619":"l","620":"l","621":"l","623":"m","624":"m","625":"m","626":"n","627":"n","628":"n","629":"o","633":"r","634":"r","635":"r","636":"r","637":"r","638":"r","639":"r","640":"r","641":"r","642":"s","647":"t","648":"t","649":"u","651":"v","652":"v","653":"w","654":"y","655":"y","656":"z","657":"z","663":"c","665":"b","666":"e","667":"g","668":"h","669":"j","670":"k","671":"l","672":"q","686":"h","688":"h","690":"j","691":"r","692":"r","694":"r","695":"w","696":"y","737":"l","738":"s","739":"x","780":"v","829":"x","851":"x","867":"a","868":"e","869":"i","870":"o","871":"u","872":"c","873":"d","874":"h","875":"m","876":"r","877":"t","878":"v","879":"x","7424":"a","7427":"b","7428":"c","7429":"d","7431":"e","7432":"e","7433":"i","7434":"j","7435":"k","7436":"l","7437":"m","7438":"n","7439":"o","7440":"o","7441":"o","7442":"o","7443":"o","7446":"o","7447":"o","7448":"p","7449":"r","7450":"r","7451":"t","7452":"u","7453":"u","7454":"u","7455":"m","7456":"v","7457":"w","7458":"z","7522":"i","7523":"r","7524":"u","7525":"v","7680":"A","7681":"a","7682":"B","7683":"b","7684":"B","7685":"b","7686":"B","7687":"b","7690":"D","7691":"d","7692":"D","7693":"d","7694":"D","7695":"d","7696":"D","7697":"d","7698":"D","7699":"d","7704":"E","7705":"e","7706":"E","7707":"e","7710":"F","7711":"f","7712":"G","7713":"g","7714":"H","7715":"h","7716":"H","7717":"h","7718":"H","7719":"h","7720":"H","7721":"h","7722":"H","7723":"h","7724":"I","7725":"i","7728":"K","7729":"k","7730":"K","7731":"k","7732":"K","7733":"k","7734":"L","7735":"l","7738":"L","7739":"l","7740":"L","7741":"l","7742":"M","7743":"m","7744":"M","7745":"m","7746":"M","7747":"m","7748":"N","7749":"n","7750":"N","7751":"n","7752":"N","7753":"n","7754":"N","7755":"n","7764":"P","7765":"p","7766":"P","7767":"p","7768":"R","7769":"r","7770":"R","7771":"r","7774":"R","7775":"r","7776":"S","7777":"s","7778":"S","7779":"s","7786":"T","7787":"t","7788":"T","7789":"t","7790":"T","7791":"t","7792":"T","7793":"t","7794":"U","7795":"u","7796":"U","7797":"u","7798":"U","7799":"u","7804":"V","7805":"v","7806":"V","7807":"v","7808":"W","7809":"w","7810":"W","7811":"w","7812":"W","7813":"w","7814":"W","7815":"w","7816":"W","7817":"w","7818":"X","7819":"x","7820":"X","7821":"x","7822":"Y","7823":"y","7824":"Z","7825":"z","7826":"Z","7827":"z","7828":"Z","7829":"z","7835":"s","7840":"A","7841":"a","7842":"A","7843":"a","7864":"E","7865":"e","7866":"E","7867":"e","7868":"E","7869":"e","7880":"I","7881":"i","7882":"I","7883":"i","7884":"O","7885":"o","7886":"O","7887":"o","7908":"U","7909":"u","7910":"U","7911":"u","7922":"Y","7923":"y","7924":"Y","7925":"y","7926":"Y","7927":"y","7928":"Y","7929":"y","8305":"i","8341":"h","8342":"k","8343":"l","8344":"m","8345":"n","8346":"p","8347":"s","8348":"t","8450":"c","8458":"g","8459":"h","8460":"h","8461":"h","8464":"i","8465":"i","8466":"l","8467":"l","8468":"l","8469":"n","8472":"p","8473":"p","8474":"q","8475":"r","8476":"r","8477":"r","8484":"z","8488":"z","8492":"b","8493":"c","8495":"e","8496":"e","8497":"f","8498":"F","8499":"m","8500":"o","8506":"q","8513":"g","8514":"l","8515":"l","8516":"y","8517":"d","8518":"d","8519":"e","8520":"i","8521":"j","8526":"f","8579":"C","8580":"c","8765":"s","8766":"s","8959":"z","8999":"x","9746":"x","9776":"i","9866":"i","10005":"x","10006":"x","10007":"x","10008":"x","10625":"z","10626":"z","11362":"L","11364":"R","11365":"a","11366":"t","11373":"A","11374":"M","11375":"A","11390":"S","11391":"Z","19904":"i","42893":"H","42922":"H","42923":"E","42924":"G","42925":"L","42928":"K","42929":"T","62937":"x"}');

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_annotations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/annotations */ "@wordpress/annotations");
/* harmony import */ var _wordpress_annotations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_annotations__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_panel_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/panel/plugin */ "./src/js/components/panel/plugin.js");
/* harmony import */ var _subscribers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribers */ "./src/js/subscribers/index.js");

 // The WP annotations package isn't loaded by default so force loading it.


 // import './filters';


_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  /**
   * Register Access Panel Plugin
   */
  (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('writers-blocks', {
    render: _components_panel_plugin__WEBPACK_IMPORTED_MODULE_3__.PluginPanel
  });
});
}();
/******/ })()
;
//# sourceMappingURL=editor.js.map