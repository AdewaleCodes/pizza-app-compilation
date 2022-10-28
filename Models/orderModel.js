const mongoose = require ('mongoose');

const schema = mongoose.Schema;
const objectID = schema.objectID;

const orderSchema = new schema({
    id : objectID,
    created_at : Date,
    state : {type: Number, default : 1},
    total_price: Number,
    items: [{
        name: String,
        price: Number,
        size: {type: String, enum: ['m', 'l','s']},
        quantity: Number,
    }]
});

const order = mongoose.model('order',orderSchema);
module.exports= order;