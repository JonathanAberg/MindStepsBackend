import {Request, Response} from "express";
import Question from "../models/Question.js";

export async function getQuestionByCategory(req: Request, res: Response) {
    const { category } = req.params;

    try {
         if (!category) {
      res.status(400).json({ error: "category is required" });
      return;
    }
        const questions = await Question.find({ category }, { _id: 0, id: 1, category: 1, text: 1 });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}   