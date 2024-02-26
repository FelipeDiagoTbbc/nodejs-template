const config = require('../../config/config')

/**
 * Middleware to check if a request has the correct API_KEY in the headers
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function checkApiKey(req, res, next) {
  const apiKey = req.headers.api
  if (apiKey === config.apiKey) {
    next()
  } else {
    next(new Error('Invalid API_KEY'))
  }
}

function checkAdminRole(req, res, next) {
  const role = req.user.role
  console.log('[Auth-middle] role ' + role)
  if (role === 'admin') {
    next()
  } else {
    next(new Error('Invalid role'))
  }
}

/**
 * Receives the req.user populated by the passport.authenticate('jwt', { session: false })
 * @param  {...any} roles
 * @throws a error if the role isn't in the roles param
 */
function checkRoles(...roles) {
  // ...roles = ['admin', 'user', 'customer']
  return (req, res, next) => {
    const role = req.user.role.trim()
    // console.log("[Auth-middle] role: "+role+" roles: "+roles+" includes: "+roles.includes(role));
    if (roles.includes(role)) {
      next()
    } else {
      next(new Error('[Auth-middle] Invalid role'))
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
