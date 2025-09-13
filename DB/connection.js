/*import mongoose from 'mongoose';
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.DB_LOCAL);
        console.log("Connect DB");
    }catch(err){
        console.log("error to connect db:",err);
    }
}
export default connectDb;
*/


import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/filmflix', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Local DB");
    } catch (err) {
        console.log("Error connecting to Local DB:", err);
    }
}

export default connectDb;
