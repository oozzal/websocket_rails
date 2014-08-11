WebsocketRails::EventMap.describe do
  namespace :chats do
    subscribe :create, :to => ChatController, :with_method => :create
  end
end

