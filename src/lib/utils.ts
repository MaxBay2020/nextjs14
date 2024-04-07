import mongoose from "mongoose"

const connection = {
    isConnected: null
}

const connectToDb = async () => {
    if(connection.isConnected){
        console.log('connected already')
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


export default connectToDb