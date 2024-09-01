 import mongoose from "mongoose"


 

async function dbConn() {
    if(mongoose.connections[0].readyState >=1 ){
        return true;
    }
    
    try {
        await mongoose.connect(process.env.URI!);
        
        console.log('Data Base connected');
        return true;
    } catch (error) {
        console.log("DataBase Failed to connected ", error)
    }
}

export default dbConn; 


