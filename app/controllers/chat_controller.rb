class ChatController < WebsocketRails::BaseController
  def create
    # bang so that the chat object thus created will have error attribute
    chat = Chat.create! message.merge(:username => session[:username])
    if chat.save
      trigger_success chat
      WebsocketRails[:chats].trigger "new", chat
    else
      trigger_failure chat
    end
  end
end

