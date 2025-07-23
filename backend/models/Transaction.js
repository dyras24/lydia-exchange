const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  fromCurrency: String,
  toCurrency: String,
  convertedAmount: Number,
  date: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);
