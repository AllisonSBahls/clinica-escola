'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getRefValue = getRefValue;
exports.getRefType = getRefType;
exports.isRefObject = isRefObject;
exports.getRefPathValue = getRefPathValue;
exports.getRefFilePath = getRefFilePath;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _validUrl = require('valid-url');

var _validUrl2 = _interopRequireDefault(_validUrl);

var _mpath = require('mpath');

var _mpath2 = _interopRequireDefault(_mpath);

var _isValidPath = require('is-valid-path');

var _isValidPath2 = _interopRequireDefault(_isValidPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isWindows = process.platform === 'win32';

/**
 * Gets the ref value of a search result from prop-search or ref object
 * @param ref The search result object from prop-search
 * @returns {*} The value of $ref or undefined if not present in search object
 * @private
 */
function getRefValue(ref) {
  var thing = ref ? ref.value ? ref.value : ref : null;
  if (thing && thing.$ref && typeof thing.$ref === 'string') {
    return thing.$ref;
  }

  return;
}

/**
 * Gets the type of $ref from search result object.
 * @param ref The search result object from prop-search or a ref object
 * @returns {string}  `web` if it's a web url.
 *                    `file` if it's a file path.
 *                    `local` if it's a link to local schema.
 *                    undefined otherwise
 * @private
 */
function getRefType(ref) {
  var val = getRefValue(ref);
  if (val) {
    if (_validUrl2.default.isWebUri(val)) {
      return 'web';
    }
    if (_validUrl2.default.isUri(val) && val.indexOf('file:') === '0' || val.indexOf('.json') > 0 || (0, _isValidPath2.default)(val)) {
      return 'file';
    }
    if (val.charAt(0) === '#' || !_validUrl2.default.isUri(val)) {
      return 'local';
    }
  }
  return;
}

/**
 * Determines if object is a $ref object. That is { $ref: <something> }
 * @param thing object to test
 * @returns {boolean} true if passes the test. false otherwise.
 * @private
 */
function isRefObject(thing) {
  if (thing && (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === 'object' && !Array.isArray(thing)) {
    var keys = Object.keys(thing);
    return keys.length === 1 && keys[0] === '$ref' && typeof thing.$ref === 'string';
  }
  return false;
}

/**
 * Gets the value at the ref path within schema
 * @param schema the (root) json schema to search
 * @param refPath string ref path to get within the schema. Ex. `#/definitions/id`
 * @returns {*} Returns the value at the path location or undefined if not found within the given schema
 * @private
 */
function getRefPathValue(schema, refPath) {
  var rpath = refPath;
  var hashIndex = refPath.indexOf('#');
  if (hashIndex >= 0) {
    rpath = refPath.substring(hashIndex);
    if (rpath.length > 1) {
      rpath = refPath.substring(1);
    } else {
      rpath = '';
    }
  }

  if (rpath.charAt(0) === '/') {
    rpath = rpath.substring(1);
  }

  if (rpath.indexOf('/') >= 0) {
    rpath = rpath.replace(/\//gi, '.');
  }

  if (rpath) {
    return _mpath2.default.get(rpath, schema);
  }
  return schema;
}

function getRefFilePath(refPath) {
  var filePath = refPath;
  var hashIndex = filePath.indexOf('#');
  if (hashIndex > 0) {
    filePath = refPath.substring(0, hashIndex);
  }

  return filePath;
}

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

function win32StatPath(path) {
  var result = splitDeviceRe.exec(path);
  var device = result[1] || '';
  var isUnc = !!device && device[1] !== ':';

  return {
    device: device,
    isUnc: isUnc,
    isAbsolute: isUnc || !!result[2], // UNC paths are always absolute
    tail: result[3]
  };
}

exports.isAbsolute = typeof _path2.default.isAbsolute === 'function' ? _path2.default.isAbsolute : function utilIsAbsolute(path) {
  if (isWindows) {
    return win32StatPath(path).isAbsolute;
  }
  return !!path && path[0] === '/';
};