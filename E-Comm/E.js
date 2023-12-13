let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart working js
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making function
function ready() {
    // ... (your existing code)

    //add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //buy button work
    document.getElementsByClassName('btn-buy')[0]
    .addEventListener("click",buyButtonClicked);
    updatetotal();
}
//buy button
function buyButtonClicked(){
    alert("your order is placed");
    var cartContent=document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
}

function removeCartItem(event) {
    // ... (your existing code)
    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, price, productImg);
    
}
updatetotal();

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cart-box");

    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert('You have already added this item');
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="product-img">
        <h4 class="cart-product-title">${title}</h4>
        <span class="cart-price">${price}</span>
        <input type="number" class="cart-quantity" value="1">
        <i class='bx bx-trash-alt cart-remove'></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}





    // ... (your existing code)
    function updatetotal() {
        var cartItemContainer = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartItemContainer.getElementsByClassName('cart-box');
        var total = 0;
    
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.querySelector('.cart-price');
            var quantityElement = cartBox.querySelector('.cart-quantity');
    
            if (priceElement && quantityElement) {
                var price = parseFloat(priceElement.innerText.replace('$', '')) || 0;
                var quantity = quantityElement.value || 0;
    
                total = total+ (price * quantity);
            }
        }
    
        total = Math.round(total * 100) / 100;
        document.querySelector('.total-price').innerText = '$' + total;
    }
updatetotal();    
    

