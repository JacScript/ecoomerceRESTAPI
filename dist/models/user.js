// dependencies
const { Schema, model } = require("mongoose")

// user schema design
const schema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        // buyer or seller
        accountType: {
            type: String,
            required: true
        }

    },
    { timestamps: true }
)

// schema timestamp indexing
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

// user model
const user = model("user", schema)

// exporting user model
module.exports = user