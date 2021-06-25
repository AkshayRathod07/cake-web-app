function authController () {
    return{
        login(req,res){
            res.render('auth/Login')
        },
        register(req,res){
            res.render('auth/Register')
        }
    }
}
module.exports = authController