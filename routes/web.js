const homeControllers = require('../app/http/controllers/homeControllers')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/Customer/CartController')
const guest = require("../app/http/middlewares/guest")
const orderController = require('../app/http/controllers/Customer/orderController')

function initRoutes(app){
    app.get('/',homeControllers().index)
    

    app.get('/login' ,guest ,authController().login)

    app.post('/login',authController().postLogin)


    app.get('/register', guest ,authController().register) 

    app.post('/register',authController().postRegister) 

    app.post('/logout',authController().logout) 

    app.get('/cart',cartController().index)
    
    app.post('/update-cart',cartController().update)

    // Customer Routes
    app.post('/orders',orderController().store)
    // app.get('/customer/orders',orderController().index)
}

module.exports = initRoutes 