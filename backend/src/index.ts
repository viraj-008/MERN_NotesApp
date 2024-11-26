import dbconnect from './dbconect/db'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import noteRoute from "./routes/notesRoutes"
import Auth from './routes/AuthRoute'
// import authenticate from './middleware/AuthMidle';

const app = express();
const PORT = process.env.Backend_Port

// Connect to MongoDB
dbconnect()

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/notes" ,noteRoute);
app.use("/api/notes",Auth);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

