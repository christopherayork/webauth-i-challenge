const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

function find() {
  return db('users');
}

function findBy(username) {
  return db('users').where({ username });
}

function insert(user) {
  if(!user || !user.username || !user.password) return false;
  return db('users').insert(user);
}

module.exports = {
  find,
  findBy,
  insert
};