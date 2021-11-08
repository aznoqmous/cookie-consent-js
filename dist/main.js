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

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".cookie-consent-popup,\\n.cookie-consent-popup-details {\\n  font-size: 1rem;\\n  z-index: 1000000000;\\n  font-family: sans-serif;\\n}\\n.cookie-consent-popup button,\\n.cookie-consent-popup-details button {\\n  padding: 0.4rem 0.6rem;\\n  cursor: pointer;\\n}\\n.cookie-consent-popup .buttons,\\n.cookie-consent-popup-details .buttons {\\n  display: flex;\\n  margin: 0.2rem 0;\\n}\\n.cookie-consent-popup .buttons > *:not(:first-child),\\n.cookie-consent-popup-details .buttons > *:not(:first-child) {\\n  margin-left: 0.5rem;\\n}\\n\\n.cookie-consent-popup {\\n  position: fixed;\\n  left: 0;\\n  bottom: 0;\\n  padding: 1rem;\\n  display: flex;\\n  flex-direction: column;\\n}\\n.cookie-consent-popup > .disclaimer,\\n.cookie-consent-popup > .buttons {\\n  margin-bottom: 0.5rem;\\n}\\n.cookie-consent-popup figure {\\n  height: 1.5rem;\\n  width: 1.5rem;\\n  position: relative;\\n  overflow: hidden;\\n  margin: 0;\\n  cursor: pointer;\\n  user-select: none;\\n}\\n.cookie-consent-popup figure img {\\n  transform: translate(0, -1.5rem);\\n}\\n.cookie-consent-popup:not(.active) > div, .cookie-consent-popup:not(.active) > a {\\n  display: none;\\n}\\n.cookie-consent-popup.active {\\n  background-color: #fff;\\n  border-radius: 0.2rem;\\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\\n}\\n.cookie-consent-popup.active > div,\\n.cookie-consent-popup.active > a {\\n  display: flex;\\n}\\n.cookie-consent-popup.active figure {\\n  display: none;\\n}\\n\\n.cookie-consent-popup-details {\\n  position: fixed;\\n  left: 0;\\n  top: 0;\\n  width: 100vw;\\n  height: 100vh;\\n  background: rgba(0, 0, 0, 0.5);\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  opacity: 0;\\n  pointer-events: none;\\n}\\n.cookie-consent-popup-details.active {\\n  opacity: 1;\\n  pointer-events: all;\\n}\\n.cookie-consent-popup-details form {\\n  border-radius: 0.2rem;\\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\\n  padding: 1rem;\\n  background-color: #fff;\\n  max-width: 40rem;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\n@media (max-width: 720px) {\\n  .cookie-consent-popup-details form {\\n    max-width: calc(100vw - 4rem);\\n  }\\n}\\n.cookie-consent-popup-details form > strong,\\n.cookie-consent-popup-details form > .disclaimer,\\n.cookie-consent-popup-details form > .buttons,\\n.cookie-consent-popup-details form > a {\\n  text-align: center;\\n  margin-bottom: 1rem;\\n}\\n.cookie-consent-popup-details form .services {\\n  display: flex;\\n  flex-direction: column;\\n  width: 100%;\\n  text-align: left;\\n}\\n.cookie-consent-popup-details form .services .service {\\n  display: flex;\\n  justify-content: space-between;\\n  margin-bottom: 0.5rem;\\n}\\n.cookie-consent-popup-details form .services .service button {\\n  opacity: 0.5;\\n  width: 5rem;\\n}\\n.cookie-consent-popup-details form .services .service button.active {\\n  opacity: 1;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./scss/style.scss?");

/***/ }),

