const { timeStamp } = require('console');
const mongoose = require('mongoose')
const todoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        input: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;