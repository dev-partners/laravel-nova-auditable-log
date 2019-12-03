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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {
    Vue.component('auditable-log', __webpack_require__(2));
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['resourceName', 'resourceId', 'field'],

    data: function data() {
        return {
            audits: [],
            displayAudits: false,
            pagination: {}
        };
    },
    mounted: function mounted() {
        if (this.displayAudits === true) {
            this.fetchAudits();
        }
    },


    methods: {
        showAndFetch: function showAndFetch() {
            this.displayAudits = true;
            this.fetchAudits();
        },
        fetchAudits: function fetchAudits() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var vm = this;

            if (!page) {
                page = '/nova-vendor/auditable-log/audits/' + vm.resourceName + '/' + vm.resourceId;
            }

            Nova.request().get(page).then(function (_ref) {
                var data = _ref.data;

                vm.audits = data.audits.data;
                vm.pagination = data.audits;
            }).catch(function () {});
        },
        formatData: function formatData(values) {
            var vm = this;
            var returned = [];

            for (var property in values) {
                if (values.hasOwnProperty(property)) {
                    returned.push({ name: property, value: values[property] });
                }
            }

            return returned;
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("hr", { staticClass: "border-t-2 border-50 my-11" }),
    _vm._v(" "),
    _vm.displayAudits
      ? _c("div", [
          _c("h2", { staticClass: "mb-3 text-90 font-normal text-2xl" }, [
            _vm._v("Audit Log")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card" }, [
            _c(
              "table",
              {
                staticClass: "table w-full",
                attrs: {
                  cellpadding: "0",
                  cellspacing: "0",
                  "data-testid": "resource-table"
                }
              },
              [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.audits, function(audit) {
                    return _c("tr", [
                      _c("td", [
                        audit.event === "created"
                          ? _c(
                              "svg",
                              {
                                staticClass:
                                  "h-6 text-60 svg-inline--fa fa-save fa-w-14",
                                attrs: {
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fas",
                                  "data-icon": "save",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 448 512"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d:
                                      "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"
                                  }
                                })
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        audit.event === "updated"
                          ? _c(
                              "svg",
                              {
                                staticClass:
                                  "h-6 text-60 svg-inline--fa fa-save fa-w-14",
                                attrs: {
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fas",
                                  "data-icon": "save",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 448 512"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d:
                                      "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"
                                  }
                                })
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        audit.event === "deleted"
                          ? _c(
                              "svg",
                              {
                                staticClass:
                                  "h-6 text-60 svg-inline--fa fa-trash-alt fa-w-14",
                                attrs: {
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fas",
                                  "data-icon": "trash-alt",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 448 512"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d:
                                      "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                  }
                                })
                              ]
                            )
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(audit.user ? audit.user.name : "console") +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(audit.event) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(audit.created_at) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "td",
                        _vm._l(_vm.formatData(audit.old_values), function(
                          old_value
                        ) {
                          return _c("div", { staticClass: "my-2" }, [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "inline-block bg-30 p-1 rounded-sm mr-2"
                              },
                              [_vm._v(_vm._s(old_value.name))]
                            ),
                            _vm._v(
                              " " +
                                _vm._s(old_value.value) +
                                "\n                        "
                            )
                          ])
                        }),
                        0
                      ),
                      _vm._v(" "),
                      _c(
                        "td",
                        _vm._l(_vm.formatData(audit.new_values), function(
                          new_value
                        ) {
                          return _c("div", { staticClass: "my-2" }, [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "inline-block bg-30 p-1 rounded-sm mr-2"
                              },
                              [_vm._v(_vm._s(new_value.name))]
                            ),
                            _vm._v(
                              " " +
                                _vm._s(new_value.value) +
                                "\n                        "
                            )
                          ])
                        }),
                        0
                      )
                    ])
                  }),
                  0
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "bg-20 rounded-b",
                attrs: {
                  "per-page": "5",
                  "resource-count-label": "1-3 of 3",
                  "current-resource-count": "3",
                  "all-matching-resource-count": "3"
                }
              },
              [
                _c(
                  "nav",
                  { staticClass: "flex justify-between items-center" },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-link py-3 px-4 text-80",
                        class: {
                          "opacity-50": _vm.pagination.prev_page_url === null,
                          "text-primary": _vm.pagination.prev_page_url !== null
                        },
                        attrs: {
                          disabled: _vm.pagination.prev_page_url === null,
                          rel: "prev",
                          dusk: "previous"
                        },
                        on: {
                          click: function($event) {
                            return _vm.fetchAudits(_vm.pagination.prev_page_url)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                        Previous\n                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-sm text-80 px-4" }, [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.pagination.from) +
                          "-" +
                          _vm._s(_vm.pagination.to) +
                          " of " +
                          _vm._s(_vm.pagination.total) +
                          "\n            "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-link py-3 px-4 text-80",
                        class: {
                          "opacity-50": _vm.pagination.next_page_url === null,
                          "text-primary": _vm.pagination.next_page_url !== null
                        },
                        attrs: {
                          disabled: _vm.pagination.next_page_url === null,
                          rel: "next",
                          dusk: "next"
                        },
                        on: {
                          click: function($event) {
                            return _vm.fetchAudits(_vm.pagination.next_page_url)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                        Next\n                    "
                        )
                      ]
                    )
                  ]
                )
              ]
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.displayAudits === false
      ? _c(
          "button",
          {
            staticClass: "btn btn-default btn-primary",
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.showAndFetch($event)
              }
            }
          },
          [_vm._v("View\n        Audit Log\n    ")]
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th"),
        _vm._v(" "),
        _c("th", { staticClass: "text-left" }, [
          _c("span", [_vm._v(" User ")])
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-left" }, [
          _c("span", [_vm._v(" Event ")])
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-left" }, [
          _c("span", [_vm._v(" Date/Time ")])
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-left" }, [
          _c("span", [_vm._v(" Old Values ")])
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-left" }, [
          _c("span", [_vm._v(" New Values ")])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);