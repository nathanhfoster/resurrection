;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory(require("react"))
  else if (typeof define === "function" && define.amd)
    define(["react"], factory)
  else if (typeof exports === "object")
    exports["resurrection"] = factory(require("react"))
  else root["resurrection"] = factory(root["React"])
})(typeof self !== "undefined" ? self : this, function (
  __WEBPACK_EXTERNAL_MODULE_2__
) {
  return /******/ (function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ) // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          /******/ configurable: false,
          /******/ enumerable: true,
          /******/ get: getter,
          /******/
        })
        /******/
      }
      /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function (module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module["default"]
            }
          : /******/ function getModuleExports() {
              return module
            }
      /******/ __webpack_require__.d(getter, "a", getter)
      /******/ return getter
      /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = "/" // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 0))
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(1)

        /***/
      },
      /* 1 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        Object.defineProperty(exports, "__esModule", {
          value: true,
        })
        exports.connect = exports.Contux = undefined

        var _extends =
          Object.assign ||
          function (target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i]
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key]
                }
              }
            }
            return target
          }

        var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i]
              descriptor.enumerable = descriptor.enumerable || false
              descriptor.configurable = true
              if ("value" in descriptor) descriptor.writable = true
              Object.defineProperty(target, descriptor.key, descriptor)
            }
          }
          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps)
            if (staticProps) defineProperties(Constructor, staticProps)
            return Constructor
          }
        })()

        var _react = __webpack_require__(2)

        var _react2 = _interopRequireDefault(_react)

        var _shallowEquals = __webpack_require__(3)

        var _shallowEquals2 = _interopRequireDefault(_shallowEquals)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        function _objectWithoutProperties(obj, keys) {
          var target = {}
          for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
            target[i] = obj[i]
          }
          return target
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function")
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          }
          return call &&
            (typeof call === "object" || typeof call === "function")
            ? call
            : self
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof superClass
            )
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true,
              },
            }
          )
          if (superClass)
            Object.setPrototypeOf
              ? Object.setPrototypeOf(subClass, superClass)
              : (subClass.__proto__ = superClass)
        }

        var CurrentContext = (0, _react.createContext)()

        var Contux = (function (_React$PureComponent) {
          _inherits(Contux, _React$PureComponent)

          function Contux(props) {
            _classCallCheck(this, Contux)

            var _this = _possibleConstructorReturn(
              this,
              (Contux.__proto__ || Object.getPrototypeOf(Contux)).call(
                this,
                props
              )
            )

            _this.state = {
              currentState: props.initialState,
            }

            if (props.reducer && typeof props.reducer === "function") {
              _this.state.currentState = props.reducer(
                _this.state.currentState,
                {
                  action: "@resurrection/INIT",
                }
              )
            }

            _this.getState = _this.getState.bind(_this)
            _this.dispatch = _this.dispatch.bind(_this)
            return _this
          }

          _createClass(Contux, [
            {
              key: "getState",
              value: function getState() {
                return this.state.currentState
              },
            },
            {
              key: "dispatch",
              value: function dispatch(action) {
                var reducer = this.props.reducer
                var currentState = this.state.currentState

                if (reducer) {
                  var newState = reducer(currentState, action)
                  if (!(0, _shallowEquals2.default)(newState, currentState)) {
                    this.setState({ currentState: newState })
                  }
                }
              },
            },
            {
              key: "render",
              value: function render() {
                var children = this.props.children
                var getState = this.getState,
                  dispatch = this.dispatch

                return _react2.default.createElement(
                  CurrentContext.Provider,
                  {
                    value: {
                      getState: getState,
                      dispatch: dispatch,
                    },
                  },
                  children
                )
              },
            },
          ])

          return Contux
        })(_react2.default.PureComponent)

        Contux.defaultProps = {
          initialState: undefined,
          reducer: function reducer() {},
        }

        var connect = function connect() {
          var mapStateToProps =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : function (currentState) {
                  return currentState
                }
          return function (Component) {
            return function (_ref) {
              var children = _ref.children,
                restProps = _objectWithoutProperties(_ref, ["children"])

              return _react2.default.createElement(
                CurrentContext.Consumer,
                null,
                function (_ref2) {
                  var getState = _ref2.getState,
                    dispatch = _ref2.dispatch
                  return _react2.default.createElement(
                    Component,
                    _extends(
                      {},
                      restProps,
                      mapStateToProps(getState(), restProps),
                      {
                        dispatch: dispatch,
                      }
                    ),
                    children
                  )
                }
              )
            }
          }
        }

        exports.default = Contux
        exports.Contux = Contux
        exports.connect = connect

        /***/
      },
      /* 2 */
      /***/ function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_2__

        /***/
      },
      /* 3 */
      /***/ function (module, exports) {
        module.exports = shallow

        function shallow(a, b, compare) {
          var aIsNull = a === null
          var bIsNull = b === null

          if (aIsNull !== bIsNull) return false

          var aIsArray = Array.isArray(a)
          var bIsArray = Array.isArray(b)

          if (aIsArray !== bIsArray) return false

          var aTypeof = typeof a
          var bTypeof = typeof b

          if (aTypeof !== bTypeof) return false
          if (flat(aTypeof)) return compare ? compare(a, b) : a === b

          return aIsArray
            ? shallowArray(a, b, compare)
            : shallowObject(a, b, compare)
        }

        function shallowArray(a, b, compare) {
          var l = a.length
          if (l !== b.length) return false

          if (compare) {
            for (var i = 0; i < l; i++) if (!compare(a[i], b[i])) return false
          } else {
            for (var i = 0; i < l; i++) {
              if (a[i] !== b[i]) return false
            }
          }

          return true
        }

        function shallowObject(a, b, compare) {
          var ka = 0
          var kb = 0

          if (compare) {
            for (var key in a) {
              if (a.hasOwnProperty(key) && !compare(a[key], b[key]))
                return false

              ka++
            }
          } else {
            for (var key in a) {
              if (a.hasOwnProperty(key) && a[key] !== b[key]) return false

              ka++
            }
          }

          for (var key in b) {
            if (b.hasOwnProperty(key)) kb++
          }

          return ka === kb
        }

        function flat(type) {
          return type !== "function" && type !== "object"
        }

        /***/
      },
      /******/
    ]
  )
})
