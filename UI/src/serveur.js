import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from './../../data/index.js'; 

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/data', async (req, res) => {
  try {
    const result = await readFile('./../../data/data.json'); 
    if (result.status === 'OK') {
      res.json(result.data);
    } else {
      res.status(500).send(result.error.message);
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la lecture des données');
  }
});

app.post('/data', async (req, res) => {
  try {
    const result = await writeFile('./../../data/data.json', req.body); 
    if (result.status === 'OK') {
      res.status(200).send('Données mises à jour avec succès');
    } else {
      res.status(500).send(result.error.message);
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la mise à jour des données');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
