const BankAccountController = require('../Controllers/BankAccountController')

let routes = (app) => {
    app.get('/bankaccounts', BankAccountController.getAllBankAccounts)
    app.get('/bankaccounts/:id', BankAccountController.getOneBankAccount)
    app.post('/bankaccounts', BankAccountController.addBankAccount)
    app.delete('/bankaccounts/:id', BankAccountController.deleteBankAccount)
    app.put('/bankaccounts/:id', BankAccountController.addMoneyToBankAccount)
    app.put('/bankaccounts/:id', BankAccountController.withdrawFromBankAccount)
    app.put('/bankaccounts', BankAccountController.transferBetweenAccounts)
}

module.exports = routes
