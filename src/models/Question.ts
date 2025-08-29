import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    category: {type: String},
  text: { type: String, required: true },
 
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
