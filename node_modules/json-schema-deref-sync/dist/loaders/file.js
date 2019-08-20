'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (refValue, options) {
  var refPath = refValue;
  var baseFolder = options.baseFolder ? _path2.default.resolve(cwd, options.baseFolder) : cwd;

  if (refPath.indexOf('file:') === 0) {
    refPath = refPath.substring(5);
  } else {
    refPath = _path2.default.resolve(baseFolder, refPath);
  }

  var filePath = (0, _utils.getRefFilePath)(refPath);

  var newValue = void 0;
  try {
    var data = _fs2.default.readFileSync(filePath);
    newValue = JSON.parse(data);
  } catch (e) {}

  return newValue;
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

/**
 * Resolves a file link of a json schema to the actual value it references
 * @param refValue the value. String. Ex. `/some/path/schema.json#/definitions/foo`
 * @param options
 *              baseFolder - the base folder to get relative path files from. Default is `process.cwd()`
 * @returns {*}
 * @private
 */
;