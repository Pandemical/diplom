const sequelize = require("../db");
const { DataTypes } = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING},
})

const Bill = sequelize.define('bill',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    currency: {type: DataTypes.STRING, allowNull: false}
})

const Transaction = sequelize.define('transaction',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE,  allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
})

const Type = sequelize.define('type_bill',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category_transaction',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
})


User.hasMany(Bill);
Bill.belongsTo(User);

Type.hasMany(Bill); 
Bill.belongsTo(Type);

Category.hasMany(Transaction); 
Transaction.belongsTo(Category);

Bill.hasMany(Transaction);
Transaction.belongsTo(Bill);

module.exports = {
    User,
    Bill,
    Transaction,
    Category,
    Type,
}