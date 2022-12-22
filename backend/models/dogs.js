const mongoose = require("mongoose");
const dogSchema = mongoose.Schema({
    name: String,
    surnoms: String,
    date_de_naissanceDog: String,
    genre: String,
    race: String,
    Sterilisation: String,
    sante: String,
    caractere: String,
    mesententes_chiens: String,
    entente_chats: String,
    entente_enfants: String,
    habitudes: String,
    peurs: String,
    userToken: { type: mongoose.Schema.Types.String, ref: 'users' },
  })


  const Dog = mongoose.model("dogs", dogSchema);
  module.exports = Dog ;