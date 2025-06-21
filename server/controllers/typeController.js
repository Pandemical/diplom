const {Type} = require('../models/model')
const ApiError = require('../error/Apierror');
const { where } = require('sequelize');

class typeController {
  async create(req, res) {
    try {
      const { name, img } = req.body; 
      const type = await Type.create({ name, img });
      return res.json(type);
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка при создании типа', error: e.message });
    }
  }
    async getAll(req, res) {
        try {
          const types = await Type.findAll();
          return res.json(types);
        } catch (e) {
          return res.status(500).json({ message: 'Ошибка при получении типов', error: e.message });
        }
      }
    async getOne(req, res)  {
        const {id} = req.params
        const bill =await Type.findOne(
            {
                where: {id},
            }

        )
        return res.json(bill)

    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedBill = await Type.destroy({
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

module.exports = new typeController()