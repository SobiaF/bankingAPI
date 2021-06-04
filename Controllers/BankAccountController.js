const DbService = require('../Services/DbService')
const BankAccountService = require('../Services/BankAccountService')


let getAllBankAccounts = (req, res) => {
    DbService.connectToDb(async (db) => {
        let bankaccounts = await BankAccountService.getAllBankAccounts(db)
        res.json(bankaccounts)
    })
}

let addBankAccount = (req, res) => {
    let bankaccount = {
        name: req.body.name
    }

    DbService.connectToDb(async (db) => {
        let result = await BankAccountService.addBankAccount(db, bankaccount)

        if (result.insertedCount) {
            res.send('Bank account added')
        } else {
            res.send ('Bank account not added')
        }
    })
}

module.exports.getAllBankAccounts = getAllBankAccounts
module.exports.addBankAccount = addBankAccount
