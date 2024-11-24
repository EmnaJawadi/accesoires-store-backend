const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    quantity: {
        type: Number,
        default: 1 // Default quantity is 1
    }
});


/*

{
    items: [
        {
            product: "string-id",
            quantity: 4
        },
        {
            product: "string-id",
            quantity: 3
        },
        {
            product: "string-id",
            quantity: 5
        },
    ],
    user: "string-id",
}

*/

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema], // Array of order items
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    }
});

module.exports = mongoose.model("Order", orderSchema);