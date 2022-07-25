const Account = require('../models/account');

module.exports = {
    new: newAccount
}

function newAccount(req, res) {
    res.render('accounts/new');
}