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

let deleteBankAccount = async (db, idToDelete) => {
    let collection = db.collection('accountsholders')
    let result = await collection.deleteOne({_id: idToDelete})
    return result
}

let addMoneyToBankAccount = async (db, newBalance) => {
    let collection = db.collection('accountsholders')
    let result = await collection.updateOne({_id: idToUpdate}, {$set: {balance: newBalance}})
    return result
}

module.exports.getAllBankAccounts = getAllBankAccounts
module.exports.getOneBankAccount = getOneBankAccount
module.exports.addBankAccount = addBankAccount
module.exports.deleteBankAccount = deleteBankAccount
module.exports.addMoneyToBankAccount = addMoneyToBankAccount
module.exports.withdrawFromBankAccount = withdrawFromBankAccount
module.exports.transferBetweenAccounts = transferBetweenAccounts
