class HomeController < ApplicationController
  def index
    @chats = Chat.all.order("created_at desc")
  end

  def set_username
    session[:username] = params[:username]
    WebsocketRails[:chats].trigger "user_joined", session[:username]
    redirect_to :back
  end

  def logout
    WebsocketRails[:chats].trigger "user_left", session[:username]
    session[:username] = nil
    redirect_to :back
  end
end

