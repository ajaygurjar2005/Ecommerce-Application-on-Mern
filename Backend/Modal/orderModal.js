import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    products:{
        data: [String],
    }
},{timestamps:true})


export default mongoose.model("orders",orderSchema)