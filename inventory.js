// inventory.js

var mongoose = require('mongoose');

var invSchema = mongoose.Schema({
    
    model       : String,
    serial      : Number,
    location    : String,
    showroom    : String,
    sold        : Boolean,
    appactivated: Boolean,
    dateOfSale  : Date,
    appId       : String,
    custName    : String,
    custAddress : String,
    custEmail   : String,
    custPhone   : String
});


module.exports = mongoose.model('Inventory', invSchema);