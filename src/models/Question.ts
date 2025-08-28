import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true, index: true },
    category: {type: String, required: true, trim: true, lowercase: true index: true},
  text: { type: String, required: true, trim: true },
 
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