/***/ "./src/cookie-consent.js":
/*!*******************************!*\
  !*** ./src/cookie-consent.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CookieConsent; });\n/* harmony import */ var _rules_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules.json */ \"./src/rules.json\");\nvar _rules_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./rules.json */ \"./src/rules.json\", 1);\n/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cookies */ \"./src/cookies.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _lang_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lang.js */ \"./src/lang.js\");\n/* harmony import */ var _cookie_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cookie.svg */ \"./src/cookie.svg\");\n/* harmony import */ var _cookie_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_cookie_svg__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nclass CookieConsent {\n  static get key() {\n    return \"cookie_consent\";\n  }\n\n  constructor() {\n    this.config = {\n      services: [\"google\", \"facebook\"],\n      title: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"popupTitle\"),\n      disclaimer: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"popupDisclaimer\"),\n      legalNoticeText: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('legalNotice'),\n      legalNoticeUrl: \"/mentions-legales\",\n      // to override \n      popupDetailsTitle: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('popupDetailsTitle'),\n      popupDetailsDisclaimer: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('popupDetailsDisclaimer'),\n      cookieColor: 'black'\n    };\n    this.defaultServices = Object.fromEntries(this.config.services.map(s => [s, false]));\n    this.defaultServices.functionnal = true;\n    this.getBannedScriptRules();\n    this.getBannedCookieRules();\n    this.observe();\n    this.overrideCookieSetter();\n  }\n\n  init(config) {\n    this.config = Object.assign(this.config, config);\n    _utils_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].DOMLoaded().then(() => {\n      this.buildPopup();\n    });\n  }\n  /**\r\n   * Data\r\n   */\n\n\n  getData() {\n    return Object.assign(this.defaultServices, JSON.parse(_cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(CookieConsent.key)));\n  }\n\n  saveData(data) {\n    _cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].set(CookieConsent.key, JSON.stringify(data));\n  }\n\n  isDataSet() {\n    return !!_cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(CookieConsent.key);\n  }\n  /**\r\n   * Popup\r\n   */\n\n\n  buildPopup() {\n    this.popup = this.create(document.body, {\n      className: \"cookie-consent-popup\"\n    }, \"div\");\n    if (!this.isDataSet()) this.popup.classList.add('active');\n    let cookieFigure = this.create(this.popup, {}, \"figure\");\n    let cookieImg = this.create(cookieFigure, {\n      src: _cookie_svg__WEBPACK_IMPORTED_MODULE_4___default.a,\n      style: `filter: drop-shadow(0 1.5rem ${this.config.cookieColor})`\n    }, 'img');\n    let title = this.create(this.popup, {\n      innerHTML: this.config.title\n    });\n    let disclaimer = this.create(this.popup, {\n      innerHTML: this.config.disclaimer,\n      className: \"disclaimer\"\n    });\n    let buttons = this.create(this.popup, {\n      className: \"buttons\"\n    });\n    let acceptAll = this.create(buttons, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('allowAll')\n    }, 'button');\n    let denyAll = this.create(buttons, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('disallowAll')\n    }, 'button');\n    let customize = this.create(buttons, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('customize')\n    }, 'button');\n    acceptAll.addEventListener('click', () => {\n      this.acceptAll();\n    });\n    denyAll.addEventListener('click', () => {\n      this.denyAll();\n    });\n    cookieFigure.addEventListener('click', () => {\n      this.setPopupDetailsActive();\n    });\n    customize.addEventListener('click', () => {\n      this.setPopupDetailsActive();\n    });\n    let legalNotice = this.create(this.popup, {\n      innerHTML: this.config.legalNoticeText,\n      href: this.config.legalNoticeUrl\n    }, \"a\");\n    this.buildDetailsPopup();\n  }\n\n  buildDetailsPopup() {\n    this.popupDetailsContainer = this.create(document.body, {\n      className: \"cookie-consent-popup-details\"\n    }, \"div\");\n    this.popupDetails = this.create(this.popupDetailsContainer, {}, 'form');\n    this.popupDetails.addEventListener('submit', e => {\n      e.preventDefault();\n    });\n    let title = this.create(this.popupDetails, {\n      innerHTML: this.config.popupDetailsTitle\n    }, 'strong');\n    let disclaimer = this.create(this.popupDetails, {\n      innerHTML: this.config.popupDetailsDisclaimer,\n      className: \"disclaimer\"\n    });\n    let buttons = this.create(this.popupDetails, {\n      className: \"buttons\"\n    });\n    let acceptAll = this.create(buttons, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('allowAll')\n    }, 'button');\n    let denyAll = this.create(buttons, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get('disallowAll')\n    }, 'button');\n    acceptAll.addEventListener('click', () => {\n      this.acceptAll();\n    });\n    denyAll.addEventListener('click', () => {\n      this.denyAll();\n    });\n    let services = this.create(this.popupDetails, {\n      className: \"services\"\n    });\n    this.addService('functionnal', services);\n    this.config.services.map(k => {\n      this.addService(k, services);\n    });\n    this.updatePopupDetails();\n    let legalNotice = this.create(this.popupDetails, {\n      innerHTML: this.config.legalNoticeText,\n      href: this.config.legalNoticeUrl\n    }, \"a\");\n  }\n\n  addService(k, parent) {\n    let data = this.getData();\n    let lang = _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(k);\n    let service = this.create(parent, {\n      className: \"service\"\n    });\n    let serviceDetails = this.create(service);\n    this.create(serviceDetails, {\n      innerHTML: lang.name\n    }, 'strong');\n    this.create(serviceDetails, {\n      innerHTML: lang.description\n    });\n    let input = this.create(service, {\n      name: k,\n      value: data[k],\n      required: _rules_json__WEBPACK_IMPORTED_MODULE_0__[k].mandatory,\n      type: 'hidden'\n    }, 'input');\n    let buttons = this.create(service, {\n      className: \"buttons\"\n    });\n    let allow = this.create(buttons, {\n      innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"allow\"),\n      disabled: _rules_json__WEBPACK_IMPORTED_MODULE_0__[k].mandatory,\n      className: \"allow\"\n    }, \"button\");\n    allow.addEventListener('click', () => {\n      input.value = true;\n      this.savePopupDetailsData();\n      this.updatePopupDetails();\n    });\n\n    if (!_rules_json__WEBPACK_IMPORTED_MODULE_0__[k].mandatory) {\n      let disallow = this.create(buttons, {\n        innerHTML: _lang_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"disallow\"),\n        className: \"disallow\"\n      }, \"button\");\n      disallow.addEventListener('click', () => {\n        input.value = false;\n        this.savePopupDetailsData();\n        this.updatePopupDetails();\n      });\n    }\n  }\n\n  acceptAll() {\n    [...this.popupDetails.querySelectorAll('.service input[type=\"hidden\"]')].map(input => input.value = true);\n    this.updatePopupDetails();\n    this.savePopupDetailsData();\n    this.popup.classList.remove('active');\n  }\n\n  denyAll() {\n    [...this.popupDetails.querySelectorAll('.service input[type=\"hidden\"]:not([required])')].map(input => input.value = false);\n    this.updatePopupDetails();\n    this.savePopupDetailsData();\n    this.popup.classList.remove('active');\n  }\n\n  updatePopupDetails() {\n    [...this.popupDetails.querySelectorAll('.service')].map(service => {\n      let isAllowed = service.querySelector('input[type=\"hidden\"]').value == \"true\";\n      let allow = service.querySelector('.allow');\n      let disallow = service.querySelector('.disallow');\n\n      if (isAllowed) {\n        allow.classList.add('active');\n        if (disallow) disallow.classList.remove('active');\n      } else {\n        allow.classList.remove('active');\n        if (disallow) disallow.classList.add('active');\n      }\n    });\n  }\n\n  savePopupDetailsData() {\n    let datas = this.getPopupDetailsData();\n    this.saveData(datas);\n    this.getBannedCookieRules();\n    this.deleteBannedCookies();\n  }\n\n  getPopupDetailsData() {\n    let formData = new FormData(this.popupDetails);\n    return Object.fromEntries([...formData.entries()].map(entry => [entry[0], entry[1]]));\n  }\n\n  setPopupDetailsActive() {\n    this.popupDetailsContainer.classList.add('active');\n\n    let hidePopupDetails = e => {\n      if (!this.popupDetails.contains(e.target)) {\n        this.popupDetailsContainer.classList.remove('active');\n        document.removeEventListener('click', hidePopupDetails);\n      }\n    };\n\n    setTimeout(() => {\n      document.addEventListener('click', hidePopupDetails);\n    });\n  }\n\n  create(parent, attributes = {}, tagName = \"div\") {\n    let el = document.createElement(tagName);\n\n    for (let key in attributes) el[key] = attributes[key];\n\n    parent.appendChild(el);\n    return el;\n  }\n  /**\r\n   * Scripts\r\n   * */\n\n\n  getBannedScriptRules() {\n    let data = this.getData();\n    this.bannedScriptRules = [];\n    Object.keys(_rules_json__WEBPACK_IMPORTED_MODULE_0__).filter(k => data && data[k] && data[k] != \"true\").filter(k => _rules_json__WEBPACK_IMPORTED_MODULE_0__[k].scripts).map(k => this.bannedScriptRules = [...this.bannedScriptRules, ..._rules_json__WEBPACK_IMPORTED_MODULE_0__[k].scripts]);\n  }\n\n  isScriptBanned(script) {\n    return this.bannedScriptRules.some(rule => script.src && script.src.match(rule) || script.innerHTML.match(rule));\n  }\n  /**\r\n   * Cookies\r\n   */\n\n\n  getBannedCookieRules() {\n    let data = this.getData();\n    this.bannedCookieRules = [];\n    Object.keys(_rules_json__WEBPACK_IMPORTED_MODULE_0__).filter(k => data && data[k] && data[k] !== \"true\").filter(k => _rules_json__WEBPACK_IMPORTED_MODULE_0__[k].cookies).map(k => this.bannedCookieRules = [...this.bannedCookieRules, ..._rules_json__WEBPACK_IMPORTED_MODULE_0__[k].cookies]);\n  }\n\n  deleteBannedCookies() {\n    Object.keys(_cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getAll()).map(key => {\n      if (this.bannedCookieRules.some(rule => key.match(rule))) _cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove(key, \"/\");\n    });\n  }\n  /** \r\n   * MISC \r\n   * */\n\n\n  observe() {\n    new MutationObserver(mutations => {\n      ;\n      [...mutations].map(m => {\n        ;\n        [...m.addedNodes].filter(n => n.tagName == \"SCRIPT\").map(n => {\n          if (this.isScriptBanned(n)) {\n            n.type = \"javascript/blocked\";\n          }\n        });\n      });\n    }).observe(document.head, {\n      attributes: true,\n      childList: true,\n      subtree: true\n    });\n  }\n\n  overrideCookieSetter() {\n    let cookieSetterOrig = document.__lookupSetter__(\"cookie\");\n\n    let cookieGetterOrig = document.__lookupGetter__(\"cookie\");\n\n    let self = this;\n    this.getBannedCookieRules();\n    Object.defineProperty(document, 'cookie', {\n      set: function (value) {\n        if (!value.match(\"cookie-consent\") && self.bannedCookieRules.some(rule => value.match(rule))) {\n          return;\n        }\n\n        return cookieSetterOrig.apply(document, arguments);\n      },\n      get: function () {\n        return cookieGetterOrig.apply(document);\n      },\n      configurable: true\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/cookie-consent.js?");

