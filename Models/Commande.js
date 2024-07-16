const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  IdCde: { type: String, required: true },
  
  numCde:{    type:Number,required: true },
  TotalCde: { type: Number, required: true },
 
});

const Commande = mongoose.model("Commande", CommandeSchema);

module.exports = Commande;



