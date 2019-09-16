const express = require('express');
const server = express();
const userDB = require('./helpers/users');
const bcrypt = require('bcryptjs');
const restricted = require('./middleware/authenticate');
server.use(express.json());

server.get('/api/users', (req, res) => {
  userDB.find()
    .then(r => {
      console.log(r);
      if(r) res.status(200).json(r);
      else res.status(404).json({ error: 'Could not retrieve users' });
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ errorMessage: 'Could not complete request' });
    });
});

server.post('/api/register', (req, res) => {
  // maybe do some password criteria verification
  const account = req.body;
  if(!account.username || !account.password) res.status(401).json({ error: 'A username and password must be provided' });
  else {
    account.password = bcrypt.hashSync(account.password, 8);
    userDB.insert(account)
      .then(r => {
        if(r) res.status(201).json({ message: 'Account created', user: r });
        else res.status(400).json({ error: 'The account could not be created' });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ errorMessage: 'The request could not be completed' });
      });
  }
});

server.post('/api/login', (req, res) => {
  const credentials = req.body;

  userDB.findBy(credentials.username)
    .first()
    .then(user => {
      console.log(user);
      if(!credentials || !bcrypt.compareSync(credentials.password, user.password)) {
        res.status(401).json({ error: 'Incorrect credentials' });
      }
      else {
        res.status(200).json({ message: `Welcome ${user.username}` });
      }
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ errorMessage: 'Could not complete request' });
    });
});

server.use('/api/restricted', restricted);
server.get('/api/restricted/first', (req, res) => {
  res.status(200).json({ message: 'Success' });
});


module.exports = server;