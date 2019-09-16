const bcrypt = require('bcryptjs');
const userDB = require('../helpers/users');

function restricted(req, res, next) {
  const { username, password } = req.headers;
  if(username && password) {
    userDB.findBy(username)
      .first()
      .then(user => {
        console.log(user);
        if(user && bcrypt.compareSync(password, user.password)) {
          next();
        }
        else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ errorMessage: 'Could not complete request' });
      });
  }
  else {
    res.status(400).json({ error: 'No credentials provided' });
  }
}

module.exports = restricted;