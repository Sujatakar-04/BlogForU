import mongoose from 'mongoose'


export const Connection=async(username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-alw6orx-shard-00-00.pyw5s4j.mongodb.net:27017,ac-alw6orx-shard-00-01.pyw5s4j.mongodb.net:27017,ac-alw6orx-shard-00-02.pyw5s4j.mongodb.net:27017/?ssl=true&replicaSet=atlas-lplafc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=myblog`;
    try{
        // URL is required to moke connection with the database
        // jo purane vala URL hai vo deprecate ho chuka hai muje new vala use krna hai issliye hamne  useNewUrlParser ko true kr diya 
       await mongoose.connect(URL,{ useNewUrlParser:true});
       console.log("Database connected successfully");
    }catch(error){
        
        console.log('Error while connecting with the database', error);
    }
} 

export default Connection;