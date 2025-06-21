require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const models = require('./models/model')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const router = require('./routes/allRouter')
const ErrorHandler = require('./midlleware/ErrorHandlingMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)

//Обработка ошибок
app.use(ErrorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'working'})
})
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); 
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()