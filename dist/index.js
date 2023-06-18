// dependencies
const cors = require("cors")
const express = require("express")
const { router } = require("bapig")
const mongoose = require("mongoose")

// express initialization
const app = express()

// express middleware
app.use(express.json())
app.use(cors({ origin: "*" }))

async function connectWithRetry() {
    try {

        // connecting to mongo db database
        const databaseConnected = await mongoose.connect("mongodb://127.0.0.1:27017/jackson")

        // verifying database has been connected
        if (databaseConnected) {
            require("./collection")
            app.listen(5000, () => console.log(`database has been connected and server is running on port 5000`))
        }

        else {
            console.log(`Database connection failed`)
            setInterval(connectWithRetry, 5000)
        }
    } catch (error) {
        console.log(` Database connection error: ${error}`)
        setInterval(connectWithRetry, 5000)
    }
}

connectWithRetry()

// api endpoints
app.use("/api", router)