/***/ }),

/***/ "./src/cookie.svg":
/*!************************!*\
  !*** ./src/cookie.svg ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml,%3c!-- Generator: Adobe Illustrator 24.1.2, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e %3csvg version='1.1' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 33.9 34' style='enable-background:new 0 0 33.9 34;' xml:space='preserve'%3e %3cpath d='M28.6,15.1v-0.4c0-0.8-0.1-1.5-0.2-2.3C28,11.6,27,11.6,27,11.6h-3.1V10c0-1.5-1.5-1.5-1.5-1.5h-3.1V7 c0-1.5-1.5-1.5-1.5-1.5h-1.5V2.3c0-1.5-1.5-1.5-1.5-1.5c-3.7,0-7.2,1.5-9.9,4.1C2.2,7.5,0.7,11,0.7,14.7c0,3.7,1.5,7.2,4.1,9.8 c2.6,2.6,6.2,4.1,9.9,4.1h0.4c-0.3-1-0.4-2-0.4-3.1v-0.6c-0.4,0.4-0.9,0.6-1.5,0.6c-1.3,0-2.3-1-2.3-2.3c0-1.3,1-2.3,2.3-2.3 c0.9,0,1.7,0.5,2.1,1.3c0.7-2.2,2.1-4.1,3.9-5.4c1.9-1.3,4.1-2.1,6.4-2.1C26.5,14.7,27.6,14.9,28.6,15.1z M6.1,16.2 c-1.3,0-2.3-1-2.3-2.3s1-2.3,2.3-2.3s2.3,1,2.3,2.3S7.4,16.2,6.1,16.2z M10.8,10c-1.3,0-2.3-1-2.3-2.3c0-1.3,1-2.3,2.3-2.3 c1.3,0,2.3,1,2.3,2.3C13.1,9,12,10,10.8,10z M13.9,17.8c-1.3,0-2.3-1-2.3-2.3c0-1.3,1-2.3,2.3-2.3s2.3,1,2.3,2.3 C16.2,16.7,15.1,17.8,13.9,17.8z M31.2,26.4v-1.5l1.7-1.2c0.2-0.2,0.3-0.3,0.2-0.5l-1.5-2.6c0-0.2-0.3-0.2-0.5-0.2l-1.9,0.8 c-0.5-0.3-0.9-0.6-1.4-0.8l-0.3-2c0-0.2-0.2-0.3-0.3-0.3h-3.1c-0.3,0-0.5,0.2-0.5,0.3l-0.3,2c-0.5,0.3-0.8,0.5-1.2,0.8l-1.9-0.8 c-0.2,0-0.3,0-0.5,0.2l-1.5,2.6c0,0.2,0,0.3,0.2,0.5l1.7,1.2v1.5l-1.7,1.2c-0.2,0.2-0.3,0.3-0.2,0.5l1.5,2.6 c0.2,0.2,0.3,0.2,0.5,0.2l1.9-0.8c0.3,0.3,0.8,0.6,1.2,0.8l0.3,2c0.2,0.2,0.3,0.3,0.5,0.3h3.1c0.2,0,0.3-0.2,0.3-0.3l0.3-2 c0.5-0.3,0.8-0.5,1.2-0.8l1.9,0.6c0.2,0,0.3,0,0.5-0.2l1.5-2.6c0.2-0.2,0.2-0.3,0-0.3L31.2,26.4z M25.5,27.8c-1.2,0-2.3-1.1-2.3-2.3 s1.1-2.3,2.3-2.3c1.2,0,2.3,1.1,2.3,2.3S26.7,27.8,25.5,27.8z'/%3e %3c/svg%3e\"\n\n//# sourceURL=webpack:///./src/cookie.svg?");

/***/ }),

