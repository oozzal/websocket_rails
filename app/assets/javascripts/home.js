$(function() {
  var App = App || {};

  function show(message) {
    $(".all-chats").prepend(message + "<br><br>");
  }

  App.dispatcher = new WebSocketRails(window.location.host + "/websocket");

  App.successCall = function(chat) {
    $(".info").html("");
    console.log("Chat: " + chat.message + " created");
    // $(".all-chats").prepend(chat.username " => " + chat.message + "<br><br>");
  }

  App.failCall = function(error) {
    console.log("Failed creating chat: " + error.record.message + " => " + error.full_messages);
    $(".info").html(error.full_messages);
  }

  App.channel = App.dispatcher.subscribe("chats");

  App.channel.bind("user_joined", function(username) {
    show(username + " has joined the room");
  });

  App.channel.bind("new", function(chat) {
    show(chat.username + " => " + chat.message);
  });

  App.channel.bind("user_left", function(username) {
    show(username + " has left the room");
  });

  window.App = App;

  $("#chat-input").focus();

  $("#chat-form").on("submit", function() {
    var chat = {message: $("#chat-input").val()};
    App.dispatcher.trigger("chats.create", chat, App.successCall, App.failCall);
    $("#chat-input").val("");
    return false;
  });
});

