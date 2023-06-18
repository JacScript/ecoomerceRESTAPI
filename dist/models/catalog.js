// dependencies
const { Schema, model } = require("mongoose")

// catalog schema design
const schema = new Schema(
    {

        // foreign key
        user: {
            ref: "user",
            // prevent seller to have more than one catalog
            unique: true,
            required: true,
            type: Schema.Types.ObjectId,
            autopopulate: { maxDepth: 1 }
        },

        products: [
            {
                index: true,
                ref: "product",
                required: true,
                type: Schema.Types.ObjectId,
                autopopulate: { maxDepth: 1 }
            }
        ]

    },
    { timestamps: true }
)

// schema timestamps indexing
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

// schema plugin for auto population
schema.plugin(require("mongoose-autopopulate"))

// catalog model
const catalog = model("catalog", schema)

// exporting catalog model
module.exports = catalog