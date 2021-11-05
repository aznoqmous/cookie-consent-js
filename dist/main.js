/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./scss/style.scss":
/*!*************************!*\
  !*** ./scss/style.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"* {\\n  color: red;\\n}\\n\\n.service button {\\n  opacity: 0.5;\\n}\\n.service button.active {\\n  opacity: 1;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./scss/style.scss?");

/***/ }),

/***/ "./src/cookie-consent.js":
/*!*******************************!*\
  !*** ./src/cookie-consent.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CookieConsent; });\n/* harmony import */ var _rules_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules.json */ \"./src/rules.json\");\nvar _rules_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./rules.json */ \"./src/rules.json\", 1);\n/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cookies */ \"./src/cookies.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _lang_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lang.js */ \"./src/lang.js\");\n\n\n\n\nclass CookieConsent {\n  static get key() {\n    return \"cookie_consent\";\n  }\n\n  constructor() {\n    this.getBannedScriptRules();\n    this.observe();\n  }\n\n  init(config) {\n    this.config = Object.assign({\n      services: [\"functionnal\", \"google\"],\n      title: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"popupTitle\"),\n      disclaimer: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"popupDisclaimer\"),\n      legalNoticeText: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('legalNotice'),\n      legalNoticeUrl: \"/mentions-legales\",\n      // to override \n      popupDetailsTitle: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('popupDetailsTitle'),\n      popupDetailsDisclaimer: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('popupDetailsDisclaimer')\n    }, config);\n    _utils_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].DOMLoaded().then(() => {\n      this.buildPopup();\n    });\n  }\n  /**\r\n   * Data\r\n   */\n\n\n  getData() {\n    return _cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(CookieConsent.key);\n  }\n\n  saveData(data) {\n    _cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].set(CookieConsent.key, data);\n  }\n  /**\r\n   * Popup\r\n   */\n\n\n  buildPopup() {\n    this.popup = this.create(document.body, {\n      className: \"cookie-consent-popup\"\n    }, \"form\");\n    let title = this.create(this.popup, {\n      innerHTML: this.config.title\n    });\n    let disclaimer = this.create(this.popup, {\n      innerHTML: this.config.disclaimer\n    });\n    let acceptAll = this.create(this.popup, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('allowAll')\n    }, 'button');\n    let denyAll = this.create(this.popup, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('disallowAll')\n    }, 'button');\n    let customize = this.create(this.popup, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('customize')\n    });\n    customize.addEventListener('click', () => {\n      this.popupDetails.classList.add('active');\n    });\n    let legalNotice = this.create(this.popup, {\n      innerHTML: this.config.legalNoticeText,\n      href: this.config.legalNoticeUrl\n    }, \"a\");\n    this.buildDetailsPopup();\n  }\n\n  buildDetailsPopup() {\n    let data = this.getData();\n    this.popupDetails = this.create(document.body, {\n      className: \"cookie-consent-popup-details\"\n    }, \"form\");\n    this.popupDetails.addEventListener('submit', e => {\n      e.preventDefault();\n    });\n    let title = this.create(this.popupDetails, {\n      innerHTML: this.config.popupDetailsTitle\n    });\n    let disclaimer = this.create(this.popupDetails, {\n      innerHTML: this.config.popupDetailsDisclaimer\n    });\n    let acceptAll = this.create(this.popupDetails, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('allowAll')\n    }, 'button');\n    let denyAll = this.create(this.popupDetails, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('disallowAll')\n    }, 'button');\n    let rules = this.create(this.popupDetails);\n    this.config.services.map(k => {\n      let lang = _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(k);\n      let service = this.create(rules, {\n        className: \"service\"\n      });\n      this.create(service, {\n        innerHTML: lang.name\n      });\n      this.create(service, {\n        innerHTML: lang.description\n      });\n      let input = this.create(service, {\n        name: k,\n        value: data[k],\n        type: 'hidden'\n      }, 'input');\n      let allow = this.create(service, {\n        innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"allow\"),\n        disabled: _rules_json__WEBPACK_IMPORTED_MODULE_0__[k].mandatory,\n        className: \"allow\"\n      }, \"button\");\n      allow.addEventListener('click', () => {\n        input.value = true;\n        this.savePopupDetailsData();\n        this.updatePopupDetails();\n      });\n\n      if (!_rules_json__WEBPACK_IMPORTED_MODULE_0__[k].mandatory) {\n        let disallow = this.create(service, {\n          innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"disallow\"),\n          className: \"disallow\"\n        }, \"button\");\n        disallow.addEventListener('click', () => {\n          input.value = false;\n          this.savePopupDetailsData();\n          this.updatePopupDetails();\n        });\n      }\n    });\n    this.updatePopupDetails();\n  }\n\n  updatePopupDetails() {\n    [...this.popupDetails.querySelectorAll('.service')].map(service => {\n      let isAllowed = service.querySelector('input[type=\"hidden\"]').value == \"true\";\n      let allow = service.querySelector('.allow');\n      let disallow = service.querySelector('.disallow');\n\n      if (isAllowed) {\n        allow.classList.add('active');\n        if (disallow) disallow.classList.remove('active');\n      } else {\n        allow.classList.remove('active');\n        if (disallow) disallow.classList.add('active');\n      }\n    });\n  }\n\n  savePopupDetailsData() {\n    let datas = this.getPopupDetailsData();\n    this.saveData(datas);\n  }\n\n  getPopupDetailsData() {\n    let formData = new FormData(this.popupDetails);\n    return Object.fromEntries([...formData.entries()].map(entry => [entry[0], entry[1]]));\n  }\n\n  create(parent, attributes = {}, tagName = \"div\") {\n    let el = document.createElement(tagName);\n\n    for (let key in attributes) el[key] = attributes[key];\n\n    parent.appendChild(el);\n    return el;\n  }\n  /**\r\n   * Scripts\r\n   * */\n\n\n  getBannedScriptRules() {\n    let data = this.getData();\n    this.bannedScriptRules = [];\n    Object.keys(_rules_json__WEBPACK_IMPORTED_MODULE_0__).filter(k => data[k] && data[k] != \"true\").filter(k => _rules_json__WEBPACK_IMPORTED_MODULE_0__[k].scripts).map(k => this.bannedScriptRules = [...this.bannedScriptRules, ..._rules_json__WEBPACK_IMPORTED_MODULE_0__[k].scripts]);\n  }\n\n  isScriptBanned(script) {\n    return this.bannedScriptRules.filter(rule => {\n      if (script.src) return script.src.match(rule);else return script.innerHTML.match(rule);\n    }).length > 0;\n  }\n  /**\r\n   * Cookies\r\n   */\n\n  /** \r\n   * MISC \r\n   * */\n\n\n  observe() {\n    new MutationObserver(mutations => {\n      ;\n      [...mutations].map(m => {\n        ;\n        [...m.addedNodes].filter(n => n.tagName == \"SCRIPT\").map(n => {\n          if (this.isScriptBanned(n)) n.type = \"javascript/blocked\";\n        });\n      });\n    }).observe(document.head, {\n      attributes: true,\n      childList: true,\n      subtree: true\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/cookie-consent.js?");

