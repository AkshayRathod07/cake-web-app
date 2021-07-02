import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import initAdmin from "./admin"

const addToCart = document.querySelectorAll(".add-to-cart");
const cartCounter = document.querySelector("#cart-counter");

function updateCart(cake) {
  axios.post("update-cart", cake).then((res) => {
    console.log(res);
    cartCounter.innerText = res.data.totalQty;
    toastr["success"]("Item added to cart");
    toastr.options = {
      closeButton: true,

      progressBar: false,
      positionClass: "toast-top-right",
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "1000",
    };
  }).catch( (err) =>{
    toastr["error"]("Something went wrong");
    toastr.options = {
        closeButton: true,
  
        progressBar: true,
        positionClass: "toast-top-right",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "1000",
        extendedTimeOut: "1000",
      };

  })
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let cake = JSON.parse(btn.dataset.cake);
    updateCart(cake);
  });
});


// Remove alert message after 2 second
const alertBtn = document.getElementById('success-alert')

if(alertBtn){
  setTimeout(()=>{
    alertBtn.remove()
  },2000)
}




// change order status
let statuses = document.querySelectorAll(".status_line")
// console.log(statuses);
let hiddenInput = document.getElementById("hiddenInput");
let order = hiddenInput ? hiddenInput.value : null
 order = JSON.parse(order);
 let time =  document.createElement('small')

console.log(order);

function updateStatus(order){
  statuses.forEach((status)=>{
    status.classList.remove('step-completed')
    status.classList.remove('current')
  })

  let stepCompleted = true
  statuses.forEach((status)=>{
    let dataProp = status.dataset.status

    if(stepCompleted){
      status.classList.add('step-completed')
    }

    if(dataProp === order.status ){

      stepCompleted = false
      time.innerText = moment(order.updatedAt).format('hh:mm A')
      status.appendChild(time)
      if(status.nextElementSibling){
        status.nextElementSibling.classList.add('current')

      }
    }

  })

}

updateStatus(order);


// socket
let socket = io()
// admin js
initAdmin(socket)
// join

if(order){
  socket.emit('join',`order_${order._id}`)
}

let adminPath = window.location.pathname
// console.log(adminPath);
if(adminPath.includes('admin')){
  socket.emit('join','adminRoom')
}



socket.on('orderUpdated',(data)=>{
  const updatedOrder = {...order}
  updatedOrder.updatedAt = moment().format()
  updatedOrder.status = data.status
  updateStatus(updatedOrder)
  toastr["success"]("Order updated");
    toastr.options = {
      closeButton: true,

      progressBar: false,
      positionClass: "toast-top-right",
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "1000",
      extendedTimeOut: "1000",
    };
  // console.log(data);
})