!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n={mode:"production",name:"@semibold/browser-storage",version:"1.0.3",gitHash:"c0c77fe",lastModified:"2018-08-03T01:59:17.750Z"};r.d(t,"BrowserStorage",function(){return o});var o=function(){function e(e,t){void 0===t&&(t={}),this.areaName=e,this.options=t,this.storage=self[e],this.prefix=this.options.prefix||"",this.parse=this.options.parse||function(e){return JSON.parse(e)},this.stringify=this.options.stringify||function(e){return JSON.stringify(e)}}return Object.defineProperty(e,"metadata",{get:function(){return n},enumerable:!0,configurable:!0}),e.prototype.available=function(){try{var e="__storage_test__";this.storage.setItem(e,e);var t=this.storage.getItem(e)===e;return this.storage.removeItem(e),t}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==this.storage.length}},e.prototype.get=function(e){var t=this,r={};if(null===e)for(var n=0;n<this.storage.length;n++){var o=this.storage.key(n);if(null!=o&&o.slice(0,this.prefix.length)===this.prefix){var i=this.storage.getItem(o);null!=i&&(r[o.slice(this.prefix.length)]=this.parse(i))}}else if("string"==typeof e||Array.isArray(e)){(Array.isArray(e)?e:[e]).forEach(function(e){var n=t.prefix+e,o=t.storage.getItem(n);null!=o&&(r[e]=t.parse(o))})}else Object.keys(e).forEach(function(n){var o=t.prefix+n,i=t.storage.getItem(o);null!=i?r[n]=t.parse(i):e.hasOwnProperty(n)&&(r[n]=e[n])});return r},e.prototype.getBytesInUse=function(e){var t=[];if(null===e)for(var r=0;r<this.storage.length;r++){if(null!=(i=this.storage.key(r))&&i.slice(0,this.prefix.length)===this.prefix)null!=(o=this.storage.getItem(i))&&t.push(i,o)}else{var n=Array.isArray(e)?e:[e];for(r=0;r<n.length;r++){var o,i=this.prefix+n[r];null!=(o=this.storage.getItem(i))&&t.push(i,o)}}try{return new Blob(t).size}catch(e){return t.reduce(function(e,t){return e+t.length},0)}},e.prototype.set=function(e){var t=this;Object.keys(e).forEach(function(r){var n=t.prefix+r;t.storage.setItem(n,t.stringify(e[r]))})},e.prototype.remove=function(e){var t=this;(Array.isArray(e)?e:[e]).forEach(function(e){var r=t.prefix+e;t.storage.removeItem(r)})},e.prototype.clear=function(){if(this.prefix)for(var e=0;e<this.storage.length;e++){var t=this.storage.key(e);t&&t.slice(0,this.prefix.length)===this.prefix&&this.storage.removeItem(t)}else this.storage.clear()},e}()}])});
//# sourceMappingURL=browser-storage.js.map