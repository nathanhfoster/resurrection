/*! For license information please see main.873f0cb9.chunk.js.LICENSE.txt */
(this["webpackJsonpresurrection-example"]=this["webpackJsonpresurrection-example"]||[]).push([[0],{10:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),c=r(2),u=r.n(c),a=r(1);function i(e,t){return e(t={exports:{}},t.exports),t.exports}var f="function"===typeof Symbol&&Symbol.for,s=f?Symbol.for("react.element"):60103,l=f?Symbol.for("react.portal"):60106,p=f?Symbol.for("react.fragment"):60107,y=f?Symbol.for("react.strict_mode"):60108,b=f?Symbol.for("react.profiler"):60114,d=f?Symbol.for("react.provider"):60109,m=f?Symbol.for("react.context"):60110,O=f?Symbol.for("react.async_mode"):60111,v=f?Symbol.for("react.concurrent_mode"):60111,j=f?Symbol.for("react.forward_ref"):60112,h=f?Symbol.for("react.suspense"):60113,S=f?Symbol.for("react.suspense_list"):60120,g=f?Symbol.for("react.memo"):60115,E=f?Symbol.for("react.lazy"):60116,w=f?Symbol.for("react.block"):60121,C=f?Symbol.for("react.fundamental"):60117,T=f?Symbol.for("react.responder"):60118,P=f?Symbol.for("react.scope"):60119;function _(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case s:switch(e=e.type){case O:case v:case p:case b:case y:case h:return e;default:switch(e=e&&e.$$typeof){case m:case j:case E:case g:case d:return e;default:return t}}case l:return t}}}function $(e){return _(e)===v}var M={AsyncMode:O,ConcurrentMode:v,ContextConsumer:m,ContextProvider:d,Element:s,ForwardRef:j,Fragment:p,Lazy:E,Memo:g,Portal:l,Profiler:b,StrictMode:y,Suspense:h,isAsyncMode:function(e){return $(e)||_(e)===O},isConcurrentMode:$,isContextConsumer:function(e){return _(e)===m},isContextProvider:function(e){return _(e)===d},isElement:function(e){return"object"===typeof e&&null!==e&&e.$$typeof===s},isForwardRef:function(e){return _(e)===j},isFragment:function(e){return _(e)===p},isLazy:function(e){return _(e)===E},isMemo:function(e){return _(e)===g},isPortal:function(e){return _(e)===l},isProfiler:function(e){return _(e)===b},isStrictMode:function(e){return _(e)===y},isSuspense:function(e){return _(e)===h},isValidElementType:function(e){return"string"===typeof e||"function"===typeof e||e===p||e===v||e===b||e===y||e===h||e===S||"object"===typeof e&&null!==e&&(e.$$typeof===E||e.$$typeof===g||e.$$typeof===d||e.$$typeof===m||e.$$typeof===j||e.$$typeof===C||e.$$typeof===T||e.$$typeof===P||e.$$typeof===w)},typeOf:_},x=(i((function(e,t){0})),i((function(e){e.exports=M})),Object.getOwnPropertySymbols),k=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;function F(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}})()&&Object.assign;var A="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function L(e,t,r,n,o){}L.resetWarningCache=function(){0};Function.call.bind(Object.prototype.hasOwnProperty);function I(){}function N(){}N.resetWarningCache=I;var q=i((function(e){e.exports=function(){function e(e,t,r,n,o,c){if(c!==A){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:N,resetWarningCache:I};return r.PropTypes=r,r}()})),z=function(){return Math.random().toString(36).substring(7).split("").join(".")},K=(z(),z(),function(e,t){if("object"!==typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+".");return Object.entries(e).reduce((function(e,r){var n=r[0],o=r[1];return e[n]=function(e){return function(t){return function(){for(var r,n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return e((null===t||void 0===t||null===(r=t.apply)||void 0===r?void 0:r.call(t,void 0,o))||t)}}}(t)(o),e}),{})}),W=function(e){return e instanceof Function||"function"===typeof e},D=function(e){return e};function H(){return(H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var V,B,J=function(e,t){return H({},e&&H({},e),t&&H({},t))},U=function(e,t){return J(e,t)},Y=function(e,t){if(e===t)return!0;if(!e&&!t)return!0;for(var r=Object.keys(e),n=0;n<r.length;n++){var o=r[n];if(!(o in t)||e[o]!==t[o])return!1}for(var c=Object.keys(t),u=0;u<c.length;u++){var a=c[u];if(!(a in e)||e[a]!==t[a])return!1}return!0},X=function(e){var t=Object(n.useRef)(null);return function(){var r=t.current;if(null!==r)return r;var n=e();return t.current=n,n}()},G=U,Q={isReady:!1,dispatch:function(){throw Error("Store is NOT ready!")},getState:function(){throw Error("Store is NOT ready!")}},Z=Object(n.createContext)(null),ee=function(e){e.name;var t=e.context,r=e.reducers,c=e.initialState,u=e.props,a=e.initializer,i=e.children,f=Object(n.useCallback)((function(){return function(e,t){if(W(e))return[t||{},e];var r,n=function(t,r){for(var n=!1,o={},c=0;c<e.length;c++){var u=e[c];if(Object.prototype.hasOwnProperty.call(e,u)){var a=t[u],i=(0,e[u])(a,r);n=n||i!==a,o[u]=i}}return n?o:t};t?r=[t,n]:r=[Object.entries(e).reduce((function(e,t){var r=t[0],n=t[1];if(!W(n))throw new Error(n+" is not a function");return e[r]=n(void 0,{type:"__@@PLACEHOLDER_ACTION__"}),e}),{}),n];return r}(r,c)}),[]),s=X(f),l=s[0],p=function(e,t,r,o){void 0===r&&(r=D);var c=Object(n.useCallback)((function(){return J(t,o)}),[]),u=X(c),a=Object(n.useReducer)(G,u,r),i=a[0],f=a[1],s=Object(n.useRef)(i),l=Object(n.useCallback)((function(){return s.current}),[s]),p=Object(n.useCallback)((function(e){var t=J(e,o);s.current=t,f(t)}),[o,f]),y=Object(n.useCallback)((function(t){return e(l(),t)}),[e,l]),b=Object(n.useCallback)((function(e){return W(e)?e(b,l):p(y(e))}),[l,p,y]);return Object(n.useEffect)((function(){s.current&&(s.current=J(s.current,o),f(o))}),[o]),[i,b]}(s[1],l,a,u),y=p[0],b=p[1];Object(n.useLayoutEffect)((function(){return Q.isReady||(Q.isReady=!0,Q.dispatch=b,Q.getState=function(){return y}),function(){Q.isReady=!1}}),[y,b]);var d=Object(n.useMemo)((function(){return{state:y,dispatch:b}}),[y,b]),m=Object(n.useRef)(!1);return Object(n.useLayoutEffect)((function(){"undefined"!==typeof window&&window._REACT_CONTEXT_DEVTOOL,m.current}),[d]),o.a.createElement(t.Provider,{value:d},i)};ee.propTypes={name:q.oneOfType([q.string,q.number]),context:q.shape({}),reducers:q.oneOfType([q.func,q.objectOf(q.func)]),initialState:q.shape({}),props:q.shape({}),initializer:q.func,children:q.oneOfType([q.string,q.element,q.node,q.func,q.symbol,q.object,q.elementType,q.arrayOf(q.node),q.arrayOf(q.element),q.arrayOf(q.node),q.arrayOf(q.func),q.arrayOf(q.symbol),q.arrayOf(q.object),q.arrayOf(q.elementType)]).isRequired},ee.defaultProps={name:(V=0,B=1e3,Math.floor(Math.random()*(B-V+1))+V),context:Z,reducers:U,initializer:D,initialState:void 0,props:void 0};o.a.memo(ee,Y);var te,re,ne,oe,ce=function(e){var t=Object(n.useRef)(e);return Object(n.useEffect)((function(){return t.current=e,function(){t.current=void 0}})),t.current},ue=(te=function(e){return{someKeyFromMyStore:e.someKeyFromMyStore}},function(e){var t=oe||{},r=t.context,c=void 0===r?Z:r,u=t.pure,a=void 0===u||u,i=t.areStatePropsEqual,f=void 0===i?Y:i,s=t.areMergedPropsEqual,l=void 0===s?Y:s,p=!0===a?Object(n.memo)(e,f):e;return function(e){var t=Object(n.useContext)(c),r=t.state,u=t.dispatch,i=Object(n.useMemo)((function(){return W(te)?te(r,e):{}}),[r,e]),f=Object(n.useMemo)((function(){return re?W(re)?re(u):K(re,u):{}}),[u]),s=ce(ne),y=Object(n.useCallback)((function(e,t,r){var n=function(n){return W(n)?n(e,t,r):H({},r,e,t)},o=n(ne);return!a||s&&!l(o,s)?o:n(s)}),[s]),b=Object(n.useMemo)((function(){return y(i,f,e)}),[e,y,i,f]);return o.a.createElement(p,H({},b,{dispatch:u}))}})((function(e){var t=e.someKeyFromMyStore;return o.a.createElement("div",null,t)})),ae={someKeyFromMyStore:"Hello World"},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0,r=t.type,n=t.payload;switch(r){case"SOME_ACTION_TYPE":return Object(a.a)(Object(a.a)({},e),{},{someKeyFromMyStore:n});default:return e}},fe=function(){return o.a.createElement(ee,{reducers:ie},o.a.createElement(ue,null))};u.a.render(o.a.createElement(fe,null),document.getElementById("root"))},3:function(e,t,r){e.exports=r(10)}},[[3,1,2]]]);
//# sourceMappingURL=main.873f0cb9.chunk.js.map