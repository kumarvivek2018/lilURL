const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countersSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  count: { type: Number, default: 0 }
});

module.exports.Counter = mongoose.model('Counter', countersSchema);

const urlSchema = new Schema({
  _id: {type: Number},
  url: {type: String, required: true}
}, {
    timestamps: true
});

urlSchema.pre('save', function(next) {
  const doc = this;

  module.exports.Counter.findOne({}, function(err, counter) {
    if(err) return next(err);
    
    counter.count = counter.count + 1;
    counter.save()
    .then((counter) => {
      doc._id = counter.count;
      doc.created_at = new Date();
      next();
    }, (err) => next(err))
    .then((err) => next(err));
  });
});

module.exports.Urls = mongoose.model('url', urlSchema);

