import express from "express";
import cors from "cors";
import studentRoutes from "routes/studentRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
