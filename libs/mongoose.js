const mongoose = require("mongoose");
mongoose.Promise = Promise;

const beautifyUnique = require("mongoose-beautiful-unique-validation"); 
mongoose.plugin(beautifyUnique);

//mongoose.set("debug", true);

mongoose.plugin(schema => {
  if (!schema.options.toObject) schema.options.toObject = {};
  schema.options.toObject.transform = function (doc, ret /*, options*/) {
    // transform every document before returning the result
    let result = {};
    schema.statics.publicFields.forEach(propName => {
      result[propName] = ret[propName];
    });
    return result;
  };
});

module.exports = dbUri => {
  mongoose.connect(dbUri, {
    server: {
      socketOptions: {
        keepAlive: 1
      },
      poolSize: 5
    }
  });
  
  return mongoose;
};