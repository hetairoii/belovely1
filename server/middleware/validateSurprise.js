export default function validateSurprise(req, res, next) {
  const { userName, reasons, partnerName, timestamp, photo, extraReasons } = req.body;
  if (
    typeof userName !== 'string' ||
    !Array.isArray(reasons) ||
    reasons.length !== 3 ||
    typeof partnerName !== 'string' ||
    typeof timestamp !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  if (photo !== undefined && photo !== null && typeof photo !== 'string') {
    return res.status(400).json({ error: 'Foto inválida' });
  }
  if (extraReasons && (!Array.isArray(extraReasons) || extraReasons.length !== 100 || !extraReasons.every(r => typeof r === 'string'))) {
    return res.status(400).json({ error: 'Las 100 razones deben ser un array de 100 strings' });
  }
  next();
}