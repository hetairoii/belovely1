import Surprise from '../models/Surprise.js';

export const createSurprise = async (req, res) => {
  const surprise = new Surprise(req.body);
  await surprise.save();
  res.json(surprise);
};

export const getSurprise = async (req, res) => {
  const { id } = req.params;
  if (!id || id === 'undefined') {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const surprise = await Surprise.findById(id);
    if (!surprise) return res.status(404).json({ error: 'No encontrado' });
    res.json(surprise);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
};