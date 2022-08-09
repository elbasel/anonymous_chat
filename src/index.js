const Parse = require("parse");
import "./styles/main.scss";
import SignUpForm from "./pages/signUp";
import Home from "./pages/home";
import Chat from "./pages/chat";

function initParse() {
  Parse.initialize(
    "z6wry3r4l7uk3P0tWQsOtMz3FB4ifkOqHvkHEbWv",
    "Pr22k3Z6IN5RGOwdr7adFcF0e1kQsamhe6bi2F4e"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";
}

function initSite() {
  initParse();
  const signUpForm = new SignUpForm();
  const home = new Home();
  const chat = new Chat();

  if (localStorage.key(1)) {
    if (
      JSON.parse(localStorage.getItem(localStorage.key(1))).objectId ==
      localStorage.getItem("logged-in-user")
    ) {
      chat.init(JSON.parse(localStorage.getItem(localStorage.key(1))).username);
    } else home.init();
  } else home.init();

  PubSub.subscribe("user-logged-in", (msg, user) => {
    const username = user.get("username");
    document.body.innerHTML = "";
    chat.init(username);
  });

  PubSub.subscribe("sign-up-page-requested", () => {
    document.body.innerHTML = "";
    signUpForm.init();
  });

  PubSub.subscribe("new-user-created", (msg, username) => {
    document.body.innerHTML = "";
    chat.init(username);
  });

  PubSub.subscribe("logout-requested", () => {
    document.body.innerHTML = "";
    localStorage.clear(home.init());
  });
}

initSite();
