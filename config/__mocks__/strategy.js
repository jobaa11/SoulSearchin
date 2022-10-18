var OAuth2Strategy = require('passport-oauth2')
util = require('util')
uri = require('url')

module.exports = {
    Strategy
}


/** 
* @constructor
* @param {object} options
* @param {function} verify
* @access public
*/

function Strategy(options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://accounts.google.com/o/oauth2/v2/auth';
    options.tokenURL = options.tokenURL || 'https://www.googleapis.com/oauth2/v4/token';

    OAuth2Strategy.call(this, options, verify);
    this.name = 'google';
    this._userProfileURL = options.userProfileURL || 'https://www.googleapis.com/oauth2/v3/userinfo';

    var url = uri.parse(this._userProfileURL);
    if (url.pathname.indexOf('/userinfo') == (url.pathname.length - '/userinfo'.length)) {
        this._userProfileFormat = 'openid';
    } else {
        this._userProfileFormat = 'google+'; // Google Sign-In
    }
}


util.inherits(Strategy, OAuth2Strategy);

/** 
* @param {string} accessToken
* @param {function} cb
* @access protected
*/

Strategy.prototype.userProfile = function (accessToken, cb) {
    var self = this;
    this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
        var json;

        if (err) {
            if (err.data) {
                try {
                    json = JSON.parse(err.data);
                } catch (_) { }
            }

            if (json && json.error && json.error.message) {
                return cb(new GooglePlusAPIError(json.error.message, json.error.code));
            } else if (json && json.error && json.error_description) {
                return cb(new UserInfoError(json.error_description, json.error));
            }
            return cb(new InternalOAuthError('Failed to fetch user profile', err));
        }

        try {
            json = JSON.parse(body);
        } catch (ex) {
            return cb(new Error('Failed to parse user profile'));
        }

        var profile;
        switch (self._userProfileFormat) {
            case 'openid':
                profile = OpenIDProfile.parse(json);
                break;
            default: // Google Sign-In
                profile = GooglePlusProfile.parse(json);
                break;
        }

        profile.provider = 'google';
        profile._raw = body;
        profile._json = json;

        cb(null, profile);
    });
}