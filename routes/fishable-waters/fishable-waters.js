const { getFishableWaters } = require('../../controllers/fishable-waters.js')

// declare schema
const querystring = {
  type: 'object',
  properties: {
    species: {
      type: 'string',
      description: 'The name of the species to search for. Must be the exact name.'
    },
    water_type: {
      type: 'string',
      description: 'The type of water to search for, e.g. stream, lake, etc.'
    },
    region: {
      type: 'string',
      enum: ['Eastern', 'Western', 'Southern'],
      description: 'The NDOW region used to limit the waters returned from the database'
    },
    county: {
      type: 'string',
      descriptions: 'The Nevada country to limit the waters by.'
    },
    s: {
      type: 'string',
      description: 'A search term or phrase for full text search of fishable waters'
    }
  }
}

// format response output
const fishableWaterOutput = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    water_name: { type: 'string' },
    label: { type: 'string' },
    region: { type: 'string' },
    county: { type: 'string' },
    species: {
      type: 'array',
      items: { type: 'string' }
    },
    coordinates: {
      type: 'array',
      items: { type: 'number' }
    }
  }
}

const response = {
  200: {
    type: 'array',
    items: fishableWaterOutput
  }
}

const schema = {
  querystring
  // response
}

// build export
module.exports = {
  schema,
  handler: getFishableWaters
}
