function restricted(req, res, next) {
  if(req.session && req.session.user) next();
  else res.status(401).json({ error: 'Could not access requested resource' });
}

module.exports = restricted;