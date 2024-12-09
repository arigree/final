import * as $ from "jquery";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebaseConfig";

export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
    
    }
  }
);

export function signUserUp(fn, ln, email, password) {
  // console.log("model.js" + fn, ln, email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User Created");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function signUserOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  }

export function signUserIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.hash = "#yourRecipes";
        console.log("User Signed in");
      })
      .catch((error) => {
        console.log("Error during sign-in:", error.message);
      });
  }

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
          // if (products.length === 0){
          //   loadProducts();
          // }
          loadCartItems();
        }
      });
    }
  } else {
    window.location.hash = "home";
  }
}


function loadCartItems() {
  if (cart.length > 0) {
      $(".cart-items").html("");
      $.each(cart, (index, productIndex) => {
          let product = products[Number(productIndex)];
          if (product) {
              let cartHTML = `<div class="product">
    ${
        product.productBanner ? `<div class="pbanner" style="background-color: ${product.productBannerColor}; color: ${product.productFontColor}">${product.productBanner}</div>` 
        : ""
    }
        <div class="image-holder">
          <img src="${product.productImage}" />
        </div>
            <div class="productName">${product.productName}</div>
      <div class="priceHolder">
      <div class="price">
      <span>$</span>${product.productPrice}
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
        <div class="remove" id="${index}">Remove</div>
      </div>`;
              $(".cart-items").append(cartHTML);
          }
      });

      $(".remove").on("click", function () {
          let removeIndex = parseInt($(this).attr("id"), 10);
          cart.splice(removeIndex, 1);
          loadCartItems();
      });
  } else {
      $(".cart-items").html("<p>Your cart is empty.</p>");
  }
}


function loadHomePage() {
  $("#app").html("<header><img src='images/header.webp'/><div class='sortBtns'><div class='buttons'><div class='button'>Categories <i class='fa-solid fa-angle-down'></i></div><div class='button'>Features <i class='fa-solid fa-angle-down'></i></div><div class='button'>Brew Type <i class='fa-solid fa-angle-down'></i></div><div class='button'>Reservoir <i class='fa-solid fa-angle-down'></i></div><div class='button'>Commercial <i class='fa-solid fa-angle-down'></i></div><div class='button'>Color <i class='fa-solid fa-angle-down'></i></div></div><div class='sort'><span>Sort by</span><p>Popularity (all time) <i class='fa-solid fa-angle-down'></i></p></div></div></header><div class='products'></div>");
  $.each(products, (index, product) => {
    let productHTML = `
    
    <div class="product">
    ${
        product.productBanner ? `<div class="pbanner" style="background-color: ${product.productBannerColor}; color: ${product.productFontColor}">${product.productBanner}</div>` 
        : ""
    }
        <div class="image-holder">
          <img src="${product.productImage}" />
        </div>
            <div class="productName">${product.productName}</div>
      <div class="priceHolder">
      <div class="price">
      <span>$</span>${product.productPrice}
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
      let index = parseInt($(this).attr("id"), 10);
        cart.push(index);
        $(".item-text").html(cart.length);
        console.log("click buy now", index);
        alert("Item added to cart.")
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