/***/ }),

/***/ "./src/cookies.js":
/*!************************!*\
  !*** ./src/cookies.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cookies; });\nclass Cookies {\n  static getAll() {\n    let cookies = document.cookie;\n    if (!cookies) return {};\n    let res = {};\n    cookies.split(';').map(strCookie => {\n      let splitted = strCookie.split('=');\n      let key = splitted[0].trim().replace(/\\\"/gs, '');\n      let value = splitted[1];\n      return res[key] = value;\n    });\n    return res;\n  }\n\n  static get(key) {\n    let value = Cookies.getAll()[key];\n    if (!value) return null;\n    return JSON.parse(value);\n  }\n\n  static set(key, value, expires = 864000000000000, path = null) {\n    let cookie = `${key}=${JSON.stringify(value)};expires=${new Date(expires).toUTCString()}`;\n    if (path) cookie += `;path=${path}`;\n    document.cookie = cookie;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/cookies.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie_consent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie-consent */ \"./src/cookie-consent.js\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/style.scss */ \"./scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\nwindow.CookieConsent = new _cookie_consent__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lang sync recursive ^\\.\\/.*$":
/*!********************************!*\
  !*** ./src/lang sync ^\.\/.*$ ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./en.json\": \"./src/lang/en.json\",\n\t\"./fr.json\": \"./src/lang/fr.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/lang sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./src/lang_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/lang.js":
/*!*********************!*\
  !*** ./src/lang.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Lang; });\nclass Lang {\n  static get defaultLang() {\n    return \"en\";\n  }\n\n  static init() {\n    var context = __webpack_require__(\"./src/lang sync recursive ^\\\\.\\\\/.*$\");\n\n    var files = {};\n    context.keys().forEach(filename => {\n      let lang = filename.replace(/\\.json/, \"\").replace('./', \"\");\n      files[lang] = context(filename);\n    });\n    Lang.translations = files[Lang.getLocale()] || {};\n    Lang.defaultTranslations = files[Lang.defaultLang];\n    Lang.translations = Object.assign(Lang.defaultTranslations, Lang.translations);\n  }\n\n  static set defaultTranslations(value) {\n    window._frontendedit_default_lang = value;\n  }\n\n  static get defaultTranslations() {\n    return window._frontendedit_default_lang;\n  }\n\n  static set translations(value) {\n    window._frontendedit_lang = value;\n  }\n\n  static get translations() {\n    return window._frontendedit_lang;\n  }\n\n  static getLocale() {\n    return navigator.language.replace(/-.*?$/, \"\");\n  }\n\n  static get(key = null) {\n    if (!key) return Lang.translations;\n    if (!Lang.translations[key]) return Lang.defaultTranslations[key];\n    return Lang.translations[key];\n  }\n\n}\nLang.init();\n\n//# sourceURL=webpack:///./src/lang.js?");

/***/ }),

