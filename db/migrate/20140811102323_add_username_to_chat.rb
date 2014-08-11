class AddUsernameToChat < ActiveRecord::Migration
  def change
    add_column :chats, :username, :string
  end
end
