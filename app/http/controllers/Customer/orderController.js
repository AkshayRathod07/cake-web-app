// const { rawListeners } = require('../../../models/order');
const Order =  require('../../../models/order')

// debugger

function orderController() {
  return {
    store(req, res) {
      // Validate request
      const { phone, number } = req.body;
      if (!phone || !number) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }
      
      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
        customerId:req.user._id,
        items: req.session.cart.items,

        phone: 9022048911,
        address: 'dhayri pune' 
      }) 

        order.save().then(result =>{
        req.flash('success','Order placed successfully')
        return res.redirect('/')
        console.log("op gg");
      }).catch(err =>{
        req.flash('error',"Something went wrong")
        return res.redirect('/cart')
      })

    }

    // async index(req,res) {
    //   const orders = await Order.find({customerId: req.user._id})
    //   console.log(orders);
    // }
  }
}

module.exports = orderController


