import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
    bid: { type: String, required: true },
    pid: { type: String, required: true },
    med: [
        {
            mid: { type: String, required: true },
            quantity: { type: Number, required: true },
            _id: false,
        },
    ],
    total: { type: Number, required: true }
}, { versionKey: false });

const Bill = mongoose.model("Bill", billSchema);
export default Bill;