let getAllBankAccounts = async (db) => {
    let collection = db.collection('accountsholders')
    let result = await collection.find({}).toArray()
    return result
}

let addBankAccount = async (db, bankaccount) => {
    let collection = db.collection('accountsholders')
    let result = await collection.insertOne(bankaccount)
    return result
}

module.exports.getAllBankAccounts = getAllBankAccounts
module.exports.addBankAccount = addBankAccount
