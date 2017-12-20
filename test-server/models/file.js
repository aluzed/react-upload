"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
let fileSchema = new Schema({
    filename: {type: String, required: true},
    mime_type: {type: String, required: true},
    original_name: {type: String, required: true},
    path: {type: String, required: true},
    size: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
})

// make this available to our users in our Node applications
module.exports = mongoose.model('File', fileSchema)