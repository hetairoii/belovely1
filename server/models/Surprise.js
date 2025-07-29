import mongoose from 'mongoose';

const SurpriseSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  reasons: { type: [String], required: true },
  partnerName: { type: String, required: true },
  timestamp: { type: Number, required: true },
  photo: { type: String, required: false },
  extraReasons: { type: [String], default: undefined, required: false }
});

export default mongoose.model('Surprise', SurpriseSchema);