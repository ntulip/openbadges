var mysql = require('../lib/mysql')
  , crypto = require('crypto')
  , Badge = require('./badge')
  , Base = require('./mysql-base.js')
  , _ = require('underscore');

var md5 = function (v) {
  var sum = crypto.createHash('md5');
  sum.update(v);
  return sum.digest('hex');
};

var Group = function (attributes) {
  this.attributes = attributes;
};

Base.apply(Group, 'group');

Group.prototype.updateUrl = function () {
  this.set('url', md5('' + this.get('name') + this.get('user_id') + Date.now()));
};

Group.prototype.getBadgeObjects = function (callback) {
  var badges = this.get('badges')
    , badgeIds = (typeof badges === "string" ? JSON.parse(badges) : badges)
    , values = badgeIds
    , placeholders = badgeIds.map(function(){return '?';}).join(',')
    , query = 'SELECT * FROM `badge` WHERE `id` IN (' + placeholders + ') AND `user_id` = ?';
  values.push(this.get('user_id'));
  return this.client.query(query, values, function (err, results) {
    if (err) { return callback(err); }
    callback(null, results.map(Badge.fromDbResult));
  });
};

Group.prototype.presave = function () {
  if (!this.attributes.id && !this.attributes.url) { this.updateUrl(); }
}

Group.prepare = {
  in: {
    badges: function (value) {
      // Assume this is an array of badge items if it's an array of objects.
      if (!value) { return; }
      if (value.toString().match('[object Object]')) {
        return JSON.stringify(value.map(function (v) { return v.attributes.id }));
      }
      return JSON.stringify(value);
    }
  },
  out: {
    badges: function (value) {
      if (value) { return JSON.parse(value) }
    }
  }
};

module.exports = Group;