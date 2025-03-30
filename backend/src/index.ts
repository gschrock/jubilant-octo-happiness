import express, { Request, Response } from 'express';
import cors from 'cors';
import knex from 'knex';
import knexConfig from './db/knexfile';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = knex(knexConfig.development);

app.get('/api/students', async (req: Request, res: Response) => {
  try {
    const students = await db('students').select('*');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 