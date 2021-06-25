const homeControllers = require('../app/http/controllers/homeControllers')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/Customer/CartController')


function initRoutes(app){
    app.get('/',homeControllers().index)
    

    app.get('/login',authController().login)

    app.get('/register',authController().register) 

    app.get('/cart',cartController().index)
    
    app.post('/update-cart',cartController().update)

    
}

module.exports = initRoutes 