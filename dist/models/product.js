// dependencies
const { Schema, model } = require("mongoose")

// schema design
const schema = new Schema(
    {
        name: {
            index: true,
            type: String,
            required: true
        },

        price: {
            index: true,
            type: Number,
            required: true
        },

        // foreign key
        user: {
            ref: "user",
            required: true,
            type: Schema.Types.ObjectId,
            autopopulate: { maxDepth: 1 }
        }

    },
    { timestamps: true }
)

// schema timestamps indexing
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

// schema plugin for auto population
schema.plugin(require("mongoose-autopopulate"))

// product model
const product = model("product", schema)

// exporting product model
module.exports = product