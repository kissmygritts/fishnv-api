const sql = require('../sql').fishableWaters
const { where, parse, sqlize } = require('../../utils/sqlqs.js')

class FishableWatersRepository {
  constructor(db, pgp) {
    this.db = db
    this.pgp = pgp
  }

  async getAll(query) {
    // parse the query string
    const parsedQuery = parse(query)
    const speciesIdx = parsedQuery
      .map(m => m.column)
      .indexOf('species')
    
      if (speciesIdx >= 0) {
      parsedQuery[speciesIdx].operator = '?'
    }

    // format where clause
    const where = parsedQuery.length
      ? `where ${sqlize(parsedQuery)}`
      : ''

    return this.db.manyOrNone(sql.getAll, { where })
  }

  async getById(id) {
    return this.db.oneOrNone(sql.getById, id)
  }

  async search({ s }) {
    const frmt = this.pgp.as.format(sql.search, { s })
    console.log(JSON.stringify({
      s,
      frmt
    }))

    return this.db.manyOrNone(frmt)
  }

  async getWaterRecords ({ id }) {
    return this.db.manyOrNone(sql.waterRecords, { id })
  }
}

module.exports = FishableWatersRepository

function objIsEmpty (obj) {
  return Object.keys(obj).length === 0
}