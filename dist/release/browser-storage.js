!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var o in r)("object"==typeof exports?exports:e)[o]=r[o]}}(window,function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var o={mode:"production",name:"@semibold/browser-storage",version:"1.0.1",gitHash:"c0ea869",lastModified:"2018-08-02T10:28:37.016Z"};r.d(t,"BrowserStorage",function(){return n});var n=function(){function e(e,t){void 0===t&&(t={}),this.areaName=e,this.options=t,this.storage=self[e],this.prefix=this.options.prefix||"",this.parse=this.options.parse||function(e){return JSON.parse(e)},this.stringify=this.options.stringify||function(e){return JSON.stringify(e)}}return Object.defineProperty(e,"metadata",{get:function(){return o},enumerable:!0,configurable:!0}),e.prototype.available=function(){try{var e="__storage_test__";this.storage.setItem(e,e);var t=this.storage.getItem(e)===e;return this.storage.removeItem(e),t}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==this.storage.length}},e.prototype.get=function(e){var t=this,r={};if(null===e)for(var o=0;o<this.storage.length;o++){var n=this.storage.key(o);if(null!=n&&n.slice(0,this.prefix.length)===this.prefix){var i=this.storage.getItem(n);null!=i&&(r[n.slice(this.prefix.length)]=this.parse(i))}}else if("string"==typeof e||Array.isArray(e)){(Array.isArray(e)?e:[e]).forEach(function(e){var o=t.prefix+e,n=t.storage.getItem(o);null!=n&&(r[e]=t.parse(n))})}else Object.keys(e).forEach(function(o){var n=t.prefix+o,i=t.storage.getItem(n);null!=i?r[o]=t.parse(i):void 0!==e[o]&&(r[o]=e[o])});return r},e.prototype.getBytesInUse=function(e){var t=[];if(null===e)for(var r=0;r<this.storage.length;r++){if(null!=(i=this.storage.key(r))&&i.slice(0,this.prefix.length)===this.prefix)null!=(n=this.storage.getItem(i))&&t.push(i,n)}else{var o=Array.isArray(e)?e:[e];for(r=0;r<o.length;r++){var n,i=this.prefix+o[r];null!=(n=this.storage.getItem(i))&&t.push(i,n)}}try{return new Blob(t).size}catch(e){return t.reduce(function(e,t){return e+t.length},0)}},e.prototype.set=function(e){var t=this;Object.keys(e).forEach(function(r){var o=t.prefix+r;t.storage.setItem(o,t.stringify(e[r]))})},e.prototype.remove=function(e){var t=this;(Array.isArray(e)?e:[e]).forEach(function(e){var r=t.prefix+e;t.storage.removeItem(r)})},e.prototype.clear=function(){if(this.prefix)for(var e=0;e<this.storage.length;e++){var t=this.storage.key(e);t&&t.slice(0,this.prefix.length)===this.prefix&&this.storage.removeItem(t)}else this.storage.clear()},e}()}])});
//# sourceMappingURL=browser-storage.js.map