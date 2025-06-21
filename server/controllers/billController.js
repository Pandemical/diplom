const {Bill,Type, Transaction} = require('../models/model')
const ApiError = require('../error/Apierror');
const { where } = require('sequelize');

class billController {
    async create(req, res) {
      try {
        const { title, amount, currency, color, typeBillId } = req.body;
        const userId = req.user.id;

        const bill = await Bill.create({ title, amount, currency, color, userId, typeBillId });

        const fullBill = await Bill.findOne({
          where: { id: bill.id },
          include: [{ model: Type }]
        });

        return res.json(fullBill);
      } catch (e) {
        return res.status(500).json({ message: 'Ошибка при создании счёта', error: e.message });
      }
    }
    async getAll(req, res) {
        try {
          const userId = req.user.id;
          const bills = await Bill.findAll({ where: { userId },
            include: [{ model: Type }] }
          );
          return res.json(bills);
        } catch (e) {
          return res.status(500).json({ message: 'Ошибка при получении счетов', error: e.message });
        }
      }
    async getOne(req, res)  {
        const {id} = req.params
        const bill =await Bill.findOne(
            {
                where: {id},
            }

        )
        return res.json(bill)

    }
    async update(req, res) {
      try {
        const { id } = req.params;
        const { title, amount, currency, color, typeBillId } = req.body;

        await Bill.update(
          { title, amount, currency, color, typeBillId },
          { where: { id } }
        );
        const updatedBill = await Bill.findOne({
          where: { id },
          include: [{ model: Type }]
        });

        if (!updatedBill) return res.status(404).json({ message: 'Счёт не найден' });

        return res.json(updatedBill);
      } catch (e) {
        return res.status(500).json({ message: 'Ошибка при обновлении счёта', error: e.message });
      }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedBill = await Bill.destroy({
                where: {id}
            })
            
            if (!deletedBill) {
                return next(ApiError.badRequest(`Счет с ID ${id} не найден`))
            }
            
            return res.json({message: `Счет с ID ${id} успешно удален`})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new billController()