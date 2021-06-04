const express = require('express')
const routes = require('./Config/routes')
const ObjectId = require('mongodb').ObjectId

const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(express.json())

routes(app)

module.exports = app

const Client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
let connectToDb = (cb) => {
    Client.connect((err) => {
        let db = Client.db(dbName)
        cb(db)
    })
}

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
app.put('/accountsholders', (req, res) => {
    const nameToUpdate = req.body.name
    const newBalance = req.body.balance
    connectToDb(async (db) => {
        const collection = db.collection('accountsholders')
        const result = await collection.updateOne({name: nameToUpdate}, {$set: {balance: newBalance}})
        if (result.modifiedCount === 1) {
            res.send('done')
        } else {
            res.send('fail')
        }
    })
})
app.delete('/accountsholders/:id', (req, res) => {
    const idToDelete = ObjectId(req.params.id)
    connectToDb(async (db) => {
        const collection = db.collection('accountsholders')
        const result = await collection.deleteOne({_id: idToDelete})
        if (result.deletedCount === 1) {
            res.send('done')
        } else {
            res.send('fail')
        }
    })
})
