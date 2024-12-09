import * as $ from "jquery";
import { initURLListener } from "./model";
import { signUserUp, signUserOut, signUserIn } from "./model";

function initListeners() {
  console.log("Initializing listeners...");

  if ($("#submit")) {
    $(document).on("click", "#submit", (e) => {
      e.preventDefault();
      console.log("Sign-up button clicked");
      const firstName = $("#fName").val();
      const lastName = $("#lName").val();
      const email = $("#email").val();
      const password = $("#password").val();
      signUserUp(firstName, lastName, email, password);
    });
  }

  if ($("#siSubmit")) {
    $(document).on("click", "#siSubmit", (e) => {
      e.preventDefault();
      console.log("Login button clicked");
      const siEmail = $("#siEmail").val();
      const siPassword = $("#siPassword").val();
      signUserIn(siEmail, siPassword);
    });
  }

  $(document).on("click", "#so", () => {
    signUserOut();
  });
}
function initAccountListener() {
  // console.log("hello");
  $(".logo").on("click", function () {
      window.location.hash="home";
      console.log("logo clicked");
    });
$(".account").on("click", function () {
  window.location.hash="account";
  console.log("account clicked");
});
$(".cart").on("click", function () {
  window.location.hash="cart";
  console.log("cart clicked");
  
});
};



$(document).ready(function () {
  initListeners();
  initURLListener();
  initAccountListener();
});
