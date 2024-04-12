import mongoose from 'mongoose'
import  Color  from 'colors'

const connect = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`connected to mongodb database${conn.connection.host}`.bgGreen.yellow)
    }
    catch(err){
        console.log(`Error in mongodb${err}`)
    }
}

export default connect;