exports.url = /(^(https?):\/\/[^\s\/$.?#].[^\s]*$)|(^\/\S+$)/;
exports.email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
exports.origin = /^(https?):\/\/[^\s\/$.?#].[^\s\/]*$/;
exports.version = /^v?\d+\.\d+\.\d+$/;
exports.date = /(^\d{4}-\d{2}-\d{2}$)|(^\d{1,10}$)/;
