const axios = require('axios');

class PredictionController {
  async getAll(req, res) {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }

  try {
    const response = await axios.get(`http://localhost:8000/api/predict/${userId}`);
    return res.json(response.data);
  } catch (e) {
    console.error('Ошибка при обращении к ML-сервису:', e.message);
    return res.status(500).json({
      message: 'Ошибка при получении рекомендаций',
      error: e.message,
    });
  }
  }
}

module.exports = new PredictionController();
