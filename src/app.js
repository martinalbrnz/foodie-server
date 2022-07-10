import express from 'express';
import cors from 'cors';
import router from './Routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

app.get('/', (req, res) => {
  res.json('Hello world!');
});

export default app;
