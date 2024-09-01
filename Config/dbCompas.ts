import mongoose from "mongoose";
const connCompas = async ()=>{
    try {
        await mongoose.connect(process.env.URI_COM!)
        console.log('Data base Compass Suucessfuly connected ... yaahelili :) ')
    } catch (error) {
        console.error("Data Base Compass Failed to connected ", error)
    }
}
export default connCompas;