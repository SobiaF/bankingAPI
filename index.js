const express = require('express')
const routes = require('./Config/routes')
const connectToDb = require('./Services/DbService')
const ObjectId = require('mongodb').ObjectId

const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(express.json())

routes(app)

module.exports = app

app.get('/accountsholders', (req, res) => {
    connectToDb(async (db) => {
        const collection = db.collection('accountsholders')
        const data = await collection.find({}).toArray()
        res.json(data)
    })
})
app.post('/accountsholders', (req, res) => {
    const dataToSave = {
        name: req.body.name,
        pet: req.body.balance
    }
    connectToDb(async (db) => {
        const collection = db.collection('accountsholders')
        const result = await collection.insertOne(dataToSave)
        if (result.insertedCount === 1) {
            res.send('done')
        } else {
            res.send('fail')
        }
    })
})
