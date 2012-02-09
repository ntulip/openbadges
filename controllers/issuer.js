var request = require('request')
  , logger = require('../lib/logging').logger
  , reverse = require('../lib/router').reverse
  , awardBadge = require('../lib/award')
  , remote = require('../lib/remote') 

exports.issuerBadgeAdd = function(req, res, next) {
  var user = req.user
    , error = req.flash('error')
    , success = req.flash('success');

  if (!user) return res.redirect(reverse('backpack.login'), 303);

  res.render('issuerBadgeAdd', {
    error: error,
    success: success,
    layout: 'smallLayout',
    csrfToken: req.session._csrf,
    // todo: need to add csrf here
    })
};
   

exports.issuerBadgeAddFromAssertion = function(req, res, next) {
  // handles the adding of a badge via assertion url called
  // from issuerBadgeAdd
  // called as an ajax call.
  var assertionUrl = req.body['assertion']
  remote.getHostedAssertion(assertionUrl, function(err, assertion) {
    debugger;
    if (err) {/*todo: figure out returning an ajax error*/}
    if (assertion.recipient !== user.get('email')) {/*another error*/}
    
    awardBadge(assertion, assertionUrl, imagedata, function(err, badge) {
      if (err) {
        /* again, another error */
      }
    })
    console.debug(assertion);
    return(assertion);
  })
  logger.debug(req.body['assertion']);
};