/***/ "./src/lang/en.json":
/*!**************************!*\
  !*** ./src/lang/en.json ***!
  \**************************/
/*! exports provided: cookies, accept, deny, acceptAll, denyAll, customize, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"cookies\\\":\\\"cookies\\\",\\\"accept\\\":\\\"Accept\\\",\\\"deny\\\":\\\"Deny\\\",\\\"acceptAll\\\":\\\"Accept all\\\",\\\"denyAll\\\":\\\"Deny all\\\",\\\"customize\\\":\\\"Customize\\\"}\");\n\n//# sourceURL=webpack:///./src/lang/en.json?");

/***/ }),

/***/ "./src/lang/fr.json":
/*!**************************!*\
  !*** ./src/lang/fr.json ***!
  \**************************/
/*! exports provided: cookies, accept, deny, allow, disallow, allowAll, disallowAll, acceptAll, denyAll, customize, popupTitle, popupDisclaimer, legalNotice, popupDetailsTitle, popupDetailsDisclaimer, functionnal, google, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"cookies\\\":\\\"cookies\\\",\\\"accept\\\":\\\"Accepter\\\",\\\"deny\\\":\\\"Refuser\\\",\\\"allow\\\":\\\"Autoriser\\\",\\\"disallow\\\":\\\"Interdire\\\",\\\"allowAll\\\":\\\"Autoriser tout\\\",\\\"disallowAll\\\":\\\"Interdire tout\\\",\\\"acceptAll\\\":\\\"Accepter tout\\\",\\\"denyAll\\\":\\\"Refuser tout\\\",\\\"customize\\\":\\\"Personnaliser\\\",\\\"popupTitle\\\":\\\"Paramètres des cookies\\\",\\\"popupDisclaimer\\\":\\\"Ce site utilise des cookies et vous donne le contrôle sur ceux que vous souhaitez activer\\\",\\\"legalNotice\\\":\\\"Politique de confidentialité\\\",\\\"popupDetailsTitle\\\":\\\"Panneau de gestion des cookies\\\",\\\"popupDetailsDisclaimer\\\":\\\"En autorisant ces services tiers, vous acceptez le dépôt et la lecture de cookies et l'utilisation de technologies de suivi nécessaires à leur bon fonctionnement.\\\",\\\"functionnal\\\":{\\\"name\\\":\\\"Cookies fonctionnels\\\",\\\"description\\\":\\\"\\\"},\\\"google\\\":{\\\"name\\\":\\\"Google\\\",\\\"description\\\":\\\"Bliblou\\\"}}\");\n\n//# sourceURL=webpack:///./src/lang/fr.json?");

/***/ }),

/***/ "./src/rules.json":
/*!************************!*\
  !*** ./src/rules.json ***!
  \************************/
/*! exports provided: functionnal, google, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"functionnal\\\":{\\\"mandatory\\\":true},\\\"google\\\":{\\\"scripts\\\":[\\\"analytics\\\",\\\"google\\\",\\\"gtag\\\"],\\\"cookies\\\":[\\\"^_ga\\\",\\\"^_gid\\\"]}}\");\n\n//# sourceURL=webpack:///./src/rules.json?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Utils; });\nclass Utils {\n  static DOMLoaded() {\n    return new Promise(res => {\n      if (!document.body) document.addEventListener('DOMContentLoaded', () => {\n        res();\n      });else res();\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });