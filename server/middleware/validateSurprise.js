export default function validateSurprise(req, res, next) {
  const { userName, reasons, partnerName, timestamp } = req.body;
  if (
    typeof userName !== 'string' ||
    !Array.isArray(reasons) ||
    reasons.length !== 3 ||
    typeof partnerName !== 'string' ||
    typeof timestamp !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  next();
}