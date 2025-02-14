import mongoose from "mongoose";

const moneyManSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    catagory: {
        type: String,
        required: true
    }

}, {
    timestamps: true // createdAt and updatedAt
})

const MoneyManager = mongoose.model('MoneyManager', moneyManSchema);

export default MoneyManager;