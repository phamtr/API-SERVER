const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    description: {type: String},
    price: { type: Number, required: true},
    productImage: {type: String, required: true },
    show: { type: Boolean, default: true},
    inStock: [{
        createdBy: {type: String},
        CreatedAt: {type: Date, default: Date.now()},
        quantity: { type: Number, default: 1},
        note: { type: String}
    }]
});

module.exports = mongoose.model('Product', productSchema);