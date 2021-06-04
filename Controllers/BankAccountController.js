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

let deleteBankAccount = (req, res) => {
    let idToDelete = req.params.id

    DbService.connectToDb(async (db) => {
        let result = await collection.deleteOne(db, {_id: idToDelete})
        if (result.deletedCount === 1) {
            res.send('Bank account has been deleted')
        } else {
            res.send('Bank account did not deelete - failed')
        }
    })
}

let addMoneyToBankAccount = (req, res) => {
    let addNewBalance = {
        balance: req.body.balance
    }

    DbService.connectToDb(async (db) => {
        let result = await BankAccountService.addMoneyToBankAccount(db, {_id: idToDelete}, addNewBalance)

        if (result.modifiedCount === 1) {
            res.send('Money has been added to the bank account - deposit successful')
        } else {
            res.send('Money has not been added - deposit unsuccessful')
        }
    })
}
module.exports.getAllBankAccounts = getAllBankAccounts
module.exports.getOneBankAccount = getOneBankAccount
module.exports.addBankAccount = addBankAccount
module.exports.deleteBankAccount = deleteBankAccount
module.exports.addMoneyToBankAccount = addMoneyToBankAccount
module.exports.withdrawFromBankAccount = withdrawFromBankAccount
module.exports.transferBetweenAccounts = transferBetweenAccounts
