// Models represent the objects that contain the data that we will be vizualizing when we're interacting with the webpage
// Node modules are our dependencies

// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 


const breadSchema = new Schema({
  name: { type: String, required: true }, // Mongoose schemas can make a field be required, simply by adding required after the field type
  hasGluten: { Boolean },
  image: { type: String, default: 'https://place-puppy.com/500x500' }, // can set a default option in case a document is made wihtout a value in the field
  baker: {
    type: Schema.Types.ObjectID, 
    // reference ID field
    ref: 'Baker' // can reference it by name because we don't have to refer to the actual model
  }
})

// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}

// model and export
const Bread = mongoose.model('Bread', breadSchema)
  // const Bread is the variable we are saving our model to. Conventionally, it should be capitalized and use the singular version of the collection the model is for 
  // mongoose.model: A Mongoose method that creates a model for us based on the arguments we pass it. This is what will later allow us to interact with our Mongo database.
  // Bread: The first argument we passed is the name of the collection we want to connect this model to. As with the variable, this should be capitalized and use the singular version of the collection name. In our case, we want to connect it to a collection named breads, so that becomes Bread when singular and capitalized.
  // breadSchema: The second argument we passed is the schema we want our model to use.

// We've written our schema and created a model based on it but it's stuck in our models/breads.js and we want it in our breads controller
module.exports = Bread

  
