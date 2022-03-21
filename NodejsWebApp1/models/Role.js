const { Schema, model } = require('mongoose')

const Role2 = new Schema({
    value: { type: String, unique: true, default:"USER" },
})

module.exports = model('Role', Role)
