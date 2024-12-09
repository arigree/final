import * as $ from "jquery";

var products = [];
var cart = [];

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID) {
    if (pageID === "home") {
      if (products.length === 0) {
        loadProducts();
      } else {
        loadHomePage();
      }
    } else {
      $.get(`pages/${pageID}.html`, function (data) {
        $("#app").html(data);
        if (pageID === "cart") {
          loadCartItems();
        }
      });
    }
  } else {
    window.location.hash = "home";
  }
}


function loadCartItems(){
    if(cart.length > 0){
        $(".cart-items").html("");
        $.each(cart, (index, productIndex)=>{
            let product = products[productIndex];
            console.log("cart page", cart);
            let cartHTML = `<div class="product">
            <div class="image-holder">
      <img src="${product.productImage}" />
    </div>
    <div class="productName">${product.productName}</div>
            <div class="description">
            ${product.productDescription}
            </div>
            <div class="price">${product.productPrice}</div>
            <div class="remove" id="${index}">Remove</div>
            </div>`;

            $(".cart-items").append(cartHTML);

            $(".remove").on("click", function (){
                console.log('remove', cart);
                cart.splice(index, 1);
                console.log("remove after", cart);
                loadCartItems();
            })
        });
    }
};

function loadHomePage() {
  $("#app").html("<header><img src='images/header.webp'/><div class='buttons'></div></header><div class='products'></div>");
  $.each(products, (index, product) => {
    let productHTML = `
    
    <div class="product">
    ${
        product.productBanner ? `<div class="pbanner" style="background-color: ${product.productBannerColor}">${product.productBanner}</div>` 
        : ""
    }
        <div class="image-holder">
          <img src="${product.productImage}" />
        </div>
            <div class="productName">${product.productName}</div>
      <div class="priceHolder">
      <div class="price">
          ${product.productPrice}
        </div>
        <p>with Keurig® Starter Kit</p>
      </div>
        
        <div class="oldPrice">${product.oldPrice}</div>
        <div class="rating">
        <div class="stars">
        <img src="${product.ratingImg}"/>
        </div>
        <div class="ratingTxt">${product.rating}</div>
        </div>
        <div class="buy">
          <div class="buy-now" id="${index}">BUY NOW</div>
        </div>
      </div>
      `;
      $(".products").append(productHTML);
  });

  addBuyNowListener();
};



function addBuyNowListener(){
    $(".buy-now").on("click", function (){
        let index = $(this).attr("id");
        cart.push(index);
        $(".item-text").html(cart.length);
        console.log("click buy now", index);
    })
};

function loadProducts() {
  $.getJSON("data/data.json", (data) => {
    products = data.PRODUCTS;
    console.log(products);
    loadHomePage();
  });
};

export function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
};
