global.define = function ( name, value, exportObject ) {
    if ( !exportObject ) {
        if ( exports.exportObject ) {
          exportObject = exports.exportObject;
        } else {
          exportObject = exports;        
        }
    }

    Object.defineProperty( exportObject, name, {
        'value': value,
        'enumerable': true,
        'writable': false,
    });
}

exports.exportObject = null;