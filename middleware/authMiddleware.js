const router = require('express').Router();

const ensureRole = (role) => {
    return (req, res, next) => {
        // Check if the user has the required role
        if (req.user && req.user.role === role) {
            return next();
        } else {
            // If the user does not have the required role, respond with an error
            return res.status(403).send('Forbidden');
        }
    };
};

function ensureAdmin(req, res, next) {
    if (req.user.role === role.admin) {
      next();
    } else {
      req.flash('warning', 'you are not authorized to see this route');
      res.redirect('/');
    }
} 

module.exports = ensureAdmin;
module.exports = ensureRole;