function StringUtils() {}

var _isString = function( value ) {
  return typeof value === 'string';
}

StringUtils.prototype.fromJson = function( str ) {
  if (_isString(str)) {
    // Fixing SCRIPT1014: Invalid character: https://msdn.microsoft.com/library/cc836466(v=vs.94).aspx
    return JSON.parse(str.replace(/\\'/g, "'"));
  }
  return str;
};

StringUtils.prototype.replace = function( str, oldletter, newletter ) {
  if (_isString(str)) {
    return str.replace(oldletter, newletter);
  }
  return str;
};

module.exports = new StringUtils();
