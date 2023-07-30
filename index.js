const express = require('express')
const app = express();
const mongoose = require('mongoose');
const Equipment = require('./model/equipment')
const methodoverride = require('method-override')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/expressError');
const equipmentRouter = require('./routes/equipment')

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/zajebansija');
    console.log('Mongoose is ON!')
}

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'))

app.use('/equipment', equipmentRouter)

app.get('/', (req, res) => {
    res.send('Home page working')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'wrong way' } = err
    res.status(statusCode).send(message)
})

app.listen(8080, (req, res) => {
    console.log('Express is ON!')
})