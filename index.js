const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const app = express()
const port = 4000

app.use(express.json())

const url = 'mongodb://root:password@localhost:27017'

const dbName = 'bankaccounts'
const Client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
let connectToDb = (cb) => {
    Client.connect((err) => {
        let db = Client.db(dbName)
        cb(db)
    })
}

app.get('/accountholders', (req, res) => {
    connectToDb(async (db) => {
        const collection = db.collection('accountholders')
        const data = await collection.find({}).toArray()
        res.json(data)
    })
})
app.post('/accountholders', (req, res) => {
    const dataToSave = {
        name: req.body.name,
        pet: req.body.pet
    }
    connectToDb(async (db) => {
        const collection = db.collection('accountholders')
        const result = await collection.insertOne(dataToSave)
        if (result.insertedCount === 1) {
            res.send('done')
        } else {
            res.send('fail')
        }
    })
})
app.put('/accountholders', (req, res) => {
    const nameToUpdate = req.body.name
    const newPet = req.body.pet
    connectToDb(async (db) => {
        const collection = db.collection('accountholders')
        const result = await collection.updateOne({name: nameToUpdate}, {$set: {pet: newPet}})
        if (result.modifiedCount === 1) {
            res.send('done')
        } else {
            res.send('fail')
        }
    })
})
app.delete('/accountholders/:id', (req, res) => {
    const idToDelete = ObjectId(req.params.id)
    connectToDb(async (db) => {
        const collection = db.collection('accountholders')
        const result = await collection.deleteOne({_id: idToDelete})
        if (result.deletedCount === 1) {
            res.send('done')
        } else {
            res.send('fail')
        }
    })
})
app.listen(port)