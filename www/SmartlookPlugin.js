var exec = require('cordova/exec');

exports.init = function (apikey, success, error) {
    exec(success, error, 'SmartlookPlugin', 'init', [apikey]);
};
