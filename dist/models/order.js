// dependencies
const { Schema, model } = require("mongoose")

// schema design
const schema = new Schema(
    {

        products: [
            {
                index: true,
                ref: "product",
                required: true,
                type: Schema.Types.ObjectId,
                autopopulate: { maxDepth: 1 }
            }
        ],

        buyer: {
            ref: "user",
            required: true,
            type: Schema.Types.ObjectId,
            autopopulate: { maxDepth: 1 }
        },

        seller: {
            ref: "user",
            required: true,
            type: Schema.Types.ObjectId,
            autopopulate: { maxDepth: 1 }
        },

        totalAmount: {
            index: true,
            type: Number,
            required: true
        }

    },
    { timestamps: true }
)

// schema timestamps indexing
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

// schema plugin for auto population
schema.plugin(require("mongoose-autopopulate"))

// order model
const order = model("order", schema)

// exporting order model
module.exports = order