import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jmsilveira22:peritanugget@belovely1.nze9mr6.mongodb.net/?retryWrites=true&w=majority&appName=belovely1');

const SurpriseSchema = new mongoose.Schema({
  userName: String,
  reasons: [String],
  partnerName: String,
  timestamp: Number
});
const Surprise = mongoose.model('Surprise', SurpriseSchema);

app.post('/surprise', async (req, res) => {
  const surprise = new Surprise(req.body);
  await surprise.save();
  res.json(surprise);
});

app.get('/surprise/:id', async (req, res) => {
  const surprise = await Surprise.findById(req.params.id);
  res.json(surprise);
});

app.listen(4000, () => console.log('API running on port 4000'));