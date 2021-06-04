const BankAccountController = require('../Controllers/BankAccountController')

let routes = (app) => {
    app.get('/bankaccounts', BankAccountController.getAllBankAccounts)
    app.post('/bankaccounts', BankAccountController.addBankAccount)
}

module.exports = routes
