const mongoose = require("mongoose");
const invoiceSchema = mongoose.Schema({
length : Number,
chunkSize : Number,
upload_date : TimeStamp,
md5 : hash,
filename : String,
contentType : String,
aliases : [String],
metadata : Buffer,
userToken: { type: mongoose.Schema.Types.String, ref: 'users' },
  })

const Invoice = mongoose.model("invoices", invoiceSchema);
module.exports = Invoice ;