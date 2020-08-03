const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    url: {type: String, required: true}
}, {
    timestamps: true
});

exports = mongoose.model('address', addressSchema);