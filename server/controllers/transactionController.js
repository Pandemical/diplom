const {Transaction, Category, Bill} = require('../models/model')
const ApiError = require('../error/Apierror')

class transactionController {
async create(req, res) {
  try {
    const { amount, date, billId, categoryId } = req.body;

    const transaction = await Transaction.create({
      amount,
      date,
      billId,
      categoryTransactionId: categoryId,
    });

    const fullTransaction = await Transaction.findOne({
      where: { id: transaction.id },
      include: [
        { model: Category, attributes: ['id', 'name', 'img', 'color', 'type'] },
        { model: Bill, attributes: ['id', 'title'] }
      ]
    });

    return res.json(fullTransaction);
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка при создании транзакции', error: e.message });
  }
}

async getAll(req, res) {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.findAll({
      include: [
        {
          model: Bill,
          attributes: ['id', 'title', 'userId'],
          where: { userId },
        },
        {
          model: Category,
          attributes: ['id', 'name', 'img', 'color', 'type'],
        }
      ]
    });

    return res.json(transactions);
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка при получении транзакций', error: e.message });
  }
}

    async delete(req, res, next)  {
        try {
            const {id} = req.params
            const deletedTransaction = await Transaction.destroy({
                where: {id}
            })
            
            if (!deletedTransaction) {
                return next(ApiError.badRequest(`Транзакция с ID ${id} не найден`))
            }
            
            return res.json({message: `Транзакция с ID ${id} успешно удален`})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new transactionController()