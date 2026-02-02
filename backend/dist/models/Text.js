import mongoose from "mongoose";
const textSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const textModel = mongoose.model("textData", textSchema);
export default textModel;
