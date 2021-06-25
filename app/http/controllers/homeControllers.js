const Menu = require('../../models/menu')

function homeControllers () {
    return{

       async index(req,res){
            const cakes = await Menu.find()
            // console.log(cakes);
            return  res.render('home',{cakes:cakes})
            }
        }
    }

module.exports = homeControllers