/***/ "./src/cookies.js":
/*!************************!*\
  !*** ./src/cookies.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cookies; });\nclass Cookies {\n  static getAll() {\n    let cookies = document.cookie;\n    if (!cookies) return {};\n    let res = {};\n    cookies.split(';').map(strCookie => {\n      let splitted = strCookie.split('=');\n      let key = splitted[0].trim().replace(/\\\"/gs, '');\n      let value = splitted[1];\n      return res[key] = value;\n    });\n    return res;\n  }\n\n  static get(key) {\n    let value = Cookies.getAll()[key];\n    if (!value) return null;\n    return JSON.parse(value);\n  }\n\n  static set(key, value, expires = 864000000000000, path = null) {\n    let cookie = `${key}=${JSON.stringify(value)};expires=${new Date(expires).toUTCString()}`;\n    if (path) cookie += `;path=${path}`;\n    document.cookie = cookie;\n  }\n\n  static remove(key) {\n    // from tarteaucitron\n    document.cookie = key + '=\"cookie-consent\"; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';\n    document.cookie = key + '=\"cookie-consent\"; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';\n    document.cookie = key + '=\"cookie-consent\"; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';\n  }\n\n}\n\n//# sourceURL=webpack:///./src/cookies.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie_consent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie-consent */ \"./src/cookie-consent.js\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/style.scss */ \"./scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\nlet style = document.createElement('style');\nstyle.innerHTML = _scss_style_scss__WEBPACK_IMPORTED_MODULE_1___default.a.toString();\ndocument.head.appendChild(style);\nwindow.CookieConsent = new _cookie_consent__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n//# sourceURL=webpack:///./src/index.js?");

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
/*! exports provided: cookies, accept, deny, allow, disallow, allowAll, disallowAll, acceptAll, denyAll, customize, popupTitle, popupDisclaimer, legalNotice, popupDetailsTitle, popupDetailsDisclaimer, functionnal, google, facebook, youtube, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"cookies\\\":\\\"cookies\\\",\\\"accept\\\":\\\"Accepter\\\",\\\"deny\\\":\\\"Refuser\\\",\\\"allow\\\":\\\"Autoriser\\\",\\\"disallow\\\":\\\"Interdire\\\",\\\"allowAll\\\":\\\"Autoriser tout\\\",\\\"disallowAll\\\":\\\"Interdire tout\\\",\\\"acceptAll\\\":\\\"Accepter tout\\\",\\\"denyAll\\\":\\\"Refuser tout\\\",\\\"customize\\\":\\\"Personnaliser\\\",\\\"popupTitle\\\":\\\"\\\",\\\"popupDisclaimer\\\":\\\"Ce site utilise des cookies et vous donne le contrôle sur ceux que vous souhaitez activer\\\",\\\"legalNotice\\\":\\\"Politique de confidentialité\\\",\\\"popupDetailsTitle\\\":\\\"Panneau de gestion des cookies\\\",\\\"popupDetailsDisclaimer\\\":\\\"En autorisant ces services tiers, vous acceptez le dépôt et la lecture de cookies et l'utilisation de technologies de suivi nécessaires à leur bon fonctionnement.\\\",\\\"functionnal\\\":{\\\"name\\\":\\\"Cookies fonctionnels\\\",\\\"description\\\":\\\"Ce site utilise des cookies nécessaires à son bon fonctionnement.<br>Ils ne peuvent pas être désactivés.\\\"},\\\"google\\\":{\\\"name\\\":\\\"Google Analytics\\\",\\\"description\\\":\\\"Ces cookies servent à générer des statistiques de fréquentation du site.\\\"},\\\"facebook\\\":{\\\"name\\\":\\\"Facebook Pixel\\\",\\\"description\\\":\\\"Ces cookies permettent de faciliter le partage de contenu sur les réseaux sociaux.\\\"},\\\"youtube\\\":{\\\"name\\\":\\\"Youtube\\\",\\\"description\\\":\\\"Ces cookies sont utilisés par YouTube pour permettre à l'utilisateur de visualiser directement sur le site le contenu multimédia.\\\"}}\");\n\n//# sourceURL=webpack:///./src/lang/fr.json?");

/***/ }),

/***/ "./src/rules.json":
/*!************************!*\
  !*** ./src/rules.json ***!
  \************************/
/*! exports provided: functionnal, google, facebook, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"functionnal\\\":{\\\"mandatory\\\":true},\\\"google\\\":{\\\"scripts\\\":[\\\"analytics\\\",\\\"google\\\",\\\"gtag\\\"],\\\"cookies\\\":[\\\"^_utm\\\",\\\"^_ga\\\",\\\"^_gid\\\"]},\\\"facebook\\\":{\\\"script\\\":[\\\"fbq\\\"],\\\"cookies\\\":[\\\"^_fb\\\"]}}\");\n\n//# sourceURL=webpack:///./src/rules.json?");

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