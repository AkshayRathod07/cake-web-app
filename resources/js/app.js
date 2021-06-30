import axios from "axios";
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

      progressBar: true,
      positionClass: "toast-top-right",
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "3000",
      extendedTimeOut: "1000",
    };
  }).catch( (err) =>{
    toastr["error"]("Something went wrong");
    toastr.options = {
        closeButton: true,
  
        progressBar: true,
        positionClass: "toast-top-right",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
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


// admin js
initAdmin()