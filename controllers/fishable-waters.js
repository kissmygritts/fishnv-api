const { db } = require('../db')
const { parse } = require('../utils/sqlqs.js')

async function getFishableWaters ({ query }, reply) {
  // const { query } = request
  
  return db.fishableWaters.getAll(query)
}

async function getFishableWatersById (request, reply) {
  const { id } = request.params
  return db.fishableWaters.getById({ id })
}

module.exports = {
  getFishableWaters,
  getFishableWatersById
}

function hasQueryString (query) {
  return Object.keys(query).length > 0
}