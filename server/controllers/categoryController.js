const {Category} = require('../models/model')
const ApiError = require('../error/Apierror');
const { where } = require('sequelize');

class categoryController {
  async create(req, res) {
    try {
      const {name, img } = req.body; 
      const category = await Category.create({ name, img });
      return res.json(category);
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка при создании типа', error: e.message });
    }
  }
    async getAll(req, res) {
        try {
          const categorys = await Category.findAll();
          return res.json(categorys);
        } catch (e) {
          return res.status(500).json({ message: 'Ошибка при получении типов', error: e.message });
        }
      }
    async getOne(req, res)  {
        const {id} = req.params
        const category =await Category.findOne(
            {
                where: {id},
            }

        )
        return res.json(category)

    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedCategory = await Category.destroy({
                where: {id}
            })
            
            if (!deletedCategory) {
                return next(ApiError.badRequest(`Счет с ID ${id} не найден`))
            }
            
            return res.json({message: `Счет с ID ${id} успешно удален`})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new categoryController()