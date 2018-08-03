# Browser-Storage

> Use the Browser-Storage API to store, retrieve user data from localStorage/sessionStorage.


## Install

> Source code is written by TypeScript.

`$ npm i @semibold/browser-storage`

## Usage

```js
// Global
// <script src="./dist/release/browser-storage.js"></script>

// NodeJS Module
const {BrowserStorage} = require('@semibold/browser-storage');

// ES-next Module
import {BrowserStorage} from '@semibold/browser-storage';
```


## Support

More Information: [Can I Use localStorage/sessionStorage?](https://caniuse.com/#search=storage)


## Instance & API

```js
/**
 * @param {'localStorage'|'sessionStorage'} areaName
 * @param {Object} [options]
 * @param {string} [options.prefix = ""] - The prefix of storage keys. Using the
 *        Browser-Storage API to store, retrieve user data from
 *        localStorage/sessionStorage will be limited to a certain area.
 *   e.g: `bs.clear()` will only clear keys prefixed with `media_` which your
 *        previous set in `options.prefix`.
 * @param {Function} [options.parse = (text: string): any => JSON.parse(text)]
 *        Use this function to parse text before the text returns.
 * @param {Function} [options.stringify = (vaule: any): string => JSON.stringify(value)]
 *        Use this function to stringify value before setting the value.
 */
const bs = new BrowserStorage(areaName, options);

// Static Property
/*
 * @return {Object}
 */
BrowserStorage.metadata

// Property & Method
/**
 * @readonly
 * @return {Storage} - localStorage/sessionStorage
 */
bs.storage

/**
 * @desc To be able to use storage, we should first verify that 
 *       it is supported and available in the current browsing session
 * @return {boolean}
 */
bs.available();

/**
 * @desc Gets one or more items from storage.
 * @desc A single key to get, list of keys to get, or a dictionary specifying default
 *       values. An empty list or object will return an empty result object. Pass in 
 *       null to get the entire contents of storage.
 * 
 * @param {null|string|string[]|Object} keys
 * @return {Object}
 */
bs.get(keys);

/**
 * @desc Gets the amount of space (in bytes) being used by one or more items.
 * @desc A single key or list of keys to get the total usage for. An empty list will
 *       return 0. Pass in null to get the total usage of all of storage.
 * 
 * @param {null|string|string[]} keys
 * @return {number} - approximate value
 */
bs.getBytesInUse(keys);

/**
 * @desc Sets multiple items.
 * @desc An object which gives each key/value pair to update storage with. Any other
 *       key/value pairs in storage will not be affected.
 * 
 * @param {Object} items
 */
bs.set(items);

/**
 * @desc Removes one or more items from storage.
 * @desc A single key or a list of keys for items to remove.
 * 
 * @param {string|string[]} keys
 */
bs.remove(keys);

/**
 * @desc Removes all items from storage.
 */
bs.clear();
```


## Example

```js
const bs1 = new BrowserStorage('localStorage');
const bs2 = new BrowserStorage('localStorage', {prefix: 'test.'});

bs2.set({abc: 12358});

const abc1 = bs1.get('test.abc')['test.abc'];
const abc2 = bs2.get(['abc'])['abc'];

console.log(abc1 === abc2);     // true
console.log(abc1 === 12358);    // true

const value = "should be return this statement";
const __inexistent_value__ = bs1.get({__inexistent_key__: value}).__inexistent_key__;

console.log(value === __inexistent_value__);    // true
```


## Reference

- [MDN - Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
- [chrome.storage API](https://developer.chrome.com/extensions/storage#type-StorageArea)
