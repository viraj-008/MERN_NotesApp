import express from "express";
import Note from "../model/note";
import OpenAI from 'openai';
import authenticate from "../middleware/AuthMidle";

const router = express.Router();
const key=process.env.AiStringKey
const openai = new OpenAI({
  apiKey:key
});

router.post('/ask',async (req:any, res:any) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: question }],
    });

    const answer = aiResponse.choices[0].message?.content || 'No response';
    res.json({ answer });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching AI response:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('An unexpected error occurred:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
});



// Create a note
router.post("/", authenticate, async(req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = await Note.create({ title, content, author: req.user });
    console.log(newNote)
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Error creating note" });
  }
});

// Get all notes
router.get("/" , authenticate,async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Delete a note
router.delete("/:id" , async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error deleting note" });
  }
});

export default router;
