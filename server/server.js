import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;


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

mongoose.connect(process.env.mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});