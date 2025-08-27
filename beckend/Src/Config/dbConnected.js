import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        const URI = process.env.URI
        await mongoose.connection.on("connected", () => console.log("Mongo DB connected"));
        await mongoose.connect(URI)
    } catch (error) {
        console.log(error.message, "Mongodb error")
    }
}

export default dbConnect